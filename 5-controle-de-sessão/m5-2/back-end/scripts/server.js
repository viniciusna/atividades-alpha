const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {

    const timeRandom = Math.floor((1 - Math.random())*50)*100

    setTimeout(() => {
        res.send(`${timeRandom}`)
    }, timeRandom)
})

app.listen(8080)