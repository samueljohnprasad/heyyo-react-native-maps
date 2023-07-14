import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const rootReducer = combineReducers({
  map: reducer,
});

export const reduxStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  return store;
};

export const store = reduxStore();
