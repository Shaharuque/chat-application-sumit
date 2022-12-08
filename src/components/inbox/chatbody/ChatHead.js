import { useSelector } from "react-redux";
import getAvatar from "gravatar-url";

export default function ChatHead({ message }) {
  const { sender, receiver } = message || {};
  //loggedin user from redux store
  const { user } = useSelector((state) => state.authInfo);
  const { email } = user || {};
  //now chat head a je message pathaisey tar image show korano lagbey so je user loggedin asey se holo receiver and je pathaisey shey sender aita determine kora lagbey
  const partnerInfo = sender?.email === email ? sender : receiver;
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={getAvatar(partnerInfo?.email, {
          size: 80,
        })}
        alt={partnerInfo?.name}
      />
      <span className="block ml-2 font-bold text-gray-600">
        {partnerInfo?.name}
      </span>
    </div>
  );
}
