class calculus {
    Account() {
        let result

        switch (this.operation) {
            case "sum": result = this.operand1 + this.operand2;
            break;

            case "sub": result = this.operand1 - this.operand2;
            break;

            case "mult": result = this.operand1 * this.operand2;
            break;

            case "division": result = this.operand1 / this.operand2;
            break;
        }
        return result
    }
}
let resulting = new calculus()

function digitInput(id) {
    $("#response").append(id)
}

function defineOperation(operation) {
    resulting.operation = operation
}

function switchColorButton(id) {
    $(".operation-buttons").css("background", "#EFEFEF")
    $(`#${id}`).css("background", "red")
    defineOperation(id)

}

function verifyTerms() {
    if ( $("#response").text() !== '' && $("#containerNumberDigited").text() === '' ) {
            $("#containerNumberDigited").html($("#response").text())
            $("#response").html("")
    }
}

function operationInput(operation) {
    switch (operation) {
        case 'sum': switchColorButton("sum");
        break;

        case 'sub': switchColorButton("sub");
        break;

        case 'mult': switchColorButton("mult");
        break;

        case 'division': switchColorButton("division");
        break;
    }

    verifyTerms()
}

function makeAccount() {
    resulting.operand1 = parseFloat( $("#containerNumberDigited").text() )
    resulting.operand2 = parseFloat( $("#response").text() )

    const finalResult = resulting.Account()

    $("#response").html(finalResult)
    $("#containerNumberDigited").html('')
    switchColorButton(null)
}

function del() {
    let number = $('#response').text()

    $('#response').html( number.slice(0, number.length - 1) )
}

function delAll() {
    $("#response").html('')
    $("#containerNumberDigited").html('')
}