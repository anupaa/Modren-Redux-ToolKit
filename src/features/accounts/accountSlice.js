import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanReason: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // From dispatch function we receive payload as Object since its not possible to work on it directly we use "prepare"
    requestLoan: {
      prepare(amount, loanReason) {
        return {
          payload: {
            amount,
            loanReason,
          },
        };
      },
      reducer(state, action) {
        state.loan = action.payload.amount;
        state.loanReason = action.payload.loanReason;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanReason = "";
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
// Since its an async task  instead of using thunk library i'm using below code
export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  console.log("currency:", currency);
  return async (dispatch, getState) => {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const convertedData = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedData });
  };
};
export default accountSlice.reducer;
