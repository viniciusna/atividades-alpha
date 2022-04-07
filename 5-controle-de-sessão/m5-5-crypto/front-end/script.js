function tryLogin() {
    const nameInput = $("#name").val()
    const pwInput = $("#password").val()

    if ( nameInput != '' && pwInput != '' ) {

        const body = {
            name: nameInput,
            pw: pwInput
        }

        const options = {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }

        fetch("http://localhost:8080", options)
        .then(() => {
            mountPage()
        })
        .catch( err => console.log(err))
    }
}

function userLoged(data) {
    $("#input-hidden").val(data.id)
}

function mountPage() {
    $("main").html(`<div class="container">
    <button onclick="myName()">Meu nome</button>
    <div class="displays" id="show-name"></div>
</div>

<div class="container">
    <button onclick="myPw()">Minha senha</button>
    <div class="displays" id="show-pw"></div>
</div>`)
}

function myName() {
    const options = {
        method: 'POST',
        credentials: 'include'
    }

    fetch("http://localhost:8080/name", options)
    .then( response => {
        console.log(response)
        return response.text()
    })
    .then( data => $("#show-name").text(data))
    .catch( err => console.log(err))
}

function myPw() {
    const options = {
        method: 'POST',
        credentials: 'include'
    }

    fetch("http://localhost:8080/pw", options)
    .then( response => response.text() )
    .then( data => $("#show-pw").text(data))
    .catch( err => console.log(err))
}