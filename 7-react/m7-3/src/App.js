function NumList() {
  let array = [1, 2, 3, 4, 5]
  const mapList = array.map( (num) =>
    <li>número {num}</li>
  )

  return (
    <ul>{mapList}</ul>
  )
}

function EvenessList() {
  let array = [1, 2, 3, 4, 5]
  const mapList = array.map( (num) =>{
    if ( num%2 === 0){
      return <li>número {num} é par</li>
    } else {
      return <li>número {num} é ímpar</li>
    }
  })

  return (
    <ul>{mapList}</ul>
  )
}

function App() {
 return (
   <div>
     <NumList />
     <EvenessList />
   </div>
 )
}

export default App;