import React from "react";
export default function StatCard({ title, value, sub, icon, border }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-600 mt-1">{sub}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-50">
          <i className={`${icon} text-xl`} />
        </div>
      </div>
    </div>
  );
}
