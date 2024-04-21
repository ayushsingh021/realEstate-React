import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import Contact from "../components/Contact.jsx";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MdEmail } from "react-icons/md";

import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// import './styles.css';

function IndividualListing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const [contactLandlord, setContactLandlord] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingID]);

  // console.log(listing)
  if (loading) {
    return <Loader />;
  }

  return (
    <main className="p-1">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[400px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[2%] right-[1%] z-10 bg-green-600 cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-white" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[6%] right-[4%] font-semibold border-1 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied!
        </p>
      )}

      <div className="m-1 lg:m-3 flex flex-col  md:flex-row max-w-6xl lg:mx-auto p-2 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full h-auto lg-[400px]">
          {/* <div className="w-full"> */}
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ₹{" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ₹{+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex flex-wrap lg:space-x-14 sm:justify-center items-center space-x-2 sm:space-x-10 text-sm mb-6 font-semibold">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="w-full text-white uppercase text-sm font-medium bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg  px-5 py-2 text-center me-2 mb-2 active : bg-blue-800"
              >
                <div className="flex justify-center items-center">
                  <MdEmail className="mr-2 text-3xl rounded-full p-1 border-2" />
                  Contact Landlord
                </div>
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
          {/* </div> */}
        </div>
        {/* <div className=" w-full h-[200px] mt-4 lg:mt-0 lg:h-[400px] z-10 overflow-x-hidden">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{height:"100%" , width : "100%"}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapContainer
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </MapContainer>
          </MapContainer>
        </div> */}
           <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
              {listing.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}

export default IndividualListing;
