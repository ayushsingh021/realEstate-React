import React, { useEffect, useState } from 'react'
import {MdHome,MdPercent, MdPermIdentity} from "react-icons/md";
import { ReactComponent as Logo } from '../assets/logobrand.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import {getAuth,onAuthStateChanged} from "firebase/auth";
export default function Header() {
    const [pageState ,setPageSate] = useState("Sign-In");
    const auth = getAuth();
    useEffect(() =>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setPageSate("Profile");
            }else{
                setPageSate("Sign-In");
            }
        })
    },[auth])
  
  
  return (
   
    <div className='fixed top-0 left-0 h-screen w-16 m-0
                    flex flex-col
                    bg-gray-900 text-white shadow-lg z-50
                   '> 
                  
           
             
      {/* Logo is an actual React component */}
      <Logo className='sidebar-icon' />
    
        <HeaderIcon pathWay = {"/"} way={"/"} icon={<MdHome size="28" />} text='Home'/>
        <HeaderIcon pathWay={"/offers"}  way={"/offers"} icon={<MdPercent size="28" />}text='Offers'/>
        <HeaderIcon pathWay={"/profile"} way={"/sign-in" || "/profile"} icon={<MdPermIdentity size="28"/>} text={pageState}/>
    
    </div>
  )
};

function HeaderIcon({ icon , text = 'tooltip' ,way ,pathWay}) {
    const location = useLocation(); //returns the path of the object -- .pathname is imp part
    const navigate = useNavigate() ; //helps to do navigation in react routes

    function pathMatchRoute(route){ //will change css if clicked or not
        if(route === location.pathname){
            return true;
        }
    }

    return (
        <div onClick={()=>navigate(pathWay)} className = {`sidebar-icon group ${pathMatchRoute(way) && "bg-green-600 text-white"}`}>
            {icon}
            <span class = "sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>

    );
}
