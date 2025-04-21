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
  const { logout, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setLoading(false);
      navigate("/signup");
    } catch (error) {
      console.error("Failed to log out:", error);
      setLoading(false);
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
          className="fixed right-4 top-4 z-50 py-2 px-2 bg-  text-white rounded-md focus:outline-none"
          onClick={handleToggle}
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0  z-40 w-52 bg-[#FFEDFA] transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col  h-full">
          {/* Scrollable Content */}
          <div className="flex-1 sidebar-scroll overflow-y-auto mt-16">
            <nav className="space-y-2">
              <MenuItem label="Statistics" address="/lroot" icon={FcCircuit} />
              <MenuItem label="Dashboard" address="/lroot/dashboard" icon={FcPositiveDynamic} />
              <MenuItem
                label="Sale"
                address="/lroot/sale"
                icon={FcApprove}
                subItems={[
                  { label: "Sale", address: "/lroot/sale" },
                  { label: "Payment", address: "/lroot/sale/payment" },
                  { label: "Customer", address: "/lroot/sale/customer" },
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

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-[#fde1f6] hover:text-gray-700 transition-colors duration-300"
            >
              <FcImport className="w-5 h-5" />
              <span className="ml-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
