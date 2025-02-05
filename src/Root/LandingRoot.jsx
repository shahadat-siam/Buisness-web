import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Component/HomePage/Sidebar'; 

const LandingRoot = () => { 
  return (
      <div className='min-h-[100vh] relative md:flex'> 
              
            <div><SideBar/></div>
            <div className='ml-72 mt-5'>
            <Outlet/>
            </div> 
        </div>
  );
};

export default LandingRoot;