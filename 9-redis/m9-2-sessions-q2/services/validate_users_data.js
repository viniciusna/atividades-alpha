const search = require('./pg')

function dataIsValid(user, password) {
    if (typeof user == "string" && typeof password == "string") {
        return (user.length > 4 && password.length > 7)
    } else {
        return false
    }
}

async function responseUser(user, password) {
    if (dataIsValid(user, password)) {
        const pgResponse = await search.searchUser(user, password)
        return pgResponse.length > 0 ? pgResponse[0] : {message: "User or password wrong"}
    } else {
        return {message: "Invalid data, user must to have more than 4 characters and password more than 8"}
    }
}

module.exports = {
    responseUser: responseUser,
    dataIsValid: dataIsValid
}