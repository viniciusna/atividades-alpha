import { Request, Response } from 'express'
import {TransactionService} from '../services';
import {ResponseWriter} from '../utils'

class TransactionController {

    private transactionService = new TransactionService
    private responseWriter = ResponseWriter

    public async transactionResponse(req: Request, res: Response) {
        try {
            const response = await this.transactionService.transaction(req.body)
            this.responseWriter.success(res, 200, response)
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export default TransactionController