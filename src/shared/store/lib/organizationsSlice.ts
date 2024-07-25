import { Organization } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrganizationsState {
  list: Organization[];
}

const initialState: OrganizationsState = {
  list: JSON.parse(localStorage.getItem("organizations") || "[]"),
};

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    addOrganization: (
      state,
      action: PayloadAction<Omit<Organization, "id">>
    ) => {
      const id = crypto.randomUUID();
      state.list.push({ ...action.payload, id });
      localStorage.setItem("organizations", JSON.stringify(state.list));
    },
    updateOrganization: (state, action: PayloadAction<Organization>) => {
      const index = state.list.findIndex((org) => org.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        localStorage.setItem("organizations", JSON.stringify(state.list));
      }
    },
    deleteOrganization: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((org) => org.id !== action.payload);
      localStorage.setItem("organizations", JSON.stringify(state.list));
    },
  },
});

export const { addOrganization, updateOrganization, deleteOrganization } =
  organizationsSlice.actions;
export default organizationsSlice.reducer;
