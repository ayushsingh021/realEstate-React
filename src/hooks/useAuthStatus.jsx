import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {useEffect,useState } from 'react'

export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        //onAuthStateChanged is a firebase method used to cheak wheather user is there or not
        onAuthStateChanged(auth , (user) => {
            // console.log(user);
            if(user){
                setLoggedIn(true);
            }
            setCheckingStatus(false);
        })
    });
  return {loggedIn , checkingStatus};
}
