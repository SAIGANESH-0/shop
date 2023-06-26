import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addToOrders: (state, action) => {
      state.push(action.payload);
      return state;
    },
  },
});

export const { addToOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
