import { onLog } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {useState , React} from 'react'
import { useNavigate } from 'react-router';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name : auth.currentUser.displayName,
    email :auth.currentUser.email,
  });
  function onLogOut(){
    auth.signOut();
    navigate("/");

  }

  const {name , email} = formData
  return (
    <>
    <section className='flex flex-col px-6 py-12 max-w-6xl mx-auto'>
      <h1 className='text-3xl text-center
      mt-6 font-bold'>
        My Profile
      </h1>
      <div className='w-full mt-6 px-3'>
        <form >
          {/* name input/\ */}
          <input type="text " id='name' value={name} 
          disabled className='mb-6 w-full px-4 py-2 test-xl
          text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out'/>

           {/* email input/\ */}
           <input type="email " id='email' value={email} 
          disabled className='mb-6 w-full px-4 py-2 test-xl
          text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out'/>

          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>
              Do you want to change your name?
              <span className='text-red-600 hover:text-red-700
              transition ease-in-out
              duration-200 ml-1 cursor-pointer'>Edit</span>
            </p>
            <p onClick={onLogOut} className='text-blue-600 hover:text-blue-800
            transition duration-200 ease-in-out cursor-pointer'>
              Sign out
            </p>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}
