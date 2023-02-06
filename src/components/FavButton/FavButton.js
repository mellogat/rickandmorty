import React from 'react';
import styles from "../Cards/Cards.module.scss"
import { writeFav , removeFav, checkIdInList} from '../../firebase';
import { useSelector } from 'react-redux';

function FavButton({id}) {
    const currentUser = useSelector(state => state.currentUser);
    //const [cookies, setCookie] = useCookies(['favorites']);

    //retrieve cookies
    //favorites = cookies.favorites ? cookies.favorites : [];
    

    //check if id (char) is favorited or not
    //const isFavorited = id ? favorites.includes(id.toString()) : false;
    

    const isFavorited = checkIdInList('users/'+ currentUser.uid + '/favIds', id,currentUser.uid)

  

  function toggleFavorite() {
    //let newFavorites;
    if (isFavorited) {
      //remove from cookie
      //newFavorites = favorites.filter(favorite => favorite !== id.toString());
      removeFav(currentUser.uid,id)


    } else {
      //add to cookie
      //newFavorites = [...favorites, id.toString()];
      writeFav(currentUser.uid,id)
    }
    //setCookie('favorites', newFavorites, { path: '/' });
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