import { memo } from "react";
import { Data } from "../interfaces/interfaces";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Chart as ChartJS,
  plugins,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  plugins
);

const colors = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
];

const Figure = memo(({ data }: { data: Data[] }) => {
  const chartData = {
    datasets: data.map((dist, i) => ({
      type: dist.type == "continuous" ? ("line" as const) : ("bar" as const),
      label: dist.name,
      data: dist.data,
      fill: true,
      backgroundColor: colors[i],
      pointRadius: 0,
      tension: 0.75,
    })),
  };

  const options = {
    scales: {
      x: {
        type: "linear" as const,
        title: {
          display: true,
          text: "X",
        },
        ticks: {
          stepSize: 1.0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const plugins = {
    id: "chart-plugins",
    legend: {
      display: false,
      position: "right",
    },
    title: {
      display: true,
      text: "Probability Density Function",
    },
  };

  return (
    <Chart data={chartData} options={options} plugins={[plugins]} type="line" />
  );
});

export default Figure;
