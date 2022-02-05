import express from 'express'
import cors from 'cors'
import * as fs from 'fs'
import filterByMonth from './modules/birthmonth.js'
import filterBySector from './modules/sector.js'
import register from './modules/register.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.get('/month', (req, res) => {
    fs.readFile('./modules/database.json', (err, data) => {
        if (err) throw err;
        res.send(filterByMonth(data, req.query.month));
    })
})

app.get('/sector', (req, res) => {
    fs.readFile('./modules/database.json', (err, data) => {
        if (err) throw err;
        res.send(filterBySector(data, req.query.sector));
    })
})

app.get('/ramal', (req, res) => {
    fs.readFile('./modules/database.json', (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

app.post("/register", function (req, res) {
    res.sendStatus(201);
    fs.readFile('./modules/database.json', (err, data) => {
        if (err) throw err;
        fs.writeFile('./modules/database.json', JSON.stringify(register(data, req.body)), (err) => {
            if (err) throw err;
            console.log("escreveu")})
    })
})

app.listen(3000)