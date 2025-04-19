import React, { useState } from 'react'
import { Ellipsis, MoreVertical } from "lucide-react";

function SalePost() {
    const [menuOpen, setMenuOpen] = useState(null);
    const salesData = [
        {
          invoiceNo: "20250419-001",
          date: "2025-04-19",
          customer: "John Doe",
          project: "Green Villas Phase 2",
          showroom: "NYC Branch",
          openingBalance: "$1,500.00",
          billAmount: "$2,350.00",
          paymentReceived: "$2,000.00",
          closingBalance: "$1,850.00",
          products: [
            { code: "P1001", name: "Oak Dining Set", store: "Main Branch", particulars: "6-seater set", qty: 1, unitPrice: "$800.00", discount: "10%", subtotal: "$720.00" },
            { code: "P2034", name: "Floor Lamp", store: "Warehouse 2", particulars: "Modern style", qty: 2, unitPrice: "$120.00", discount: "-", subtotal: "$240.00" }
          ]
        },
        {
          invoiceNo: "20250419-002",
          date: "2025-04-19",
          customer: "Jane Smith",
          project: "Skyline Towers",
          showroom: "LA Branch",
          openingBalance: "$500.00",
          billAmount: "$1,050.00",
          paymentReceived: "$1,000.00",
          closingBalance: "$550.00",
          products: [
            { code: "P4002", name: "Bookshelf", store: "Main Branch", particulars: "5-tier", qty: 1, unitPrice: "$300.00", discount: "5%", subtotal: "$285.00" },
            { code: "P2220", name: "Study Table", store: "Main Branch", particulars: "Walnut finish", qty: 1, unitPrice: "$600.00", discount: "-", subtotal: "$600.00" }
          ]
        }
      ];
      
  return (
    <div>
      <div className="p-2 space-y-6">
      {salesData.map((sale, idx) => (
        <div key={idx} className="bg-white border shadow-sm rounded-md p-2 space-y-4 text-sm text-gray-800 w-full relative">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="">#{sale.invoiceNo}</p>
              <p className='font-bold uppercase'>{sale.customer}</p>
              <p className="text-xs text-gray-500">{sale.date}</p> 
            </div>
            <div className="text-right">
            <div className="relative ml-2">
              <button
                onClick={() => setMenuOpen(menuOpen === idx ? null : idx)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Ellipsis className="w-5 h-5 text-gray-600" />
              </button>
              {menuOpen === idx && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Download Invoice</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Download Chalan</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Edit</button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-200">Delete</button>
                </div>
              )}
            </div>
               
              <p className="text-xs">{sale.project}</p>
              <p className="text-xs text-gray-500">{sale.showroom}</p>
            </div>
            
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-md px-3 py-1 border">
            <div>
              <p className="text-xs text-gray-500">Opening Balance</p>
              <p className="font-semibold">{sale.openingBalance}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Bill Amount</p>
              <p className="font-semibold">{sale.billAmount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Received</p>
              <p className="font-semibold">{sale.paymentReceived}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Closing Balance</p>
              <p className="font-semibold">{sale.closingBalance}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border-t">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-2 py-2">Code</th>
                  <th className="text-left px-2 py-2">Name</th>
                  <th className="text-left px-2 py-2">Store</th>
                  <th className="text-left px-2 py-2">Particulars</th>
                  <th className="text-center px-2 py-2">Qty</th>
                  <th className="text-right px-2 py-2">Unit Price</th>
                  <th className="text-right px-2 py-2">Discount</th>
                  <th className="text-right px-2 py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {sale.products.map((prod, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-2 py-1">{prod.code}</td>
                    <td className="px-2 py-1">{prod.name}</td>
                    <td className="px-2 py-1">{prod.store}</td>
                    <td className="px-2 py-1">{prod.particulars}</td>
                    <td className="px-2 py-1 text-center">{prod.qty}</td>
                    <td className="px-2 py-1 text-right">{prod.unitPrice}</td>
                    <td className="px-2 py-1 text-right">{prod.discount}</td>
                    <td className="px-2 py-1 text-right">{prod.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default SalePost