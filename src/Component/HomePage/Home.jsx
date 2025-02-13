import React, { useContext } from 'react'; 
import LandingRoot from '../../Root/LandingRoot';
import { AuthContext } from '../../Provider/AuthProvider';
import Signup from '../Shered/SignUp/Signup';
import LoadingSpinner from '../Shered/LoadingSpinner/LoadingSpinner';

const Home = () => {
  const { user, loading } = useContext(AuthContext);  // Get user from AuthContext

  if (loading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div>
      {user ? <LandingRoot /> : <Signup />}  {/* Conditional rendering */}
    </div>
  );
};

export default Home;