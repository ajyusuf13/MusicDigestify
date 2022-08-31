import "./css/musicEntry.css"
import {useUser} from "../hook/User";
import SpotifyWebApi from "spotify-web-api-js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {db} from "../firebase/config";
import {serverTimestamp} from "firebase/firestore";
import ReactStars from "react-rating-stars-component";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';


const PlayIconDiv = styled.div`
    width: 40px;
    background-color: #1DB954;
    display: grid;
    place-items: right;
    cursor: pointer;
    border-radius: 3rem;
    transition: all 0.2s ease;
    margin: auto 5px;
    float: left;
    
    &:hover {
        transform: scale(1.10);
`

const PauseIconDiv = styled.div`
    width: 40px;
    background-color: #1DB954;
    display: grid;
    place-items: right;
    cursor: pointer;
    border-radius: 3rem;
    margin: auto 5px;
    transition: all 0.2s ease;
    float: left;
    
    &:hover {
        transform: scale(1.05);
`




const MusicEntry = () => {
    const {accessToken, spotifyId} = useUser();
    const id = useParams(); // used to get the spotifyId of the song located in the url
    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(accessToken);

    const [musicEntry, setMusicEntry] = useState("");
    const [track, setTrack] = useState({});
    const [rating, setRating] = useState(0);
    const {register, getValues, handleSubmit} = useForm();

    const pause = () => {
        console.log("Trying to pause the playback");
        spotifyWebApi.pause()
            .then(response => {console.log(response)})
            .catch(err => {console.log(err)})
    }


    const playback = () => {
        console.log("inside playback");
        spotifyWebApi.play({uris: [track.uri]})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const ratingChanged = (newRating) => {
        setRating(newRating);
        db.collection("userData").doc(spotifyId).collection("musicEntries").doc(id.id)
            .set(
            {rating : newRating},
            {merge : true})
    };

    const clearEntry = () => {
        setMusicEntry("");
        setRating(0);
        document.getElementById("textArea").value = "";
        db.collection("userData").doc(spotifyId).collection("musicEntries").doc(id.id)
            .delete();
    }

    const saveAnswer = () => {
        const entryFromTextarea = getValues("musicEntry");
        setMusicEntry(entryFromTextarea);
        db.collection("userData").doc(spotifyId).collection("musicEntries").doc(id.id)
            .set(
            {   musicEntry : entryFromTextarea,
                timestamp : serverTimestamp()
            },
            {merge: true});
    }

    useEffect(() => {
        let lyricTrack= null;
        spotifyWebApi.getTrack(id.id)
            .then(response => {
                console.log(response);
                setTrack(response);
                lyricTrack = response;
            })

        db.collection("userData").doc(spotifyId).collection("musicEntries").doc(id.id).get()
            .then((docSnap) => {
                const songInfo = docSnap.get("musicEntry");
                if (songInfo == undefined) {
                    console.log("There was no saved musicEntry");
                } else {
                    // put the post in the text area but check if it's undefined
                    // setMusicEntry(songInfo.musicEntry ? songInfo.musicEntry : "");
                    document.getElementById("textArea").value = songInfo ? songInfo : "";
                    console.log("There was a saved music entry: " + songInfo);

                // check if there is a rating
                const songRating = docSnap.get("rating");
                console.log("song rating", JSON.stringify(songRating));
                setRating(songRating ? songRating : 0);
                }
            })
            .catch((err) => {
                console.log(err);
                console.log("spotify id not working ????")
            })
    }, [])


    return (
        <div className="musicEntryDiv">
            <div className="musicTrackDiv">
                    <img className="musicImage" alt="Track Photo" src={track.album?.images[0].url}/>
                <div className="musicTrackInfoDiv">
                    <div className="musicTrackTitleAndArtist">
                        <label className="musicTrackTitle" style={{display: 'block'}}>{track.name}</label>
                        <label className="musicTrackArtist">{track.album?.artists[0].name}</label>
                        <ReactStars
                            key={`stars_${rating}`}
                            value={Math.max(0, rating)}
                            char='♫'
                            count={5}
                            onChange={ratingChanged}
                            size={30}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                        <div className="playpauseDiv">
                            <div className="pauseIconDiv" onClick={pause}>
                                <PauseCircleIcon style={{fontSize: '40px'}}></PauseCircleIcon>
                            </div>
                            <div onClick={playback} className="playIconDiv">
                                <PlayCircleIcon style={{fontSize: '40px'}}></PlayCircleIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display: 'block'}} className="btnGroup">
                <textarea {...register("musicEntry")} spellCheck="false" id="textArea" className="musicEntry" placeholder={"This song speaks to me..."} type="text"></textarea>
                <div className="btnGroup">
                    <button onClick={handleSubmit(clearEntry)} className="musicEntryButton" style={{backgroundColor: '#b4b4b4'}}>clear</button>
                    <button onClick={handleSubmit(saveAnswer)} className="musicEntryButton">save</button>
                </div>
            </div>
        </div>)
}

export default MusicEntry;