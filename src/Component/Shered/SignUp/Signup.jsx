import React, { useState } from 'react';
import img1 from '../../../assets/Signup bg.jpg';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
 
  return (
    <div 
      className='min-h-[100vh] flex justify-center items-center bg-cover bg-center' 
      style={{ backgroundImage: `url(${img1})` }}
    >
      <form className='max-w-[450px] w-full pb-5 bg-[#e9defae5]  bg-opacity-90 rounded-lg shadow-lg'>
        <div className='w-full mx-auto h-4 rounded-none bg-[#578FCA]'></div>
        <h1 className='text-center font-mono text-3xl pt-8 font-semibold text-[#578FCA]'>Sign up</h1>
        <p className='text-center pt-2'>Let's get started with your</p>
        <div className='space-y-5 mx-auto mt-4 max-w-[350px] p-5 w-full'>
          <input type="text" className='w-full px-4 py-2  rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' placeholder='Name' />
          <input type="email" className='w-full px-4 py-2 rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' placeholder='Email' />
          <div className='relative'>
            <input type= {passwordVisible ? "text" : "password" }  className='w-full px-4 py-2 rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' placeholder='Password' />
            <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <RiEyeCloseLine />}
              </button> 
          </div>        
          <div>
            <button type="button" className='w-full bg-[#497D74] p-2 rounded-md text-slate-100 font-semibold'>Sign Up</button>
          </div>
          <p className='text-center text-sm'>Already have an account? <Link className='text-[#578FCA] font-semibold underline' to='/login'>Login!</Link></p>
          <div className=' flex cursor-pointer items-center px-10 py-1 border-[1px] shadow-md border-gray-400 rounded-md'>
            <p className='text-2xl'> <FcGoogle /></p>
            <button type="button" className='w-full p-2 rounded-md  font-semibold'>Continue with Google</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
