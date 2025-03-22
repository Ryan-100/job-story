// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented(state) {
      // it's okay to do this because immer makes it immutable
      // under the hood
      state.value++;
    },
    amountAdded(state, action) {
      state.value += action.payload;
    },
    // decrement
    // reset
  },
});

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;
