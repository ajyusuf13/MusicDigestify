import {useUser} from "../hook/User";
import {useNavigate, useParams} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import {useEffect, useState} from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    width: 100vw;
    display: block;
    margin-top: 30px;
`
const ArtistInfoDiv = styled.div`
    display: flex;
    float: left;
    align-items: center;
    width: 100vw;
    margin-top: 10px;
    margin-left: 20px;
`

const ArtistInfoPic = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0px 10px;
`

const ArtistInfoNameEtc = styled.div`
    display: block;
    align-items: left;
    text-align: left;
    justify-content: center;
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

const ArtistContentDiv = styled.div`
    margin-left: 100px;
    margin-top: 25px;
    height: 600px;
    width: 100vw;
    float: left;
`

const ContentSectionDiv = styled.div`
    width: 400px;
    display: block;
    float: left;
    margin-right: 25px;
    text-align: right;
`

const StyledTable = styled.table`
    margin-top: 5px;
    margin-right: 50px;
    border-radius: 1rem;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.99);
    float: left;
    width: 375px;
`

const StyledTBody = styled.tbody`
    display: block;
    max-height: 360px;
    overflow-y: auto;
    
`

const StyledTR = styled.tr`
    &:hover {
        background-color: lightgrey;
    }
`

const StyledTD = styled.td`
    width: 375px;
`



const Artist = () => {
    const {accessToken, spotifyId} = useUser();
    const id = useParams(); // used to get the artist id of the song located in the url
    const navigate = useNavigate();

    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(accessToken);

    const [artist, setArtist] = useState();
    const [topTracks, setTopTracks] = useState([])
    const [albums, setAlbums] = useState();
    const [relatedArtists, setRelatedArtists] = useState();




    useEffect(() => {
        spotifyWebApi.getArtist(id.id)
            .then((response) => {
                console.log(response);
                setArtist(response);
            })

        spotifyWebApi.getArtistTopTracks(id.id, 'US')
            .then((response) => {
                console.log(response.tracks);
                setTopTracks(response.tracks);
            })

        spotifyWebApi.getArtistAlbums(id.id, {limit: 15})
            .then((response) => {
                console.log(response.items);
                setAlbums(response.items);
            })

        spotifyWebApi.getArtistRelatedArtists(id.id, {limit: 15})
            .then((response) => {
                console.log(response.artists);
                setRelatedArtists(response.artists);
            })


    }, []);


    return (
        <StyledDiv className="ArtistPageDiv">
            <ArtistInfoDiv className="ArtistInfoDiv">
                <ArtistInfoPic>
                    <img style={{borderRadius: '10px', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.39)"}} src={artist?.images[0].url} width="225" height="225"/>
                </ArtistInfoPic>
                <ArtistInfoNameEtc>
                    <StyledLabel style={{fontWeight: 'bold'}}>{artist?.name}</StyledLabel>
                    <StyledLabel style={{display: 'block', fontSize: '18px', fontStyle: 'italic', marginTop: '5px', marginLeft: '7px'}}>artist</StyledLabel>
                    <StyledLabel style={{marginTop: '3px', marginLeft: '7px', display: 'block', fontSize: '18px'}}>Followers: {artist?.followers.total.toLocaleString()} | Popularity: {artist?.popularity}</StyledLabel>
                </ArtistInfoNameEtc>
            </ArtistInfoDiv>
            <ArtistContentDiv className="ArtistContentDiv">
                <ContentSectionDiv>
                    <StyledLabel style={{fontSize: '18px', marginRight: '50px'}}>top tracks</StyledLabel>
                    <StyledTable>
                        <StyledTBody>
                            {topTracks?.map((track) => (
                                <StyledTR onClick={()=>navigate("/musicEntry/" + track.id)} key={track.id}>
                                    <StyledTD style={{width: '80px', height: '80px'}}>
                                        <img src={track.album?.images[0].url} alt="Track Photo" width="80" height="80"/>
                                    </StyledTD>
                                    <StyledTD>
                                        <StyledLabel2 onClick={()=>navigate("/musicEntry/" + track.id)} style={{cursor: 'pointer',color: "#FFFFFF"}}>{track.name}</StyledLabel2>
                                        <StyledLabel style={{padding: '0px 10px', fontSize: '14px', fontStyle: 'italic', color: '#F5FFFA'}}>{track.artists[0].name}</StyledLabel>
                                    </StyledTD>
                                </StyledTR>
                            ))}
                        </StyledTBody>
                    </StyledTable>
                </ContentSectionDiv>
                <ContentSectionDiv>
                    <StyledLabel style={{fontSize: '18px', marginRight: '50px'}}>albums</StyledLabel>
                    <StyledTable>
                        <StyledTBody>
                            {albums?.map((album) => (
                                <StyledTR onClick={()=>navigate("/album/" + album.id)} key={album.id}>
                                    <StyledTD style={{width: '80px', height: '80px'}}>
                                        <img src={album?.images[0].url} alt="Album Photo" width="80" height="80"/>
                                    </StyledTD>
                                    <StyledTD>
                                        <StyledLabel2 onClick={()=>navigate("/album/" + album.id)} style={{cursor: 'pointer',color: "#FFFFFF"}}>{album.name}</StyledLabel2>
                                        <StyledLabel style={{padding: '0px 10px', fontSize: '14px', fontStyle: 'italic', color: '#F5FFFA'}}>{album.artists[0].name}</StyledLabel>
                                    </StyledTD>
                                </StyledTR>
                            ))}
                        </StyledTBody>
                    </StyledTable>
                </ContentSectionDiv>
                <ContentSectionDiv>
                    <StyledLabel style={{fontSize: '18px', marginRight: '50px'}}>related artists</StyledLabel>
                    <StyledTable>
                        <StyledTBody>
                            {relatedArtists?.map((relatedArtist) => (
                                <StyledTR onClick={()=> {
                                    navigate("/artist/" + relatedArtist.id);
                                    window.location.reload();}} key={relatedArtist.id}>
                                    <StyledTD style={{width: '80px', height: '80px'}}>
                                        <img src={relatedArtist?.images[0].url} alt="Artist Photo" width="80" height="80"/>
                                    </StyledTD>
                                    <StyledTD>
                                        <StyledLabel2 onClick={()=>navigate("/artist/" + relatedArtist.id)} style={{cursor: 'pointer',color: "#FFFFFF"}}>{relatedArtist.name}</StyledLabel2>
                                    </StyledTD>
                                </StyledTR>
                            ))}
                        </StyledTBody>
                    </StyledTable>
                </ContentSectionDiv>
            </ArtistContentDiv>

        </StyledDiv>
    )

}


export default Artist;