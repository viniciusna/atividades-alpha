import { Request, Response } from 'express'
import {DepositService} from '../services';
import {ResponseWriter} from '../utils'

class DepositController {

    private depositService = new DepositService
    private responseWriter = ResponseWriter

    public async toDeposit(req: Request, res: Response) {

        try {
            const response = await this.depositService.makeDeposit(req.body)
            this.responseWriter.success(res, 200, response)
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export {DepositController}