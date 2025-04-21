import { Ellipsis, Plus, Search } from 'lucide-react';
import React, { useState } from 'react'; 
import SalePost from './SalePost';
import DatePicker from 'react-datepicker';

const Sale = () => {
  const [menuOpen, setMenuOpen] = useState(null); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
  };

  const handleSearch = () => {
    // Do something with the search filters
    console.log("Searching with:");
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Search Query:", searchQuery);
    // Add actual filter logic here (e.g., fetch data or filter list)
  };

  const handleSummary = () => {
    console.log('Summary function triggered!');
    // Add your logic here
  };

  const handleDetails = () => {
    console.log('Details function triggered!');
    // Add your logic here
  };
 
  return (
    <div className="w-full px-2 ">

      <div className="flex items-center justify-between mx-auto">
        <div className="text-xl uppercase">Sales of My Soft</div>
        <div className='flex items-center gap-2'>
          <button className="bg-[#216d6e] flex items-center gap-1 font-semibold shadow-md text-white px-4 py-2 rounded-sm ">
          <Plus />
            Create New
          </button>
          <div className="relative ml-2">
              <button
                onClick={() => setMenuOpen(menuOpen ? null : true)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Ellipsis className="w-5 h-5 text-gray-600" />
              </button>
              {menuOpen   && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Summary</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Details</button> 
                </div>
              )}
            </div>
        </div>
      </div> 

       {/* search Function   */}
      <div className="my-2 flex  flex-wrap items-center gap-1 bg-white px-2 py-0 rounded  shadow-sm  w-full max-w-xl">
        
        {/* Clear Button */}
        <button onClick={handleClear} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200">
          Clear
        </button>

        {/* Date Range Picker (placeholder) */}
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="border rounded px-3 w-24 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
            dateFormat="dd-MM-yy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          <span className="text-gray-500">to</span>

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="border rounded w-24 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
            dateFormat="dd-MM-yy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

        {/* Search Input */}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search by name or ID"
          className="flex-1 border rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
        />

        {/* Search Icon Button */}
        <button onClick={handleSearch}  className="hover:bg-gray-200  p-2 rounded">
          <Search size={19} />
        </button> 
      </div> 

      <div className='h-[68vh] border-t-2 overflow-y-auto '>
        <SalePost/>
      </div>
    </div>
  );
};

export default Sale;