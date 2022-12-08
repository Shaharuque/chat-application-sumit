//messages related apis will be handled here
//messages api

import { apiSlice } from "../api/apiSlice";

export const messagaesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    //getMessages api(get request)
    getMessages: builder.query({
      query: (id) => {
        console.log("chat id", id);
        //id wise bunch of messages
        const result = `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`;
        return result;
      },
    }),
  }),
});

export const { useGetMessagesQuery } = messagaesApi;
