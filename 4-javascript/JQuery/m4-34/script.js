function callMapsApi(lat, lng) {
    $("#container-maps").html(`
        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d528.5467790691869!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbr!4v1644446601650!5m2!1sen!2sbr" width="533" height="400" style="border:0;" allowfullscreen=""></iframe>
    `)
}

function treatsCepApiResponse(data) {

    if (data.status === 404) {
        $("#response").text(`${data.responseJSON.message}`)
    } else {
        $("#response").text(`
            ${data.address}, ${data.district}, ${data.city}, ${data.state}
        `)

        callMapsApi(data.lat, data.lng)
    }
}

function callCepApi() {
    $("#response").text("")
    $("#container-maps").text("")

    let inputCEP = $("#input-cep").val()

    if ( inputCEP.length === 8 ) {
        $.ajax({
            url: `https://cep.awesomeapi.com.br/${inputCEP}`
        })
        .done( (data) => treatsCepApiResponse(data))
        .fail( (data) => treatsCepApiResponse(data))
    } else {
        $("#response").text("O CEP deve conter 8 dígitos")
    }
}