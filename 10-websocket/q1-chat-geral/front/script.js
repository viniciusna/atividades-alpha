const address = document.location.href
const ip = address.slice(7, address.lastIndexOf(":"))
const ws = new WebSocket(`ws://${ip}:8080`)
let username

ws.onmessage = (event) => {
    const object = JSON.parse(event.data)
    $("#chat").append(`<p><strong>${object.username} : </strong> ${object.message}</p>`)
}

function send() {
    const message = $("input").val()

    if (/[a-zA-Z]/.test(message)) {
        ws.send(JSON.stringify({username: username, message: message}))
        $("input").val("")
    }
}

$("#define-username").click( () => {
    username = $("input").val()

    if (/[a-zA-Z]/.test(username) && username.length > 3) {
        $("input").val("")
        $("#container-input").html(`
            <span> <b> ${username} </b> </span>
            <input type="text">
            <button onclick="send()">Enviar</button>
        `)
        $("#container-response").html("")
    } else {
        $("#container-response").html("O username deve conter pelo menos 4 caracteres não vazios")
    }
})