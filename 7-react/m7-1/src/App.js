import './App.css';

function App() {
  return (
    <div id="App">
        <div id="visor"></div>
        <div id="container-rows">
            <RowForButtons row={[1,2,3]} op="+"/>
            <RowForButtons row={[4,5,6]} op="-" />
            <RowForButtons row={[7,8,9]} op="*" />
            <LastRow op1="=" op2="/" dot="." />
        </div>
    </div>
  );
}

function ButtonNumbers(props) {
    return (
        <button className="number-buttons" id={`button${props.number}`}>{props.number}</button>
    )
}

function ButtonOperators(props) {
    return (
        <button className="op-buttons" id={`button${props.op}`}>{props.op}</button>
    )
}

function RowForButtons(props) {
    return (
        <div className="rows">
            <ButtonNumbers number={props.row[0]} />
            <ButtonNumbers number={props.row[1]} />
            <ButtonNumbers number={props.row[2]} />
            <ButtonOperators op={props.op} />
        </div>
    )
}

function LastRow(props) {
    return (
        <div className="rows">
            <ButtonOperators op={props.op1} />
            <ButtonNumbers number="0" />
            <ButtonOperators op={props.dot} />
            <ButtonOperators op={props.op2} />
        </div>
    )
}

export default App