import React, { useContext, useEffect, useState } from 'react';
import img1 from '../../../assets/Signup bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../../Provider/AuthProvider';
import { PiSpinnerBallFill } from 'react-icons/pi';

const Signup = () => {
  const { user, loading, setLoading, createUser, signInGoogle  } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);  // Track loading state
  const navigate = useNavigate();
 
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleGoogleSignin = async () => {
    try{
      await signInGoogle()
      setLoading(false)
    } catch(err){
      console.log(err.message)
      setLoading(false)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      const error = 'Password should be at least 6 characters';
      return setError(error);
    } else if (!/^(?=.*[a-z])(?=.*?[#?!@$%^&*-])(?=.*[A-Z]).+$/.test(password)) {
      const error = 'Password should contain at least one capital letter and one special character';
      return setError(error);
    } else {
      setError('');
    }

    try { 
      await new Promise((resolve) => setTimeout(resolve, 100));
      const result = await createUser(email, password);
      console.log(result);
      // You can also navigate after successful signup if needed
      setLoading(false); // Stop loading after signup is successful
    } catch (err) {
      console.log(err);
      setLoading(false); // Stop loading if there's an error
    }
    console.log(name, email, password);
  };
 

  return (
    <div 
      className='min-h-[100vh] flex justify-center items-center bg-cover bg-center' 
      style={{ backgroundImage: `url(${img1})` }}
    >
      <form onSubmit={handleCreateUser} className='max-w-[450px] w-full pb-5 bg-[#e9defae5]  bg-opacity-90 rounded-lg shadow-lg'>
        <div className='w-full mx-auto h-4 rounded-none bg-[#578FCA]'></div>
        <h1 className='text-center font-mono text-3xl pt-8 font-semibold text-[#578FCA]'>Sign up</h1>
        <p className='text-center pt-2'>Let's get started with your</p>
        <div className='space-y-5 mx-auto mt-4 max-w-[350px] p-5 w-full'>
          <input type="text" name='name' className='w-full px-4 py-2  rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' placeholder='Name' required />
          <input type="email" name='email' className='w-full px-4 py-2 rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' placeholder='Email' required />
          <div className='relative'>
            <input name='password' type={passwordVisible ? "text" : "password"} className='w-full px-4 py-2 rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' placeholder='Password ***' />
            {error && <p>{error}</p>}
            <a type='button' className="absolute right-3 top-3 text-gray-500" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <FaEyeSlash /> : <RiEyeCloseLine />}
            </a>
          </div>
          <div>
            
              <button type="submit" className={`w-full p-2 rounded-md text-slate-100 font-semibold flex justify-center items-center ${loading ? 'bg-[#497D74] cursor-not-allowed' : 'bg-[#497D74]'}`}>
                  {loading ? <PiSpinnerBallFill className='animate-spin text-2xl m-auto'/> : 'Sign up'}
              </button>
            
          </div>
          <p className='text-center text-sm'>Already have an account? <Link to='/login' className='text-[#578FCA] font-semibold underline'>Login!</Link></p>
          <div onClick={handleGoogleSignin} className='flex mx-1 cursor-pointer items-center px-7 py-1 border-[1px] shadow-md border-gray-400 rounded-md'>
            <p className='text-2xl'> <FcGoogle /></p>
            <button type="button" className='w-full p-1 rounded-md font-semibold'>Continue with Google</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
