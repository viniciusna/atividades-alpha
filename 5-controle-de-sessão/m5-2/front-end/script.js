function requisition() {
    const promise = new Promise((resolve, reject) => {
        console.log('Entrou na promise')
        $.ajax({
            url : 'http://localhost:8080'
        })
        .done( data => {
            $("#requisition-time").text(`Tempo de request: ${data} ms`)
            parseInt(data) <= 3000 ? resolve("Promisse resolvida") : reject("Promisse rejeitada")
        })
    })

    console.log('Executou a promise')

    promise
    .then( value => {
        console.log('Rodou o "then" da promisse')
        $("#response").text(value)
    })
    .catch( err => {
        console.log('Rodou o "catch" da promisse')
        $("#response").text(err)
    })

    console.log('Final da função')
}