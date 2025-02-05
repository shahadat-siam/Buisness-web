import React, { useContext } from 'react'; 
import LandingRoot from '../../Root/LandingRoot';
import { AuthContext } from '../../Provider/AuthProvider';
import Signup from '../Shered/SignUp/Signup';
 

const Home = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      {user ? <LandingRoot/> : <Signup/>} 
      {/* {user && <Signup/>} */}
    </div>
  );
};

export default Home;