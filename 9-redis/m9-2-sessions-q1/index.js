require('dotenv').config()
const express = require('express')
const app = express()
const Redis = require("ioredis");
const redis = new Redis();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const services = require("./services")

app.post('/login', async (req, res) => {

    const user = req.body.user
    const password = req.body.password
    const a = await services.redis.verifyIfUserIsBlocked(user)

    if (a) {
      return res.json({message: "you are blocked, try again in 10 minutes!!!"})
    }

    let response = await services.validateUserData.responseUser(user, password)

    if (response.message) {
        const howManyAttempts = await services.redis.consultRedisAttempts(user)

        if ( howManyAttempts == 3 ) {
            await services.redis.deleteAttemptsKey(user)
            await services.redis.blockUserTemporaly(user)
            response = {message: "you are blocked, try again in 10 minutes"}
        }
    } else {
        await services.redis.deleteAttemptsKey(user)
    }

    res.json(response)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
