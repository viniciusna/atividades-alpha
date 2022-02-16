function showCatalog() {
    fetch("http://localhost:3001")
    .then( response => response.json())
    .then(data => {
        mountTable(data)
    })
    .catch(err => console.log(err))
}

function mountTable(data) {
    $("#catalog").text("")

    $("#catalog").append(`
    <tr> <th>ID</th> <th>Nome</th> <th>Ano</th> <th>Gênero</th> <th>Multiplayer</th> <th>Offline</th> <th>Crossplataform</th> </tr>
    `)

    data.forEach( game => {
        $("#catalog").append(`
            <tr>
                <td>${game.id}</td>
                <td>${game.game}</td>
                <td>${game.year}</td>
                <td>${game.genre}</td>
                <td>${game.multiplayer}</td>
                <td>${game.offline}</td>
                <td>${game.crossplataform}</td>
            </tr>
        `)
    })
}

$(document).ready( showCatalog() )

function registerGame() {
    const id = $("#input-id").val()
    const game = $("#input-game").val()
    const year = $("#input-year").val()
    const genre = $("#input-genre").val()
    const multiplayer = $("#input-multiplayer").val()
    const offline = $("#input-offline").val()
    const crossplataform = $("#input-crossplataform").val()

    if (id === "" || game === "" || year === "" || genre === "" || multiplayer === "" || offline === "" || crossplataform === "" ) {

        $("#response").text("Todos os campos devem ser preenchidos")
    }

    else {
        callFetch(id, game, year, genre, multiplayer, offline, crossplataform)
        $("#input-id").val("")
        $("#input-game").val("")
        $("#input-year").val("")
        $("#input-genre").val("")
        $("#input-multiplayer").val("")
        $("#input-offline").val("")
        $("#input-crossplataform").val("")
    }
}

async function callFetch(id, game, year, genre, multiplayer, offline, crossplataform) {
    const options = {
        method: "POST",
        body: JSON.stringify({
            "id" : id,
            "game": game,
            "year": year,
            "genre": genre,
            "multiplayer": multiplayer === "yes" ? true : false,
            "offline": offline === "yes" ? true : false,
            "crossplataform": crossplataform === "yes" ? true : false
        }),
        headers: { 'Content-Type': 'application/json' }
    }

    await fetch("http://localhost:3001", options)
    .then( () => {
        $("#response").text("Cadastrado com sucesso")
    })
    .catch(err => console.log(err))

    showCatalog()
}