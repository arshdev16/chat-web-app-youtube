import React from 'react'
import { Link } from 'react-router-dom'
import "./Styles.css"

const Navbar = () => {
  return (
    <ul className="NavbarContainer">
        <li>
            <Link className='Link' to="/">Home</Link>
            <Link className='Link' to="/add">Add friend</Link>
            <Link className='Link' to="/">Profile</Link>
        </li>
    </ul>
  )
}

export default Navbar