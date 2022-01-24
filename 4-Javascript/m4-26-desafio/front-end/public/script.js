function getById(id) {
  return document.getElementById(id)
}

const select = document.querySelector('select')

function displayOptions() {

  if ( select.value === 'month' ) {
    getById('display-options').innerHTML = '<input id="input-month" type="number">'
    getById('search-button').innerHTML = 'Buscar'
  }

  else if ( select.value === 'sector') {
    getById('display-options').innerHTML = `<select id='sector-select' name="sector-options">
    <option value="ti">TI</option>
    <option value="marketing">Marketing</option>
    <option value="administração">Administração</option>
    <option value="vendas">Vendas</option>
    <option value="segurança">Segurança</option>
    <option value="contabilidade">Contabilidade</option>
  </select>`;

  getById('search-button').innerHTML = 'Buscar'
  }

  else if (select.value === 'register') {
    getById('display-options').innerHTML = `<div id='register-container'> 
    <div> <label for="register-name">Name</label> <input id="register-name" type="text"> </div>
    <div> <label for="register-ramal">Ramal</label> <input id="register-ramal" type="text"> </div>
    <div> <label for="register-email">Email</label> <input id="register-email" type="text"> </div>
    <div> <label for="register-sector">Setor</label> <input id="register-sector" type="text"> </div>
    <div> <label for="register-date">Data de nascimento</label> <input id="register-date" type="text"> </div> </div>`
    getById('search-button').innerHTML = 'Cadastrar'
  }

  else {
    getById('display-options').innerHTML = ''
    getById('search-button').innerHTML = 'Listar ramais'
  }
}

function mountTable(data) {
  let toColor = false
  let sortedList = data.employees.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  getById('table').innerHTML = "<tr> <th>Registro</th> <th>Nome</th> <th>Ramal</th> <th>Email</th> <th>Setor</th> <th> Data de nascimento </th> </tr>"

  sortedList.forEach( obj => {getById('table').innerHTML += `<tr style='background: ${toColor ? '#cbcbcb': 'none'};' > <td>${obj.registrationNumber}</td> <td>${obj.name}</td> <td>${obj.ramal}</td> <td>${obj.email}</td> <td>${obj.sector}</td> <td>${obj.birthDate}</td> </tr>`;
  toColor = !toColor
  })
}

function callFetch() {
  getById('response').innerHTML = ''
  getById('table').innerHTML = ''
  const URL = 'http://localhost:3000'

  if (  select.value === 'month'  ) {
    let input = parseInt( getById('input-month').value )

    if ( 0 < input && input < 13 ) {
    fetch(URL + '/month?month=' + getById('input-month').value)
    .then( response => response.json() )
    .then( data => mountTable(data))
    .catch( error => console.log(error) )
    }

    else {
      getById('response').innerHTML = "Insira um número de mês válido (de 1 a 12)"
    }
  }

  else if ( select.value === 'sector') {
    fetch(URL + '/sector?sector=' + getById('sector-select').value)
    .then( response => response.json() )
    .then( data => mountTable(data))
    .catch( error => console.log(error) )
  }

  else if ( select.value === 'ramal') {
    fetch( URL + '/ramal' )
    .then( response => response.json() )
    .then( data => mountTable(data))
    .catch( error => console.log(error) )
  }

  else {
    const name = document.getElementById("register-name").value
    const ramal = document.getElementById("register-ramal").value
    const email = document.getElementById("register-email").value
    const sector = document.getElementById("register-sector").value
    const birthDate = document.getElementById("register-date").value
    const options = {
      method: 'POST',
      body: JSON.stringify({ name, ramal, email, sector, birthDate}),
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(URL + '/register', options)
    .then( response => response.text())
    .then( data => {
      console.log(data);
      getById('response').innerHTML = 'Novo funcionário cadastrado'
    })
    .catch( err => console.log(err))
  }
}
