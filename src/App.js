import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //routes
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";

import ForgotPassword from "./pages/ForgotPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Category from "./pages/Category";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "../src/components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import './styles/style.css';
import EditListing from "./pages/EditListing";
import IndividualListing from "./pages/IndividualListing";



function App() {

  return (
   
<section className="home-section">


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
          <Route path="/category/:categoryName" element={<Category />} />
          
          <Route
            path="/category/:categoryName/:listingID"
            element={<IndividualListing />}
          />
          <Route path="create-listing"element={<PrivateRoute/>}>
            {/* using Outlet for private routing by calling child route if loggedin true*/}
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route path="edit-listing"element={<PrivateRoute/>}>
            {/* using Outlet for private routing by calling child route if loggedin true*/}
            <Route path="/edit-listing/:listingID" element={<EditListing />} />
          </Route>
          
         

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
