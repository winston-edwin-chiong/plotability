import { CategoryScale, LinearScale, PointElement, LineElement, Filler, Chart } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function ContinuousChart({ data, bounds }: { data: number[], bounds: (number | null)[]}) {
  const chartData = {
    labels: createArrayWithStep(bounds[0] as number, bounds[1] as number, 0.05),
    datasets: [
      {
        label: "Probability Density Function",
        data: data,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };


  return <Line data={chartData} />;
}

function createArrayWithStep(start: number, end: number, step: number): number[] {
    const array: number[] = [];
    for (let i = start; i <= end; i += step) {
      array.push(Number(i.toFixed(2)));
    }
    return array;
  }
