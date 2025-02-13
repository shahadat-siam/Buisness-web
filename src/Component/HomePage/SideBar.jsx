import { useContext, useState } from "react";
import { AiOutlineBars } from "react-icons/ai"; 
import MenuItem from "../Shered/MenuItem";
import { useNavigate } from "react-router-dom";
import './sidebar.css'
import {
  FcApprove,
  FcBadDecision,
  FcCircuit,
  FcCurrencyExchange,
  FcGoodDecision,
  FcHighPriority,
  FcImport,
  FcPlus,
  FcPositiveDynamic,
  FcServices,
} from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";

const SideBar = () => {
  const [isActive, setActive] = useState(false);
  const {logout} = useContext(AuthContext)
 
  const handleLogout = async () => {
    try {
      await logout();  // Ensure the logout function completes
      navigate("/login");  // Redirect to the login page
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="flex justify-between md:hidden">
        <button
          className="mobile-menu-button fixed right-0 z-50 py-6 px-4 text-white focus:outline-none"
          onClick={handleToggle}
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`md:fixed flex flex-col mt-16 justify-between bg-[#FFEDFA] w-52 absolute inset-y-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div className="flex-1 overflow-y-auto sidebar-scroll">
          <div className="flex flex-col mt-6">
            <nav>
              <MenuItem label="Statistics" address="/lroot" icon={FcCircuit} />
              <MenuItem label="Dashboard" address="/lroot/dashboard" icon={FcPositiveDynamic} />
              <MenuItem
                label="Sale"
                address="/lroot/sale"
                icon={FcApprove}
                subItems={[
                  { label: "Sale", address: "/lroot/sale" },
                  { label: "Payment", address: "/sale/payment" },
                  { label: "Customer", address: "/sale/customer" },
                ]}
              />
              <MenuItem
                label="Purchase"
                address="/lroot/purchase"
                icon={FcGoodDecision}
                subItems={[
                  { label: "Purchase", address: "/lroot/purchase" },
                  { label: "Payment", address: "/purchase/payment" },
                  { label: "Supplier", address: "/purchase/supplier" },
                ]}
              />
              <MenuItem label="Bank" address="/lroot/bank" icon={FcCurrencyExchange} />
              <MenuItem label="Expense" address="/lroot/expense" icon={FcBadDecision} />
              <MenuItem label="Product" address="/lroot/products" icon={FcPlus} />
              <MenuItem label="Report" address="/lroot/report" icon={FcHighPriority} />
              <MenuItem label="Settings" address="/lroot/setting" icon={FcServices} />
            </nav>
          </div>
        </div>

        <div>
          <hr/>
          <button onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-[#fde1f6] hover:text-gray-700 transition-colors duration-300 transform"
          >
            <FcImport className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
