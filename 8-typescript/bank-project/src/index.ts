import express, { Express, Request, Response } from 'express'
import * as routes from './routes/index'
import 'dotenv/config'

const app: Express = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const NewClient = new routes.NewClientController
const NewAccount = new routes.CreateAccountController
const Deposit = new routes.DepositController
const Withdrawal = new routes.WithdrawalController

app.post("/new-client", (req: Request, res: Response) => NewClient.newClientResponse(req, res))

app.post("/create-account", (req: Request, res: Response) => NewAccount.createAccountResponse(req, res))

app.post("/deposit",(req: Request, res: Response) => Deposit.toDeposit(req, res))

app.post("/withdrawal", (req: Request, res: Response) => Withdrawal.toWithdrawal(req, res))

app.listen(process.env.PORT)