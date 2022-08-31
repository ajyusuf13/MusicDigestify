import styled from "styled-components";
import React from "react";
import {NavLink} from 'react-router-dom';

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  height: 40px;
  width: 100%;
  padding: 5px;
  background-color: #1DB954;
  align-items: center;
  z-index: 500;
  position: sticky;
  top: 0;
`
const StyledNavLink = styled(NavLink)`
  padding: 10px;
  font-size: 22px;
  color: #FFFFFF;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif; 
`


const NavBar = () => {
    return (
        <StyledNav>
            <StyledNavLink to="/home">
                Home
            </StyledNavLink>
            <StyledNavLink to="/search">
                Search
            </StyledNavLink>
            <StyledNavLink to="/myPlaylists">
                MyPlaylists
            </StyledNavLink>
            <StyledNavLink to="/history">
                History
            </StyledNavLink>
            <StyledNavLink to="">
                Login
            </StyledNavLink>

        </StyledNav>

    );
}

export default NavBar;