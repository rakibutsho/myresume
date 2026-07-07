"use client";

import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";


const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;
