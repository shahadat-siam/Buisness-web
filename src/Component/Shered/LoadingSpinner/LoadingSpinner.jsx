import React from 'react';
import './spinner.css'
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="dots-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  );
};

export default LoadingSpinner;