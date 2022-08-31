import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../hook/User";
import {useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styled from "styled-components";

const StyledDiv = styled.div`
    width: 100vw;
    display: block;
    margin-top: 30px;

`

const AlbumInfoDiv = styled.div`
    display: flex;
    float: left;
    align-items: center;
    width: 100vw;
    padding-top: 20px;
    margin-left: 20px;

`

const AlbumInfoPic = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0px 10px;
`


const AlbumInfoNameEtc = styled.div`
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
    display: flex;
    flex-direction: column;
    width: 120px;
    height: 120px;
    line-height: 120px;

    border-radius: 50%;
    background-color: rgb(30,42,62);
    border: 1px solid rgba(54, 69, 98, 0.98);
    
    text-align: center;
    align-content: center;
    justify-content: center;
    padding: 1%;
    margin: 5px;
    background: rgb(34,182,195);
    background: linear-gradient(342deg, rgba(34,182,195,1) 0%, rgba(253,187,45,1) 100%);
    cursor: pointer;
    
    transition: all 0.2s ease;
    
    &:hover {
        transform: scale(1.25);
    
`

const StyledSongInfo = styled.div`
    margin: auto;
    font-family: 'Karla', sans-serif;
    width: 120px;
    white-space: no-wrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    
`

const StyledSongName = styled.div`
    height: 15px;
    font-size: 14px;
    color: black;
    margin: 0px;
    
`

const StyledTrackNumber = styled.div`
    padding-top: 3px;
    font-size: 20px;
    color: white;
    margin: 0px;
`


const StyledLabel = styled.label`
    font-size: 46px;
    color: white;
    font-family: 'Cantarell', sans-serif;   
`

const StyledLabel2 = styled.label`
    font-size: 16px;
    padding: 5px 10px;
    font-family: 'Syne', sans-serif;
    font-weight: bold;
    color: #FFFFFF;
    display: block;
`



const Album = () => {
    const navigate = useNavigate();
    const {accessToken, spotifyId} = useUser();
    const id = useParams(); // used to get the album id of the album located in the url
    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(accessToken);

    const [album, setAlbum] = useState(null);
    const [tracks, setTracks] = useState(null);

    useEffect(()=> {
        spotifyWebApi.getAlbum(id.id)
            .then(response => {
                console.log(response);
                setAlbum(response);
            })

        spotifyWebApi.getAlbumTracks(id.id)
            .then(response => {
                console.log(response);
                setTracks(response.items);
            })

    }, [])

    return (
        <StyledDiv>
            <AlbumInfoDiv>
                <AlbumInfoPic>
                    <img src={album?.images[0].url} alt="Album Cover" style={{borderRadius: '10px', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.39)"}}
                        width="225" height="225"/>
                </AlbumInfoPic>
                <AlbumInfoNameEtc style={{position: 'relative', display: 'inline-block', width: '600px', height: '215px'}}>
                    <AlbumInfoNameEtc style={{position: 'absolute', bottom: '0'}}>
                        <StyledLabel style={{fontWeight: 'bold'}}>{album?.name}</StyledLabel>
                        <StyledLabel style={{display: 'block', fontSize: '18px', fontStyle: 'italic', marginTop: '5px', marginLeft: '7px'}}>album</StyledLabel>
                        <StyledLabel style={{marginTop: '3px', marginLeft: '7px', fontStyle: 'italic', display: 'block', fontSize: '18px'}}>{album?.label} | {album?.release_date}</StyledLabel>
                        <StyledLabel style={{marginTop: '3px', marginLeft: '7px', display: 'block', fontSize: '18px'}}>{album?.total_tracks} tracks</StyledLabel>
                    </AlbumInfoNameEtc>
                </AlbumInfoNameEtc>
            </AlbumInfoDiv>
            <TracksDiv>
                {tracks?.map((track) => (
                    <SongCard onClick={()=> navigate("/musicEntry/" + track.id)}>
                        <StyledSongInfo>
                            <StyledSongName className="SongName" style={{margin:'0', padding: '0'}}>{track.name}</StyledSongName>
                            <StyledTrackNumber>{track.track_number}</StyledTrackNumber>
                        </StyledSongInfo>
                    </SongCard>

                ))}
            </TracksDiv>
        </StyledDiv>
    )

}

export default Album;