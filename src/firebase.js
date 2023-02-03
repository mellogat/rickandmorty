import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoB1jFVzyV_keNKufL2NW3YlXdxSCiht4",
  authDomain: "rickmorty-f3746.firebaseapp.com",
  projectId: "rickmorty-f3746",
  storageBucket: "rickmorty-f3746.appspot.com",
  messagingSenderId: "770020428174",
  appId: "1:770020428174:web:794bbc0111ad0b2997bcdf",
  databaseURL:"https://rickmorty-f3746-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app);
export {auth,db}