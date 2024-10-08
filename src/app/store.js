import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { middlewares } from "./middleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export default store;
