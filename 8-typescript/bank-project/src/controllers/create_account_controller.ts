import { Request, Response } from 'express'
import {CreateAccountService} from '../services';
import {ResponseWriter} from '../utils'

class CreateAccountController {

    private create = new CreateAccountService
    private responseWriter = ResponseWriter

    public async createAccountResponse(req: Request, res: Response) {
        try {
            const response = await this.create.createAccount(req.body)
            this.responseWriter.success(res, 201, response)
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export default CreateAccountController