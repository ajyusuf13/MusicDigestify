import {db} from "../firebase/config";
import {useUser} from "../hook/User";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";


const StyledDiv = styled.div`
    padding-top: 50px;
    display: flex;
    flex-direction: column;
`

const HistoryDiv = styled.div`
    height: 700px;
    overflow: hidden;
`

const StyledLabel = styled.label`
    font-size: 24px;
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

const StyledTable = styled.table`
    margin-top: 15px;
    width: 400px;
    background-color: #808080;
    border-radius: 1rem;
    padding: 10px;
    margin: 10px;
    text-align:left;
    margin: 10px auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.99);

`

const StyledTBody = styled.tbody`
    display: block;
    max-height: 600px;
    overflow-y: auto;
    
`

const StyledTR = styled.tr`
    cursor: pointer;
    &:hover {
        background-color: #DCDCDC;
    }
`


const History = () => {

    const [posts, setPosts] = useState([]);
    const [songs, setSongs] = useState({})
    const {accessToken, spotifyId} = useUser();
    const navigate = useNavigate();

    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(accessToken);

    useEffect(() => {
        const entriesFirebase = [];
        const songsFromEntries = [] // will be used to store the information about all the songs we have entries of
        const subscriber = db.collection("userData").doc(spotifyId)
            .collection("musicEntries").orderBy("timestamp", "desc").get()
            .then((querySnap) => {
                if (querySnap) {
                    querySnap.forEach((docSnap) => {
                        entriesFirebase.push({
                            ...docSnap.data(),
                            key: docSnap.id
                        })
                        songsFromEntries.push(docSnap.id);
                    });
                    setPosts(entriesFirebase);
                    console.log(entriesFirebase.length);
                    console.log(entriesFirebase);

                    spotifyWebApi.getTracks(songsFromEntries).
                        then((response) => {
                            console.log(response.tracks);
                            setSongs(response.tracks);
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                console.log("spotify id not working ????")
            })
    }, []);

    return (
        <StyledDiv>
            <StyledLabel>Music Entries</StyledLabel>
            {songs.length > 0 ? (
            <HistoryDiv>
                <StyledTable>
                    <StyledTBody>
                {songs.map((song) => (
                    <StyledTR onClick={()=>navigate("/musicEntry/" + song.id)} key={song.id}>
                    <td style={{width: '100px', height: '100px'}}>
                        <img src={song.album?.images[0].url} alt="Track Photo" width="100" height="100"/>
                    </td>
                    <td>
                        <StyledLabel2 onClick={()=>navigate("/musicEntry/" + song.id)} style={{cursor: 'pointer',color: "#FFFFFF"}}>{song.name}</StyledLabel2>
                        <StyledLabel style={{padding: '0px 10px', fontSize: '14px', fontStyle: 'italic', color: '#F5FFFA'}}>{song.artists[0].name}</StyledLabel>
                    </td>
                    </StyledTR>
                    ))}
                    </StyledTBody>
                </StyledTable>
            </HistoryDiv>
            )
             : (
                 <StyledLabel>
                     You have no music entries yet!
                 </StyledLabel>
            )}

        </StyledDiv>
    )
}


export default History;

