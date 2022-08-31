import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAiIGjxPgUYgA1bSUbXllEd5K2hpn1tg1g",
    authDomain: "spotifysideproject.firebaseapp.com",
    projectId: "spotifysideproject",
    storageBucket: "spotifysideproject.appspot.com",
    messagingSenderId: "410774068850",
    appId: "1:410774068850:web:7bfbb92d1bd0b2f6dd2ceb"
};

const firebase = Firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export {firebase, db};