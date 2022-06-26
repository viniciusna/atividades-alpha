import {APIresponse, DataForNewClient} from "../models"
import {NameValidator, EmailValidator, DateValidator, CPFValidator} from "../utils"
import { v4 } from "uuid"
import {Client} from "pg"

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

                const text = 'INSERT INTO clients VALUES($1, $2, $3, $4, $5) RETURNING *'
                const values = [id, userData.name, userData.birthdate, userData.email, userData.cpf ]

                client.query(text, values, async (err, res) => {
                    await client.end()
                  })

                return {data: userData, messages: [id]}
            } catch (err) {
                throw new Error(`Unexpected error`)
            }
        }
    }
}

export {NewClientService}