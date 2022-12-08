//conversation related apis will be handled here

import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    conversations: builder.query({
      //current jei user login tar email ta parameter hisabey dewa lagey
      query: (email) => {
        console.log("conversation get email", email);
        const result = `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=5`;
        return result;
      },
    }),
  }),
});

export const { useConversationsQuery } = conversationApi;
