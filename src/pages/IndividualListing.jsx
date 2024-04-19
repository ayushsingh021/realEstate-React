import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';



function IndividualListing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

 

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

//   console.log(listing)
  if (loading) {
    return <Loader />;
  }

  return(
    <main className="p-1">
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={15}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
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
  </main>
  )
 
}

export default IndividualListing;
