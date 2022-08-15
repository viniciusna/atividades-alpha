import express, { Express, Request, Response } from 'express'

const app: Express = express()

app.get('/ping', (req: Request, res: Response) => {
    res.send("pong")
})

app.listen(8080)