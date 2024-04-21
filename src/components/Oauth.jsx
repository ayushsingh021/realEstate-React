import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    try {
      
      const auth = getAuth();
      const provider  = new GoogleAuthProvider();
      const result = await signInWithPopup(auth , provider);
      const user  = result.user;
      // console.log(user);
      //cheak if user already existed or not
      const docRef = doc(db , "users" , user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()){
        await setDoc(docRef , {
          name : user.displayName,
          email : user.email,
          timestamp : serverTimestamp()
        })
      }
      //home page navigation after authencticaitn
      navigate("/")

    } 
    catch (error) {
      toast.error('Google authentication failed!');
      console.log(error);
    }
  }
  return (
    

    <div>
      <button type="button"
      onClick={onGoogleClick} className='flex items-center 
      justify-center w-full
      bg-red-700 text-white
      lg:px-7 lg:py-3 py-2.5 uppercase
      hover:bg-red-800 
      active:bg-red-900
      hover:shadow-lg
      active:shadow-lg
      transition duration-150
      ease-in-out rounded'>
        <FcGoogle className='text-2xl
        bg-white
        rounded-full mr-2'/>
        Continue with Google
      </button>
    </div>
  )
}
