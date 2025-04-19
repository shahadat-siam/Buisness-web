import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import SalePost from './SalePost';

const Sale = () => {
  const [showOption, SetShowOption] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');

  const handleSummary = () => {
    console.log('Summary function triggered!');
    // Add your logic here
  };

  const handleDetails = () => {
    console.log('Details function triggered!');
    // Add your logic here
  };

  const handleCheckboxChange = (option) => {
    const isSame = selectedOption === option;
    const newValue = isSame ? '' : option;

    setSelectedOption(newValue);

    // Call the function based on selected option
    if (!isSame) {
      if (option === 'summary') {
        handleSummary();
      } else if (option === 'details') {
        handleDetails();
      }
    }
  };
  return (
    <div className="w-full px-2 ">
      <div className="flex items-center justify-between mx-auto">
        <div className="text-2xl">Sales of My Soft</div>
        <div className='flex items-center gap-2'>
          <button className="bg-[#216d6e] font-semibold shadow-md text-white px-4 py-2 rounded-sm ">
            Create New
          </button>
          <button onClick={() => SetShowOption(!showOption)} className='p-2 shadow-lg   bg-[#216d6e1e] rounded-sm text-2xl'><BsThreeDots /></button>
          {showOption && (
        <div className=" absolute bg-white shadow-lg text-black py-2 px-4 space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={selectedOption === 'summary'}
                onChange={() => handleCheckboxChange('summary')} className="form-checkbox text-blue-600" />
            <span>Summary</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={selectedOption === 'details'}
                onChange={() => handleCheckboxChange('details')}  className="form-checkbox text-blue-600" />
            <span>Details</span>
          </label>
        </div>
      )}
        </div>
      </div> 

      <div className="my-2 flex border flex-wrap items-center gap-1 bg-white px-2 py-0 rounded shadow-sm  w-full max-w-2xl">
      
      {/* Clear Button */}
      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200">
        Clear
      </button>

      {/* Date Range Picker (placeholder) */}
      <input
        type="date"
        className="border rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        className="border rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
      />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or ID"
        className="flex-1 border rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
      />

      {/* Search Icon Button */}
      <button   className="hover:bg-gray-200  p-2 rounded">
        <Search size={19} />
      </button> 
    </div> 
    <div>
      <SalePost/>
    </div>
    </div>
  );
};

export default Sale;