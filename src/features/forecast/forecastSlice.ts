import {
  createSlice,
  createAsyncThunk,
  Slice,
  createSelector,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import { TemperatureUnit } from "../../constants/TemperatureUnit";
import { ForecastItem, ForecastSegment } from "./types";

const APP_ID = "75f972b80e26f14fe6c920aa6a85ad57";
const CITY = "Munich,de";
const TIMESTAMP_AMOUNT = "40";

type DaysTemperatures = {
  [key: string]: number[];
};

type DayAverageTemperature = {
  date: string;
  temperature: number;
};

type ForecastState = {
  isLoading: boolean;
  error: string | null;
  items: ForecastItem[];
};

const initialState: ForecastState = {
  isLoading: false,
  error: null,
  items: [],
};

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (unit: TemperatureUnit) => {
    const response = await client.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&APPID=${APP_ID}&cnt=${TIMESTAMP_AMOUNT}&units=${unit}`
    );
    return response.list;
  }
);

const forecastSlice: Slice<ForecastState, {}, "forecast"> = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchForecast.fulfilled, (state, { payload }) => {
      state.items = [...payload];
      state.isLoading = false;
    });
  },
});

export default forecastSlice.reducer;

export const selectForecast = (state: RootState) => state.forecast;
export const selectForecastGroupedByDay = createSelector(
  selectForecast,
  (forecast): DayAverageTemperature[] => {
    const groupedDays: any = forecast.items.reduce((acc, item) => {
      const [date] = item.dt_txt.split(" ");
      acc[date] = acc[date] ? [...acc[date], item.main.temp] : [item.main.temp];
      return acc;
    }, {} as DaysTemperatures);
    const days = Object.keys(groupedDays);
    return days.map((day) => ({
      date: day,
      temperature: Math.round(
        groupedDays[day].reduce((a: number, b: number) => a + b, 0) /
          groupedDays[day].length
      ),
    }));
  }
);
export const selectDaySegmentsForecast = (day: string) =>
  createSelector(selectForecast, (forecast): ForecastSegment[] | null => {
    if (!day) return null;
    return forecast.items
      .filter((item) => {
        const [date] = item.dt_txt.split(" ");
        return date === day;
      })
      .map((item) => {
        const [, time] = item.dt_txt.split(" ");
        return {
          time,
          temperature: item.main.temp,
        };
      });
  });
