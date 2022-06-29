import {TransactionData, APIresponse} from "../models"
import {AccountNumbersValidator, ValueValidator, PasswordValidator} from "../utils"
import {Client} from "pg"
import 'dotenv/config'
import { v4 } from "uuid"

class TransactionService {

    public async transaction(data: TransactionData): Promise<APIresponse>{
        const validAccountnumbers = new AccountNumbersValidator(data.account_number, data.account_verifying_digit)
        const validValue = new ValueValidator(data.value)
        const validPassword = new PasswordValidator(data.password)
        const validDestinyAccountNumbers = new AccountNumbersValidator(data.destiny_account_number, data.destiny_account_verifying_digit)
        const errors = validAccountnumbers.errors + validValue.errors + validPassword.errors + validDestinyAccountNumbers.errors

        if (errors.length > 0) {
            throw new Error(`400: ${errors}`)
        }

        return await this.makeTransaction(data)
    }

    private async makeTransaction(data: TransactionData): Promise<APIresponse> {
        try {
            const client = new Client()
            await client.connect()

            const originText = 'SELECT * FROM accounts WHERE account_number=$1 AND account_verifying_digit=$2 AND password=$3'
            const originValues = [data.account_number, data.account_verifying_digit, data.password]

            const destinyText = 'SELECT * FROM accounts WHERE account_number=$1 AND account_verifying_digit=$2'
            const destinyValues = [data.destiny_account_number, data.destiny_account_verifying_digit]

            const dbOriginResponse = await client.query(originText, originValues)
            const dbDestinyResponse = await client.query(destinyText, destinyValues)

            if (dbOriginResponse.rows.length === 0 || dbDestinyResponse.rows.length === 0) {
                await client.end()
                return {data: {}, messages: ["At least one of the accounts don't exist"]}
            }

            if (parseFloat(dbOriginResponse.rows[0].account_balance) < data.value + 1) {
                await client.end()
                return {data: {}, messages: ["insufficient account balance"]}
            }

            const upText = "UPDATE accounts SET account_balance=$2 WHERE id=$1 RETURNING *"
            const upOriginValues = [dbOriginResponse.rows[0].id, parseFloat(dbOriginResponse.rows[0].account_balance)-data.value-1]
            const upDestinyValues = [dbDestinyResponse.rows[0].id, parseFloat(dbDestinyResponse.rows[0].account_balance)+data.value]

            const upOriginResponse = await client.query(upText, upOriginValues)
            const upDestinyResponse = await client.query(upText, upDestinyValues)

            //Save in bank_statements
            const registerText = "INSERT INTO bank_statements VALUES ($1, $2, $3, $4, $5, NOW());"
            const registerOriginValues = [v4(), upOriginResponse.rows[0].id, "transfer", upDestinyResponse.rows[0].id, -data.value]
            const registerFeeValues = [v4(), upOriginResponse.rows[0].id, "transfer fee", null, -1]

            await client.query(registerText, registerOriginValues)
            await client.query(registerText, registerFeeValues)

            return {
                    data: {
                            value_transfered: data.value,
                            account_balance: upOriginResponse.rows[0].account_balance,
                            destiny_account_number: upDestinyResponse.rows[0].account_number,
                            destiny_account_verifying_digit: upDestinyResponse.rows[0].account_verifying_digit
                        },
                        messages: []
                }
        } catch (err) {
            throw new Error(`Unexpected error ${err}`)
        }
    }
}

export {TransactionService}