//authentication related async apis will be handled here

import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        accept: "application/json",
        body: data,
      }),
      //arg=data
      //register req korar por additonal kaj jemon localstorage update and redux action dispatch ai kaj doita kora hoisey if register req is successfull bt if error happened then sheita catch block a handle hobey ar aisob additional kaj ar jnno onQueryStarted() use hoisey

      //summary: register api tey hit korey successfull holey localStorage and redux store both update hoye jabey ar api tey req ar por error peley sheita catch blk a handle hobey
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled; //register req korar por success result ta 'result' a store hobey ar error holey sheita catch block a jabey
          console.log("register req success hober por", result);

          //update local storage if req is successful
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          //dispatch userLoggedIn action to update redux store
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          //error holey sheita aikhaney handle korar drkr nai sheita UI tey handle korlei hobey
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        accept: "application/json",
        body: data,
      }),

      //user successfully login korley extra kaj handle/dependent kaj like user register korley ja kora lagto tai kora lagbey so thats why same way tey onQueryStarted() aikhaneo use kora hocchey
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled; //register req korar por success result ta 'result' a store hobey ar error holey sheita catch block a jabey

          //update local storage if req is successful
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          //dispatch userLoggedIn action to update redux store
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (e) {
          //do nothing
        }
      },
    }),
  }),
});
//login or register korar por localstorage and redux store both update hoa jabey aikhanei ..jehoto ai kaj ta login or reg korar por common kaj tai aikhaney onQueryStarted() diye handle kora hoisey but sob kaj aivabey kokhnoi handle kora uchit na
export const { useLoginMutation, useRegisterMutation } = authApi;
