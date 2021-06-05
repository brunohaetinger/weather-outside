import { memo } from "react";
import { TemperatureUnit } from "../../constants/TemperatureUnit";
import { ForecastSegment } from "../../features/forecast/types";
import BarChart from "../BarChart/BarChart";

type DaySegmentsBarChartProps = {
  segments: ForecastSegment[] | null;
  unit: TemperatureUnit;
};

const DaySegmentsBarChart: React.FC<DaySegmentsBarChartProps> = ({
  segments,
  unit,
}) => {
  if (!segments) {
    return null;
  }

  const segmentsTemperature = segments.map((segment) =>
    Math.round(segment.temperature)
  );

  const dataLabels = segments.map((segment) => segment.time.slice(0, 5));

  const label = `Temperature in °${
    unit === TemperatureUnit.IMPERIAL ? "F" : "C"
  }`;

  return (
    <BarChart
      data={segmentsTemperature}
      dataLabels={dataLabels}
      label={label}
    />
  );
};

export default memo(DaySegmentsBarChart);
