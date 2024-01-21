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
import CreateListing from "./pages/CreateListing";
import './styles/style.css';



function App() {

  return (
   
<section class="home-section">


     <Router>
        <Header />
        

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
          <Route path="/create-listing" element={<CreateListing />} />

        </Routes>
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


</section>
  );
}

export default App;
