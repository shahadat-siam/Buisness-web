import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './dashboard.css'; // Custom CSS for advanced styling

const Dashboard = () => {
  // Static data for now
  const totalSales = 350000;
  const totalPurchases = 280000;
  const bankBalance = 1500000;
  const totalExpenses = 50000;

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#4F46E5',
        borderColor: '#4338CA',
        borderWidth: 2,
        hoverBackgroundColor: '#6366F1',
        data: [65000, 59000, 80000, 81000, 56000, 55000],
      },
    ],
  };

  const expenseData = {
    labels: ['Transportation', 'Wages', 'Office Rent', 'Miscellaneous'],
    datasets: [
      {
        data: [15000, 20000, 10000, 5000],
        backgroundColor: ['#F87171', '#FBBF24', '#34D399', '#60A5FA'],
        hoverBackgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'],
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Business Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Cards for Key Metrics */}
        <div className="dashboard-card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Sales (This Month)</h2>
          <p className="text-3xl font-bold text-green-500 mt-2">{totalSales.toLocaleString()} BDT</p>
        </div>
        <div className="dashboard-card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Purchases (This Month)</h2>
          <p className="text-3xl font-bold text-red-500 mt-2">{totalPurchases.toLocaleString()} BDT</p>
        </div>
        <div className="dashboard-card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Bank Balance</h2>
          <p className="text-3xl font-bold text-blue-500 mt-2">{bankBalance.toLocaleString()} BDT</p>
        </div>
        <div className="dashboard-card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Expenses (This Month)</h2>
          <p className="text-3xl font-bold text-orange-500 mt-2">{totalExpenses.toLocaleString()} BDT</p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Sales Chart */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Sales Overview</h2>
          <Bar data={salesData} />
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Expense Breakdown</h2>
          <Pie data={expenseData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
