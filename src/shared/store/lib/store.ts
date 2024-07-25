import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import organizationsReducer from "./organizationsSlice";

export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
    employees: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
