const Redis = require("ioredis");
const redis = new Redis();

async function verifyIfHaveAttempts(redisResult, user) {
    if (Object.keys(redisResult).length === 0) {
        await redis.hset(user, {attempts: 1})
        await redis.expire(user, 300)
    } else {
        await redis.hincrby(user, "attempts", 1)
    }
}

async function consultRedisAttempts(user) {
    await redis.hgetall(user, async (err, result) => {
        if (err) {
            console.error(err)
        } else {
            await verifyIfHaveAttempts(result, user)
        }
    })

    return await redis.hget(user, "attempts")
}

async function deleteAttemptsKey(user) {
    await redis.del(user)
}

async function blockUserTemporaly(user) {
    return await redis.set(`${user}:blocked`, "true", "ex", 600)
}

async function verifyIfUserIsBlocked(user) {
    return await redis.get(`${user}:blocked`)
}

module.exports = {
    consultRedisAttempts: consultRedisAttempts,
    deleteAttemptsKey: deleteAttemptsKey,
    blockUserTemporaly: blockUserTemporaly,
    verifyIfUserIsBlocked: verifyIfUserIsBlocked

}