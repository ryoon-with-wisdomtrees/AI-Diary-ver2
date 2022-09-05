import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoginPg: "",
  isSignUpPg: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDataDetails: (state, action) => {
      state.isLoginPg = action.payload.isLoginPg;
      state.isSignUpPg = action.payload.isSignUpPg;
    },
  },
});

export const { setUserLoginDataDetails } = userSlice.actions;
export const selectLoginPgState = (state) => state.user.isLoginPg;
export const selectSignUpPgState = (state) => state.user.isSignUpPg;
export default userSlice.reducer;
