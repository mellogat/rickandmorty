import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import Navbar from "./components/Navbar/Navbar.js";
import Episodes from "./Pages/Episodes.js";
import Favourite from "./Pages/Favourite.js";
import Home from "./Pages/Home.js"




import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CardDetails from "./components/Cards/CardDetails.js";


function App(){
  return(
    <Router>
      <div className="App">
        <Navbar/>
      </div>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<CardDetails/>}/>

        <Route path="/episodes" element={<Episodes/>}/>
        <Route path="/episodes/:id" element={<CardDetails/>}/>
        <Route path="/episodesList/:id" element={<Episodes/>}/>

        

        <Route path="/favourite" element={<Favourite/>}/>
        <Route path="/favourite/:id" element={<CardDetails/>}/>

      </Routes>
    </Router>
  )

}



export default App;
