import {APIresponse, DataForNewClient, DataToCreateAccount} from "../models"
import {NameValidator, EmailValidator, DateValidator, CPFValidator} from "../utils"
import { v4 } from "uuid"
import {Client} from "pg"
import {CreateAccountService} from "../services"

class NewClientService {

    public async createNewClient(data: DataForNewClient): Promise<APIresponse> {

        const validEmail = new EmailValidator(data.email);
        const validName = new NameValidator(data.name);
        const validBirthdate = new DateValidator(data.birthdate);
        const validCPF = new CPFValidator(data.cpf)

        const errors = validEmail.errors + validName.errors + validBirthdate.errors + validCPF.errors

        if (errors.length > 0) {
            throw new Error(`400: ${errors}`);
        } else {

            const userData: Partial<DataForNewClient> = {
                birthdate: validBirthdate.date,
                email: validEmail.email,
                name: validName.name,
                cpf: validCPF.cpf
            };

            const id = v4()

            try {
                const client = new Client()
                await client.connect()

                const searchText = "SELECT * FROM clients WHERE cpf=$1"
                const searchValues = [userData.cpf]

                const searchResponse = await client.query(searchText, searchValues)

                if (searchResponse.rows.length > 0) {
                    const createAccount = new CreateAccountService
                    const dataToCreateAccount = {cpf: userData.cpf, password: data.password}
                    return createAccount.createAccount(dataToCreateAccount)
                }

                const text = 'INSERT INTO clients VALUES($1, $2, $3, $4, $5) RETURNING *'
                const values = [id, userData.name, userData.birthdate, userData.email, userData.cpf ]

                const dbResponse = await client.query(text, values)

                await client.end()
                const createAccount = new CreateAccountService
                const dataToCreateAccount = {cpf: userData.cpf, password: data.password}
                return createAccount.createAccount(dataToCreateAccount)
            } catch (err) {
                throw new Error(`Unexpected error ${err}`)
            }
        }
    }
}

export {NewClientService}