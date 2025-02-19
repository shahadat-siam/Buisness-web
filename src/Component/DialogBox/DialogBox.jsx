import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react"; 
import "react-datepicker/dist/react-datepicker.css";
import DualDatePicker from "../Shered/DateCelander/DateRangePick";

export default function CashFlowDialog({ isOpen, setIsOpen }) { 
  const [data, setData] = useState({
    openingBalance: 5000, // Added opening balance
    cashIn: {
      salesIncome: 20000,
      bankDeposits: 10000,
      otherIncome: 5000,
    },
    cashOut: {
      purchases: 15000,
      bankWithdrawals: 8000,
      expenses: 12000,
    },
  });

  const calculateTotalCashIn = () =>
    data.cashIn.salesIncome + data.cashIn.bankDeposits + data.cashIn.otherIncome;

  const calculateTotalCashOut = () =>
    data.cashOut.purchases + data.cashOut.bankWithdrawals + data.cashOut.expenses;

  const calculateNetCashFlow = () =>
    data.openingBalance + calculateTotalCashIn() - calculateTotalCashOut();

  const closeDialog = () => setIsOpen(false);

  return (
<Transition appear show={isOpen} as={Fragment}>
  <Dialog as="div" className="relative z-50" onClose={() => {}}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" />
    </Transition.Child>

    <div className="fixed inset-0 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
       <Dialog.Panel className="w-full  transform overflow-hidden rounded-2xl bg-white p-8 text-left shadow-2xl max-h-[80vh] flex flex-col">
  {/* Fixed Header */}
  <div className="sticky top-0 bg-white z-10 border-b pb-4 mb-4">
    <div className="flex justify-between  items-center">
      <Dialog.Title className="text-2xl font-semibold  text-gray-800">
        Daily Cash Flow Statement
      </Dialog.Title>
      <XIcon
        className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={closeDialog}
      />
    </div>
  </div>
    
  {/* Scrollable Content */}
  <div className="overflow-y-auto flex-grow pr-2">
    
    {/* Add Your Content Here */}
    <div className=" ">
     <div className="md:flex  items-center  gap-4">
      <DualDatePicker/>
      <button className="px-4 mt-2 md:mt-0 py-2 text-sm border rounded-md bg-[#3D8D7A] text-[#eee] hover:bg-[#216d6e] transition">
        Update
      </button>
     </div>
      {/* Opening Balance */}
      <div className="mt-4">
        <div className="grid grid-cols-4 bg-[#eee] p-3 gap-2 md:gap-6 font-semibold ">
          <h3>Opening Balance</h3>
          <h3>Total Cash In</h3>
          <h3>Total Cash Out</h3>
          <h3>Closing Balance</h3>
        </div>
        <div className="grid grid-cols-7 p-3 gap-2">
          <p> </p>
          <p>+</p>
          <p> </p>
          <p>-</p>
          <p> </p>
          <p>=</p>
          <p>000</p>
        </div>
       <div>
       <div className="p-3 bg-[#eee]  shadow-sm">
        <h2 className="text-sm font-semibold ">
          Opening Balance : <span>BDT {data.openingBalance.toLocaleString()}</span>
        </h2> 
      </div>
       </div>

      {/* Net Cash Flow */}
      <div className="p-3 bg-[#eee] rounded-sm shadow-md">
        <h2 className="text-md font-semibold  ">
          Net Cash Flow
        </h2>
        <div className="flex justify-between text-lg font-bold">
          <span>Net Cash Today:</span>
          <span>BDT {calculateNetCashFlow().toLocaleString()}</span>
        </div>
      </div>

      {/* Total Cash Inflows */}
      <div className="p-3 bg-[#eee] rounded-sm shadow-md mb-4">
        <h2 className="text-md font-semibold  ">
          Total Cash Inflows
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Sales Income:</span>
            <span className="font-medium">
              BDT {data.cashIn.salesIncome.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Bank Deposits:</span>
            <span className="font-medium">
              BDT {data.cashIn.bankDeposits.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Other Income:</span>
            <span className="font-medium">
              BDT {data.cashIn.otherIncome.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-t border-[#a3a3a3] pt-3 font-semibold">
            <span>Total Cash In:</span>
            <span>BDT {calculateTotalCashIn().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Total Cash Outflows */}
      <div className="p-3 bg-[#eee] rounded-sm shadow-md mb-4">
        <h2 className="text-md font-semibold ">
          Total Cash Outflows
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Purchases:</span>
            <span className="font-medium">
              BDT {data.cashOut.purchases.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Bank Withdrawals:</span>
            <span className="font-medium">
              BDT {data.cashOut.bankWithdrawals.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Expenses:</span>
            <span className="font-medium">
              BDT {data.cashOut.expenses.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-t border-[#d1d0d0] pt-3 font-semibold">
            <span>Total Cash Out:</span>
            <span>BDT {calculateTotalCashOut().toLocaleString()}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</Dialog.Panel>
      </motion.div>
    </div>
  </Dialog>
</Transition>

  );
}
 
