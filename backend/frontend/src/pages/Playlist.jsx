import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../hook/User";
import {useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styled from "styled-components";
import React from "react";

const StyledDiv = styled.div`
    width: 100vw;
    display: block;
    margin-top: 40px;

`

const PlaylistInfoDiv = styled.div`
    display: flex;
    float: left;
    align-items: center;
    width: 100vw;
    margin-top: 0px;
    margin-left: 20px;

`

const PlaylistInfoPic = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0px 10px;
`


const PlaylistInfoNameEtc = styled.div`
    display: block;
    text-align: left;
    justify-content: center;
    align-content: center;
`

const TracksDiv = styled.div`
    width: 90%;
    height: 90%;
    padding: 2%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    justify-content: space-between;  
`

const SongCard = styled.div`
    width: 120px;
    height: 140px;
    border-radius: 10px;
    border: 1px solid rgba(54, 69, 98, 0.98);
    overflow: hidden;
    overflow-y: scroll;
    text-align: center;
    align-content: center;
    justify-content: center;
    padding: 1%;
    margin: 5px;
    cursor: pointer;
    background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
    transition: all 0.2s ease;
    &:hover {
        transform: scale(1.25);
    
`

const SongImage = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50%;
`

const SongName = styled.p`
    padding: 5px 0 0 0;
    margin: 0;
    font-size: 14px;
    color: white;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 600;
    
`

const SongArtist = styled.p`
    padding: 0;
    margin: 0;
    font-size: 12px;
    font-family: 'Karla', sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    
`


const StyledLabel = styled.label`
    font-size: 36px;
    color: white;
    font-family: 'Cantarell', sans-serif;   
`

const Description = styled.p`
    font-size: 14px;
    padding: 0px 5px;
    font-family: 'Sarabun', sans-serif;
    color: #FFFFFF;
`

const Playlist = () => {
    const navigate = useNavigate();
    const {accessToken, spotifyId} = useUser();
    const id = useParams(); // used to get the album id of the album located in the url
    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(accessToken);

    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState(null);

    useEffect(() => {
        spotifyWebApi.getPlaylist(id.id)
            .then(response => {
                console.log(response);
                setPlaylist(response);
                console.log(response.tracks.items);
                setTracks(response.tracks.items);
            })
    }, [])


    return (
        <StyledDiv>
            {playlist &&
                <React.Fragment>
                    <PlaylistInfoDiv>
                        <PlaylistInfoPic>
                            <img src={playlist.images[0].url} alt="Playlist Cover" style={{borderRadius: '10px', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.39)"}}
                                 width="225" height="225"/>
                        </PlaylistInfoPic>
                        <PlaylistInfoNameEtc style={{position: 'relative', display: 'inline-block', width: '600px', height: '215px'}}>
                            <PlaylistInfoNameEtc style={{position: 'absolute', bottom: '0'}}>
                                <StyledLabel style={{fontWeight: 'bold'}}>{playlist?.name}</StyledLabel>
                                <StyledLabel style={{display: 'block', fontSize: '18px', fontStyle: 'italic', marginTop: '5px', marginLeft: '7px'}}>playlist
                                    <span style={{fontStyle: 'normal'}}> | {playlist.followers.total} likes</span></StyledLabel>
                                <StyledLabel style={{marginTop: '3px', marginLeft: '7px', display: 'block', fontSize: '18px'}}>{playlist.tracks.total} tracks</StyledLabel>
                                {(playlist.description != "") &&
                                    <React.Fragment>
                                        <Description>{playlist.description}</Description>
                                    </React.Fragment>
                                }
                            </PlaylistInfoNameEtc>
                        </PlaylistInfoNameEtc>
                    </PlaylistInfoDiv>
                    <TracksDiv>
                        {tracks?.map((track) => (
                            <SongCard onClick={()=> navigate("/musicEntry/" + track.track.id)} key={track.track.id}>
                                <SongImage src={track.track.album.images[0].url} alt="Album Photo"/>
                                <SongName>{track.track.name}</SongName>
                                <SongArtist>{track.track.artists[0].name}</SongArtist>
                            </SongCard>

                        ))}
                    </TracksDiv>
                </React.Fragment>
            }
        </StyledDiv>
    )
}

export default Playlist;