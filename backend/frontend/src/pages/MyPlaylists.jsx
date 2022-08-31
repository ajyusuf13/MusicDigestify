import styled from "styled-components";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useUser} from "../hook/User";
import SpotifyWebApi from "spotify-web-api-js";


const StyledDiv = styled.div`
    width: 100vw;
    display: block;
    margin-top: 40px;

`

const PlaylistDiv = styled.div`
    width: 90%;
    height: 90%;
    padding: 1%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    justify-content: space-between;
`

const PlaylistCard = styled.div`
    width: 140px;
    height: 220px;
    border-radius: 10px;
    background-color: rgb(30,42,62);
    border: 1px solid rgba(54, 69, 98, 0.98);
    
    overflow: hidden;
    overflow-y: scroll;
    
    text-align: left;
    align-content: center;
    justify-content: center;
    padding: 1%;
    margin: 10px;
    background: rgb(131,58,180);
    background: linear-gradient(342deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
    cursor: pointer;
    
    transition: all 0.2s ease;
    
    &:hover {
        transform: scale(1.10);
    
`

const StyledPlaylistInfo = styled.div`
    margin: auto;
    font-family: 'Karla', sans-serif;
    width: 140px;
    white-space: no-wrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    
`

const PlaylistName = styled.p`
    padding-top: 5px;
    padding-bottom: 0;
    margin-bottom: 4px;
    font-size: 14px;
    color: white;
font-family: 'Josefin Sans', sans-serif;
    font-weight: 600;
    
`

const PlaylistTracksNum = styled.p`
    font-size: 12px;
    font-family: 'Karla', sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    
`


const StyledLabel = styled.label`
    font-size: 32px;
    color: white;
font-family: 'Josefin Sans', sans-serif;
`

const StyledLabel2 = styled.label`
    font-size: 16px;
    padding: 5px 10px;
    font-family: 'Syne', sans-serif;
    font-weight: bold;
    color: #FFFFFF;
    display: block;
`



const MyPlaylists = () => {

    const {accessToken, spotifyId} = useUser();
    const navigate = useNavigate();
    const [myPlaylists, setMyPlaylists] = useState(null);

    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(accessToken);

    useEffect(() => {
        spotifyWebApi.getUserPlaylists({limit: 50})
            .then(response => {
                console.log(response);
                setMyPlaylists(response);
            })
            .catch(err => {console.log(err)})
    }, []);



    return (
        <StyledDiv className="PlaylistScreenContainer">
            {myPlaylists &&
                <React.Fragment>
                    <StyledLabel style={{paddingLeft: '20px'}}>{myPlaylists?.total} Playlists</StyledLabel>
                    <PlaylistDiv className="PlaylistDiv">
                        {myPlaylists.items?.map((playlist) => (
                            <PlaylistCard onClick={()=> navigate("/playlist/" + playlist.id)}>
                                <img style={{aspectRatio: '1',width: '100%', borderRadius: '10px'}} src={playlist.images[0].url}/>
                                <PlaylistName>{playlist.name}</PlaylistName>
                                <PlaylistTracksNum style={{margin: '0'}}>{playlist.tracks?.total} songs</PlaylistTracksNum>
                            </PlaylistCard>

                        ))}
                    </PlaylistDiv>
                </React.Fragment>
            }

        </StyledDiv>
    )
}


export default MyPlaylists;