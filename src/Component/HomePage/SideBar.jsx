import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai"; 
import { GrLogout } from "react-icons/gr";
import { Link,  } from "react-router-dom";
// import logo from "../../assets/images/OriginalLogo.png";
import { BsGraphUp } from "react-icons/bs";
import MenuItem from "../Shered/MenuItem"; 

const SideBar = () => {
  const [isActive, setActive] = useState(false);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <div className="flex items-center ">
                {/* <img src={logo} className="md:w-16 w-12" alt="" /> */}
                <a className=" text-center font-Sedan font-semibold text-2xl md:text-3xl">
                  Serve<span className=" text-orange-400">Sync</span>
                </a>
              </div>
            </Link>
          </div>
        </div>

        <button
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
          onClick={handleToggle}
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#e9defae5] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link to="/">
                <div className="flex items-center ">
                  {/* <img src={logo} className="md:w-16 w-12" alt="" /> */}
                  <a className=" text-center font-Sedan font-semibold text-2xl md:text-3xl">
                    Serve<span className=" text-orange-400">Sync</span>
                  </a>
                </div>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
             
            {/*  Menu Items */}
            <nav> 
              <MenuItem label='Statistics' address='/lroot' icon={BsGraphUp} /> 
              {/* Other Menu Option */}
              <p>this is admin menu</p>
            </nav>
          </div>
        </div>

        <div>
          <hr /> 
          <button
            // onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            {/* onClick={logOut} */}
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;