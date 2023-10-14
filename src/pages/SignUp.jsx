import React ,{useState} from 'react'
import { MdVisibilityOff ,MdVisibility } from "react-icons/md";
import { Link } from 'react-router-dom';
import Oauth from '../components/Oauth';
import videoFile from '../assets/videobrand.mp4'

export default function SignUp() {
  //hook for show password
  const [showPassword , setShowPassword] = useState(false);

  //creating hook for signin
  //useState-- have the old and new Set data
  const [formData , setFormData] = useState({
    name:"",
    email : "",
    password : "",
  })

  const {name, email , password} = formData; //initalize lall 

  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }
  return (
    //section instead of div for better optimization
    <section>
       <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
       <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
        <video className='w-full rounded-2xl' src={videoFile}  autoPlay loop muted>
      </video>
      {/* <img  className='w-full rounded-2xl'
            src="https://plus.unsplash.com/premium_photo-1661775953246-410e3a33977c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2V5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="key" 
      /> */}
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          {/* form creation */}
          <form >
          <input className='mb-6 w-full px-4 py-2 text-xl
            text-gray-700 bh-white border-gray-300 rounded transition ease-in-out' type="text" id = "name"
             value={name} 
             //tracks the ongoing changes
             onChange={onChange}
             placeholder='Full Name' 
             />
            <input className='mb-6 w-full px-4 py-2 text-xl
            text-gray-700 bh-white border-gray-300 rounded transition ease-in-out' type="email" id = "email"
             value={email}
             //tracks the ongoing changes
             onChange={onChange}
             placeholder='Email address' 
             />

             <div className='relative mb-6 '>
             <input className='w-full px-4 py-2 text-xl
            text-gray-700 bh-white border-gray-300 rounded transition ease-in-out' 
             type= {showPassword ? "text" : "Password"}
              id = "password"
             value={password}
             //tracks the ongoing changes
             onChange={onChange}
             placeholder='Password' 
             />
             {showPassword ? ( <MdVisibilityOff className='absolute right-3 top-3 cursor-pointer text-xl' 
              onClick={()=>setShowPassword
              ((prevState) => !prevState)}/>
             ):(<MdVisibility className='absolute right-3 top-3 cursor-pointer text-xl'
              onClick={()=>setShowPassword
              ((prevState) => !prevState)} />)}
             </div>
             <div className='flex
             justify-between
             whitespace-nowrap text-sm
             sm:text-lg'>
              <p className='mb-6'>
               Have an account?
                <Link to="/sign-in"
                className='text-red-600
                hover:text-red-700
                transition duration-200
                ease-in-out
                ml-1'
                >Sign in</Link>
              </p>
              <p>
                <Link className='text-blue-600
                hover:text-blue-700
                transition duration-200
                ease-in-out
                ml-1' to="/forgot-password">Forgot password?</Link>
              </p>
             </div>
             <button className='w-full bg-blue-600 text-white
           px-7 py-3 text-sm font-medium uppercase rounded shadow-md
           hover:bg-blue-700'> 
           Sign Up
          </button>
          <div className='flex
          items-center my-4
          before:border-t before:flex-1
          before:border-gray-500
          after:border-t after:flex-1
          after:border-gray-500'>
            <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <Oauth/>
          </form>
         

        </div>
       </div>
   
    </section>
  )
}

