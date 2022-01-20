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

  else {
    getById('display-options').innerHTML = ''
    getById('search-button').innerHTML = 'Listar ramais'
  }
}

function mountTable(data) {
  let toColor = false
  getById('table').innerHTML = "<tr> <th>Registro</th> <th>Nome</th> <th>Ramal</th> <th>Email</th> <th>Setor</th> <th> Data de nascimento </th> </tr>"

  data.forEach( obj => {getById('table').innerHTML += `<tr style='background: ${toColor ? '#cbcbcb': 'none'};' > <td>${obj.registrationNumber}</td> <td>${obj.name}</td> <td>${obj.ramal}</td> <td>${obj.email}</td> <td>${obj.sector}</td> <td>${obj.birthDate}</td> </tr>`;
  toColor = !toColor
  })
}

function callFetch() {
  getById('response').innerHTML = ''
  getById('table').innerHTML = ''

  if (  select.value === 'month'  ) {
    let input = parseInt( getById('input-month').value )

    if ( 0 < input && input < 13 ) {
    fetch('/month?month=' + getById('input-month').value)
    .then( response => response.json() )
    .then( data => mountTable(data))
    .catch( error => console.log(error) )
    }

    else {
      getById('response').innerHTML = "Insira um número de mês válido (de 1 a 12)"
    }
  }

  else if ( select.value === 'sector') {
    fetch('/sector?sector=' + getById('sector-select').value)
    .then( response => response.json() )
    .then( data => mountTable(data))
    .catch( error => console.log(error) )
  }

  else {
    fetch( '/ramal' )
    .then( response => response.json() )
    .then( data => mountTable(data))
    .catch( error => console.log(error) )
  }
}
