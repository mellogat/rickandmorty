import React from 'react';
import { useCookies } from 'react-cookie';
import styles from "../Cards/Cards.module.scss"

function FavButton({id}) {

    const [cookies, setCookie] = useCookies(['favorites']);
    let favorites;
    try {
      favorites = cookies.favorites ? cookies.favorites : [];
    } catch (error) {
      console.error(error);
      favorites = [];
    }

    const isFavorited = favorites.includes(id.toString());

  function toggleFavorite() {
    let newFavorites;
    if (isFavorited) {
      newFavorites = favorites.filter(favorite => favorite !== id.toString());
    } else {
      if(favorites.length === 0){
        newFavorites = [...favorites, id.toString()];

        //problem in Home.js where with only one element in the favorites array, it crashes because the id is undefined
        //but if the window is refreshed, the result is okay,
        //maybe its a racing condition caused by the 2 useEffect in app.js 
        //for now this is the temporary solution
        window.location.reload();
      }else{
        newFavorites = [...favorites, id.toString()];
      }
    }
    setCookie('favorites', newFavorites, { path: '/' });
  }

  function submitHandler(){
    toggleFavorite();
  }


  if(isFavorited){
      return(<button onClick={submitHandler} className={`${styles.btn} ${styles.fav} btn fav col-12 btn-danger`} >
        <i className="bi bi-heart"></i>
      </button>)
  }else{
        return(<button onClick={submitHandler} className={`${styles.btn} ${styles.notFav} btn col-12 btn-secondary`} >
        <i className="bi bi-heart-fill"></i>
    </button>)
  }

}

export default FavButton