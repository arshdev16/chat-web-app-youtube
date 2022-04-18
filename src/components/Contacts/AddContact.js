import React, { useState } from 'react'
import { auth, firestore } from '../../firebase'
import './AddContact.css'

const AddContact = () => {
    const [code, setCode] = useState('');

    const sendRequest = async (event) => {
        event.preventDefault();
        const splitCode = code.split(' ')[0];
        //removing spaces
        await firestore.collection('users').doc(splitCode).get().then(async (doc) => {
            if (doc.exists) {
                //checking if the user exists
                if (splitCode === "" || splitCode[0] === " ") {
                    //checking if their is a space at the beginning of the code or the code is empty
                    alert("Please enter a valid code");
                } else {
                    if (splitCode === auth.currentUser.uid) {
                        alert("You can't add yourself as a contact");
                        //Checking if the user is trying to add themselves
                    } else {
                        await firestore.collection("users").doc(auth.currentUser.uid).collection("chats").doc(splitCode).get().then(async (doc) => {
                            if (doc.exists) {
                                //checking if the user is already in the contacts list
                                alert("You already have a chat with this user");
                            } else {
                                await firestore.collection("users").doc(auth.currentUser.uid).collection("sentRequests").doc(splitCode).get().then(async (doc) => {
                                    //checking if the user has already sent a request to rhe user
                                    if (doc.exists) {
                                        alert("You already sent a request to this user");
                                    } else {
                                        await firestore.collection("users").doc(splitCode).get().then(async (doc) => {
                                            const currentUserData = {
                                                name: auth.currentUser.displayName,
                                                photoURL: auth.currentUser.photoURL,
                                                uid: auth.currentUser.uid
                                            }
                                            //Current user data
                                            const receiverData = {

                                                name: doc.data().name,
                                                photoURL: doc.data().photoURL,
                                                uid: doc.data().uid
                                            }
                                            //Receiver data
                                            await firestore.collection("users").doc(auth.currentUser.uid).collection("sentRequests").doc(splitCode).set(receiverData);
                                            //Keeping tracks of sent requests
                                            await firestore.collection("users").doc(splitCode).collection("receivedRequests").doc(auth.currentUser.uid).set(currentUserData);
                                            //keeping track of received requests
                                        })
                                    }
                                })

                            }

                        })

                    }
                }
            }
        })
    }
    return (
        <div className='MainContainer'>
            <h2>Add Friend</h2>
            <form className='Form'>
                <input type='text' className="CodeInput" value={code} placeholder="Friend's Code..." onChange={(e) => setCode(e.target.value)} />
                <button className="AddBtn" onClick={(e) => sendRequest(e)}>Add</button>
            </form>

        </div>
    )
}

export default AddContact