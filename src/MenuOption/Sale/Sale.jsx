import { Search } from 'lucide-react';
import React from 'react';
import { BsThreeDots } from "react-icons/bs";

const Sale = () => {
  return (
    <div className="w-full p-2 ">
      <div className="flex items-center justify-between mx-auto">
        <div className="text-3xl">Sales of My Soft</div>
        <div className='flex items-center gap-2'>
          <button className="bg-[#216d6e] font-semibold shadow-md text-white px-4 py-2 rounded-sm ">
            Create New
          </button>
          <button className='p-2 shadow-lg bg-[#216d6e1e] rounded-sm text-2xl'><BsThreeDots /></button>
        </div>
      </div> 

      <div className="my-2 flex flex-wrap items-center gap-1 bg-white px-2 py-1 rounded shadow-sm border w-full max-w-2xl">
      
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
      <button className="hover:bg-gray-200  p-2 rounded">
        <Search size={19} />
      </button>
    </div> 
    </div>
  );
};

export default Sale;