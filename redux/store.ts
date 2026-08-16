import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import ordersReducer from "./features/orderSlice";

import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { orderApi } from "./api/orderApi";
import { invoiceApi } from "./api/invoiceApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    orders: ordersReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      invoiceApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
