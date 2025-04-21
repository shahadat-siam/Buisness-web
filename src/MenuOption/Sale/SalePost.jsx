import React, { useState, useRef } from 'react';
import { Ellipsis } from 'lucide-react';
import jsPDF from 'jspdf'; 
import autoTable from "jspdf-autotable";

function SalePost() {
  const [menuOpen, setMenuOpen] = useState(null);
  const invoiceRefs = useRef([]);

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

  const generateInvoicePDF = (sale) => {
    const doc = new jsPDF(); 
    const pageWidth  = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // ─── Draw the page border ─────────────────────────────────────────
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
  
    let y = 15;

    // ─── SECTION 1: Shop Header ───────────────────────
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("MY SHOP", pageWidth / 2, y, { align: "center" });
  
    y += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("123 Street Name, City, ZIP Code", pageWidth / 2, y, { align: "center" });
  
    y += 6;
    doc.text("Contact: 01234567890, 09876543210", pageWidth / 2, y, { align: "center" });
  
    // spacing before invoice info section
    y += 12;
  
    // ─── SECTION 2: Invoice Info Split ─────────────────
    const leftX = 14;
    const rightX = pageWidth / 2 + 10;
  
    doc.setFontSize(10);
  
    doc.setFont("helvetica", "normal");
    doc.text("Customer:", leftX, y);
    doc.text("Invoice No:", rightX, y);
    doc.setFont("helvetica", "normal");
    doc.text(sale.customer, leftX + 30, y);
    doc.text(sale.invoiceNo, rightX + 30, y);
    y += 8;
  
    doc.setFont("helvetica", "normal");
    doc.text("Address:", leftX, y);
    doc.text("Date:", rightX, y);
    doc.setFont("helvetica", "normal");
    doc.text(sale.customerAddress || "N/A", leftX + 30, y);
    doc.text(sale.date, rightX + 30, y);
    y += 8;
  
    doc.setFont("helvetica", "normal");
    doc.text("Project:", leftX, y);
    doc.text("Reference:", rightX, y);
    doc.setFont("helvetica", "normal");
    doc.text(sale.project, leftX + 30, y);
    doc.text(sale.reference || "N/A", rightX + 30, y);
    y += 8;
  
    doc.setFont("helvetica", "normal");
    doc.text("Phone:", leftX, y);
    doc.setFont("helvetica", "normal");
    doc.text(sale.phone || "N/A", leftX + 30, y);
  
    // return y + 10; // return the next y position for continued layout
    // Section separator
    y += 10;
    doc.setLineWidth(0.5);
    doc.line(leftX, y, pageWidth - 14, y);
    y += 5;
  
    // Table: Product List
    autoTable(doc, {
      startY: y,
      head: [[
        "Code", "Name", "Store", "Particulars",
        "Qty", "Unit Price", "Discount", "Subtotal"
      ]],
      body: sale.products.map(p => [
        p.code,
        p.name,
        p.store,
        p.particulars,
        p.qty,
        p.unitPrice,
        p.discount,
        p.subtotal,
      ]),
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [33, 150, 243],
        textColor: [255, 255, 255],
        halign: "center",
      },
    });
  
    // Financial Summary Box
    let summaryY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFillColor(245, 245, 245);
    doc.rect(leftX, summaryY, pageWidth - 28, 28, 'F');
  
    doc.text(`Opening Balance: ${sale.openingBalance}`, leftX + 5, summaryY + 8);
    doc.text(`Bill Amount: ${sale.billAmount}`, leftX + 5, summaryY + 15);
    doc.text(`Payment Received: ${sale.paymentReceived}`, pageWidth / 2, summaryY + 8);
    doc.text(`Closing Balance: ${sale.closingBalance}`, pageWidth / 2, summaryY + 15);
  
    // Delivery Status
    summaryY += 35;
    doc.setFontSize(12);
    doc.text("Delivery Status:", leftX, summaryY);
    doc.setFont("helvetica", "bold");
    doc.text("Delivered", leftX + 40, summaryY);
    doc.setFont("helvetica", "normal");
  
   // ─── Signature Section ───────────────────────────────
    summaryY += 30; // Add spacing from the last section
    const signatureLineY = summaryY;
    const labelY = signatureLineY + 6;

    // Short line width
    const lineWidth = 40;

    // Left Signature Line
    doc.setLineWidth(0.2);
    doc.line(leftX, signatureLineY, leftX + lineWidth, signatureLineY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Customer Signature", leftX, labelY);

    // Right Signature Line
    const shopX = pageWidth - (lineWidth + 20); // push inward slightly
    doc.line(shopX, signatureLineY, shopX + lineWidth, signatureLineY);
    doc.setFontSize(9);
    doc.text("For MY SHOP", shopX, labelY);
    
  
    // Footer (optional)
    summaryY += 20;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for your business!", pageWidth / 2, summaryY, { align: "center" });
  
    // Save
    doc.save(`Invoice-${sale.invoiceNo}.pdf`);
  };

  return (
    <div className="py-2 px-1 space-y-6">
      {salesData.map((sale, idx) => (
        <div
          key={idx} 
          className="bg-white border shadow-xl rounded-md p-2 space-y-3 text-sm text-gray-800 w-full relative"
        >
          <div className="flex justify-between border-b pb-2">
            <div>
              <p>#{sale.invoiceNo}</p>
              <p>
                Delivered to{' '}
                <span className="font-bold uppercase">{sale.customer}</span>, {sale.project}
              </p>
              <p className="text-sm text-gray-500">
                {sale.date}, {sale.showroom}
              </p>
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
                   <button
                      onClick={() => generateInvoicePDF(sale)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Download Invoice
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                      Download Chalan
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                      Edit
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-200">
                      Delete
                    </button>
                  </div>
                )}
              </div>
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
            <table className="min-w-full text-sm border-t">
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
  );
}

export default SalePost;
