import { Request, Response } from 'express'
import {BankStatementConsult} from '../services';
import {ResponseWriter} from '../utils'

class BankStatementController {

    private consult = new BankStatementConsult
    private responseWriter = ResponseWriter

    public async BankStatementResponse(req: Request, res: Response) {
        try {
            const response = await this.consult.consult(req.body)
            this.responseWriter.success(res, 200, response)
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export default BankStatementController