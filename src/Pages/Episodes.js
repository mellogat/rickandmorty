import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Cards from '../components/Cards/Cards';
import InputGroup from '../components/Info/InputGroup';
import { connect } from 'react-redux';



const Episodes = ({email}) => {
    let {id} = useParams();

    //id is initialised by URL, if id doesnt exist, default id = 1

    if (id) {
      } else {
        id = 1;
      }
    let [stateID, setID] = useState(id);
    if(stateID !== id){
        id = stateID;
    }

    let [info, setInfo] = useState([]);
    let [results, setResults] = useState([]);
    let {name,air_date,episode} = info;



    //fetching episodes from rick and morty api
    let api = `https://rickandmortyapi.com/api/episode/${id}`; 
    useEffect(()=> {
        (async function() {
          let data = await fetch(api).then((res) => res.json());
          setInfo(data);

          let a = await Promise.all(
            data.characters.map((elem)=>{
                return fetch(elem).then(res=>res.json());
            })
          )
        setResults(a);
        })(); 
      },[api]);

  return (
    <div className="container">
        <div className="row mb-4">
            {/*if name is blank, unknown is placed instead of blank space */}
            <h1 className='text-center'>Episode : {name===""? "Unknown" : name}</h1>
            <h5 className='text-center'>Air Date : {air_date===""? "Unknown" : air_date} </h5>
            <h5 className='text-center'>Code : {episode===""? "Unknown" : episode} </h5>
        </div>
        <div className="row">
            <div className="col-lg-3 col-12">
                <h4 className="text-center mb-4">
                Episode List
                </h4>
                <InputGroup setID={setID}name="Episode" total ={51}/>
                </div>
            <div className="col-lg-8">
                <div className="row">
                    <Cards page="/episodes/" results={results} setID={setID}/>
                </div>
            </div>
        </div>
    </div>
    
  )
}
const mapStateToProps = (state) => ({
  email: state.email,
});

export default connect(mapStateToProps)(Episodes)