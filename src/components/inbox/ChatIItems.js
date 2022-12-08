import { useSelector } from "react-redux";
import { useConversationsQuery } from "../../features/conversation/conversationApi";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";
import moment from "moment";
import gravatarUrl from "gravatar-url";
import { getPartnerInfo } from "../../utilis/getPartnerInfo";
import { Link } from "react-router-dom";

export default function ChatItems() {
  //logged in user
  const { user } = useSelector((state) => state.authInfo) || {};
  const userEmail = user?.email || "";
  console.log(userEmail);
  const {
    data: conversations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useConversationsQuery(userEmail);
  console.log(conversations, error);

  let content = null;
  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = <li className="m-2 text-center">No conversations found!</li>;
  } else if (!isLoading && !isError && conversations?.length > 0) {
    content = conversations?.map((conversation) => {
      const partnerInfo = getPartnerInfo(conversation?.users, userEmail);
      console.log(partnerInfo);
      return (
        <Link key={conversation?.id} to={`/inbox/${conversation?.id}`}>
          <li>
            <ChatItem
              //   gravatarUrl is used to get random pics against email adress
              avatar={gravatarUrl(partnerInfo?.email, {
                size: 80,
              })}
              name={partnerInfo?.name}
              lastMessage={conversation?.message}
              lastTime={moment(conversation?.timestamp).fromNow()} //present time thekey given timestamp koto durey sheita human readable format a dekhabey
            />
          </li>
        </Link>
      );
    });
  }

  return <ul>{content}</ul>;
}
