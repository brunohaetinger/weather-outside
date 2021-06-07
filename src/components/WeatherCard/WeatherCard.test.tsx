import { render, screen } from "@testing-library/react";
import { TemperatureUnit } from "../../constants/TemperatureUnit";
import WeatherCard from "./WeatherCard";

test("renders temperature text", () => {
  render(
    <WeatherCard
      temperature={25}
      date={"2020-01-02"}
      unit={TemperatureUnit.METRIC}
      onClick={() => {}}
      isSelected={false}
    />
  );
  const tempTextElement = screen.getByText(/25°C/i);
  const dateTextElement = screen.getByText(/02 jan 20/i);
  expect(tempTextElement).toBeInTheDocument();
  expect(dateTextElement).toBeInTheDocument();
});
