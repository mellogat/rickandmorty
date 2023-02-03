import React from 'react'
import styles from "./Cards.module.scss"
import { Link } from 'react-router-dom';
import FavButton from "../FavButton/FavButton.js"
import { useAuthValue } from '../../AuthContext.js';

function shuffle(arr) {
    let currentIndex = arr.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
  
    return arr;
  
}


const Cardshome = ({results,page}) => {
    let display;
    const {currentUser} = useAuthValue();

    if(results){
        //shuffle the results to get 5 random characters
        //shuffle(results);
        let resultsSliced=results.slice(0,5);
        display = resultsSliced.map( elem => {
            let {id,name,image,status} = elem;
            return (
                <div  key={id} className='text-dark col-lg-2 col-md-6 col-sm-12 position-relative mb-3 mt-5'>
                <Link style={{textDecoration: "none"}} to ={`${page}${id}`} key={id}  className={`${styles.cards} d-flex flex-column justify-content-center `}>
                    <img src={image} alt="" className={`${styles.img} img-fluid`} />
                    <div className={`${styles.content} content`}>
                        <div className="fs-4 fw-bold text-dark">{name}</div>
                    </div>
                </Link> 
                {currentUser ? <FavButton id={id}/> : <React.Fragment/>}
                
                {(()=>{
                        if(status === "Dead"){
                            return(
                                <div className={`${styles.badge} badge bg-danger position-absolute`}>{status}</div>
                            )
                        }
                        else if(status === "Alive"){
                            return(
                                <div className={`${styles.badge} badge bg-success position-absolute`}>{status}</div>
                            )
                        }
                        else{
                            return(
                                <div className={`${styles.badge} badge bg-secondary position-absolute`}>{status}</div>
                            )
                        }
                })()}   
                </div>
            );
        })


    }else{
        display= "No Characters Found";
    }

    return (
    <>{display}</>
  )
}

export default Cardshome