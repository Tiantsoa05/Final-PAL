import React from "react";
import PieChart from "./PieChart.jsx";

const Progress = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-700">Your Progress</h3>
      <div className="flex items-center justify-center mt-3">
        <PieChart />
      </div>
      <div className="mt-3 text-gray-500">
        <p className="font-semibold">TERM DATES</p>
        <p>Oct - Dec</p>
      </div>
    </div>
  );
};

export default Progress;
