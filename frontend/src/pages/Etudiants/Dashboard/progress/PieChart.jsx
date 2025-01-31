import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";


const stylegraph={
  position: 'relative',
  overflow:'hidden',
  height:'100%',
  width:'100%'
}

const valueStyle={
  position:'absolute',
  left:'30%',
  top:'40%',
  fontSize:'14px',
  fontWeight:'bold'
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Finished", "Unfinished"],
    datasets: [
      {
        label: 'Progression',
        data: [70, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)"
        ],
        borderWidth: 1
      }
    ]
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js 3.7+ Doughnut Chart'
      }
    }
  };

  return (
    <div className="graph-content" style={stylegraph}>
      <Doughnut data={chartData} options={options} />
      <div className="value" style={valueStyle}>70%</div>
    </div>
  );
};


export default PieChart; 