import React from 'react'
import {MdHome,MdPercent, MdPermIdentity} from "react-icons/md";
import { ReactComponent as Logo } from '../assets/logobrand.svg';
import { useLocation, useNavigate } from 'react-router-dom';
export default function Header() {
  
  
  return (
   
    <div className='fixed top-0 left-0 h-screen w-16 m-0
                    flex flex-col
                    bg-gray-900 text-white shadow-lg z-50
                   '> 
                  
           
             
      {/* Logo is an actual React component */}
      <Logo className='sidebar-icon' />
    
        <HeaderIcon way={"/"} icon={<MdHome size="28" />} text='Home'/>
        <HeaderIcon way={"/offers"} icon={<MdPercent size="28" />}text='Offers'/>
        <HeaderIcon way={"/sign-in"} icon={<MdPermIdentity size="28"/>} text='SignIn'/>
    
    </div>
  )
};

function HeaderIcon({ icon , text = 'tooltip' ,way}) {
    const location = useLocation(); //returns the path of the object -- .pathname is imp part
    const navigate = useNavigate() ; //helps to do navigation in react routes

    function pathMathRoute(route){ //will change css if clicked or not
        if(route === location.pathname){
            return true;
        }
    }

    return (
        <div onClick={()=>navigate(way)} className = {`sidebar-icon group ${pathMathRoute(way) && "bg-green-600 text-white"}`}>
            {icon}
            <span class = "sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>

    );
}
