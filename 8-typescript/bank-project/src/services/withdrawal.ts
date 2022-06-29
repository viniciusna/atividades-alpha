import {Withdrawal, APIresponse} from "../models"
import {AccountNumbersValidator, ValueValidator, PasswordValidator} from "../utils"
import {Client} from "pg"
import 'dotenv/config'
import { v4 } from "uuid"

class WithdrawalService {

    public async makeWithdrawal(data: Withdrawal): Promise<APIresponse>{
        const validAccountnumbers = new AccountNumbersValidator(data.account_number, data.account_verifying_digit)
        const validValue = new ValueValidator(data.value)
        const validPassword = new PasswordValidator(data.password)
        const errors = validAccountnumbers.errors + validValue.errors + validPassword.errors

        if (errors.length > 0) {
            throw new Error(`400: ${errors}`)
        }

        return await this.makeTheWithdrawal(data)
    }

    private async makeTheWithdrawal(data: Withdrawal): Promise<APIresponse> {

        try {
            const client = new Client()
            await client.connect()

            const text = 'SELECT * FROM accounts WHERE account_number=$1 AND account_verifying_digit=$2 AND password=$3'
            const values = [data.account_number, data.account_verifying_digit, data.password]

            const dbResponse = await client.query(text, values)

            if (dbResponse.rows.length === 0) {
                await client.end()
                return {data: {}, messages: ["Account don't exist or uncorrected password"]}
            }

            if (parseFloat(dbResponse.rows[0].account_balance) < data.value + 4) {
                await client.end()
                return {data: {}, messages: ["insufficient account balance"]}
            }

            const accountData = {id: dbResponse.rows[0].id, account_balance: parseFloat(dbResponse.rows[0].account_balance) - data.value - 4}

            const upText = "UPDATE accounts SET account_balance=$2 WHERE id=$1 RETURNING *"
            const upValues = [accountData.id, accountData.account_balance]

            const upDbResponse = await client.query(upText, upValues)

            const registerText = "INSERT INTO bank_statements VALUES ($1, $2, $3, $4, $5, NOW());"
            const registerValues = [v4(), accountData.id, "withdrawal", null, -data.value]

            await client.query(registerText, registerValues)

            const feeText = "INSERT INTO bank_statements VALUES ($1, $2, $3, $4, $5, NOW());"
            const feeValues = [v4(), accountData.id, "withdrawal fee", null, -4.00 ]

            await client.query(feeText, feeValues)

            await client.end()

            return {data: {account_balance: upDbResponse.rows[0].account_balance}, messages: [`Withdrawal of R$${data.value} and a fee of R$4.00`]}

        } catch (err) {
            throw new Error(`Unexpected error`)
        }
    }
}

export {WithdrawalService}