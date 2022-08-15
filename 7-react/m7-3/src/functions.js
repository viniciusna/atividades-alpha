async function makeFetch() {
  const input = document.getElementById("user-input").value

  if (input === "" || parseInt(input) < 1) {
    return null
  }

  const response = await fetch(`https://rickandmortyapi.com/api/episode/${input}`)
  const data = await response.json();

  let charactersUrl = data.characters

  returnList(charactersUrl)
}

function returnList(list) {
  console.log(list)
}

export {makeFetch}