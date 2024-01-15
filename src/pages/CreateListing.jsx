import React, { useState } from 'react'

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type : "rent",
        name :"",
        bedrooms : 1,
        bathrooms : 1,
        parking : false,
        furnished : false,
        address :"",
        description : "",
        offer : false,
        regularPrice : 0,
        discountedPrice : 0,

    })

    const {type,name,bedrooms, bathrooms ,parking, furnished , address,description,offer,regularPrice,discountedPrice} = formData;
    function onChange(){}
  return (
    <main className='w-screen max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'
        >Create a Listing</h1>
        <form action="">
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
                <button type='button' id='type' value="sell"
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
                     max="50"
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
                     max="50"
                     min = "1"
                     className='w-full px-4 py-2 text-xl text-gray-700
                     bg-white border border-gray-300 rounded transition duration-150
                     ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                     />
                </div>
             </div>

             <p className='text-lg font-semibold mt-6'>Parking Spot</p>
             <div className='flex'>
                <button type='button' id='parking' value={false}
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
                <button type='button' id='furnished' value={false}
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
                <button type='button' id='offer' value={false}
                onClick={onChange}
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    offer ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                }`}
                >
                    Yes
                </button>
                <button type='button' id='offer' value={false}
                onClick={onChange}
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase
                shadow-md rounded hover: shadow-lg focus:shadow-lg active: shadow-lg
                transition duration-150 ease-in-out w-full ${
                    !offer ? "bg-neutral-50  text-black": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"
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
                 accept='.jpg, .png, .jpeg'
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
