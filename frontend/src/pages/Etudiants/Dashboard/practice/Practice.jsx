import React from "react";
import PractChart from "./PractChart";

const Practice = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-700">Practice</h3>
      <div className="mt-3">
        <PractChart />
      </div>
    </div>
  );
};

export default Practice;
