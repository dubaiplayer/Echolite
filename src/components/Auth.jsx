import React from 'react'
import "../App.css"
import { auth, provider } from "../Firebase.jsx"
import { signInWithPopup } from 'firebase/auth'

import Cookies from 'universal-cookie'
import { setUserId } from 'firebase/analytics'
const cookies = new Cookies()

export const Auth = (props) => {

    const { setIsAuth } = props

    const signInWithGoogle = async () => {

        try {
        const result = await signInWithPopup(auth, provider)
        cookies.set("auth-token", result.user.refreshToken)
        setIsAuth(true)

        } catch(err){
            console.error(err)
        }
    }

  return (
    <div>
        <h1>Welcome to Echolite!</h1>
        <div className="card">
            <button onClick={signInWithGoogle} className="homeButton">
                Sign In With Google
            </button>
            <p className="slogan">
                Create a Community
            </p>
        </div>
    </div>
  )
}