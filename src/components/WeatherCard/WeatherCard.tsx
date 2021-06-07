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
  card: {
    borderRadius: "15px",
    backgroundColor: "dimgray",
    border: "1px solid white",
    margin: "0 10px",
  },
  hover: {
    cursor: "pointer",
  },
  selectedCard: {
    border: "3px solid var(--primaryorange)",
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
      style={{
        ...styles.card,
        ...(isSelected ? styles.selectedCard : styles.hover),
      }}
      onClick={() => onClick(date)}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          Temp:{" "}
          {`${temperature}°${unit === TemperatureUnit.IMPERIAL ? "F" : "C"}`}
        </Typography>
        <Typography variant="body2" component="p">
          Date: {format(parseISO(date), "dd MMM yy")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
