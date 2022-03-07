function tryLogin() {
    const nameInput = $("#name").val()
    const pwInput = $("#password").val()

    if ( nameInput != '' && pwInput != '' ) {
        $.ajax({
            method: 'POST',
            url : 'http://localhost:8080',
            data: { name: nameInput, pw: pwInput },
        })
        .done( data => {
            if (data.hasOwnProperty("id")) {
                userLoged(data)
                mountPage()
            } else {
                $("#response").text("Usuário não existe ou senha incorreta")
            }
        })
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
    const id = $("#input-hidden").val()

    $.ajax({
        method: 'POST',
        url : 'http://localhost:8080/name',
        data: { id: id },
    })
    .done(data => $("#show-name").text(data))
}

function myPw() {
    const id = $("#input-hidden").val()

    $.ajax({
        method: 'POST',
        url : 'http://localhost:8080/pw',
        data: { id: id },
    })
    .done(data => $("#show-pw").text(data))
}