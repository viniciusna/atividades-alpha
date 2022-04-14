url = "http://localhost"

function tryLogin() {
    const username = $("#username").val()
    const pw = $("#pw").val()

    if (username == '' || pw == '') {
        $("#response").text("Preencha todos os campos!")
    } else{

        const options = {
            method: "POST",
            body: JSON.stringify({username: username, pw: pw}),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }

        fetch(url + "/login", options)
        .then( data => {
            if ( data.status === 401 ) {
                $("#response").text("Usuário ou senha inválidos")
            } else if ( data.status === 200) {
                secondFetch()
            }
        })
        .catch(err => {
            console.log(err)
            $("#response").text("Houve algum erro")
        })
    }
}

async function secondFetch() {
    const options = {
        method: "POST",
        body: JSON.stringify({username: username, pw: pw}),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }

    await fetch(url + ":8080", options)
    .then( response => response.text())
    .then( data => {
        $("body").html(data)
    })
    .catch(err => console.log(err))
}

function events() {
    fetch(url + ":8080/events")
    .then( response => response.json())
    .then( data => {
        mountTable(data)
    })
    .catch( err => console.log(err))
}

function userEvents() {
    const options = {
        method: "GET",
        credentials: 'include'
    }

    fetch(url + ":8080/myevents", options)
    .then( response => response.json())
    .then( data => {
        console.log(data)
        mountTableQrcode(data)
    })
    .catch( err => console.log(err))
}

function mountTable(data) {
    data.forEach( event => {
        $("#response").append(`<h3>${event.title}</h3> <div>
            <table>
            <tr>
                <th>Data</th>
                <th>Hora</th>
            </tr>
            <tr>
                <td>${event.date}</td>
                <td>${event.time}</td>
            </tr>
            </table>
            <div>${event.description}</div>
        </div>`)
    })

    $("#response").accordion()
}

function mountTableQrcode(data) {
    data.forEach( (event, index) => {
        $("#response").append(`<h3>${event.title}</h3> <div>
            <table>
            <tr>
                <th>Data</th>
                <th>Hora</th>
            </tr>
            <tr>
                <td>${event.date}</td>
                <td>${event.time}</td>
            </tr>
            </table>
            <div>${event.description}</div>
            <div id="qrcode${index}"></div>
        </div>`)

        renderQrcode(`qrcode${index}`, event.qrcode)
    })

    $("#response").accordion()
}

function renderQrcode(elementId, string) {
    let typeNumber = 0;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(string);
    qr.make();
    document.getElementById(`${elementId}`).innerHTML = qr.createImgTag();
}
