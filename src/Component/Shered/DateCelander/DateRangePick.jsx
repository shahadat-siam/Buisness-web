import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DualDatePicker = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // Set Today’s Date
  const handleToday = () => {
    const today = new Date();
    setFromDate(today);
    setToDate(today);
  };

  // Custom Header for Month & Year Selection
  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth, decreaseYear, increaseYear }) => (
    <div className="flex justify-between items-center px-3 py-1 bg-gray-100 border-b">
      <button onClick={decreaseYear} className="text-gray-600 hover:text-blue-500">&lt;&lt;</button>
      <button onClick={decreaseMonth} className="text-gray-600 hover:text-blue-500">&lt;</button>
      <span className="font-semibold">{date.toLocaleString("default", { month: "long", year: "numeric" })}</span>
      <button onClick={increaseMonth} className="text-gray-600 hover:text-blue-500">&gt;</button>
      <button onClick={increaseYear} className="text-gray-600 hover:text-blue-500">&gt;&gt;</button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white rounded-lg shadow-md"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <div className="flex flex-col gap-3">
          {/* Today Button */}
          <button onClick={handleToday} className="px-4 py-1 text-sm border rounded-lg bg-gray-100 hover:bg-blue-200 transition">
            Today
          </button>

          <div className="flex gap-3">
            {/* From Date Picker */}
            <div className="flex items-center border rounded-lg shadow-sm overflow-hidden">
              <label className="px-3 py-2 bg-gray-200 text-gray-600 font-medium">From</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                selectsStart
                startDate={fromDate}
                endDate={toDate}
                dateFormat="MMMM d, yyyy"
                placeholderText="Start date"
                renderCustomHeader={renderCustomHeader}
                className="w-full px-3 py-2 text-center text-gray-700 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* To Date Picker */}
            <div className="flex items-center border rounded-lg shadow-sm overflow-hidden">
              <label className="px-3 py-2 bg-gray-200 text-gray-600 font-medium">To</label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                selectsEnd
                startDate={fromDate}
                endDate={toDate}
                minDate={fromDate}
                dateFormat="MMMM d, yyyy"
                placeholderText="End date"
                renderCustomHeader={renderCustomHeader}
                className="w-full px-3 py-2 text-center text-gray-700 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DualDatePicker;
