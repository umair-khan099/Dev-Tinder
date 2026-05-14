import { createSlice } from "@reduxjs/toolkit";

const feddSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      const newFeed = state.filter((f) => f._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeFeed } = feddSlice.actions;
export default feddSlice.reducer;
