import {AccountNumbersValidator, PasswordValidator} from "../utils"
import {Client} from "pg"
import {BankStatement, APIresponse} from "../models"

class BankStatementConsult {

    public async consult(data: BankStatement): Promise<APIresponse> {
        const validAccountnumbers = new AccountNumbersValidator(data.account_number, data.account_verifying_digit)
        const validPassword = new PasswordValidator(data.password)
        const errors = validAccountnumbers.errors + validPassword.errors

        if (errors.length > 0) {
            throw new Error(`400: ${errors}`)
        }

        return await this.getData(data)
    }

    private async getData(data: BankStatement): Promise<APIresponse> {

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

            const consultText = "SELECT * FROM bank_statements WHERE operating_account_id=$1 OR destiny_account_id=$1"
            const consultValues = [dbResponse.rows[0].id]

            const consultResponse = await client.query(consultText, consultValues)

            const bankStatementData = consultResponse.rows.map( (row) => {
                return {operation_type: row.operation_type, value: row.value, when: row.created_at}
            })

            return {data: bankStatementData, messages: []}

        } catch (err) {
            throw new Error(`Unexpected error ${err}`)
        }
    }

    private async setUpRegisterBankStatement(row: any, accountId: string) {
        if (row.operation_type != "transfer") {
            return {operation_type: row.operation_type, value: row.value, when: row.created_at}
        }
        else if (row.operating_account_id === accountId) {
            const client = new Client()
            await client.connect()

            const text = 'SELECT * FROM bank_statements WHERE id=$1'
            const values = [row.id]

            const dbResponse = await client.query(text, values)

            const accountDataText = "SELECT * FROM accounts WHERE id=$1"
            const accountDataValues = [dbResponse.rows[0].destiny_account_id]

            const destinyAccountResponse = await client.query(accountDataText, accountDataValues)

            await client.end()

            return {
                operation_type: row.operation_type,
                value: row.value,
                when: row.created_at,
                destiny_account_number: destinyAccountResponse.rows[0].account_number,
                destiny_account_verifying_digit: destinyAccountResponse.rows[0].account_verifying_digit
            }
        } else {
            const client = new Client()
            await client.connect()

            const text = 'SELECT * FROM bank_statements WHERE id=$1'
            const values = [row.id]

            const dbResponse = await client.query(text, values)

            const accountDataText = "SELECT * FROM accounts WHERE id=$1"
            const accountDataValues = [dbResponse.rows[0].operating_account_id]

            const originAccountResponse = await client.query(accountDataText, accountDataValues)

            await client.end()

            return {
                operation_type: row.operation_type,
                value: -row.value,
                when: row.created_at,
                origin_account_number: originAccountResponse.rows[0].account_number,
                origin_account_verifying_digit: originAccountResponse.rows[0].account_verifying_digit
            }
        }
    }
}

export {BankStatementConsult}