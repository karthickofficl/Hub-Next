"use client";
// components/BarChart.js
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Sample data for dairy products
  const data = {
    labels: ['Total Users', 'Total Orders', 'Delivery Partners', 'Total Subscription'],
    datasets: [
      {
        label: 'Total',
        data: [30, 35, 150, 200, 50], // Sample prices
        backgroundColor: [
          'rgb(191 219 254)',
          'rgb(187 247 208)',
          'rgb(251 207 232)',
          'rgb(221 214 254)',
        ],
        borderColor: [
          'rgb(96 165 250)',
          'rgb(74 222 128)',
          'rgb(244 114 182)',
          'rgb(167 139 250)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Use "as const" to ensure type compatibility
      },
      title: {
        display: true,
        text: 'Dairy Products Price Statistics',
      },
    },
  };
  

  return <Bar data={data} options={options}/>;
};

export default BarChart;
