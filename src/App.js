import styled from "styled-components";
import './index.css'

const Wrapper = styled.div`
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color) !important;
  border-radius: 10px;
  margin: 5px 0;
  padding: 20px;
  box-sizing: border-box;
`

function App() {
  return (
    <Wrapper className="App">
      Text
    </Wrapper>
  );
}

export default App;
