import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getDatabase,ref, set, onValue,push,remove} from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDoB1jFVzyV_keNKufL2NW3YlXdxSCiht4",
  authDomain: "rickmorty-f3746.firebaseapp.com",
  databaseURL: "https://rickmorty-f3746-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rickmorty-f3746",
  storageBucket: "rickmorty-f3746.appspot.com",
  messagingSenderId: "770020428174",
  appId: "1:770020428174:web:794bbc0111ad0b2997bcdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase()
const auth = getAuth(app)

function writeUserData(userId, userEmail){
  const reference = ref(db, 'users/' + userId)     
  set(reference, {
    email: userEmail
  });
}
function writeFav(userId, favId){
  const reference = ref(db, 'users/' + userId + '/favIds')
  const newFavRef = push(reference)
  set(newFavRef, favId)
}
function removeFav(userId, favId){
  const reference = ref(db, 'users/' + userId + '/favIds')
  return new Promise((resolve) => {
    onValue(reference, (snapshot) => {
      const favorites = snapshot.val();
      const favIdRef = ref(db, `users/${userId}/favIds/${Object.keys(favorites).find(key => favorites[key] === favId)}`);
      
      remove(favIdRef).then(() => resolve());
    })
  });
}

function getData(location) {
  const reference = ref(db,location);
  return new Promise((resolve) => {
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    })
  });
}

function checkIdInList(location, id, userId) {
  const reference = ref(db, location)
  return new Promise((resolve) => {
    onValue(reference, (snapshot) => {
      const favorites = snapshot.val();
      if(typeof favorites == 'undefined'){
        return false
      }else{
        const favIdRef = ref(db, `users/${userId}/favIds/${Object.keys(favorites).find(key => favorites[key] === id)}`);  
        console.log(favIdRef) 
        if(typeof favIdRef == 'undefined'){
          return false
        }else{
          return true
        }
      }
    })
  });
}


export {auth,db,writeUserData,getData,writeFav,removeFav, checkIdInList}


