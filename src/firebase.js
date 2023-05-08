// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF65XfdtCMjTsuc6w8mAX6iUS7fCQ7BMw",
  authDomain: "chatter-e2277.firebaseapp.com",
  projectId: "chatter-e2277",
  storageBucket: "chatter-e2277.appspot.com",
  messagingSenderId: "627784223441",
  appId: "1:627784223441:web:973f7c6a336e363667d3f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ;   
export const provider  = new GoogleAuthProvider() ; 
export const db = getFirestore(app)