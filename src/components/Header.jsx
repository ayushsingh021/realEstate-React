import React, { useEffect, useState } from "react";
import { MdHome, MdPercent, MdPermIdentity } from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/style.css";
export default function Header() {
  const [pageState, setPageState] = useState("Sign-In");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign-In");
      }
    });
  }, [auth]);

  return (
    <div className="sidebar close">
      <ul className="nav-links">
        {/* <Logo className="sidebar-icon" /> */}
        <HeaderIcon
          pathWay={"/"}
          way={"/"}
          icon={<MdHome size="28" />}
          text="Home"
        />
        <HeaderIcon
          pathWay={"/offers"}
          way={"/offers"}
          icon={<MdPercent size="28" />}
          text="Offers"
        />
        <HeaderIcon
          pathWay={"/profile"}
          way={"/sign-in" || "/profile"}
          icon={<MdPermIdentity size="28" />}
          text={pageState}
        />
         {/* <h6 className="text-white text-xs mt-3 uppercase items-center text-center">
            Everything Real
        </h6> */}
        <h1 className="text-green-600 uppercase lg:text-6xl text-5xl rotate-[-90deg] absolute lg:bottom-[20%] lg:left-[-130%] bottom-[15%] left-[-100%]">
            Zeroiota
        </h1>
       
        <h1 className="text-gray-500 uppercase lg:text-6xl text-5xl rotate-[-90deg] absolute lg:top-[40%] lg:left-[-124%]  top-[45%] left-[-95%]">
            Housing
        </h1>
      </ul>
    </div>
  );
}

function HeaderIcon({ icon, text = "tooltip", way, pathWay }) {
  const location = useLocation(); //returns the path of the object -- .pathname is imp part
  const navigate = useNavigate(); //helps to do navigation in react routes

  function pathMatchRoute(route) {
    //will change css if clicked or not
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div
      onClick={() => navigate(pathWay)}
      className={`sidebar-icon group ${
        pathMatchRoute(way) && "bg-green-600 text-white"
      }`}
    >
      <li>
        {icon}
        <ul className="sub-menu blank">
          <li>{text}</li>
        </ul>
      </li>
    </div>
  );
}
