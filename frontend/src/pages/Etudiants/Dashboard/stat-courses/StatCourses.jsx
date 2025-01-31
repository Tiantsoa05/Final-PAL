import React from "react";
import { Link } from "react-router-dom";

const StatCourses = ({numberCourses}) => {
  return (
    <Link to={'/courses'} className="bg-white shadow-md rounded-xl p-6 flex items-center justify-center w-64 text-lg font-semibold text-gray-700">
      {numberCourses} cours 📚
    </Link>
  );
};

export default StatCourses;
