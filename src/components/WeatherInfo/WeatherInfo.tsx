import { RadioGroup, FormControlLabel, Radio, Box } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import { TemperatureUnit } from "../../constants/TemperatureUnit";
import {
  fetchForecast,
  selectDaySegmentsForecast,
  selectForecast,
  selectForecastGroupedByDay,
} from "../../features/forecast/forecastSlice";
import Loading from "../Loading/Loading";
import WeatherCard from "../WeatherCard/WeatherCard";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import DaySegmentsBarChart from "../DaySegmentsBarChart.tsx/DaySegmentsBarChart";

const styles = {
  radioGroup: {
    display: "flex",
    justifyContent: "center",
  },
  arrowBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardsBox: {
    display: "flex",
    justifyContent: "space-around",
    padding: "25px 0px",
  },
  hover: {
    cursor: "pointer",
  },
  disabled: {
    color: "lightgray",
  },
};

const WeatherInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypedSelector(selectForecast);
  const daysForecast = useTypedSelector(selectForecastGroupedByDay);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const daySegmentsForecast = useTypedSelector(
    selectDaySegmentsForecast(selectedDay)
  );
  const [selectedTemperatureUnit, setSelectedTemperatureUnit] =
    React.useState<TemperatureUnit>(TemperatureUnit.IMPERIAL);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageSize = 3;
  const isFirstPage = useMemo(() => pageIndex === 0, [pageIndex]);
  const isLastPage = useMemo(
    () => pageIndex + pageSize === daysForecast.length,
    [pageIndex, daysForecast]
  );

  useEffect(() => {
    dispatch(fetchForecast(selectedTemperatureUnit));
  }, [selectedTemperatureUnit]);

  const nextPage = () => {
    if (!isLastPage) {
      const maxIndex = daysForecast.length - 1;
      const nextPageStartIndex = pageIndex + pageSize;
      const nextPageEndIndex = nextPageStartIndex + pageSize - 1;

      if (nextPageEndIndex <= maxIndex) {
        setPageIndex(nextPageStartIndex);
      } else {
        setPageIndex(maxIndex - pageSize + 1);
      }
    }
  };

  const previousPage = () => {
    if (!isFirstPage) {
      const previousPageStartIndex = pageIndex - pageSize;
      if (previousPageStartIndex >= 0) {
        setPageIndex(previousPageStartIndex);
      } else {
        setPageIndex(0);
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <RadioGroup
        row
        aria-label="fahrenheit"
        style={styles.radioGroup}
        name="metric1"
        value={selectedTemperatureUnit}
        onChange={(ev) => {
          const newUnit =
            ev.target.value === TemperatureUnit.METRIC
              ? TemperatureUnit.METRIC
              : TemperatureUnit.IMPERIAL;
          setSelectedTemperatureUnit(newUnit);
        }}
      >
        <FormControlLabel
          value={TemperatureUnit.METRIC}
          control={<Radio />}
          label="Celcius"
        />
        <FormControlLabel
          value={TemperatureUnit.IMPERIAL}
          control={<Radio />}
          label="Fahrenheit"
        />
      </RadioGroup>

      <Box style={styles.arrowBox}>
        <ArrowBackRoundedIcon
          style={!isFirstPage ? styles.hover : styles.disabled}
          onClick={previousPage}
          color="secondary"
          fontSize="large"
        />
        <ArrowForwardRoundedIcon
          style={!isLastPage ? styles.hover : styles.disabled}
          onClick={nextPage}
          color="secondary"
          fontSize="large"
        />
      </Box>

      {daysForecast.length ? (
        <Box style={styles.cardsBox}>
          {[...Array(pageSize)].map((e, i) => (
            <WeatherCard
              isSelected={daysForecast[pageIndex + i].date === selectedDay}
              temperature={daysForecast[pageIndex + i].temperature}
              date={daysForecast[pageIndex + i].date}
              unit={selectedTemperatureUnit}
              onClick={setSelectedDay}
            />
          ))}
        </Box>
      ) : null}
      <DaySegmentsBarChart
        segments={daySegmentsForecast}
        unit={selectedTemperatureUnit}
      />
    </div>
  );
};

export default WeatherInfo;
