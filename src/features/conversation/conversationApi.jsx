//conversation related apis will be handled here

import { apiSlice } from "../api/apiSlice";
import { messagaesApi } from "../messages/messagesApi";

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

    //kono user ar sathey convo start kortey chailey previously oi user/participant ar sathey convo asey kinta sheita ber korar api request'
    getConversation: builder.query({
      //current jei user login tar email ta parameter hisabey dewa lagey
      query: ({ userEmail, participantEmail }) => {
        if (userEmail !== participantEmail) {
          const result = `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`;
          return result;
        } else {
          const result = { text: "No Convo found" };
          return result;
        }
      },
    }),

    //create convo
    addConversation: builder.mutation({
      //current jei user login tar email ta parameter hisabey dewa lagey
      query: ({ sender, data }) => ({
        //object return
        url: "/conversations",
        method: "POST",
        body: data,
      }),
      //addConversation api tey req korar por onQueryStared will be triggered
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const conversation = await queryFulfilled; //addConversation api request successful holey conversation data will be found
        console.log(conversation);
        if (conversation?.data?.id) {
          // silent entry to message table
          const users = arg.data.users;
          const senderUser = users.find((user) => user.email === arg.sender);
          const receiverUser = users.find((user) => user.email !== arg.sender);

          //addMessage api will be called
          dispatch(
            messagaesApi.endpoints.addMessage.initiate({
              conversationId: conversation?.data?.id,
              sender: senderUser,
              receiver: receiverUser,
              message: arg.data.message,
              timestamp: arg.data.timestamp,
            })
          );
        }
      },
    }),

    //update conversation if available
    editConversation: builder.mutation({
      //current jei user login tar email ta parameter hisabey dewa lagey
      query: ({ sender, id, data }) => ({
        //object return
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const conversation = await queryFulfilled; //addConversation api request successful holey conversation data will be found
        console.log(conversation);
        if (conversation?.data?.id) {
          // silent entry to message table
          const users = arg.data.users;
          const senderUser = users.find((user) => user.email === arg.sender);
          const receiverUser = users.find((user) => user.email !== arg.sender);

          //addMessage api will be called
          dispatch(
            messagaesApi.endpoints.addMessage.initiate({
              conversationId: conversation?.data?.id,
              sender: senderUser,
              receiver: receiverUser,
              message: arg.data.message,
              timestamp: arg.data.timestamp,
            })
          );
        }
      },
    }),
  }),
});

export const {
  useConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationApi;
