import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      if (state.data.length === 1) return null;
      return { ...state, data: state.data.slice(1) };
    },
    removeAllFeed: () => null,
  },
});

export const { addFeed, removeFeed, removeAllFeed } = feedSlice.actions;

export default feedSlice.reducer;
