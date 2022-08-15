import EMPLOYEES_LIST from './employeesList.js'

function filterByMonth(month) {
    let sortedList = EMPLOYEES_LIST.filter( employee =>
        parseInt( employee.birthDate[3] + employee.birthDate[4] ) == month
    )
    return sortedList
}

export default filterByMonth