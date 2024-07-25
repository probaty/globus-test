import { Employee } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EmployeesState {
  list: Employee[];
}

const initialState: EmployeesState = {
  list: JSON.parse(localStorage.getItem("employees") || "[]"),
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.list.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.list));
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.list.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        localStorage.setItem("employees", JSON.stringify(state.list));
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((emp) => emp.id !== action.payload);
      localStorage.setItem("employees", JSON.stringify(state.list));
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } =
  employeesSlice.actions;
export default employeesSlice.reducer;
