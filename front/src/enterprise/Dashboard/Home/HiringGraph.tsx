import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },

  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Posted Jobs',
      data: [300, 400, 500, 100, 1000, 4, 800, 8, 2, 300, 77, 300],
      borderColor: '#06020C',
      backgroundColor: '#06020C',
    },
  ],
};

export function HiringGraph() {
  return <Line options={options} data={data} />;
}
