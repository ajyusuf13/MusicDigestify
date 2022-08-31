import styled from "styled-components";
import {useEffect, useState} from "react";
import axios, {Axios} from "axios";
import {useUser} from "../hook/User";
import {useNavigate} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import img from "../pages/Spotify_Logo.png";

import {db} from "../firebase/config";


const StyledDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`

const StyledButton = styled.button`
    width: 30%;
    border-radius: 2rem;
    padding: 20px 20px;
    background: linear-gradient(90deg, rgba(107,207,46,1) 1%, rgba(223,217,52,1) 42%, rgba(166,238,58,1) 85%);
    color: #000000;
    font-size: 22px;
    font-family: 'Josefin Sans', sans-serif;
    cursor: pointer;
    border: 2px solid #000000;
    transition: all 0.2s ease;

    
    &:hover {
        transform: scale(1.05);
        background: linear-gradient(342deg, rgba(180,58,141,1) 18%, rgba(48,110,236,1) 52%, rgba(90,199,245,1) 79%);

    }
    
`

const Login = () => {

    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        spotifyId, setSpotifyId
    } = useUser();

    const navigate = useNavigate();

    const spotifyWebApi = new SpotifyWebApi();

    const getAuthToken = () => {
        // const LOGIN_URI = process.env.NODE_ENV !== 'production'
        //     ? 'http://localhost:8887/login'
        //     : 'https://music-digestify.herokuapp.com';
        // window.location = LOGIN_URI;
        window.location = 'https://music-digestify.herokuapp.com/login';

    }


    useEffect(() => {
        if (window.location.search) {
            const getAccessToken = new URLSearchParams(window.location.search);
            const access = getAccessToken.get("access_token");
            if (access) {
                setAccessToken(access);
                spotifyWebApi.setAccessToken(accessToken);
                spotifyWebApi.getMe()
                    .then(response => {
                        setSpotifyId(response.uri);
                        db.collection("userData").doc(spotifyId).set({userId : spotifyId}, {merge: true})
                        db.collection("userData").doc(spotifyId).get()
                            .then(
                            docSnap => {
                                console.log(docSnap.get("userId"));
                            })
                            .catch(err => {console.log(err)})
                    })
                    .catch(err => {console.log(err)})
                navigate("/home");
            }
        }
    })

    return (
        <StyledDiv>
            <img width='300' height='100' style={{marginBottom: '20px'}} src={img}/>
            <StyledButton onClick={getAuthToken}>Login With Spotify</StyledButton>
        </StyledDiv>
    )
}

export default Login;