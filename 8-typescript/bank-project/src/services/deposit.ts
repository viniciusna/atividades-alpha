import {Deposit, APIresponse} from "../models"
import {AccountNumbersValidator, ValueValidator} from "../utils"
import {Client} from "pg"
import 'dotenv/config'
import { v4 } from "uuid"

class DepositService {

    public async makeDeposit(data: Deposit): Promise<APIresponse>{
        const validAccountnumbers = new AccountNumbersValidator(data.account_number, data.account_verifying_digit)
        const validValue = new ValueValidator(data.value)
        const errors = validAccountnumbers.errors + validValue.errors

        if (errors.length > 0) {
            throw new Error(`400: ${errors}`)
        }

        return await this.makeTheDeposit(data)
    }

    private async makeTheDeposit(data: Deposit) {

        try {
            const client = new Client()
            await client.connect()

            const text = 'SELECT * FROM accounts WHERE account_number=$1 AND account_verifying_digit=$2'
            const values = [data.account_number, data.account_verifying_digit]

            const dbResponse = await client.query(text, values)

            if (dbResponse.rows.length === 0) {
                await client.end()
                return {data: {}, messages: ["Account don't exist"]}
            }

            const accountData = {id: dbResponse.rows[0].id, account_balance: (parseFloat(dbResponse.rows[0].account_balance) + data.value*0.99)}

            const upText = "UPDATE accounts SET account_balance=$2 WHERE id=$1 RETURNING *"
            const upValues = [accountData.id, accountData.account_balance]

            const upDbResponse = await client.query(upText, upValues)

            const registerText = "INSERT INTO bank_statements VALUES ($1, $2, $3, $4, $5, NOW());"
            const registerValues = [v4(), null, "deposit", accountData.id, data.value]

            await client.query(registerText, registerValues)

            const feeText = "INSERT INTO bank_statements VALUES ($1, $2, $3, $4, $5, NOW());"
            const feeValues = [v4(), accountData.id, "deposit fee", null, -data.value*0.01 ]

            await client.query(feeText, feeValues)

            await client.end()

            return {data: {account_balance: upDbResponse.rows[0].account_balance}, messages: ["Deposited"]}

        } catch (err) {
            throw new Error(`Unexpected error`)
        }
    }
}

export {DepositService}