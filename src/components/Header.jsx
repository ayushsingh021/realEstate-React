import React, { useEffect, useState } from 'react'
import {MdHome,MdPercent, MdPermIdentity} from "react-icons/md";
import { ReactComponent as Logo } from '../assets/logobrand.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import {getAuth,onAuthStateChanged} from "firebase/auth";
import '../styles/style.css';
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

<div class="sidebar close">

<ul class="nav-links">
<Logo className='sidebar-icon' />
    
    <HeaderIcon pathWay = {"/"} way={"/"} icon={<MdHome size="28" />} text='Home'/>
    <HeaderIcon pathWay={"/offers"}  way={"/offers"} icon={<MdPercent size="28" />}text='Offers'/>
    <HeaderIcon pathWay={"/profile"} way={"/sign-in" || "/profile"} icon={<MdPermIdentity size="28"/>} text={pageState}/>

</ul>
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
        <li>
            {icon}
            <ul className="sub-menu blank">
                <li>{text}</li>
            </ul>
        </li>

        </div>

       

    );
}
