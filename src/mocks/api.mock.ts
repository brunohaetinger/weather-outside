import fetchMock from "fetch-mock";
import { TemperatureUnit } from "../constants/TemperatureUnit";
import { forecastMock } from "../mocks/forecast.mock";

const APP_ID = "75f972b80e26f14fe6c920aa6a85ad57";
const CITY = "Munich,de";
const TIMESTAMP_AMOUNT = "40";

export const mockForecastAPI = (unit = TemperatureUnit.IMPERIAL) => {
  fetchMock.getOnce(
    `https://cors.brunohaetinger.com:8080/https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&APPID=${APP_ID}&cnt=${TIMESTAMP_AMOUNT}&units=${unit}`,
    {
      body: { ...forecastMock },
      headers: { "content-type": "application/json" },
    }
  );
};
