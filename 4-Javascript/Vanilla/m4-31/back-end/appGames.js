import express from 'express'
import cors from 'cors'
import * as fs from 'fs'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.post('/', (req, res) =>{
    res.sendStatus(200)
    console.log(req.body)
})

app.listen(3001)