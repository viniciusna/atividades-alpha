function registerUser(){
    let inputName = $("#name").val()
    let inputUsername = $("#username").val()
    let inputPw = $("#pw").val()

    if (inputName == '' || inputUsername == '' || inputPw == '') {
        $("#response-user").text('Preencha todos os campos!')
    } else {

        //fetch
        console.log(inputName, inputUsername, inputPw)
    }
}

function registerEvent(){
    const inputTitle = $("#title").val()
    const inputDescription = $("#description").val()
    const inputDate = $("#date").val()
    const inputHour = $("#hour").val()

    if (inputTitle == '' || inputDescription == '' || inputDate == '' || inputHour == '') {
        $("#response-event").text('Preencha todos os campos!')
    } else {
        console.log(inputTitle, inputDescription, inputDate, inputHour)
    }
}