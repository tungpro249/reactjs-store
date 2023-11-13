import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export function VerticalBarChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    fetch("http://localhost:8000/api/total-incomes")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API: ", error);
      });
  }, []);

  if (!chartData) {
    return null;
  }

  return <Bar options={options} data={chartData} />;
}