import { Request, Response } from 'express'
import {NewClientService} from '../services'
import {ResponseWriter} from '../utils'

class NewClientController {

    private create = new NewClientService
    private responseWriter = ResponseWriter

    public async newClientResponse(req: Request, res: Response) {
        try {
            const response = await this.create.createNewClient(req.body)
            this.responseWriter.success(res, 201, response)
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export default NewClientController