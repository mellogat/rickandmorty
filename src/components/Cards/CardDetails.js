import React , {useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import styles from "./Cards.module.scss"
import Table from '../Info/Table';
import FavButton from '../FavButton/FavButton';

const CardDetails = () => {

  let {id} = useParams();

  let [fetchedData,updateFetchedData] = useState([]);
  let {name, image,origin,location,gender,species,status,type} = fetchedData;
  let [results, setResults] = useState([]);

    let api=`https://rickandmortyapi.com/api/character/${id}`;

    useEffect(()=> {
        (async function() {
          let data = await fetch(api).then((res) => res.json());
          updateFetchedData(data);

          let a = await Promise.all(
            data.episode.map((elem)=>{
                return fetch(elem).then(res=>res.json());
            })
          )
        setResults(a);
        })();
      },[api]);

  return (
    <div className='container d-flex justify-content-center'>
        <div className="d-flex flex-column gap-3">
            <h1 className="text-center">{name}</h1>
            <img src={image} alt="" className={` ${styles.imgBorder} img-fluid rounded-circle`}/>
            {(()=>{
                    if(status === "Dead"){
                        return(
                            <div className={`${styles.mbn1} badge bg-danger fs-4 mbn1`}>{status}</div>
                        )
                    }
                    else if(status === "Alive"){
                        return(
                            <div className={`${styles.mbn1} badge bg-success fs-4 mbn1`}>{status}</div>
                        )
                    }
                    else{
                        return(
                            <div className={`${styles.mbn1} badge bg-secondary fs-4 mbn1`}>{status}</div>
                        )
                    }
                })()}

            <div className="content" >
                <FavButton id={id}/> 
                <div className="mt-3">
                    <span className='fw-bold '>Gender : </span>{gender}
                </div>
                <div className="">
                    <span className='fw-bold'>Species : </span>{species}
                </div>
                <div className="">
                    <span className='fw-bold'>Type : </span>{type===""? "unknown" : type}
                </div>
                <div className="">
                    <span className='fw-bold'>Origin : </span>{origin?.name}
                </div>
                <div className="">
                    <span className='fw-bold'>Location : </span>{location?.name}
                </div>
            </div>


            <Table  results={results} page="/episodesList/" />
        </div>
    </div>
  )
}

export default CardDetails