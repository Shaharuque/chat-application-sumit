//normal reducers will be handled here
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
});

export const {} = conversationSlice.actions;
export const conversationReducer = conversationSlice.reducer;
