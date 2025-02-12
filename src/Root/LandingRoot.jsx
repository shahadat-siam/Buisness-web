import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Component/HomePage/Sidebar'; 
import Navbar from '../Component/Shered/Navbar';

const LandingRoot = () => { 
  return (
      <div className='min-h-[100vh] max-w-7xl mx-auto relative md:flex'> 
             <Navbar/>
            <div ><SideBar/></div>
            <div className='md:ml-72 ml-8 mt-20 px-4'>
            <Outlet/>
            </div> 
        </div>
  );
};

export default LandingRoot;