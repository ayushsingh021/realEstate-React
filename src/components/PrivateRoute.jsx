import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Loader from './Loader';


export default function PrivateRoute() {
   const {loggedIn,checkingStatus} = useAuthStatus(); //custom hook to cheak if logged in or not
   if(checkingStatus){
    return <Loader/>;
   } 
  //outlet is creating the private dom if loggedin is true then go to Outlet else back to sign in 
   return loggedIn ? <Outlet/> : <Navigate to='/sign-in'/>
}
