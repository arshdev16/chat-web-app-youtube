import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "./firebase";
import Navbar from "./components/Navbar/Navbar";
import Enter from "./components/enter/Enter";
import Contacts from "./components/Contacts/Contacts";
import Chats from "./components/Chats/Chats";


function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Router>
        <Navbar />
        {user ? <>
          <Routes>
            <Route path="/" element={<Chats/>} />
            <Route path="/add" element={<Contacts />} />
          </Routes>
        </> : <Enter />}
      </Router>
    </div>
  );
}

export default App;
