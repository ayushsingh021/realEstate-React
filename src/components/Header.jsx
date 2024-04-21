import React, { useEffect, useState } from "react";
import { MdHome, MdPercent, MdPermIdentity } from "react-icons/md";
import { ReactComponent as Logo } from "../assets/logobrand.svg";
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
        <h1 className="text-green-600 uppercase text-6xl rotate-[-90deg] absolute bottom-[20%] left-[-130%]">
            Zeroiota
        </h1>
       
        <h1 className="text-gray-500 uppercase text-6xl rotate-[-90deg] absolute top-[40%] left-[-130%]">
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
