import React, { useEffect, useState } from 'react'
import "../App.css"
import { addDoc, setDoc,getDocs, collection, serverTimestamp, onSnapshot, query, where, orderBy} from "firebase/firestore"
import { auth, db } from "../Firebase.jsx"

export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState("")
    const messagesRef = collection(db, "messages")
    const [messages, setMessages] = useState([])

    const historyRef = collection(db, 'history')

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages)
        })

        return () => unsubscribe()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        .0
        if (newMessage === "") return;
        
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            
            photo: auth.currentUser.photoURL,
            room,
        })

        await addDoc(historyRef,  {
            user: auth.currentUser.displayName,
            email: auth.currentUser.email,
            createdAt: serverTimestamp(),
            room,
        })

        setNewMessage("")
    }

    function show(){
        alert(room)
    }

    function Down(){
        window.scrollTo(0, document.body.scrollHeight);
    }

  return (
    <div className='chat-app'>
        <div className="navbar">
            <button className="side" onClick={show}>Show Server Code</button>
            <button className="down" onClick={Down}>Go Down</button>
        </div>
        <div className="message-card">
            {messages.map((messages) => 
            <div className="user-profile-section" key={messages.id}>
                <h4>{messages.user}</h4>
                <img className="profile-pic"src={messages.photo}></img>
                <h5>{messages.text}</h5>
            </div>
            )}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
            <input maxLength="300" className="new-message-input" onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}>
            </input>
            <button type="submit"  className="send-button">
                Send
            </button>
        </form>
    </div>
  )
}
