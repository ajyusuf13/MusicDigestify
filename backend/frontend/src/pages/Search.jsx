import {useUser} from "../hook/User";
import {useForm} from "react-hook-form"
import {useNavigate, useParams} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import {useState} from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";


const StyledDiv = styled.div`
    width: 100%;
    display: block;  
`

const StyledSearchDiv = styled.div`
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    
`

const StyledSearchInputDiv = styled.div `
    padding-top : 40px;
    display: flex;

`

const StyledInput = styled.input`
    width: 300px;
    height: 20px;
    font-size: 16px;
    font-family: 'Karla', sans-serif;

    padding: 10px;
    border-radius: 4px;
    border: 0;
    
    &:focus {
        outline: none;
        background-color: white;
    }
`

const StyledSearchIconDiv = styled.div`
    width: 50px;
    height: 40px;
    background-color: #1DB954;
    display: grid;
    place-items: center;
    border-radius: 6px;
    cursor: pointer;

`

const StyledSearchResultsDiv = styled.div`
    width: 100%:
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden:
    overflow-y: auto;

`


const SearchResultDataDiv = styled.div`
    width: 500px;
    height: 425px;
    float: left;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: 0px;
    padding: 0px;
`

const StyledTable = styled.table`
    width: 450px;
    border-radius: 1rem;
    padding: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.99);
`

const StyledTBody = styled.tbody`
    display: block;
    height: 300px;
    overflow: hidden;
    overflow-y: auto;
    
`

const StyledTR = styled.tr`
    width: 100%;
    &:hover {
        background-color: lightgrey;
    }
`

const StyledTD = styled.td`
    width: 100%;
`

const StyledP = styled.p`
    color: #FFFFFF;
    font-weight: 'bold';
    font-family: 'Cantarell', sans-serif;
    font-size: 20px;
    
    
`

const StyledLabel = styled.label`
    font-size: 16px;
    padding: 5px 10px;
    font-family: 'Syne', sans-serif;
    font-weight: bold;
    color: #FFFFFF;
    display: block;
`


const Search = () => {
    const {accessToken} = useUser();
    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(accessToken);

    const [searchResults, setSearchResults] = useState("");

    const navigate = useNavigate();
    const {register, getValues, handleSubmit} = useForm();
    const types = ["album", "artist", "track", "playlist"]




    const executeSearch = () => {
        const searchValue = getValues("search");

        spotifyWebApi.search(searchValue, types, {limit: 20})
            .then(response => {
                console.log(response);
                setSearchResults(response);
            })
            .catch(err => {
                console.error(err);
            });

    }

    const DisplaySearchResults = () => {
        const tracks = searchResults.tracks.items;
        const artists = searchResults.artists.items;
        const albums = searchResults.albums.items;
        const playlists = searchResults.playlists.items;
        return (
            <React.Fragment>
                <StyledSearchResultsDiv className="SearchResultsDiv">
                    <SearchResultDataDiv>
                        <StyledP>tracks</StyledP>
                        {tracks &&
                        <StyledTable style={{background: 'linear-gradient(342deg, rgba(253,187,45,1) 13%, rgba(253,187,45,1) 29%, rgba(250,253,45,1) 58%)'}}>
                            <StyledTBody>
                            {tracks?.map(track => (
                                <StyledTR onClick={()=>navigate("/musicEntry/" + track.id)} key={track.id}>
                                    <td>
                                        <img style={{borderRadius: '10px'}} src={track.album.images[0]?.url} alt="Track Photo" width="80" height="80"/>
                                    </td>
                                    <StyledTD>
                                        <StyledLabel onClick={()=>navigate("/musicEntry/" + track.id)} style={{cursor: 'pointer', color: "#000000"}}>{track.name}</StyledLabel>
                                        <StyledLabel style={{fontSize: '14px', fontStyle: 'italic', color: '#696969'}}>{track.artists[0].name}</StyledLabel>
                                    </StyledTD>
                                </StyledTR>
                            ))}
                            </StyledTBody>
                        </StyledTable>}
                    </SearchResultDataDiv>
                    <SearchResultDataDiv>
                        <StyledP style={{color: 'white'}}>artists</StyledP>
                        {artists &&
                            <StyledTable style={{background: 'linear-gradient(90deg, rgba(107,207,46,1) 1%, rgba(221,223,52,1) 42%, rgba(166,238,58,1) 85%)'}}>
                                <StyledTBody>
                                {artists?.map(artist => (
                                    <StyledTR onClick={()=>navigate("/artist/" + artist.id)} key={artist.id}>
                                        <td>
                                            <img style={{borderRadius: '10px'}} src={artist.images[0]?.url} alt="Artist Photo" width="80" height="80"/>
                                        </td>
                                        <StyledTD>
                                            <StyledLabel onClick={()=>navigate("/artist/" + artist.id)} style={{cursor: 'pointer', color: "#000000"}}>{artist.name}</StyledLabel>
                                        </StyledTD>
                                    </StyledTR>
                                ))}
                                </StyledTBody>
                            </StyledTable>}
                    </SearchResultDataDiv>
                </StyledSearchResultsDiv>
                <StyledSearchResultsDiv className="SearchResultsDiv">
                    <SearchResultDataDiv>
                        <StyledP style={{color: 'white'}}>albums</StyledP>
                        {albums &&
                            <StyledTable style={{background: 'linear-gradient(342deg, rgba(180,58,135,1) 0%, rgba(175,48,236,1) 59%, rgba(241,68,151,1) 82%)'}}>
                                <StyledTBody>
                                {albums?.map(album => (
                                    <StyledTR onClick={()=>navigate("/album/" + album.id)} key={album.id}>
                                        <td>
                                            <img style={{borderRadius: '10px'}} src={album.images[0]?.url} alt="Album Photo" width="80" height="80"/>
                                        </td>
                                        <StyledTD>
                                            <StyledLabel onClick={()=>navigate("/album/" + album.id)} style={{cursor: 'pointer', color: "#000000"}}>{album.name}</StyledLabel>
                                        </StyledTD>
                                    </StyledTR>
                                ))}
                                </StyledTBody>
                            </StyledTable>}
                    </SearchResultDataDiv>
                    <SearchResultDataDiv>
                        <StyledP style={{color: 'white'}}>playlists</StyledP>
                        {playlists &&
                            <StyledTable style={{background: 'linear-gradient(342deg, rgba(180,58,141,1) 18%, rgba(48,110,236,1) 52%, rgba(90,199,245,1) 79%)'}}>
                                <StyledTBody>
                                {playlists?.map(playlist => (
                                    <StyledTR onClick={()=>navigate("/playlist/" + playlist.id)} key={playlist.id}>
                                        <td>
                                            <img style={{borderRadius: '10px'}} src={playlist.images[0]?.url} alt="Album Photo" width="80" height="80"/>
                                        </td>
                                        <StyledTD>
                                            <StyledLabel onClick={()=>navigate("/playlist/" + playlist.id)} style={{cursor: 'pointer', color: "#000000"}}>{playlist.name}</StyledLabel>
                                        </StyledTD>
                                    </StyledTR>
                                ))}
                                </StyledTBody>
                            </StyledTable>}
                    </SearchResultDataDiv>
                </StyledSearchResultsDiv>
            </React.Fragment>
        )
    }

    const Searchbar = () => {
        return (
            <StyledSearchDiv className="searchbarDiv">
                <StyledSearchInputDiv>
                    <StyledInput {...register("search")} placeholder="Tracks, Albums, Artists, Playlists ..." type="text"/>
                    <StyledSearchIconDiv onClick={handleSubmit(executeSearch)}>
                        <SearchIcon style={{fontSize: '35px'}}/>
                    </StyledSearchIconDiv>
                </StyledSearchInputDiv>
            </StyledSearchDiv>

        )
    }

    return (
        <StyledDiv className="SearchPageDiv">
            <Searchbar/>
            {searchResults ? <DisplaySearchResults/> : <div></div>}
        </StyledDiv>
    )
}
export default Search;