import express from 'express'
import cors from 'cors'
import * as fs from 'fs'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

function register(data, newRegister) {
    let datajson = JSON.parse(data)
    datajson.push(newRegister)

    return datajson
}

app.get('/', (req, res) => {
    fs.readFile('./database/games/gamesdatabase.json', (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

app.post('/', (req, res) =>{
    res.sendStatus(201)

    fs.readFile('./database/games/gamesdatabase.json', (err, data) => {
        if (err) throw err;
        fs.writeFile('./database/games/gamesdatabase.json', JSON.stringify(register(data, req.body)), (err) => {
            if (err) throw err;
            console.log("escreveu")})
    })
})

app.listen(3001)