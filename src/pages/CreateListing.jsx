import React, { useState } from 'react'
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getAuth} from 'firebase/auth';
import {v4 as uuidv4} from 'uuid';
import { Timestamp, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {db} from '../firebase'
import {  useNavigate } from 'react-router';

export default function CreateListing() {
    const auth = getAuth();
    const navigate =  useNavigate();
    const [geolocationApiEnabled, setGeolocationApiEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const [formData, setFormData] = useState({
        type : "rent",
        name :"",
        bedrooms : 1,
        bathrooms : 1,
        parking : false,
        furnished : false,
        address :"",
        latitude : 0,
        longitude : 0,
        description : "",
        offer : false,
        regularPrice : 0,
        discountedPrice : 0,
        images : {}

    })

    const {type,name,bedrooms, bathrooms ,parking, furnished , address,latitude,longitude, description,offer,regularPrice,discountedPrice,images} = formData;
    
    function onChange(e){
     
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }
        //files
        if(e.target.files){setFormData((prevState) =>({
            ...prevState,
            images : e.target.files
        }))}
        //text/boolean/number
        if(!e.target.files){setFormData((prevState) =>({
            ...prevState,
            [e.target.id] : boolean ?? e.target.value, //if boolean null then five e.target.value else store boolean's value
        }))}


    }
    async function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        if(+discountedPrice >= +regularPrice){
            setLoading(false);
            toast.error('Oops! Discount Price exceeds Regular Price');
            return;
        }
        if(images.length > 6){
            setLoading(false);
            toast.error('Oops! Images should be 6 only');
            return;
        }
        //geocodeApi debit card use karke karna hoga -- pause
        let geolocation = {}
        // let location
        // if(geolocationApiEnabled){
        //     const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json/address=${address}&
        //     key=${process.env.REACT_APP_GEOCODE_API_KEY}`
        //     );
        //     const data = response.json();
        //     geolocation.lat = data.result[0]?.geometry.location.lat ?? 0;
        //     geolocation.lng = data.result[0]?.geometry.location.lng ?? 0;

        //     location = data.status === "ZERO_RESULTS" && undefined;
        //     if(location === undefined )){
        //         setLoading(false);
        //         toast.error("Please Enter Correct Address");
        //         return;
        //     }
        // }
        if(!geolocationApiEnabled){
            geolocation.lat  =latitude;
            geolocation.lng = longitude;
        }
        //from referring documentation 
        async function storeImage(image){
            return new Promise ((res,rej) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed', 
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                }, 
                (error) => {
                  rej(error);
                }, 
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                   res(downloadURL);
                  });
                }
              );


            })
        }
        const imgUrls = await Promise.all(
            [...images]
            .map((img) => storeImage(img)))
            .catch((error) => {
                setLoading(false);
                toast.error("Images Not Uploaded")
                return;
            });
            // console.log(imgUrls);
        const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp : serverTimestamp(),
            userRef : auth.currentUser.uid, //who created the listing is stored
        }
        //these variables are used as a placeholder in frontend not send 
        //to backend we send differnt values to backend thats why deleting
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountedPrice;
        delete formDataCopy.latitude;
        delete formDataCopy.longitude;

        //adding to database
        const docRef = await addDoc(collection(db , "listings"), formDataCopy);
        setLoading(false);
        toast.success("Listing Created");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
        


    }
    if(loading){
        return <Loader/>
    }
  return (
    <main className='w-screen max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'
        >Create a Listing</h1>
        <form onSubmit={onSubmit}>
             <p className='text-lg font-semibold mt-6'>Sell / Rent</p>
             <div className='flex'>
                <button type='button' id='type' value="sell"
                onClick={onChange}
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    type === "rent" ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    Sell
                </button>
                <button type='button' id='type' value="rent"
                onClick={onChange}
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    type === "sell" ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    Rent
                </button>

             </div>
             <p className='text-lg font-semibold mt-6'>Name</p>
             <input 
             type="text" 
             id='name'
             value={name} 
             onChange={onChange}
             required placeholder='Name' maxLength="32" minLength="10" 
             className='w-full px-4 py-2 text-xl text-gray-700
             bg-white border border-gray-300 rounded transition duration-150
             ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 '
             />
             <div className='flex justify-between'>
                <div>
                    <p className='text-lg font-semibold mt-6'>Beds</p>
                    <input type="number"
                     id='bedrooms'
                     value={bedrooms}
                     onChange={onChange}
                     required
                     max="1000"
                     min = "1"
                     className='w-full px-4 py-2 text-xl text-gray-700
                     bg-white border border-gray-300 rounded transition duration-150
                     ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                     />
                </div>
                <div>
                    <p className='text-lg font-semibold mt-6'>Baths</p>
                    <input type="number"
                     id='bathrooms'
                     value={bathrooms}
                     onChange={onChange}
                     required
                     max="1000"
                     min = "1"
                     className='w-full px-4 py-2 text-xl text-gray-700
                     bg-white border border-gray-300 rounded transition duration-150
                     ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                     />
                </div>
             </div>

             <p className='text-lg font-semibold mt-6'>Parking Spot</p>
             <div className='flex'>
                <button type='button' id='parking' value={true}
                onClick={onChange}
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    !parking ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    Yes
                </button>
                <button type='button' id='parking' value={false}
                onClick={onChange}
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    parking ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    No
                </button>

             </div>
             <p className='text-lg font-semibold mt-6'>Furnished</p>
             <div className='flex'>
                <button type='button' id='furnished' value={true}
                onClick={onChange}
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    !furnished ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    Yes
                </button>
                <button type='button' id='furnished' value={false}
                onClick={onChange}
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    furnished ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    No
                </button>

             </div>

             <p className='text-lg font-semibold mt-6'>Address</p>
             <textarea 
             type="text" 
             id='address'
             value={address} 
             onChange={onChange}
             required
              placeholder='Address' 
             className='w-full px-4 py-2 text-xl text-gray-700
             bg-white border border-gray-300 rounded transition duration-150
             ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 '
             />

            {!geolocationApiEnabled && (
                <div className='flex space-x-6'>
                    <div className=''>
                        <p className='text-lg font-semibold'>Latitude</p>
                        <input type="number" name="latitude" id="latitude" 
                        value={latitude}
                         onChange={onChange}
                         required 
                         className='w-full px-4 py-2 text-xl text-gray-700
                         bg-white border border-gray-300 rounded transition duration-150
                         ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                         max="90"
                         min ="-90"
                         />
                    </div>
                    <div className=''>
                        <p className='text-lg font-semibold'>Longitude</p>
                        <input type="number" name="longitude" id="longitude" 
                        value={longitude}
                         onChange={onChange}
                         required
                         className='w-full px-4 py-2 text-xl text-gray-700
                         bg-white border border-gray-300 rounded transition duration-150
                         ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600' 
                         max="180"
                         min ="-180"
                         />

                    </div>
                </div>
            )}

             <p className='text-lg font-semibold '>Description</p>
             <textarea 
             type="text" 
             id='description'
             value={description} 
             onChange={onChange}
             required
              placeholder='Description' 
             className='w-full px-4 py-2 text-xl text-gray-700
             bg-white border border-gray-300 rounded transition duration-150
             ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 '
             />

            <p className='text-lg font-semibold '>Offer</p>
             <div className='flex mb-6'>
                <button type='button' id='offer' value={true}
                onClick={onChange}
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    !offer ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    Yes
                </button>
                <button type='button' id='offer' value={false}
                onClick={onChange}
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    offer ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    No
                </button>

             </div>
            <div className='flex items-center mb-6'>
               <div >
               <p className='text-lg font-semibold'>Regular Price</p>
                 <div className=' w-full flex items-center justify-center space-x-6' >
                 
                   <input type="number" id='regularPrice' value={regularPrice} required
                   max="10000000000" min="200" 
                   onChange={onChange}
                   className='w-full px-4 py-2 text-xl text-gray-700
                   bg-white border border-gray-300 rounded transition duration-150
                   ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600  '/> 
                    {type === "rent" && <div>
                    <p className='w-full text-md whitespace-nowrap font-semibold'> ₹ / Month</p>
                    </div>}                
                </div>
                
               </div>
            </div>
                {/* conditional */}
            {offer && (
                <div className='flex items-center mb-6'>
                <div >
                <p className='text-lg font-semibold'>Discounted Price</p>
                  <div className=' w-full flex items-center justify-center space-x-6' >
                  
                    <input type="number" id='discountedPrice' value={discountedPrice} required={offer}
                    max="10000000000" min="200" 
                    onChange={onChange}
                    className='w-full px-4 py-2 text-xl text-gray-700
                    bg-white border border-gray-300 rounded transition duration-150
                    ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600  '/> 
                     {type === "rent" && <div>
                     <p className='w-full text-md whitespace-nowrap font-semibold'> ₹ / Month</p>
                     </div>}                
                 </div>
                 
                </div>
             </div>
            )}
            <div className='mb-6'>
                <p className='text-lg font-semibold'>Images</p>
                <p className='text-md text-gray-600'>The first image will be cover(max. 6)</p>
                <input type="file" 
                 id="images"
                 accept=".jpg, .png, .jpeg"
                 multiple
                 required
                 onChange={onChange} 
                 className='w-full px-3 py-1.5 bg-white border border-gray-300 rounded transition duration-159
                 ease-in-out mb-2 focus:bg-white focus:border-slate-600'
                 />
            </div>
            <button type='submit'
        className=' mb-6 w-full text-white uppercase text-sm font-medium bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 active : bg-blue-800'>
          Create Listing    
        </button>
        </form>
    </main>
  )
}
