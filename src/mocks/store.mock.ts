import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import * as appStore from "../app/store";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState: appStore.RootState = {
  forecast: {
    isLoading: false,
    error: null,
    items: [],
  },
};

export const getAppStoreMock = (
  customState?: appStore.RootState
): MockStoreEnhanced<unknown, {}> => {
  const store = mockStore({ ...initialState, ...customState });
  return store;
};
