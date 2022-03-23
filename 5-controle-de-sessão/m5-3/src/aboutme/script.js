async function requisition() {
    $("#response").html("")
    $("#container-images").html("")

    let nameToSearch
    const inputId = $("input").val()

    if ( inputId === '' ) {
        return $("#response").text("Insira uma ID")
    }

    console.log("Começa a primeira requisição")

    await fetch(`https://rickandmortyapi.com/api/character/${inputId}`)
    .then(response => response.json())
    .then( data => {
        nameToSearch = data.name
        $("#response").text(nameToSearch)
    })
    .catch(err => console.log(err))

    console.log("Terminou a primeira requisição")

    try {
        nameToSearch = nameToSearch.replace(" ", "%20")

        console.log("Começa a segunda requisição")

        fetch(`https://rickandmortyapi.com/api/character/?name=${nameToSearch}`)
        .then( response => response.json())
        .then( data => {
            data.results.forEach(el => {
                $("#container-images").append(`<img src="${el.image}" alt="">`)
            });
        })
        .catch(err => console.error(err))

        console.log("Terminou a segunda requisição")

    } catch {
        $("#response").text("ID não existe")
    }

}