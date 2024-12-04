import { useEffect, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registering chart.js elements
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

// Chart options with title and legend positioning
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Thống kê số tiền qua các tháng",
    },
  },
};

export function LineChart() {
  const [chartData, setChartData] = useState<any>(null);

  
  useEffect(() => {
    // Hardcoded data (no API call)
    const hardcodedData = [
      { month: "January", amount: 1000 },
      { month: "February", amount: 1200 },
      { month: "March", amount: 900 },
      { month: "April", amount: 1500 },
      { month: "May", amount: 1100 },
      { month: "June", amount: 1300 },
      { month: "July", amount: 1400 },
      { month: "August", amount: 1250 },
      { month: "September", amount: 1050 },
      { month: "October", amount: 1500 },
      { month: "November", amount: 1600 },
      { month: "December", amount: 1700 },
    ];

    // Formatting hardcoded data for Chart.js
    const months = hardcodedData.map((item) => item.month);
    const amounts = hardcodedData.map((item) => item.amount);

    setChartData({
      labels: months, // Set months as x-axis labels
      datasets: [
        {
          label: "Total Income", // Dataset label
          data: amounts, // Y-axis data points (income amounts)
          borderColor: "rgba(75,192,192,1)", // Line color
          backgroundColor: "rgba(75,192,192,0.2)", // Fill color
          tension: 0.1, // Line tension
        },
      ],
    });
  }, []);

  if (!chartData) {
    return <p>Loading...</p>; // Render loading state while data is being fetched
  }

  return <Line options={options} data={chartData} />;
}
