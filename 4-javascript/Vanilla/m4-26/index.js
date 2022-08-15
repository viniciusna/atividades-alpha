import express from 'express'
import EMPLOYEES_LIST from './modules/employeesList.js'
import filterByMonth from './modules/birthmonth.js'
import filterBySector from './modules/sector.js'

var app = express()

app.use(express.static('page'))

app.get('/month', (req, res) => {
    res.send(filterByMonth(req.query.month))
})

app.get('/sector', (req, res) => {
    res.send(filterBySector(req.query.sector))
})

app.get('/ramal', (req, res) => {
    res.send(EMPLOYEES_LIST)
})

app.listen(8080)