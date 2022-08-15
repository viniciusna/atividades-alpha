require('dotenv').config()
const express = require('express')
const app = express()
const Redis = require("ioredis");
const redis = new Redis();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const search = require('./service/pg_search')
const tools = require("./service/tools")

app.post('/movies', async (req, res) => {
    const movieName = tools.titleize(req.body.name)
    const redisKey = movieName.replaceAll(" ", "-").toLowerCase()

    const redisResult = await redis.hgetall(redisKey, (err, result) => {
                            if (err) {
                                console.error(err);
                                return err
                            } else {
                                return result
                            }
                        })

    if (Object.keys(redisResult).length === 0) {
        const pgResponse = await search.search(movieName)
        res.json(pgResponse)

        await redis.hmset(redisKey, pgResponse.result)
        await redis.expire(redisKey, 30)
    } else {
        res.json({
            message: "Resposta do Redis",
            result: redisResult
        })
        await redis.expire(redisKey, 30)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})