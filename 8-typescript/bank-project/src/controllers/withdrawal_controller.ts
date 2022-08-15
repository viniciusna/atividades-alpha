import { Request, Response } from 'express'
import {WithdrawalService} from '../services';
import {ResponseWriter} from '../utils'

class CreateAccountController {

    private withdrawalService = new WithdrawalService
    private responseWriter = ResponseWriter

    public async toWithdrawal(req: Request, res: Response) {
        try {
            const response = await this.withdrawalService.makeWithdrawal(req.body)
            this.responseWriter.success(res, 201, response)
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export default CreateAccountController