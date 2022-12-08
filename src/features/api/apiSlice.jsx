import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      //endpoint specific headers pathanor jnno 'endpoint' parameter ta dewa hoisey
      const token = await getState()?.authInfo?.accessToken; //getState() for get data from redux store (normal reducer)

      // If we have a token set in state, let's assume that we should be passing it.
      //token pailey sheita headers a add korey dibey
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", "Application/json");
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
