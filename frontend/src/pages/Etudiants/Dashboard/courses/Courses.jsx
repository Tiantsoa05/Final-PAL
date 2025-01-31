import React from "react";
import LineChart from "./LineChart.jsx";

const Courses = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-700">Courses</h3>
      <LineChart />
    </div>
  );
};

export default Courses;
