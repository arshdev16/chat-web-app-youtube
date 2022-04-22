import React, { useState, useEffect } from "react";
import "./Chats.css";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../firebase";

const Chats = () => {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        let unsubscribe;
        if (auth.currentUser) {
            const userRef = firestore
                .collection("users")
                .doc(auth.currentUser.uid)
                .collection("chats");
            unsubscribe = userRef.onSnapshot((snapshot) => {
                let chats = [];
                snapshot.forEach((doc) => {
                    chats.push(doc.data());
                });
                setChats(chats);
            });
        }
        return unsubscribe;
    }, []);

    return <div className="ParentContainer">
        <h1 className="ChatHeading">Chats</h1>
        {chats.length === 0 ? <h2>You have no friends, LOL</h2> : chats.map((chat) => (
            <div key={chat.uid} className="Chats">
                <img alt="Profile" src={chat.photoURL} className="ChatsProfilePic" />
                <Link className="NameLink" to={{ pathname: `/${chat.uid}` }}><h2>{chat.name}</h2></Link>
            </div>
        ))}
    </div>;
};

export default Chats;