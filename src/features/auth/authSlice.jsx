//normal reducers will be handled here sync kaj gula jader sathey api calling ar relation nai
//loggedIn,loggedOut doita action defined here
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state, action) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
