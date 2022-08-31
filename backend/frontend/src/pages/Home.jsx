import {useUser} from "../hook/User";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import SpotifyWebApi from "spotify-web-api-js";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';


const StyledDiv = styled.div`
    width: 100vw;
    display: inline-block;
    margin-top: 30px;
`

const StyledProfileInfo = styled.div`
    width: 100%;
    display: flex;
    text-align: right;
    float: left;
    align-items: center;
`

const PlayIconDiv = styled.div`
    width: 40px;
    background-color: #1DB954;
    display: grid;
    place-items: right;
    cursor: pointer;
    text-align: right;
    border-radius: 3rem;
    float: right;
    transition: all 0.2s ease;
    
    &:hover {
        transform: scale(1.10);
`

const PauseIconDiv = styled.div`
    width: 40px;
    background-color: #1DB954;
    display: grid;
    place-items: right;
    cursor: pointer;
    text-align: right;
    border-radius: 3rem;
    float: right;
    margin: auto 5px;
    transition: all 0.2s ease;
    
    &:hover {
        transform: scale(1.05);
`

const CurrentlyPlayingDiv = styled.div`
    display: block;
    text-align: left;
    justify-content: center;
    display: flex;
    float: right;
`

const CurrentlyPlayingInfoDiv = styled.div`
    display: block;
    text-align: left;
    justify-content: center;
    margin: auto 2px;
`

const StyledProfileInfoLeft = styled.div`
    flex: 6;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: right;
    height: 90px;
`

const StyledProfileInfoCenter = styled.div`
    flex: 4;
    display: block;
    align-items: center;
    text-align: right;
`

const StyledProfileInfoRight = styled.div`
    flex: 2;
    justify-content: center;
    align-items: left;
    text-align: left;   
`


const StyledDisplayName = styled.label`
    font-size: 56px;
    padding: 15px 10px;
    font-family: 'Secular One', sans-serif;
    color: #FFFFFF;
`

const StyledContent = styled.div`
    width: 100vw;
    height: 500px;
    justify-content: center;
    align-items: center;
    display: inline-block;
`

const StyledRecentlyPlayed = styled.div`
    width: 375px;
    height: 475px;

    display: inline-block;
    margin: 20px 60px 20px 10px;
    align-items: center;
    justify-content: center;
    float: left;
    text-align:center;
    


`

const StyledTopTracks = styled.div`
    width: 375px;
    height: 475px;
    display: inline-block;
    margin: 20px 60px 20px 10px;
    align-items: center;
    justify-content: center;
    float: left;
    text-align:center;

`

const StyledTopArtists = styled.div`
    width: 375px;
    height: 475px;
    display: inline-block;
    margin: 20px 0px 20px 10px;
    align-items: center;
    justify-content: center;
    float: left;
    text-align:center;

`

const StyledLabel = styled.label`
    font-size: 16px;
    padding: 5px 10px;
    font-family: 'Karla', sans-serif;
    font-weight: bold;
    color: #FFFFFF;
    display: block;
`

const StyledLabel2 = styled.label`
    font-size: 16px;
    padding: 5px 10px;
    font-family: 'Syne', sans-serif;
    font-weight: bold;
    color: #FFFFFF;
    display: block;
`

const StyledTable = styled.table`
    width: 375px;
    border-radius: 1rem;
    padding: 10px;
    margin: 10px;
    text-align:left;
    margin: 2px auto;
    background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.99);
`

const StyledTBody = styled.tbody`
    display: block;
    max-height: 375px;
    overflow-y: auto;
    border-radius: 1rem;
    padding: 5px;

`

const StyledTR = styled.tr`
    height: 80px;
    cursor: pointer;
    &:hover {
        background-color: lightgrey;
    }
`

const StyledTD = styled.td`
    width: 375px;

`


const Home = () => {

    const {accessToken} = useUser();
    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(accessToken);

    const CURRENT_USER_PROFILE = "https://api.spotify.com/v1/me";
    const GET_RECENTLY_PLAYED = "https://api.spotify.com/v1/me/player/recently-played"
    const GET_TOP_TRACKS = "https://api.spotify.com/v1/me/top/tracks";
    const GET_TOP_ARTISTS = "https://api.spotify.com/v1/me/top/artists";


    const [data, setData] = useState({});
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    const navigate = useNavigate();

    const pause = () => {
        console.log("Trying to pause the playback");
        spotifyWebApi.pause()
            .then(response => {console.log(response)})
            .catch(err => {console.log(err)})
    }

    const playback = () => {
        console.log("inside playback");
        spotifyWebApi.play()
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });

    }


    useEffect(() => {
        axios.get(CURRENT_USER_PROFILE, {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        }).then(response => {
            console.log(response);
            setData(response.data);
        }).catch(error => {
            console.log(error);
        })

        axios.get(GET_RECENTLY_PLAYED, {
            params: {
                limit: 10
            },
            headers: {
                Authorization: "Bearer " + accessToken
            }
        }).then(response => {
            console.log(response);
            setRecentlyPlayed(response.data.items);
        }).catch(error => {
            console.log(error);
        })

        axios.get(GET_TOP_TRACKS, {
            params: {
                limit: 10,
                time_range: "short_term"
            },
            headers : {
                Authorization: "Bearer " + accessToken
            }
        }).then(response => {
            console.log(response);
            setTopTracks(response.data.items);
        }).catch(error => {
            console.log(error);
        })

        // axios.get(GET_TOP_ARTISTS, {
        //     params: {
        //         limit: 5
        //     },
        //     headers : {
        //         Authorization: "Bearer " + accessToken
        //     }})
        spotifyWebApi.getMyTopArtists({limit: 10})
            .then(response => {
            console.log(response.items);
            setTopArtists(response.items);
        }).catch(error => {
            console.log(error);
        })

        spotifyWebApi.getMyCurrentPlayingTrack()
            .then(response => {
                console.log("current playing track");
                if (response) {
                    console.log("there's a respo");
                    console.log(response)
                    setCurrentlyPlaying(response);
                }
                else {
                    setCurrentlyPlaying(null);
                    console.log("no response");
                }
            })

    }, []);



    return (
        <StyledDiv>
            <StyledProfileInfo>
                <StyledProfileInfoLeft className="ProfileInfoLeft">
                    {currentlyPlaying != null &&
                        <CurrentlyPlayingDiv>
                            <StyledLabel style={{margin: 'auto 10px', padding: '0'}}>Currently Playing:</StyledLabel>
                            <img width="90" height="90" style={{borderRadius: '10px'}} src={currentlyPlaying.item.album.images[0].url} alt="Track Photo"/>
                            <CurrentlyPlayingInfoDiv>
                                <StyledLabel>{currentlyPlaying.item.name}</StyledLabel>
                                <StyledLabel style={{fontStyle: 'italic', fontSize: '14px'}}>{currentlyPlaying.item.artists[0].name}</StyledLabel>
                            </CurrentlyPlayingInfoDiv>

                        </CurrentlyPlayingDiv>
                    }
                    <PauseIconDiv onClick={pause}>
                        <PauseCircleIcon style={{fontSize: '40px'}}></PauseCircleIcon>
                    </PauseIconDiv>
                    <PlayIconDiv onClick={playback} className="PlaybackControlDiv">
                        <PlayCircleIcon style={{fontSize: '40px'}}></PlayCircleIcon>
                    </PlayIconDiv>
                </StyledProfileInfoLeft>
                <StyledProfileInfoCenter>
                    <StyledDisplayName>{data.display_name}</StyledDisplayName>
                    <StyledLabel>{data.email}</StyledLabel>
                    <StyledLabel>spotify followers: {data.followers?.total}</StyledLabel>
                    <a href={data.external_urls?.spotify} style={{color: '#1DB954', fontSize: '16px', padding: '5px 10px'
                        , fontFamily: 'Optima, sans-serif', fontWeight: 'bold'}}>my spotify account</a>
                </StyledProfileInfoCenter>
                <StyledProfileInfoRight>
                        {data.images?.map(image => (
                            <img key={image.url} style={{borderRadius: "50%", width:"150px"}} src={image.url} alt={"Profile Pic"}>
                            </img>
                        ))}
                </StyledProfileInfoRight>
            </StyledProfileInfo>
            <StyledContent>
                <StyledRecentlyPlayed>
                    <StyledDisplayName style={{fontSize: '24px'}}>recently played</StyledDisplayName>
                    <StyledTable>
                        <StyledTBody>
                        {recentlyPlayed?.map(track => (
                            <StyledTR onClick={()=>navigate("/musicEntry/" + track.track.id)} key={track.track.id}>
                                <StyledTD style={{width: '80px', height: '80px'}}>
                                    <img style={{borderRadius: '10px'}} src={track.track.album.images[0].url} alt="Track Photo" width="80" height="80"/>
                                </StyledTD>
                                <StyledTD>
                                    <StyledLabel2 onClick={()=>navigate("/musicEntry/" + track.track.id)} style={{cursor: 'pointer', color: "#000000"}}>{track.track.name}</StyledLabel2>
                                    <StyledLabel style={{fontSize: '14px', fontStyle: 'italic', color: '#FFFFFF'}}>{track.track.artists[0].name}</StyledLabel>
                                </StyledTD>
                            </StyledTR>
                        ))}
                        </StyledTBody>
                    </StyledTable>
                </StyledRecentlyPlayed>
                <StyledTopTracks>
                    <StyledDisplayName style={{fontSize: '24px'}}>my top songs</StyledDisplayName>
                    <StyledDisplayName style={{display: 'inline-block', fontSize: '12px', padding: '0px'}}>(last month)</StyledDisplayName>
                    <StyledTable style={{background: 'linear-gradient(342deg, rgba(253,187,45,1) 21%, rgba(253,187,45,1) 21%, rgba(34,182,195,1) 99%)'}}>
                        <StyledTBody>
                        {topTracks?.map(track => (
                            <StyledTR onClick={()=>navigate("/musicEntry/" + track.id)} key={track.id}>
                                <StyledTD style={{width: '80px', height: '80px'}}>
                                    <img style={{borderRadius: '10px'}} src={track.album?.images[0].url} alt="Track Photo" width="80" height="80"/>
                                </StyledTD>
                                <StyledTD>
                                    <StyledLabel2 onClick={()=>navigate("/musicEntry/" + track.id)} style={{cursor: 'pointer',color: "#000000"}}>{track.name}</StyledLabel2>
                                    <StyledLabel style={{fontSize: '14px', fontStyle: 'italic', color: '#FFFFFF'}}>{track.artists[0].name}</StyledLabel>
                                </StyledTD>
                            </StyledTR>
                        ))}
                        </StyledTBody>
                    </StyledTable>
                </StyledTopTracks>
                <StyledTopArtists>
                    <StyledDisplayName style={{fontSize: '24px'}}>my top artists</StyledDisplayName>
                    <StyledTable style={{background: 'linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)'}}>
                        <StyledTBody>
                        {topArtists?.map(artist => (
                            <StyledTR onClick={()=>navigate("/artist/" + artist.id)} key={artist.id}>
                                <StyledTD style={{width: '80px', height: '80px'}}>
                                    <img style={{borderRadius: '10px'}} src={artist.images[0].url} alt="Artist Photo" width="80" height="80"/>
                                </StyledTD>
                                <StyledTD>
                                    <StyledLabel2 onClick={()=>navigate("/artist/" + artist.id)} style={{cursor: 'pointer', color: "#000000"}}>{artist.name}</StyledLabel2>
                                </StyledTD>
                            </StyledTR>
                        ))}
                        </StyledTBody>
                    </StyledTable>
                </StyledTopArtists>
            </StyledContent>
        </StyledDiv>
    )
}

export default Home;