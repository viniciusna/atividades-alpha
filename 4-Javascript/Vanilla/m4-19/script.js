function getById(id) {
    return document.getElementById(id)
}

function getValueInput(id) {
    return getById(id).value
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

function addWriteInTag(id, content) {
    getById(id).innerHTML += content
}

let clients = []

function addOfClient() {
    clients.push( { name : getValueInput("input-name"),
                    purchase : parseFloat( getValueInput("input-purchase") ),
                    date : getValueInput("due-date")
                })

    writeInTag("list", "<tr> <th>Nome</th> <th>Compra</th> <th>Data de vencimento</th> <th>Juros</th> <th>Total</th> </tr>")

    getById("input-name").value = ''
    getById("due-date").value = ''
    getById("input-purchase").value = ''

    clients.map( function f(client) {
        let venc = (new Date(client.date)).getTime()
        let today = (new Date()).getTime()
        let gap = Math.floor( (today - venc)/(1000*3600*24) )

        if ( gap <= 0 ) {
            client.fees = 0
            client.total = client.purchase
        }

        else {
            let fees = client.purchase*(0.02 + gap*0.001)
            client.fees = fees
            client.total = client.purchase + fees
        }
    })

    clients.forEach(element => {
        addWriteInTag("list", `<tr> <td>${element.name}</td>
                <td> R$ ${parseFloat( element.purchase ).toFixed(2)}</td>
                <td>${ element.date }</td> <td> R$ ${ (element.fees).toFixed(2)} </td>
                <td> R$ ${ (element.total).toFixed(2)} </td> </tr>`)
    });
}

function sortByClient() {
    let clientsSortedByClients = []
    clients.forEach( (element) => {

        clientsSortedByClients.push( element )

        for ( let i = 1 + clients.indexOf( element ); i < clients.length; i++ ) {
            if ( clients[i].name == element.name ) {
                clientsSortedByClients.push( clients[i] )
            }
        }
    })

    clients = clientsSortedByClients.filter( (element, i) => {
        return clientsSortedByClients.indexOf( element ) === i;
    })

    writeInTag("list", "<tr> <th>Nome</th> <th>Compra</th> <th>Data de vencimento</th> <th>Juros</th> <th>Total</th> </tr>")

    clients.forEach(element => {
        addWriteInTag("list", `<tr> <td>${element.name}</td>
                <td> R$ ${parseFloat( element.purchase ).toFixed(2)}</td>
                <td>${ element.date }</td> <td> R$ ${ (element.fees).toFixed(2)} </td>
                <td> R$ ${ (element.total).toFixed(2)} </td> </tr>`)
    });
}

function sortByDate() {
    let clientsSortedByDate = []
    clients.forEach( (element) => {

        clientsSortedByDate.push( element )

        for ( let i = 1 + clients.indexOf( element ); i < clients.length; i++ ) {
            if ( clients[i].date == element.date ) {
                clientsSortedByDate.push( clients[i] )
            }
        }
    })

    clients = clientsSortedByDate.filter( (element, i) => {
        return clientsSortedByDate.indexOf( element ) === i;
    })

    writeInTag("list", "<tr> <th>Nome</th> <th>Compra</th> <th>Data de vencimento</th> <th>Juros</th> <th>Total</th> </tr>")

    clients.forEach(element => {
        addWriteInTag("list", `<tr> <td>${element.name}</td>
                <td> R$ ${parseFloat( element.purchase ).toFixed(2)}</td>
                <td>${ element.date }</td> <td> R$ ${ (element.fees).toFixed(2)} </td>
                <td> R$ ${ (element.total).toFixed(2)} </td> </tr>`)
    });
}


function totalbyClient() {
    writeInTag("table-clients-and-date", "<tr> <th> Nome </th> <th> Total </th> </tr>")

    let copieClients = clients.slice()
    let selectedAlready = []

    copieClients.forEach( element => {

        let arrayClient = [element]
        let ancilla = true

        for ( let i = 0; i < selectedAlready.length; i++) {
            if ( selectedAlready[i] == element.name ) {
                ancilla = false
            }
        }

        if (ancilla) {
            for ( let i = 1 + copieClients.indexOf( element ); i < clients.length; i++ ) {
                if ( clients[i].name == element.name ) {
                    arrayClient.push( copieClients[i] )
                }
            }

            selectedAlready.push(element.name)

            let totalClient = arrayClient.reduce( (sum, element) =>
            sum + element.total, 0)

            addWriteInTag("table-clients-and-date", ` <tr> <td> ${element.name} </td>
                <td>R$ ${ (totalClient).toFixed(2) } </td> </tr> `)
        }
    })
}

function totalByDate() {
    writeInTag("table-clients-and-date", "<tr> <th> Data de vencimento </th> <th> Total </th> </tr>")

    let copieClients = clients.slice()
    let selectedAlready = []

    copieClients.forEach( element => {

        let arrayClient = [element]
        let ancilla = true

        for ( let i = 0; i < selectedAlready.length; i++) {
            if ( selectedAlready[i] == element.date ) {
                ancilla = false
            }
        }

        if (ancilla) {
            for ( let i = 1 + copieClients.indexOf( element ); i < clients.length; i++ ) {
                if ( clients[i].date == element.date ) {
                    arrayClient.push( copieClients[i] )
                }
            }

            selectedAlready.push(element.date)

            let totalDate = arrayClient.reduce( (sum, element) =>
            sum + element.total, 0)

            addWriteInTag("table-clients-and-date", ` <tr> <td> ${element.date} </td>
                <td>R$ ${ (totalDate).toFixed(2) } </td> </tr> `)
        }
    })
}