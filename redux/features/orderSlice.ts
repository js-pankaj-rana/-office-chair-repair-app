import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrder } from "@/components/order/OrderList";

interface IOrderState {
  orders: any | null;
}

const initialState: IOrderState = {
  orders: null,
};

export const orderSlice = createSlice({
  initialState,
  name: "orderSlice",
  reducers: {
    setOrders: (state, action: PayloadAction<any>) => {
      state.orders = action.payload;
    },
  },
});

export default orderSlice.reducer;

export const { setOrders } = orderSlice.actions;
