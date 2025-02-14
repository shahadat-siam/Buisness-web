import React, { useContext, useEffect, useState } from 'react';
import img1 from '../../../assets/Signup bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc'; 
import { AuthContext } from '../../../Provider/AuthProvider';
import { PiSpinnerBallFill } from 'react-icons/pi';
import { TbFidgetSpinner } from 'react-icons/tb';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {user, login, loading, setLoading, signInGoogle } = useContext(AuthContext);
  // console.log(loading)

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
  
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true)
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      setLoading(false);
      return;
    } else if (!/^(?=.*[a-z])(?=.*?[#?!@$%^&*-])(?=.*[A-Z]).+$/.test(password)) {
      setError('Password should contain at least one capital letter and one special character');
      setLoading(false);
      return;
    } else {
      setError('');
    }

    try { 
      await new Promise((resolve) => setTimeout(resolve, 100));
      await login(email, password);
      form.reset(); 
    } catch (err) {
      setError('Failed to log in. Please check your email and password.');
      console.error('Login error:', err);
      setLoading(false)
    }  
  };

  return (
    <div 
      className='min-h-[100vh] flex justify-center items-center bg-cover bg-center' 
      style={{ backgroundImage: `url(${img1})` }}
    >
      <form onSubmit={handleLogin} className='max-w-[450px] w-full pb-5 bg-[#e9defae5] bg-opacity-90 rounded-lg shadow-lg'>
        <div className='w-full mx-auto h-4 bg-[#578FCA]'></div>
        <h1 className='text-center font-sans text-4xl pt-8 font-semibold text-[#578FCA]'>Login</h1>
        <p className='text-center pt-2'>Let's get started with your account</p>
        <div className='space-y-5 mx-auto mt-4 max-w-[350px] p-5 w-full'>
          <input 
            type="email" 
            name='email' 
            className='w-full px-4 py-2 rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' 
            placeholder='Email' 
            required 
          />
          <div className='relative'>
            <input 
              name='password' 
              type={passwordVisible ? "text" : "password"}  
              className='w-full px-4 py-2 rounded-md outline-none border-[1px] focus-within:shadow-lg focus:border-[#578FCA]' 
              placeholder='Password ***' 
              required
            />
            <a 
              type='button' 
              className="absolute right-3 top-3 text-gray-500 cursor-pointer" 
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <RiEyeCloseLine />}
            </a>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <button 
              type="submit" 
              className={`w-full p-2 rounded-md text-slate-100 font-semibold flex justify-center items-center ${loading ? 'bg-[#497D74] cursor-not-allowed' : 'bg-[#497D74]'}`}
              >
               {loading ? <TbFidgetSpinner className='animate-spin text-2xl m-auto'/> : 'Login'}
            </button>
          </div>
          <p className='text-center text-sm'>
            Don't have an account? 
            <Link to='/signup' className='text-[#578FCA] font-semibold underline ml-1'>
              Sign up!
            </Link>
          </p>
          <div onClick={handleGoogleSignin} className='flex mx-1 cursor-pointer items-center px-7 py-1 border-[1px] shadow-md border-gray-400 rounded-md'>
            <FcGoogle className='text-2xl' />
            <button 
              type="button" 
              className='w-full p-1 font-semibold text-center'
            >
              Continue with Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
