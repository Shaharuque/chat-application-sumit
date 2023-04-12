  import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  conversationApi,
  useAddConversationMutation,
  useEditConversationMutation,
} from "../../features/conversation/conversationApi";
import { useGetUserQuery } from "../../features/user/userApi";
import { isValidEmail } from "../../utilis/isValidEmail";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
  const [to, setTo] = useState("");
  const [userCheck, setUserCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(undefined);
  const [responseError, setResponseError] = useState("");
  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector((state) => state.authInfo) || {};
  const { email: userEmail } = loggedInUser || {};

  const [addConversation, { isSuccess: addSuccess }] =
    useAddConversationMutation();
  const [editConversation, { isSuccess: editSuccess }] =
    useEditConversationMutation();

  //useGetUserQuery call for according to user email jeita 'to' ar moddhey asey
  //valid user pelei messsage kortey dibo otherwise na
  //valid user peley akhn check kora lagbey is any conversation exist with valid user and loggedin user or not
  //if conversation exists then conversation edit req and if doesn't exists then conversation add request
  const {
    data: participant,
    isLoading,
    isError,
  } = useGetUserQuery(to, {
    skip: !userCheck, //skip:true holey query req ta skip hobey/server a request jabey na otherwise skip:false holey server a request jabey
  });

  //ekta data change hoisey or hoy ni sheita listen korar best possible way is using useEffect
  //particular ekta data/dependency ar change ar opor base korey useEffect ar callback function will be called
  //useEffect a dependency na diley sheita ekbar call hoy(in general)
  useEffect(() => {
    //participant email and logged in user ar email same na holey getConversation api call hobey
    if (participant?.length > 0 && participant[0]?.email !== userEmail) {
      //now manually action dispatch in RTK query
      dispatch(
        conversationApi.endpoints.getConversation.initiate({
          userEmail: userEmail,
          participantEmail: to,
        })
      )
        .unwrap() //action dispatch korar por jei result pabo sheita promisify korar jnno unwrap() use kora hoisey
        //promisify hobar por async-awit or .then use kora jetey parey
        .then((data) => {
          setConversation(data);
        })
        .catch((err) => {
          setResponseError("There was a problem!");
        });
    }
  }, [dispatch, to, userEmail, participant]);
  console.log("after hitting conversation api", conversation);

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      //...arg=e.target.value=>handleSearch function ar
      //for removing previous timeout then new setTimeout will be executed
      //at a time ekbar e setTimeout() call hobey aita handle ar jnno clearTimeout() use kora hoisey
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    if (isValidEmail(value)) {
      //condition true holey
      // check user API
      console.log(value);
      setUserCheck(true);
      setTo(value);
    }
  };

  const handleSearch = debounceHandler(doSearch, 500); //500 ms por doSearch function will be executed

  const handleSubmit = (e) => {
    e.preventDefault();
    //submit button a click korley doita kaj hoitey parey if conversation exists then update convo otherwise add/create new convo with the participant
    console.log("Form submitted");

    if (conversation?.length > 0) {
      //if conversation id found then update that particular conversation
      // edit conversation
      editConversation({
        id: conversation[0]?.id,
        sender: userEmail,
        data: {
          participants: `${userEmail}-${participant[0].email}`,
          users: [loggedInUser, participant[0]],
          message,
          timestamp: new Date().getTime(),
        },
      });
    } else if (conversation?.length === 0) {
      //if conversation id not found then add/create new conversation
      // add conversation
      addConversation({
        sender: userEmail,
        data: {
          participants: `${userEmail}-${participant[0].email}`,
          users: [loggedInUser, participant[0]],
          message,
          timestamp: new Date().getTime(),
        },
      });
    }
  };

  //addSuccess or editSuccess holey modal off hoa jabey,useEffect ar callback call hobey tokhn e jokhn  addSuccess or editSuccess true hobey
  useEffect(() => {
    if (addSuccess || editSuccess) {
      control();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //control dependency tey na dileo choley cuz aita change hoy na
  }, [addSuccess, editSuccess]);
  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  id="to"
                  name="to"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                disabled={
                  conversation === undefined ||
                  participant[0]?.email === userEmail
                } //conversation===undefined holey submit button disabled hoa thakbey
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Send Message
              </button>
            </div>
          </form>
          {participant?.length === 0 && (
            <Error message="This user does not exist!" />
          )}
          {participant?.length > 0 && participant[0]?.email === userEmail && (
            <Error message="Self Messaging is n't supported" />
          )}
          {responseError && <Error message={responseError} />}
        </div>
      </>
    )
  );
}
