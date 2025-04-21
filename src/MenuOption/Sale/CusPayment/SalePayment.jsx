import React, { useState } from "react";
import { Edit, Trash2, Settings, ChevronUp, ChevronDown, X } from "lucide-react";

const initialColumns = [
  { key: "date", label: "Date", visible: true },
  { key: "name", label: "Name", visible: true },
  { key: "project", label: "Project", visible: true },
  { key: "invoice", label: "Invoice No", visible: true },
  { key: "showroom", label: "Showroom", visible: true },
  { key: "bill", label: "Bill", visible: true },
  { key: "payment", label: "Payment", visible: true },
  { key: "balance", label: "Balance", visible: true },
  { key: "remark", label: "Remark", visible: true },
];

const initialData = [
  {
    id: 1,
    date: "2025-04-01",
    name: "John Doe",
    project: "Villa A",
    invoice: "INV-001",
    showroom: "NYC",
    bill: 5000,
    payment: 3000,
    balance: 2000,
    remark: "Pending",
  },
  {
    id: 2,
    date: "2025-04-10",
    name: "Jane Smith",
    project: "Office B",
    invoice: "INV-002",
    showroom: "LA",
    bill: 7200,
    payment: 7200,
    balance: 0,
    remark: "Paid",
  },
  {
    id: 3,
    date: "2025-04-15",
    name: "Md Siam",
    project: "Office B",
    invoice: "INV-002",
    showroom: "LA",
    bill: 10000,
    payment: 5600,
    balance: 4400,
    remark: "Paid",
  },
];

export default function CustomerTransactionTable() {
  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const toggleColumn = (key) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setSelectedRows((prev) => prev.filter((r) => r !== id));
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortConfig]);

  const visibleColumns = columns.filter((col) => col.visible);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customer Transactions</h2>
        <div className="relative">
          <button
            className="p-2 rounded hover:bg-gray-200"
            onClick={() => setShowColumnMenu(!showColumnMenu)}
          >
            <Settings size={20} />
          </button>
          {showColumnMenu && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-3 z-10">
              {columns.map((col) => (
                <label key={col.key} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={col.visible}
                    onChange={() => toggleColumn(col.key)}
                    className="accent-blue-500"
                  />
                  <span>{col.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left border-b">
                <span className="sr-only">Select</span>
              </th>
              {visibleColumns.map((col) => {
                const isSorted = sortConfig.key === col.key;
                const direction = sortConfig.direction;
                return (
                  <th
                    key={col.key}
                    className="p-3 text-left border-b font-medium cursor-pointer select-none"
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{col.label}</span>
                      {isSorted &&
                        (direction === "asc" ? (
                          <ChevronUp size={16} />
                        ) : direction === "desc" ? (
                          <ChevronDown size={16} />
                        ) : (
                          <X size={16} />
                        ))}
                    </div>
                  </th>
                );
              })}
              <th className="p-3 text-left border-b font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => {
              const isSelected = selectedRows.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={`transition ${
                    isSelected ? "bg-gray-200" : "even:bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <td className="p-3 border-b">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectRow(row.id)}
                      className="accent-blue-500"
                    />
                  </td>
                  {visibleColumns.map((col) => (
                    <td key={col.key} className="p-3 border-b">
                      {typeof row[col.key] === "number"
                        ? `$${row[col.key].toLocaleString()}`
                        : row[col.key]}
                    </td>
                  ))}
                  <td className="p-3 border-b space-x-2">
                    <button className="p-1 rounded hover:bg-gray-200">
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-red-100 text-red-500"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
