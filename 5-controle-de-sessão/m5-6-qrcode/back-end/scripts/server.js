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

app.post('/', (req, res) => {

    const id = parseInt(req.cookies.id)

    fs.readFile('./back-end/database/users-db.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)

        usersData.forEach( user => {
            if ( id === user.id ) {
                if ( user.admin ) {
                    res.send(`    <main>
                    <p>Cadastrar usuário</p>
                    <div class="container-records">
                        <div>
                            <label for="name">Nome</label>
                            <input id="name" type="text">
                        </div>
            
                        <div>
                            <label for="username">username</label>
                            <input id="username" type="text">
                        </div>
            
                        <div>
                            <label for="pw">Senha</label>
                            <input id="pw" type="password">
                        </div>
            
                        <button onclick="registerUser()">Cadastrar usuário</button>
            
                        <div id="response-user"></div>
                    </div>
            
                    <p>Cadastrar evento</p>
                    <div class="container-records">
                        <div>
                            <label for="title">Título</label>
                            <input id="title" type="text">
                        </div>
            
                        <div>
                            <label for="description">Descrição</label>
                            <input id="description" type="text">
                        </div>
            
                        <div>
                            <label for="date">Data</label>
                            <input id="date" type="date">
                        </div>
            
                        <div>
                            <label for="hour">Hora</label>
                            <input id="hour" type="time">
                        </div>
            
                        <button onclick="registerEvent()">Cadastrar evento</button>
            
                        <div id="response-event"></div>
                    </div>
                </main>
            
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> <!-- import JQuery -->`)
                } else {
                    res.send(`    <main>
                    <p>Bem vindo!</p>
                
                    <div>
                        <button onclick="events()">Listar Eventos</button>
                        <button onclick="userEvents()">Ver meus eventos</button>
                    </div>

                    <div id="response"></div>
                    <div id="placeHolder"></div>

                    </main>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> <!-- import JQuery -->
                    <script src="user-script.js"></script>`)
                }
            }
        })
    })
})

app.get('/events', (req, res) => {
    fs.readFile('./back-end/database/events-db.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)

        res.send(usersData)
    })
})

app.get("/myevents", (req, res) => {
    const id = parseInt(req.cookies.id)

    searchUserAndEvents(id, res)

})

app.listen(8080)

function searchUserAndEvents(id, res) {

    fs.readFile('./back-end/database/users-db.json', (err, data) => {
        if (err) throw err;
        const usersData = JSON.parse(data)

        usersData.forEach( user => {
            if ( id === user.id ) {
                searchEventsOfUser(user.events, res, id)
            }
        })
    })
}

function searchEventsOfUser(userEvents, res, id) {
    fs.readFile('./back-end/database/events-db.json', (err, data) => {
        if (err) throw err;
        let events = []
        const eventsData = JSON.parse(data)

        eventsData.forEach( event => {
            const eventId = event.id
            if ( userEvents.includes(eventId) ) {
                events.push(event)
            }
        })

        events.forEach( event => {
            event.qrcode = "http://localhost:8080/authentication?token=" + event.id + "&" + id
        })

        console.log(events)
        res.send(events)
    })
}