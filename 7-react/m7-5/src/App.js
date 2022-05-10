import styled, {css} from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

function App() {
  return (
    <div>
      <Button>Botão normal</Button>
      <Button primary>Botão primário</Button>
    </div>
  )
}

export default App;
