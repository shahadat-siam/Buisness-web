import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';  
import CashFlowDialog from '../DialogBox/DialogBox';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#216d6e] shadow-md' : 'bg-[#3D8D7A]'
      }`}
    >
      <div className="flex  mx-auto px-6 py-4 justify-between items-center">
        {/* Logo Section */}
        <div>
          <Link to="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold text-white">
              My<span className="text-orange-400">Soft</span>
            </span>
          </Link>
        </div>

        {/* Links Section */}
        <div className='flex items-center justify-center space-x-2'>
          <div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1 text-white bg-[#235c5e55] rounded-sm " >Cash Flow
          </button>
          {isOpen && <CashFlowDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
          </div>
          <div className="text-white md:pr-4 pr-12 font-semibold">
              {user?.displayName || 'User'}!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
