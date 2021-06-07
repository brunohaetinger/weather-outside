import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";
import { getAppStoreMock } from "../mocks/store.mock";
import { mockForecastAPI } from "../mocks/api.mock";
import { forecastMock } from "../mocks/forecast.mock";
import { ForecastItem } from "../features/forecast/types";

describe("App", () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeAll(() => {
    mockForecastAPI();
  });

  beforeEach(() => {
    store = getAppStoreMock({
      forecast: {
        items: forecastMock.list as ForecastItem[],
        isLoading: false,
        error: null,
      },
    });
  });

  test("renders App component with WeatherInfo", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await new Promise((resolve) => setTimeout(resolve, 5));
    await waitFor(() => {
      const radioElement = screen.getByText(/Fahrenheit/i);
      expect(radioElement).toBeInTheDocument();
    });
  });

  test("renders App component with WeatherInfo with 3 cards", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await new Promise((resolve) => setTimeout(resolve, 5));
    await waitFor(() => {
      const cardElements = screen.getAllByText(/Temp:/i);
      expect(cardElements).toHaveLength(3);
    });
  });
});
