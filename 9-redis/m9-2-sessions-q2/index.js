require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const redis = require('ioredis');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    store: new RedisStore({ client: redis.createClient({ host: 'localhost', port: 6379 })}),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))

const services = require("./services")

app.post('/login', async (req, res) => {

    const {user, password} = req.body
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

        const sess = req.session
        sess.username = user
        sess.password = password
        res.cookie(sess.id)
    }

    res.json(response)
})

app.post("/signup", async (req, res) => {
    const {user, password} = req.body

    if ( services.validateUserData.dataIsValid(user, password) ) {
        try {
            await services.pg.signUp(user, password)
            res.status(201)
            res.json({message: "created"})
        } catch {
            res.status(400)
            res.json({message: "User already exists"})
        }
    } else {
        res.status(400)
        res.json({message: "Invalid data, user must to have more than 4 characters and password more than 8"})
    }

})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
