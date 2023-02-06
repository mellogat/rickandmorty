import React from 'react'
import { signOut } from 'firebase/auth' 
import { auth } from '../firebase'
import {useNavigate} from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { clearCurrentUser } from '../store/action';
import { useSelector } from 'react-redux';




const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);

    
    const logout = e => {
        e.preventDefault()
        signOut(auth)
        .then(() => {
            dispatch(clearCurrentUser());
            console.log(currentUser)
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