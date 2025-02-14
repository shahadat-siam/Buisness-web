 
import { Outlet } from 'react-router-dom'; 
import Navbar from '../Component/Shered/Navbar';
import SideBar from '../Component/HomePage/SideBar';

const LandingRoot = () => { 
  return (
      <div className='min-h-[100vh]'> 
        <Navbar/>
        <div className=' max-w-7xl mx-auto relative md:flex'>
          <div><SideBar/></div>
            <div className='md:ml-52 ml-3 mt-20 px-4'>
              <Outlet/>
            </div> 
        </div>
      </div>
  );
};

export default LandingRoot;