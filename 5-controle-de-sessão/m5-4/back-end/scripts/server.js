const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost",
    credentials: true,
    optionSuccessStatus: 200
}))
app.use(cookieParser())

app.post('/', (req, res) => {
    const name = req.body.name
    const pw = req.body.pw

    fs.readFile('./back-end/database/users.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)
        let response = "notFound"

        usersData.forEach( user => {
            if ( name === user.name && pw === user.pw ) {
                response = user
                res.cookie("id", (user.id).toString())
            }
        })

        res.send(response)
    })
})

app.post('/name', (req, res) => {
    const cookie = parseInt(req.cookies["id"])

    fs.readFile('./back-end/database/users.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)
        let response

        usersData.forEach( user => {
            if ( cookie === user.id ) {
                response = user.name
            }
        })

        res.send(response)
    })
})

app.post('/pw', (req, res) => {
    const cookie = parseInt(req.cookies["id"])

    fs.readFile('./back-end/database/users.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)
        let response

        usersData.forEach( user => {
            if ( cookie === user.id ) {
                response = user.pw
            }
        })

        res.send(response)
    })
})

app.listen(8080)
