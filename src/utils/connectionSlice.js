import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, action) => state.shift(),
    removeAllConnections: (state, action) => {
      return null;
    },
  },
});

export const { addConnections, removeConnections, removeAllConnections } =
  connectionSlice.actions;

export default connectionSlice.reducer;
