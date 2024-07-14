import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Chart,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Data } from "../interfaces/interfaces";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function ContinuousChart({ data }: { data: Data[] }) {
  console.log("rendering continuous chart");
  const chartData = {
    datasets: [
      {
        label: "Probability Density Function",
        data: data[0].x.map((x, i) => ({ x: x, y: data[0].y[i] })),
        fill: true,
        backgroundColor: "rgba(249, 115, 22, 0.6)",
        tension: 0.1,
        pointRadius: 0,
      },
      {
        type: "line",
        label: "Probability Density Function",
        data: data[1].x.map((x, i) => ({ x: x, y: data[1].y[i] })),
        fill: true,
        backgroundColor: "rgba(109, 115, 22, 0.6)",
        tension: 0.1,
        pointRadius: 0,
      },
      {
        type: "bar",
        label: "Probability Density Function",
        data: data[2].x.map((x, i) => ({ x: x, y: data[2].y[i] })),
        fill: true,
        backgroundColor: "rgba(9, 115, 22, 0.6)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };
  // const options = {
  //   scales: {
  //     x: {
  //       type: "linear",
  //       title: {
  //         display: true,
  //         text: "Values",
  //       },
  //     },
  //     y: {
  //       beginAtZero: true,
  //       title: {
  //         display: true,
  //         text: "Probability",
  //       },
  //     },
  //   },
  // };

  return <Line data={chartData} options={options}/>;
}
