import { createSlice } from "@reduxjs/toolkit";

const feddSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => null,
  },
});

export const { addFeed, removeFeed } = feddSlice.actions;
export default feddSlice.reducer;
