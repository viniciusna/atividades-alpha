import EMPLOYEES_LIST from './employeesList.js'

function filterBySector(sector) {
    let sortedList = EMPLOYEES_LIST.filter( employee =>
        employee.sector.toLowerCase() === sector
    )
    return sortedList
}

export default filterBySector