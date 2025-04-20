import { Outlet } from 'react-router-dom'; 
import Navbar from '../Component/Shered/Navbar';
import SideBar from '../Component/HomePage/SideBar';

const LandingRoot = () => { 
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <div className="relative md:flex w-full">
        {/* Sidebar */}
        <div className="md:w-52 w-full">
          <SideBar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 mt-20 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LandingRoot;
