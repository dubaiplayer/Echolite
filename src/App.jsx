import { useState, useRef } from "react";
import { Auth } from "./components/Auth.jsx";
import { Chat } from "./components/Chat.jsx";
import { History } from "./components/History.jsx"
import React from "react";
import "./App.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [componentVisibility, setComponentVisibility] = useState(false)

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}></Auth>
      </div>
    );
  } else {
    function Join() {
      setRoom(roomInputRef.current.value);
    }

    function historyView() {
      setComponentVisibility(true)
    }

    return (
      <div>
        {room ? (
          <Chat room={room}></Chat>
        ) : (
          <div className="room">
            <h1 className="title">Welcome Back!</h1>
            <input className="serverInput" ref={roomInputRef}></input>
            <button className="serverInput" onClick={Join}>
              Enter Server
            </button>
            <h5>If you want to go back click on the refresh button</h5>
            <button className="history" onClick={() => {historyView()}}>
              View History
            </button> 
          </div>
        )}

        {componentVisibility && !room && <History></History>}
      </div>
    );
  }
}

export default App;
