import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customers/customerSlice.js";
import accountReducer from "./features/accounts/accountSlice.js";

const store = configureStore({
  reducer: {
    customer: customerReducer,
    account: accountReducer,
  },
});
export default store;
