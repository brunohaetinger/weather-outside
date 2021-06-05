import { Card, CardContent, Typography } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React from "react";
import { TemperatureUnit } from "../../constants/TemperatureUnit";

interface WeatherCardProps {
  temperature: number;
  date: string;
  unit: TemperatureUnit;
  onClick: Function;
  isSelected: boolean;
}

const styles = {
  hover: {
    cursor: "pointer",
  },
  selectedCard: {
    border: "3px solid #ff6384",
  },
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  date,
  unit,
  onClick,
  isSelected,
}) => {
  return (
    <Card
      variant="outlined"
      style={isSelected ? styles.selectedCard : styles.hover}
      onClick={() => onClick(date)}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          Temp: {temperature}°{unit === TemperatureUnit.IMPERIAL ? "F" : "C"}
        </Typography>
        <Typography variant="body2" component="p">
          Date: {format(parseISO(date), "dd MMM yy")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
