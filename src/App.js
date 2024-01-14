import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //routes
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";

import ForgotPassword from "./pages/ForgotPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "../src/components/PrivateRoute";

function App() {
  return (
    <div className="flex flex-row justify-between">
      <Router>
        <div className="ml-20"><Header /></div>
        <div className="flex h-screen left-22 )">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile"element={<PrivateRoute/>}>
            {/* using Outlet for private routing by calling child route if loggedin true*/}
          <Route path="/profile" element={<Profile/>} />
          </Route>
          
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
        </div>
        
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
