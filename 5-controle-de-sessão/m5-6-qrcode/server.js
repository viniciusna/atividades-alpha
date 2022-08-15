const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost",
    credentials: true,
    optionSuccessStatus: 200
}))
app.use(cookieParser())

app.use(express.static("front-end/login"))

app.post('/login', (req, res) => {

    const userName = req.body.username
    const pw = req.body.pw

    fs.readFile('./back-end/database/users-db.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)
        let loginCorrect = false

        usersData.forEach( user => {
            if ( userName === user.username & pw === user.pw ) {
                loginCorrect = true
                res.cookie("id", (user.id).toString())
            }
        })

        loginCorrect ? res.sendStatus(200) : res.sendStatus(401)
    })

})

app.listen(80, () => console.log("Server Running"))

// fs.writeFile('./back-end/database/users.json', JSON.stringify(/*json a ser escrito*/), (err) => {
//     if (err) throw err;
//     console.log("escreveu")})