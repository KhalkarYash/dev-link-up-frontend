import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeAllRequests: () => null,
  },
});

export const { addRequests, removeAllRequests } = requestSlice.actions;

export default requestSlice.reducer;
