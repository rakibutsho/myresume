import { combineReducers } from "@reduxjs/toolkit";
import baseApi from "../api/baseApi";
import authReducer from "@/redux/features/auth/authSlice";
import uiReducer from "@/redux/features/ui/uiSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  ui: uiReducer,
});

export default rootReducer;
