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
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler);

const Figure = memo(({ data }: { data: Data[] }) => {
  console.log("rendering continuous chart");
  const chartData = {
    datasets: data.map((dist) => ({
      type: dist.type == "continuous" ? ("line" as const) : ("bar" as const),
      label: dist.name,
      data: dist.data,
      fill: true,
      backgroundColor: "rgba(249, 115, 22, 0.6)",
      tension: 0.1,
      pointRadius: 0,
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
          stepSize: 1, // TODO: Set the step size to 1 if any of the distributions is discrete, otherwise leave as default
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Probability Density Function",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Chart data={chartData} options={options} type="line" />;
});

export default Figure;
