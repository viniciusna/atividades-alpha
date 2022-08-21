const express = require('express')
const app = express()
const WebSocket = require('ws')
const { WebSocketServer } = require('ws')
const wss = new WebSocketServer ({port: 8080})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

wss.on('connection', (ws, request, client) => {
    ws.on('message', (data, isBinary) => {
        const message = isBinary ? data : data.toString()

        wss.clients.forEach( (client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(message)
            }
        })
    })

    ws.send(JSON.stringify({username: "server", message: "Conectado"}))
  })

app.use("/", express.static("front"))

app.listen(3000, (req, res) => {
    console.log("listening on 3000")
})