import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connetionsReducer from "./connectionsSlice";
import requestsReducer from "./requests";
const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    connections: connetionsReducer,
    requests: requestsReducer,
  },
});

export default appStore;
