//messages related apis will be handled here

import { apiSlice } from "../api/apiSlice";

export const messagaesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
  }),
});
