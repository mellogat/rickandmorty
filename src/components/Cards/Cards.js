import React from 'react'
import styles from "./Cards.module.scss"
import { Link } from 'react-router-dom';
import FavButton from "../FavButton/FavButton.js"




const cards = ({results,page}) => {
    let display;

    if(results){
        //let resultsSliced=results.slice(0,5);
        display = results.map( elem => {
            let {id,name,image,status} = elem;
            return (
            <div key={id} className='text-dark col-lg-3 col-md-6 col-sm-12 position-relative mb-3'>
                <Link style={{textDecoration: "none"}} to ={`${page}${id}`} key={id}  className={`${styles.cards} d-flex flex-column justify-content-center text-dark `}>
                    <img src={image} alt="" className={`${styles.img} img-fluid`} />
                    <div className={`${styles.content} content`}>
                        <div className="fs-4 fw-bold mb-2">{name}</div>
                    </div>
                </Link> 
                <FavButton id={id}/>    
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

export default cards