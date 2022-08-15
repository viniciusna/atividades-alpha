require('dotenv').config()
const { Client } = require('pg')

async function searchMovie(name) {
    const client = new Client()

    await client.connect()

    const res = await client.query(`SELECT * FROM movies WHERE movie_name = $1;`, [name])
    await client.end()
    return res.rows
}

async function search(nameToSearch) {
    const pgResponse = await searchMovie(nameToSearch)

    return {
            message: "Resultado do postgres",
            result: pgResponse
        }
}

module.exports = {
    search: search
}