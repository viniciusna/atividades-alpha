import { APIresponse } from "../models";
import { Response } from "express";

class ResponseWriter {
    public static error (res: Response, error: Error): void {
        const [
            statusCode,
            messages
        ] = error.message.split(": ");

        if (Number(statusCode)) {
            res.status(Number(statusCode)).json({
                data: {},
                messages: messages.split("|").filter((message: string) => message !== "")
            } as APIresponse);
        }
        else {
            res.status(500).json({
                data: {},
                messages: [ "unexpected error occurred" ]
            } as APIresponse);
        }
    }

    public static success (res: Response, statusCode: number, response: APIresponse): void {
        res.status(statusCode).json(response);
    }
}

export { ResponseWriter };