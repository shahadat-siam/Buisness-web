import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'; // For advanced animation
import { FcCollapse, FcInternal } from 'react-icons/fc';

const MenuItem = ({ label, address, icon: Icon, subItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevents the NavLink from being triggered
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* Main Menu Item */}
      <div className="flex items-center justify-between px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700">
        <NavLink
          to={address}
          end
          className={({ isActive }) =>
            `flex items-center ${isActive ? 'text-gray-700' : 'text-gray-600'}`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="mx-4 font-medium">{label}</span>
        </NavLink>
        {subItems.length > 0 && (
          <button onClick={toggleDropdown} className="focus:outline-none">
            {isOpen ? <FcCollapse className="w-4 h-4" /> : <FcInternal className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Dropdown with Animation */}
      {subItems.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`overflow-hidden ml-8 border-l border-gray-300 ${isOpen ? 'mt-2' : ''}`}
        >
          {subItems.map((subItem) => (
            <NavLink
              key={subItem.address}
              to={subItem.address}
              className={({ isActive }) =>
                `block px-4 py-2 my-1 text-sm transition-colors duration-300 transform hover:bg-gray-200 hover:text-gray-700 ${
                  isActive ? 'bg-gray-200 text-gray-700' : 'text-gray-600'
                }`
              }
            >
              {subItem.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MenuItem;
