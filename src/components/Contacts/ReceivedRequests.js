import React, { useState, useEffect } from "react";
import "./Requests.css";
import { auth, firestore } from "../../firebase";

const ReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (auth.currentUser) {
      const userRef = firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("receivedRequests");
      unsubscribe = userRef.onSnapshot((snapshot) => {
        let requests = [];
        snapshot.forEach((doc) => {
          requests.push(doc.data());
        });
        setRequests(requests);
      });
    }
    return unsubscribe;
  }, []);


  const acceptRequest = async (uid, name, photoURL, event) => {
    event.preventDefault();
    try {
      const currentUserRef = firestore.collection("users").doc(auth.currentUser.uid);
      const senderRef = firestore.collection("users").doc(uid);
      // Add contact to current user
      await currentUserRef.collection("chats").doc(uid).set({
        name: name,
        photoURL: photoURL,
        uid: uid,
      });
      // Setting the chat in the receiver's document
      await senderRef.collection("chats").doc(auth.currentUser.uid).set({
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
      // Deleting the request from the sender's document
      await currentUserRef.collection("receivedRequests").doc(uid).delete();
      // Deleting the request from the receiver's document
      await senderRef.collection("sentRequests").doc(auth.currentUser.uid).delete();
    } catch (e) {
      console.error(e.message)
    }
  }

  const declineRequest = async (uid, event) => {
    event.preventDefault();
    try {
      // Deleting the request from the receiver's document
      await firestore.collection("users").doc(auth.currentUser.uid).collection("receivedRequests").doc(uid).delete();
      // Deleting the request from the sender's document
      await firestore.collection("users").doc(uid).collection("sentRequests").doc(auth.currentUser.uid).delete();
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <div className="MainContainer">
      {requests.length === 0 ? (
        <h2>No Requests</h2>
      ) : (
        requests.map((request) => (
          <div className="ReceivedContainer" key={request.uid}>
            <div className="InfoContainer">
              <img
                alt="profile"
                src={request.photoURL}
                className="ProfilePic"
              />
              <h2 className="RequestName">{request.name}</h2>
            </div>
            <div className="BtnsContainer">
              <button onClick={(e) => acceptRequest(request.uid, request.name, request.photoURL, e)} className="AcceptBtn">Accept</button>
              <button onClick={(e) => declineRequest(request.uid, e)} className="DeclineBtn">Decline</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReceivedRequests;
