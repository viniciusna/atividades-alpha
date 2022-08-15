function filterByMonth(data, month) {
    let datajson = JSON.parse(data).employees

    let sortedList = datajson.filter( employee =>
        parseInt( employee.birthDate[3] + employee.birthDate[4] ) == month
    )

    return { "employees": sortedList }
}

export default filterByMonth