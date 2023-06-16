import styled from "styled-components";
import './index.css'
import {Component} from "react";
import MainButtonDemo from "./components/MainButtonDemo";

const Wrapper = styled.div`
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color) !important;
  border-radius: 10px;
  margin: 5px 0;
  padding: 20px;
  box-sizing: border-box;
`

class App extends Component {

    render() {

        return (
            <Wrapper>
                <MainButtonDemo/>
            </Wrapper>
        );
    }
}

export default App;
