import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authentication/authSlice";
import { authApi } from "./authentication/authApi";
import { todoApi } from "./todo/todoApi";
import { categoryApi } from "./category/categoryApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      todoApi.middleware,
      categoryApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
