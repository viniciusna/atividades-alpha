function getById(id) {
    return document.getElementById(id)
}

// function getByName(yourClass) {
//     return document.getElementsByClassName(yourClass)
// }

// function getByName(name) {
//     return document.getElementsByName(name)
// }

function getValueInput(id) {
    return getById(id).value
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

function addWriteInTag(id, content) {
    getById(id).innerHTML += content
}

const clients = []

function addOfClient() {
    clients.push( { name : getValueInput("input-name"),
                    purchase : parseFloat( getValueInput("input-purchase") ),
                    date : getValueInput("due-date")
                })

    addWriteInTag("list", `<tr> <td>${getValueInput("input-name")}</td>
        <td> R$ ${parseFloat( getValueInput("input-purchase") ).toFixed(2)}</td>
        <td>${getValueInput("due-date")}</td> </tr>`)

        getById("input-name").value = ''
        getById("due-date").value = ''
        getById("input-purchase").value = ''
}

function feesCalculus() {
    writeInTag("fees", "<tr> <th> Juros </th> <th> Total </th> </tr>")

    clients.map( function f(client) {
        let venc = (new Date(client.date)).getTime()
        let today = (new Date()).getTime()
        let gap = Math.floor( (today - venc)/(1000*3600*24) )

        if ( gap <= 0 ) {
            addWriteInTag("fees", `<tr> <td> R$ ${ (0).toFixed(2)} </td>
            <td> R$ ${ (client.purchase).toFixed(2)} </td> </tr>`)
        }
        else {
            let fees = client.purchase*(0.02 + gap*0.001)
            addWriteInTag("fees", `<tr> <td>R$ ${fees.toFixed(2)} </td>
                <td>R$ ${ (client.purchase + fees).toFixed(2)} </td> </tr>`)
        }
    })
}
