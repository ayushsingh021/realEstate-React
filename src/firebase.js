// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore" //for storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCszRUk9OLUFwoe6FknNhGeghvwZ9nrj2k",
  authDomain: "realestate-react-app-a5dea.firebaseapp.com",
  projectId: "realestate-react-app-a5dea",
  storageBucket: "realestate-react-app-a5dea.appspot.com",
  messagingSenderId: "409949595198",
  appId: "1:409949595198:web:a2e7f7357de45a516a936f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();