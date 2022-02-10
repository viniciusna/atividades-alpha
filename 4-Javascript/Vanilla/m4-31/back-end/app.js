import express from 'express'
import cors from 'cors'
import * as fs from 'fs'
import filterByMonth from './modules/birthmonth.js'
import filterBySector from './modules/sector.js'
import register from './modules/register.js'
import calculadora from './modules/calculator.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.get('/month', (req, res) => {
    fs.readFile('./database/employees/databaseEmployees.json', (err, data) => {
        if (err) throw err;
        res.send(filterByMonth(data, req.query.month));
    })
})

app.get('/sector', (req, res) => {
    fs.readFile('./database/employees/databaseEmployees.json', (err, data) => {
        if (err) throw err;
        res.send(filterBySector(data, req.query.sector));
    })
})

app.get('/ramal', (req, res) => {
    fs.readFile('./database/employees/databaseEmployees.json', (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

app.post("/register", function (req, res) {
    res.sendStatus(201);
    fs.readFile('./database/employees/databaseEmployees.json', (err, data) => {
        if (err) throw err;
        fs.writeFile('./database/employees/databaseEmployees.json', JSON.stringify(register(data, req.body)), (err) => {
            if (err) throw err;
            console.log("escreveu")})
    })
})

app.put('/calculadora', (req, res) => {
    let calculus = calculadora()

    calculus.setOperand1(req.body.operand1)
    calculus.setOperand2(req.body.operand2)
    calculus.setOperation(req.body.operation)

    res.json(calculus.getResult())
})

app.listen(3000)