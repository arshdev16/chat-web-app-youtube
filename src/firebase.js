import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
    apiKey: "AIzaSyBZl1pUta2vDhzkNP9WRmnsjZhuQ0CFz2U",
    authDomain: "chat-web-app-e9f82.firebaseapp.com",
    projectId: "chat-web-app-e9f82",
    storageBucket: "chat-web-app-e9f82.appspot.com",
    messagingSenderId: "997576456610",
    appId: "1:997576456610:web:093b6f2372d5729c179afb",
    measurementId: "G-YMEBREC904"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const ServerTimestamp = firebase.firestore.FieldValue.serverTimestamp;