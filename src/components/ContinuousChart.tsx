import { CategoryScale, LinearScale, PointElement, LineElement, Filler, Chart } from "chart.js";
import { Line } from "react-chartjs-2";
import { Data } from "../interfaces/interfaces";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function ContinuousChart({ data }: { data: Data }) {
  const chartData = {
    labels: data.x,
    datasets: [
      {
        label: "Probability Density Function",
        data: data.y,
        fill: true,
        backgroundColor: "rgba(249, 115, 22, 0.6)",
        borderColor: "rgb(249 115 22)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  return <Line data={chartData} />;
}
