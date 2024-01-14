import React from 'react'
import loader from '../assets/svg/loader.svg'
export default function Loader() {
  return (
    <div className="bg-gray-500 bg-opacity-50 flex items-center justify-center fixed
    left-0 right-0 bottom-0 top-0 z-60">
        <div>
            <img src={loader} alt="Loading.." className="h-24"/>
        </div>
    </div>
  )
}
