import React from 'react'

import logo from '../logo.png';
import styled from "styled-components";

function Header() {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    )
}

const BigHeader = styled(Header)`
    
    height: 50vh;
  width: 100vw;
    
`

export default BigHeader
