const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

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
            }
        })
        res.send(response)
    })
})

app.post('/name', (req, res) => {
    const id = parseInt(req.body.id)

    fs.readFile('./back-end/database/users.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)
        let response

        usersData.forEach( user => {
            if ( id === user.id ) {
                response = user.name
            }
        })
        res.send(response)
    })
})

app.post('/pw', (req, res) => {
    const id = parseInt(req.body.id)

    fs.readFile('./back-end/database/users.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)
        let response

        usersData.forEach( user => {
            if ( id === user.id ) {
                response = user.pw
            }
        })
        res.send(response)
    })
})

app.listen(8080)