import React, { createContext, useState, useContext } from "react";

const localStorage = require("local-storage");

const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [accessToken, accessTokenSetter] = useState(localStorage.get("access_token"));
    const [refreshToken, refreshTokenSetter] = useState(localStorage.get("refresh_token"));
    const [spotifyId, spotifyIdSetter] = useState(localStorage.get("spotify_id"));


    const setSpotifyId = (spotifyId) => {
        spotifyIdSetter(spotifyId);
        localStorage.set("spotify_id", spotifyId)
    }

    const setAccessToken = (accessToken) => {
        accessTokenSetter(accessToken);
        localStorage.set("access_token", accessToken)
    }

    const setRefreshToken = (refreshToken) => {
        refreshTokenSetter(refreshToken);
        localStorage.set("refresh_token", refreshToken)
    }

    const value = {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        spotifyId, setSpotifyId
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
}
