import React from 'react'
import { auth } from '../../firebase'
import "./Profile.css"
import { IoIosCopy } from 'react-icons/io'
import {BiLogOut} from 'react-icons/bi'

const Profile = () => {

    const copyCode = () => {
        navigator.clipboard.writeText(auth.currentUser.uid);
        alert('Code Copied')
    }

    return (
        <div className='ProfileContainer'>
            <h2 style={{ margin: 0, fontWeight: "bold" }}>Profile</h2>
            <img src={auth.currentUser.photoURL} alt="ProfilePic" className="ProfilePic" />
            <h3 className='Name'>{auth.currentUser.displayName}</h3>
            <button className='BlueBtn' onClick={copyCode} >Copy Code <IoIosCopy size={30}/></button>
            <button className='BlueBtn' onClick={()=> {auth.signOut()}}>Log Out <BiLogOut size={30}/> </button>
        </div>
    )
}

export default Profile