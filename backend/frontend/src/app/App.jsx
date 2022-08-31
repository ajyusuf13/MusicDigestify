import React, {useState, useEffect} from "react";
import Content from './Content'
import NavBar from './NavBar';
import {UserProvider} from "../hook/User";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const App = () => {
    return (
        <UserProvider>
            <StyledDiv>
                <NavBar/>
                <Content/>

            </StyledDiv>

        </UserProvider>
    )
}
export default App;