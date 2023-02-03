import React from 'react'
import { useAuthValue } from '../AuthContext.js';
import { signOut } from 'firebase/auth' 
import { auth } from '../firebase'
import {useNavigate} from 'react-router-dom'



const Logout = () => {
    const {currentUser} = useAuthValue();
    const navigate = useNavigate()

    
    const logout = e => {
        e.preventDefault()
        signOut(auth)
        .then(() => {
            navigate('/')
        })
    }
return (
    <div className="container d-flex flex-column justify-content-center">
            <p className="text-center mb-3"> Hey <b>{currentUser ? currentUser.email : 'guest'}</b>, are you sure you want to log out?</p>
            <div className="mx-auto">
                <button className="btn btn-danger" onClick={logout}>Log out</button>
            </div>
    </div>
)
}

export default Logout