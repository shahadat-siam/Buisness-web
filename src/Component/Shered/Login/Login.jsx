import React, { useContext, useState } from 'react';
import img1 from '../../../assets/Signup bg.jpg';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc'; 

const Login = () => { 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
   


  const hundleCreateUser = async (e) => {
    e.preventDefault()
    const form = e.target 
    const email = form.email.value
    const password = form.password.value

    if(password.length < 6) {
      const error = 'password should be 6 char'
      return setError(error)
    }
    else if(! /^(?=.*[a-z])(?=.*?[#?!@$%^&*-])(?=.*[A-Z]).+$/.test(password)){
      const error = 'at least one capital latter & special character'
      return setError(error)
    } 
    else{
      setError('')
    }

    try{
       
  
    }catch(err){
        console.log(err)
      }
  console.log( email, password)
  }
 
  
  return (
    <div 
      className='min-h-[100vh] flex justify-center items-center bg-cover bg-center' 
      style={{ backgroundImage: `url(${img1})` }}
    >
      <form onSubmit={hundleCreateUser} className='max-w-[450px] w-full pb-5 bg-[#e9defae5]  bg-opacity-90 rounded-lg shadow-lg'>
        <div className='w-full mx-auto h-4 rounded-none bg-[#578FCA]'></div>
        <h1 className='text-center font-sans text-4xl pt-8 font-semibold text-[#578FCA]'>Login</h1>
        <p className='text-center pt-2'>Let's get started with your</p>
        <div className='space-y-5 mx-auto mt-4 max-w-[350px] p-5 w-full'>
           <input type="email" name='email' className='w-full px-4 py-2 rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' placeholder='Email' required />
          <div className='relative'>
            <input name='password' type= {passwordVisible ? "text" : "password" }  className='w-full px-4 py-2 rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' placeholder='Password ***' />
               {error && <p>{error}</p>}
            <a type='button'
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <RiEyeCloseLine />}
              </a> 
          </div>        
          <div>
            <button type="submit" className='w-full bg-[#497D74] p-2 rounded-md text-slate-100 font-semibold'>Login</button>
          </div>
          <p className='text-center text-sm'>You have no account? <Link to='/signup' className='text-[#578FCA] font-semibold underline' >Sign up!</Link></p>
          <div className=' flex cursor-pointer items-center px-10 py-1 border-[1px] shadow-md border-gray-400 rounded-md'>
            <p className='text-2xl'> <FcGoogle /></p>
            <button type="button" className='w-full p-2 rounded-md  font-semibold'>Continue with Google</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
