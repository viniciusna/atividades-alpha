const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')

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

                const hash = encrypt((user.id).toString())

                // const hash = crypto.createHash('sha256')
                // .update((user.id).toString())
                // .digest('hex');

                user.hash = hash

                res.cookie("id", hash)
            }
        })

        res.send(response)
    })
})

app.post('/name', (req, res) => {
    const cookie = req.cookies["id"]

    const id = parseInt(decrypt(cookie))

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
    const cookie = req.cookies["id"]

    const id = parseInt(decrypt(cookie))

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

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};
