import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import Navbar from "./components/Navbar/Navbar.js";
import Episodes from "./Pages/Episodes.js";
import Favourite from "./Pages/Favourite.js";
import Home from "./Pages/Home.js"

import Register from "./Register.js";
import Login from "./Login.js";
import Logout from "./Pages/Logout.js";
import {AuthProvider} from './AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'

import {useState, useEffect} from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CardDetails from "./components/Cards/CardDetails.js";


function App(){

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return(
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>

      <div className="App">
        <Navbar/>
      </div>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<CardDetails/>}/>

        <Route path="/episodes" element={<Episodes/>}/>
        <Route path="/episodes/:id" element={<CardDetails/>}/>
        <Route path="/episodesList/:id" element={<Episodes/>}/>

        

        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>

        <Route path="/favourite" element={<Favourite/>}/>
        <Route path="/favourite/:id" element={<CardDetails/>}/>

      </Routes>
      </AuthProvider>
      
    </Router>
  )

}



export default App;
