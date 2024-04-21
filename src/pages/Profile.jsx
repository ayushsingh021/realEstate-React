import { onLog } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { BiHomeHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ListingItem from "../components/ListingItem";
import { deleteDoc } from "firebase/firestore";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [chageDatails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update displayname in the firebase auth it is changed here
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name: name,
        });
        toast.success("Updated Successfully");
      }
    } catch (error) {
      toast.error("Could Not Change");
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function onLogOut() {
    auth.signOut();
    navigate("/");
  }

  const { name, email } = formData;

  if (loading) {
    return <Loader />;
  }

  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }

  // console.log(listings);
  return (
    <>
      <div className="flex ">
        <section className="flex flex-col px-6 py-12 max-w-6xl mx-auto">
          <h1
            className="text-3xl text-center
      mt-6 font-bold"
          >
            My Profile
          </h1>
          <div className="w-full mt-6 px-3">
            <form>
              {/* name input/\ */}
              <input
                type="text "
                id="name"
                value={name}
                disabled={!chageDatails}
                onChange={onChange}
                className={`mb-6 w-full px-4 py-2 test-xl
          text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out ${
            chageDatails && "bg-blue-200 focus: bg-blue-200"
          }`}
              />

              {/* email input/\ */}
              <input
                type="email "
                id="email"
                value={email}
                disabled
                className="mb-6 w-full px-4 py-2 test-xl
          text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out"
              />

              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
                <p className="flex items-center">
                  Do you want to change your name?
                  <span
                    className="text-red-600 hover:text-red-700
              transition ease-in-out
              duration-200 ml-1 cursor-pointer"
                    onClick={() => {
                      chageDatails && onSubmit();
                      setChangeDetails((prev) => !prev);
                    }}
                  >
                    {chageDatails ? "Apply" : "Edit"}
                  </span>
                </p>
                <p
                  onClick={onLogOut}
                  className="text-blue-600 hover:text-blue-800
            transition duration-200 ease-in-out cursor-pointer"
                >
                  Sign out
                </p>
              </div>
            </form>
            <button
              type="submit"
              className="w-full text-white uppercase text-sm font-medium bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 active : bg-blue-800"
            >
              <Link
                to="/create-listing"
                className="flex justify-center items-center"
              >
                <BiHomeHeart className="mr-2 text-3xl rounded-full p-1 border-2" />
                Sell or Rent Your Home
              </Link>
            </button>
          </div>
        </section>
      </div>
      <div>
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold">My Listings</h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
