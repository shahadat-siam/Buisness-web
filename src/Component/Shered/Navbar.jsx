import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? 'bg-slate-700 shadow-md' : 'bg-slate-600'
      }`}
    >
      <div className="flex max-w-7xl mx-auto px-6 py-4 justify-between items-center">
        {/* Logo Section */}
        <div>
          <Link to="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold text-white">
              My<span className="text-orange-400">Soft</span>
            </span>
          </Link>
        </div>

        {/* Links Section */}
        <div>
          {!user ? (
            <ul className="flex space-x-4">
              <Link to="/signup">
                <li className="px-4 py-2 bg-[#497D74] text-white rounded-md font-semibold hover:bg-[#355c54] transition-colors duration-200">
                  Sign Up
                </li>
              </Link>
              <Link to="/login">
                <li className="px-4 py-2 bg-[#497D74] text-white rounded-md font-semibold hover:bg-[#355c54] transition-colors duration-200">
                  Login
                </li>
              </Link>
            </ul>
          ) : (
            <div className="text-white md:pr-4 pr-12 font-semibold">Welcome, {user.displayName || 'User'}!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
