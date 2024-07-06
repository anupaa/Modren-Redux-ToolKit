import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullName: "",
  nationalID: "",
  createdAT: "",
};
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // From dispatch function we receive payload as Object since its not possible to work on it directly we use "Preapre"
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAT = new Date().toISOString();
      },
    },
  },
});

export const { createCustomer } = customerSlice.actions;
export default customerSlice.reducer;
