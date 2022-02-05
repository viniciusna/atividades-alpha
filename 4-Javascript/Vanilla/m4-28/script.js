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

class Calculadora {

    setOperand1(_operand1){
        this.operand1 = _operand1
    }

    setOperand2(_operand2){
        this.operand2 = _operand2
    }

    setOperation(_operation){
        this.operation = _operation
    }

    getResult(){
        let result

        switch (this.operation) {
            case '+': result = this.operand1 + this.operand2;
                break;

            case '-': result = this.operand1 - this.operand2;
                break;

            case '*': result = this.operand1 * this.operand2;
                break;

            case '/': this.operand2 !== 0 ? result = this.operand1 / this.operand2: result = "Não pode dividir por 0";
                break;
        }

        return result
    }

    clearCalculator() {
        this.operand1 = 0
        this.operand2 = 0
    }
}

const operationButtons = getByName('operation-buttons')
let calculus = new Calculadora()

function digitInput(digit) {
    addWriteInTag("response", digit)
}

function operationInput(operation) {

    for (let i = 0; i < operationButtons.length; i++) {
        operationButtons[i].id == operation ? operationButtons[i].style.background = 'blue' :
        operationButtons[i].style.background = '#efefef';
    }

    let operand1 = getById("response").innerHTML

    if ( getById("response").innerHTML !== "") {
        writeInTag("containerNumberDigited", operand1)
        calculus.setOperand1(operand1)
        writeInTag("response", '')
    }

    if (getById("containerNumberDigited").innerHTML !== "") {
        calculus.setOperation(operation)
    }
}

function result() {
    const operand1 = parseFloat(getById("containerNumberDigited").innerHTML)
    const operand2 = parseFloat(getById("response").innerHTML)

    if (getById("containerNumberDigited").innerHTML !== '' && getById("response").innerHTML !== '') {
        calculus.setOperand1(operand1)
        calculus.setOperand2(operand2)

        getById("containerNumberDigited").innerHTML = ''
        getById("response").innerHTML = calculus.getResult()
        getById(calculus.operation).style.background = '#efefef'

        calculus.clearCalculator()
    }
}

function del() {
    getById("containerNumberDigited").innerHTML = ''
    getById("response").innerHTML = ''

    calculus.clearCalculator()
}