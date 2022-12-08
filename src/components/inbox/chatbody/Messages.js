import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ messages = [] }) {
  //messages default value=[]
  console.log(messages);
  //logged in user email from redux store
  const { user } = useSelector((state) => state?.authInfo) || {};
  const { email: loggedInUserEmail } = user || {};
  return (
    <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
      <ul className="space-y-2">
        {messages
          ?.slice() //slice() kora hoisey only making a copy of messages then shei copy r opor sorting
          ?.sort((a, b) => a.timestamp - b.timestamp)
          ?.map((m) => {
            const { message: lastMessage, sender } = m || {};
            //logged in user ar chat always end align a thakbey
            const messageAlign =
              sender?.email === loggedInUserEmail ? "end" : "start";
            return (
              <Message
                key={m.id}
                justify={messageAlign}
                message={lastMessage}
              />
            );
          })}
      </ul>
    </div>
  );
}
