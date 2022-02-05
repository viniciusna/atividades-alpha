function getById(id) {
    return document.getElementById(id)
}

function getByName(yourClass) {
    return document.getElementsByClassName(yourClass)
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

function addWriteInTag(id, content) {
    getById(id).innerHTML += content
}

const operationButtons = getByName('operation-buttons')
let parameters = {}

function digitInput(digit) {
    addWriteInTag("response", digit)
}

function operationInput(operation) {

    for (let i = 0; i < operationButtons.length; i++) {
        operationButtons[i].id == operation ? operationButtons[i].style.background = 'blue' :
        operationButtons[i].style.background = '#efefef';
    }

    let firstOperand = getById("response").innerHTML

    if ( firstOperand !== "") {
        writeInTag("containerNumberDigited", firstOperand)
        writeInTag("response", '')
    }

    if (getById("containerNumberDigited").innerHTML !== "") {
        parameters.operation = operation
    }
}

function result() {
    const operand1 = parseFloat(getById("containerNumberDigited").innerHTML)
    const operand2 = parseFloat(getById("response").innerHTML)

    if (getById("containerNumberDigited").innerHTML !== '' && getById("response").innerHTML !== '') {
        parameters.operand1 = operand1
        parameters.operand2 = operand2

        const options = {
            method: "PUT",
            body: JSON.stringify(parameters),
            headers: { 'Content-Type': 'application/json' }
        }

        fetch('http://localhost:3000/calculadora', options)
        .then( response => response.json())
        .then( data => {
            getById("response").innerHTML = data
        })
        .catch( error => console.log(error))

        getById("containerNumberDigited").innerHTML = ''
        getById(parameters.operation).style.background = '#efefef'
        parameters = {}
    }
}

function del() {
    getById("containerNumberDigited").innerHTML = ''
    getById("response").innerHTML = ''

    parameters = {}
}