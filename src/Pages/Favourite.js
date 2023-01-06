import React ,{ useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styles from "../components/Cards/Cards.module.scss"
import FavButton from "../components/FavButton/FavButton.js"




const Favourite = () => {
  let [cookies] = useCookies(['favorites']);
  let [fetchedFavData,updateFetchedFavData] = useState([]);
  let favorites = cookies.favorites ? cookies.favorites : [];
  let display,idString;

  idString = favorites.toString();

  let api = `https://rickandmortyapi.com/api/character/${idString}`;

  useEffect(()=> {
    (async function() {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedFavData(data);
    })();
  },[api]);

  if(fetchedFavData){

    if(idString === ""){
      display= <div className="">
                  <div className="text-center">No character has been favorited</div>
                  <div className="text-center">Click <Link style={{textDecoration: "none"}} to ={`/episodes`}><span className='text-'>here</span></Link> to go to episodes</div>
                </div>
      
    }else{
      if(Array.isArray(fetchedFavData)){
      display = fetchedFavData.map( elem => {
        let {id,name,image,status} = elem;
        return (
            <div key={id} className='text-dark col-lg-2 col-md-6 col-sm-12 position-relative mb-3 mt-5'>
            <Link style={{textDecoration: "none"}} to ={`/favourite/${id}`} key={id}  className={`${styles.cards} d-flex flex-column justify-content-center `}>
                <img src={image} alt="" className={`${styles.img} img-fluid`} />
                <div className={`${styles.content} content`}>
                    <div className="fs-4 fw-bold text-dark">{name}</div>
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
        let {id,name,image,status} = fetchedFavData;
        display = <div key={id} className="text-dark col-lg-2 col-md-6 col-sm-12 position-relative mb-3 mt-5">
                    <Link style={{textDecoration: "none"}} to ={`/favourite/${id}`} key={id}  className={`${styles.cards} d-flex flex-column justify-content-center `}>
                        <img src={image} alt="" className={`${styles.img} img-fluid`} />
                        <div className={`${styles.content} content`}>
                                <div className="fs-4 fw-bold text-dark">{name}</div>
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
        
      }
      
    }
    


}else{
    display= "No Characters Found";
}

return (
  <div className="container">
    <div className="row justify-content-center">
      {display}
    </div>
  </div>
)
  
}

export default Favourite