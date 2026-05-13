import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connetionsReducer from "./connectionsSlice";
const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    connections: connetionsReducer,
  },
});

export default appStore;
