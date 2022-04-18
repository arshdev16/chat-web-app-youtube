import React from 'react'
import "./Styles.css"
import { auth, firestore, GoogleAuthProvider } from '../../firebase'
const Enter = () => {
    const googleAuthenticatipn = async () => {
        try{
            await auth.signInWithPopup(GoogleAuthProvider)
            await firestore.collection("users").doc(auth.currentUser.uid).set({
                name: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                uid: auth.currentUser.uid
            })
            
        }catch(e){
            console.error(e.message);
            alert("An error occured")
        }
    }
    return (
        <div className='EnterContainer'>
            <button className='AuthButton' onClick={googleAuthenticatipn}>Signup or Login with google</button>
        </div>
    )
}

export default Enter