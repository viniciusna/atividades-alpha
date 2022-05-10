import './styles.css'

function Composition(props) {

  return (
    <h1 id="comp-id">
      {props.children}
    </h1>
  )
}

function HocComponent(comp) {
  return (
    <div className="hoc-div">
      {comp}
    </div>
  )
}

function App() {
  return (
    <div>
      {HocComponent(Composition({children: "Tag 'Composition' dentro do 'HocComponent'"}))}
      {HocComponent(<h2>Tag h2 direto no argumento de 'HocComponent'</h2>)}
      <Composition>
        Children de 'Composition'
      </Composition>
      <Composition>
        {HocComponent(<>Span no argumento do 'HocComponent' e dentro da tag 'Composition'</>)}
      </Composition>
    </div>
  )
}

export default App;
