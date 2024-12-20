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
    labels: ['Cow Milk', 'Buffalo Milk', 'Cheese', 'Butter', 'Yogurt'],
    datasets: [
      {
        label: 'Price (₹)',
        data: [30, 35, 150, 200, 50], // Sample prices
        backgroundColor: [
          'rgba( 255, 102, 0)',
          'rgba(54, 162, 235)',
          'rgba(255, 102, 0)',
          'rgba(75, 192, 192)',
          'rgba(255, 102, 0)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
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
