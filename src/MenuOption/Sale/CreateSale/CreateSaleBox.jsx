import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react";

export default function CreateSaleBox({ isOpen, setIsOpen }) {
  const [isCustomerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [isRetail, setIsRetail] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([{
    description: "",
    store: "",
    bdlps: "",
    quantity: 0,
    unitPrice: 0,
    discount: 0,
    subtotal: 0
  }]);
  const [summary, setSummary] = useState({ total: 0, discount: 0, net: 0, paid: 0 });
  const [saleStatus, setSaleStatus] = useState("Delivered");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);

  const closeDialog = () => setIsOpen(false);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    updatedProducts[index].subtotal =
      (updatedProducts[index].quantity * updatedProducts[index].unitPrice) - updatedProducts[index].discount;
    setProducts(updatedProducts);
    calculateSummary(updatedProducts);
  };

  const calculateSummary = (products) => {
    const total = products.reduce((acc, p) => acc + (p.quantity * p.unitPrice), 0);
    const discount = products.reduce((acc, p) => acc + parseFloat(p.discount), 0);
    const net = total - discount;
    setSummary({ ...summary, total, discount, net });
  };

  const handleFullPaid = () => setSummary({ ...summary, paid: summary.net });

  const handleAddProduct = () => {
    setProducts([...products, {
      description: "",
      store: "",
      bdlps: "",
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      subtotal: 0
    }]);
  };

  const handleDeleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    calculateSummary(newProducts);
  };

  const handleSubmit = () => {
    const saleData = {
      customer: isRetail ? null : selectedCustomer,
      retailDetails: isRetail ? { name: "", phone: "", address: "" } : null,
      date,
      products,
      summary,
      saleStatus,
      paymentStatus,
      remark
    };
    console.log("Submitting Sale Data:", saleData);
    closeDialog();
  };

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
            <Dialog.Panel className="w-full max-h-[90vh] overflow-y-auto transform overflow-hidden rounded-sm bg-[#F1EFEC] p-0 text-left shadow-2xl min-w-[60rem] flex flex-col">
              <div className="sticky top-0 text-white bg-[#3D8D7A] z-10 border-b pb-4 mb-4">
                <div className="flex px-4 pt-2 justify-between items-center">
                  <Dialog.Title className="text-2xl font-semibold  ">Create Sale</Dialog.Title>
                  <XIcon className="w-6 h-6 cursor-pointer  hover:text-gray-200" onClick={closeDialog} />
                </div>
              </div>

              <div className="space-y-4 px-4">

              <div className="flex flex-col bg-gray-200 p-3 border-[1px] border-gray-300 sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex flex-col gap-4">
                <button
                    onClick={() => setCustomerDialogOpen(true)}
                    className="px-4 py-2 bg-[#3D8D7A] text-white rounded hover:bg-[#327566] transition"
                >
                    Select Customer
                </button>
                <label className="flex items-center gap-2 text-sm">
                    <input
                    type="checkbox"
                    checked={isRetail}
                    onChange={() => setIsRetail(!isRetail)}
                    />
                    Retail
                </label>
                </div>
                 <div className="flex flex-col gap-2">
                     {/* Retail Customer Inputs */}
                {isRetail && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="customerName" className="mb-1 text-sm text-gray-700">Customer Name</label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        placeholder="Customer Name*" 
                        className="border p-2 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                      />
                    </div>
                  
                    <div className="flex flex-col">
                      <label htmlFor="phoneNumber" className="mb-1 text-sm text-gray-700">Phone Number</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone Number" 
                        className="border p-2 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                      />
                    </div>
                  
                    <div className="flex flex-col">
                      <label htmlFor="address" className="mb-1 text-sm text-gray-700">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address" 
                        className="border p-2 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                      />
                    </div>
                  </div>
                )}
                {/* Project / Reference / Date Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto">
                <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-700">Project</label>
                    <select className="rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]">
                    <option>Project 1</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-700">Reference</label>
                    <input
                    type="text"
                    placeholder="Reference"
                    className="border rounded-sm px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-700">Date</label>
                    <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                    />
                </div>
                </div>
                 </div>
                </div> 

                <div className="p-4 border-[1px] border-gray-300 bg-gray-200">
                  <div className="grid grid-cols-8 gap-2 bg-gray-600 text-white font-semibold text-sm border-b p-2">
                    <div>Description</div><div>Store</div><div>BDL/PS</div><div>Qty</div><div>Unit Price</div><div>Discount</div><div>Subtotal</div><div></div>
                  </div>
                  {products.map((product, i) => (
                    <div key={i} className="grid grid-cols-8 gap-2 py-2 items-center">
                      <input type="text" value={product.description} onChange={(e) => handleProductChange(i, "description", e.target.value)} className="border p-1" />
                      <select value={product.store} onChange={(e) => handleProductChange(i, "store", e.target.value)} className="border p-1"><option>Store A</option></select>
                      <input type="text" value={product.bdlps} onChange={(e) => handleProductChange(i, "bdlps", e.target.value)} className="border p-1" />
                      <input type="number" value={product.quantity} onChange={(e) => handleProductChange(i, "quantity", parseInt(e.target.value))} className="border p-1" />
                      <input type="number" value={product.unitPrice} onChange={(e) => handleProductChange(i, "unitPrice", parseFloat(e.target.value))} className="border p-1" />
                      <input type="number" value={product.discount} onChange={(e) => handleProductChange(i, "discount", parseFloat(e.target.value))} className="border p-1" />
                      <div>{product.subtotal.toFixed(2)}</div>
                      <button onClick={() => handleDeleteProduct(i)} className="text-red-500">Delete</button>
                    </div>
                  ))}
                  <button onClick={handleAddProduct} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">+ Add Product</button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2"></div>
                  <div className="flex flex-col gap-2">
                    <label>Total <input type="number" value={summary.total} readOnly className="border p-1 w-full" /></label>
                    <label>Discount <input type="number" value={summary.discount} readOnly className="border p-1 w-full" /></label>
                    <label>Net <input type="number" value={summary.net} readOnly className="border p-1 w-full" /></label>
                    <label>Paid <input type="number" value={summary.paid} onChange={(e) => setSummary({ ...summary, paid: parseFloat(e.target.value) })} className="border p-1 w-full" /></label>
                    <button onClick={handleFullPaid} className="text-blue-600 underline">Full Paid</button>
                  </div>
                </div>

                <div className="grid border-[1px] border-gray-300 bg-gray-200 p-3 grid-cols-1 sm:grid-cols-4 gap-6">
                {/* Sale Status */}
                <div className="flex flex-col">
                    <label htmlFor="saleStatus" className="mb-1 text-sm text-gray-700">Sale Status</label>
                    <select
                    id="saleStatus"
                    value={saleStatus}
                    onChange={(e) => setSaleStatus(e.target.value)}
                    className="rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                    >
                    <option>Delivered</option>
                    <option>Returned</option>
                    </select>
                </div>

                {/* Payment Status */}
                <div className="flex flex-col">
                    <label htmlFor="paymentStatus" className="mb-1 text-sm text-gray-700">Payment Status</label>
                    <select
                    id="paymentStatus"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                    >
                    <option>Paid</option>
                    <option>Unpaid</option>
                    <option>Party Paid</option>
                    <option>Advance</option>
                    </select>
                </div>

                {/* Remark */}
                <div className="flex flex-col ">
                    <label htmlFor="remark" className="mb-1 text-sm text-gray-700">Remark</label>
                    <input
                    id="remark"
                    type="text"
                    placeholder="Remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="border p-2 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                    />
                </div>

                {/* Conditional Transaction Type */}
                {saleStatus === "Returned" && (
                    <div className="flex flex-col ">
                    <label htmlFor="transactionType" className="mb-1 text-sm text-gray-700">Transaction Type</label>
                    <select
                        id="transactionType"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className="rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[#216d6e6e]"
                    >
                        <option>Cash</option>
                        <option>Bank</option>
                        <option>Adjustment</option>
                    </select>
                    </div>
                )}
                </div>
              </div>

              <div className="flex justify-end gap-4 p-6 bg-[#DBDBDB] mt-4">
                <button onClick={closeDialog} className="px-4 py-2 bg-gray-600 text-gray-200 rounded">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-[#3D8D7A] text-white rounded">OK</button>
              </div>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </Transition>
  );
}
