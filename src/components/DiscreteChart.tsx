import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Data } from "../interfaces/interfaces";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export default function DiscreteChart({ data }: { data: Data }) {
  const chartData = {
    labels: data.x,
    datasets: [
      {
        label: "Probability Mass Function",
        data: data.y,
        backgroundColor: "rgba(249, 115, 22, 0.6)",
        borderColor: "rgb(249 115 22)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Categories",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Probability",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
