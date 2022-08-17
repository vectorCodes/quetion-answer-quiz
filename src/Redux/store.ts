import { configureStore } from "@reduxjs/toolkit";
import { qnaApi } from "../Service/api";

export const store = configureStore({
  reducer: {
    [qnaApi.reducerPath]: qnaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(qnaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
