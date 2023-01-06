import React ,{useState,useEffect}from 'react'
import { useCookies } from 'react-cookie';

import CardsHome from "../components/Cards/CardsHome.js";
import CardsHomeFav from "../components/Cards/CardsHomeFav.js";

const Home = () => {
    let [pageNumber,setPageNumber] = useState(1); //to be used with pagination of characters
    let [fetchedData,updateFetchedData] = useState([]);
    let [fetchedFavData,updateFetchedFavData] = useState([]);
    let {results} = fetchedData;
    let [cookies] = useCookies(['favorites']);
    let favorites = cookies.favorites ? cookies.favorites : [];
    let idStr = favorites.toString();
  
  
    let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    let apiFav = `https://rickandmortyapi.com/api/character/${idStr}`;
  
  
  
    useEffect(()=> {
      (async function() {
        let data = await fetch(api).then((res) => res.json());
        updateFetchedData(data);
      })();
    },[api]);
  
    useEffect(()=> {
      (async function() {
        let dataFav = await fetch(apiFav).then((res) => res.json());
        updateFetchedFavData(dataFav);
      })();
    },[apiFav]);
  
  
  
    if(Array.isArray(favorites) && !favorites.length){
      return (
        <div className="App">
          
          <h1 className="text-center mb-3">Characters</h1>
          
        
        <div className="container ">
          <div className="row justify-content-center">
            <CardsHome page="/" className="" results={results}/>
          </div>
        </div>
    
        </div>
      );
    }else{
      return (
        <div className="App">
          
          <h1 className="text-center mb-3">Characters</h1>
          
        
        <div className="container ">
          <div className="row justify-content-center">
            <CardsHome page="/" className="" results={results}/>
          </div>
          <h1 className="text-center mb-2 mt-4">Favorites</h1>
          <div className="row justify-content-center">
            <CardsHomeFav page="/" className="" fetchedFavData={fetchedFavData}/>
          </div>
        </div>
    
        </div>
      );
    }
  
    
  }

export default Home