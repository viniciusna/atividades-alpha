const express = require('express')
const app = express()

app.use( express.static("front-end") )

app.listen(80, () => {
    console.log("Server running")
})