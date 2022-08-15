function register(data, newRegister) {
    let datajson = JSON.parse(data).employees
    newRegister.registrationNumber = datajson.length + 1
    datajson.push(newRegister)

    return {"employees":datajson}
}

export default register