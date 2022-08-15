require('dotenv').config()
const { Client } = require('pg')

async function searchUser(user, password) {
    const client = new Client()

    await client.connect()

    const res = await client.query(`SELECT * FROM users WHERE "user" = $1 AND "password" = $2;`, [user, password])
    await client.end()
    return res.rows
}

module.exports = {
    searchUser: searchUser
}