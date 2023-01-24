// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9lsuPVpsnh4bfyB14kZHjI_t9qWyfiyU",
  authDomain: "magnet-game-21bb3.firebaseapp.com",
  databaseURL: "https://magnet-game-21bb3-default-rtdb.firebaseio.com",
  projectId: "magnet-game-21bb3",
  storageBucket: "magnet-game-21bb3.appspot.com",
  messagingSenderId: "1038819715939",
  appId: "1:1038819715939:web:494b92044aa3fda4bbc156",
  measurementId: "G-9RSQRCS42J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// init firestore service
const db = getFirestore(app)
export default db