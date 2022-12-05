import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { authReducer } from "../features/auth/authSlice";
import { conversationReducer } from "../features/conversation/conversationSlice";
import { messagesReducer } from "../features/messages/messagesSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    authInfo: authReducer,
    conversation: conversationReducer,
    messages: messagesReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
