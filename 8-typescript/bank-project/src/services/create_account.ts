import {DataToCreateAccount, APIresponse} from "../models"
import {CPFValidator, PasswordValidator} from "../utils"
import {Client} from "pg"
import { v4 } from "uuid"
import 'dotenv/config'

class CreateAccountService {

    public async createAccount(data: any): Promise<APIresponse> {

        const validCPF = new CPFValidator(data.cpf)
        const validPassword = new PasswordValidator(data.password)
        const errors = validCPF.errors + validPassword.errors

        if (errors.length > 0) {
            throw new Error(`400: ${errors}`)
        }

        const verifyClient = await this.CPFIsCadastred(data.cpf)

        if (verifyClient.exists) {
            return this.generateAccountData(verifyClient.id, validPassword.pw)
        } else {
            return {data: [], messages: ["You need sign in this CPF first"]} as APIresponse
        }
    }

    private async CPFIsCadastred(cpf: string) {
        try {
            const client = new Client({
                user: 'postgres',
                host: 'localhost',
                database: 'bank',
                password: '1978',
                port: 5432,
            })
            client.connect()

            const text = 'SELECT * FROM clients WHERE cpf=$1'
            const values = [cpf]

            const dbResponse = await client.query(text, values)

            client.end()

            if (dbResponse.rows.length > 0) {
                return {exists: true, id: dbResponse.rows[0].id}
            }

            return {exists: false}

        } catch (err) {
            throw new Error(`Unexpected error`)
        }
    }

    private async generateAccountData(clientId: string, pw: string): Promise<APIresponse> {
        const AccountNumber = Math.floor(Math.random()*90000+10000)
        const VerifyingDigit = Math.floor(Math.random()*10)

        console.log(AccountNumber)
        console.log(VerifyingDigit)
        try {
            const client = new Client()
            await client.connect()

            const text = 'INSERT INTO accounts VALUES ($1, $2, $3, $4, $5, 0.00) RETURNING *'
            const values = [v4(), clientId, AccountNumber, VerifyingDigit, pw]

            const dbResponse = await client.query(text, values)

            await client.end()

            const accountData = {
                account_number: dbResponse.rows[0].account_number,
                account_verifying_digit: dbResponse.rows[0].account_verifying_digit
            }

            return {data: accountData, messages: []}

        } catch (err) {
            throw new Error(`Unexpected error`)
        }
    }
}

export {CreateAccountService}