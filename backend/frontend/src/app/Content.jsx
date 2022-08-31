import React from "react";
import {Route, Routes} from "react-router-dom";
import styled from "styled-components";

import Login from "../pages/Login";
import Home from "../pages/Home";
import MusicEntry from "../pages/MusicEntry";
import Search from "../pages/Search";
import History from "../pages/History";
import Artist from "../pages/Artist";
import Album from "../pages/Album";
import MyPlaylist from "../pages/MyPlaylists";
import Playlist from "../pages/Playlist";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: #191414;
`

const Content = () => {
    return (
        <StyledDiv>
            <Routes>
                <Route path="" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/musicEntry/:id" element={<MusicEntry/>}/>
                <Route path="/artist/:id" element={<Artist/>}/>
                <Route path="/album/:id" element={<Album/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/history" element={<History/>}/>
                <Route path="/playlist/:id" element={<Playlist/>}/>
                <Route path="/myPlaylists" element={<MyPlaylist/>}/>
            </Routes>
        </StyledDiv>
    );
}

export default Content;