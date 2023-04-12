//user related apis will be handled here
//user api
//client side thekey asha email ar corresponding user asey kina sheita ai getUser api ar moddhey pawa jabeyh

import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    //getUser api(get request)
    getUser: builder.query({
      query: (email) => {
        console.log("Ui thekey asha", email);
        //id wise bunch of messages
        const result = `/users?email=${email}`; //user email jodi server a thakey tahley ekta array send ar jodi na thakey tahley empty array send
        return result;
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
