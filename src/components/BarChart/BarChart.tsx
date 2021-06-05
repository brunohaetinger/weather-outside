import { memo } from "react";
import { Bar } from "react-chartjs-2";

type BarChartProps = {
  data: number[] | null;
  dataLabels: string[];
  label: string;
};

const BarChart: React.FC<BarChartProps> = ({ data, dataLabels, label }) => {
  if (!data) {
    return null;
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const chartData = {
    labels: dataLabels,
    datasets: [
      {
        label,
        data,
        backgroundColor: ["rgba(255, 72, 0, 0.2)"],
        borderColor: ["rgba(255, 72, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} options={options} type />
    </div>
  );
};

export default memo(BarChart);
