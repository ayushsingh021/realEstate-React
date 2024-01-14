import { onLog } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import {useState , React} from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name : auth.currentUser.displayName,
    email :auth.currentUser.email,
  });
  const [chageDatails , setChangeDetails] = useState(false);

  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        //update displayname in the firebase auth it is changed here 
        await updateProfile(auth.currentUser,{
          displayName:name,
        });
        
        //update name in the firestore
        const docRef = doc(db , "users" , auth.currentUser.uid)
        await updateDoc(docRef,{
          name : name
        })
        toast.success('Updated Successfully')

      }
      
    } catch (error) {
      toast.error('Could Not Change')
    }
  }
  function onChange(e){
      setFormData((prevState) =>({
        ...prevState,
        [e.target.id] : e.target.value,
      }))
  }

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
          disabled = {!chageDatails}
          onChange={onChange}
          className={`mb-6 w-full px-4 py-2 test-xl
          text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out ${chageDatails && "bg-blue-200 focus: bg-blue-200"}`}
          />

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
              duration-200 ml-1 cursor-pointer'
              onClick={()=>{
                chageDatails && onSubmit()
                setChangeDetails((prev) => !prev)
              }}
              >
                {chageDatails ? "Apply" : "Edit"}
              </span>
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
