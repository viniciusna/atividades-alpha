function filterBySector(data, sector) {
    let datajson = JSON.parse(data).employees

    let sortedList = datajson.filter( employee =>
        employee.sector.toLowerCase() === sector
    )
    return { "employees": sortedList }
}

export default filterBySector