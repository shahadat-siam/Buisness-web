import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react";

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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-800">
                    Daily Cash Flow Statement
                  </Dialog.Title>
                  <XIcon
                    className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={closeDialog}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   {/* Opening Balance */}
                <div className="p-3 bg-yellow-100 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-yellow-800">
                    Opening Balance
                  </h2>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Previous Day Balance:</span>
                    <span>BDT {data.openingBalance.toLocaleString()}</span>
                  </div>
                </div>

                 {/* Net Cash Flow */}
                 <div className="p-3 bg-green-100 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-green-800">
                    Net Cash Flow
                  </h2>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Net Cash Today:</span>
                    <span>BDT {calculateNetCashFlow().toLocaleString()}</span>
                  </div>
                </div>

                {/* Total Cash Inflows */}
                <div className="p-3 bg-blue-100 rounded-lg shadow-md mb-4">
                  <h2 className="text-xl font-semibold text-blue-800">
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
                    <div className="flex justify-between border-t border-blue-300 pt-3 font-bold">
                      <span>Total Cash In:</span>
                      <span>BDT {calculateTotalCashIn().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Total Cash Outflows */}
                <div className="p-3 bg-red-100 rounded-lg shadow-md mb-4">
                  <h2 className="text-xl font-semibold text-red-800">
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
                    <div className="flex justify-between border-t border-red-300 pt-3 font-bold">
                      <span>Total Cash Out:</span>
                      <span>BDT {calculateTotalCashOut().toLocaleString()}</span>
                    </div>
                  </div>
                </div> 
                </div>
              
              </Dialog.Panel>
            </motion.div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
 
