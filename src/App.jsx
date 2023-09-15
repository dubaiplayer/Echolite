import { useState, useRef } from 'react'
import { Auth } from "./components/Auth.jsx"
import { Chat } from "./components/Chat.jsx"
import React from 'react'
import './App.css'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}>
        </Auth>
      </div>
    )
  }

  else {
    
    return(
      <div>
        {room ? <Chat room={room}></Chat> : 
        <div className="room">
          <h1 className='title'>Welcome Back!</h1>
          <input className="serverInput" ref={roomInputRef} ></input>
          <button className="serverInput" onClick={() => setRoom(roomInputRef.current.value)}>Enter Server</button>
        </div>} 
      </div>
    ) 
  }
  
}

export default App