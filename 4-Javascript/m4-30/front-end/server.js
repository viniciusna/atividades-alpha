const express = require('express');
const app = express();
const port = 8080;


app.use('/funcionarios',express.static('public/employees'));

app.use('/calculadora',express.static('public/calculator'));

app.listen(port, () => console.log(`Listening on port ${port}!`));