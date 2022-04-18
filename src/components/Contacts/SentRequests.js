import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../firebase";
import "./Requests.css";

const SentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (auth.currentUser) {
      const ref = firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("sentRequests");
      unsubscribe = ref.onSnapshot((snapshot) => {
        const requests = [];
        snapshot.forEach((doc) => {
          requests.push(doc.data());
        });
        setSentRequests(requests);
      });
    }
    return unsubscribe;
  }, []);

  return <div className="MainContainer">
   {sentRequests.length === 0? <h2>No Requests</h2>: sentRequests.map((request) => (
     <div key={request.uid} className="SentRequestContainer">
       <img src={request.photoURL} className="ProfilePic" alt="Profile"/>
       <h2 className="RequestName">{request.name}</h2>
     </div>
   ))}
  </div>;
};

export default SentRequests;
