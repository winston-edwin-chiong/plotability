import { memo } from "react";
import { Data } from "../interfaces/interfaces";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  BarController,
  LineController,
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Filler,
  Title,
  Tooltip,
  Legend,
);

// https://coolors.co/3c91e6-342e37-a2d729-fafffd-fa824c
const colors = [
  "rgba(250, 130, 76, 0.6)",
  "rgba(60, 145, 230, 0.6)",
  "rgba(162, 215, 41, 0.6)",
];

const Figure = memo(
  ({ data, distFunc }: { data: Data[]; distFunc: string }) => {
    const chartData = {
      datasets: data.map((dist, i) => ({
        type: getChartType(dist.type),
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
          ticks: { stepSize: 1.0 },
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: { enabled: false },
        legend: { position: "top" as const },
        title: {
          display: true,
          text: getChartTitle(distFunc),
        },
        colors: {
          enabled: true,
        },
      },
    };

    return <Chart data={chartData} options={options} type={"line"} />;
  }
);

function getChartTitle(distFunc: string) {
  switch (distFunc) {
    case "pdf_pmf":
      return "Probability Density Function";
    case "cdf":
      return "Cumulative Distribution Function";
    default:
      return "";
  }
}

function getChartType(distType: string) {
  switch (distType) {
    case "continuous":
    default:
      return "line" as const;
    case "discrete":
      return "bar" as const;
  }
}

export default Figure;
