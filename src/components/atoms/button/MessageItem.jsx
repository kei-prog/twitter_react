import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const MessageItem = ({ item }) => {
  const { userId } = useContext(UserContext);

  return (
    <div
      className={`flex py-1 ${userId === item.sender.id ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`text-left p-2 m-2 rounded-2xl text-white
          ${userId === item.sender.id ? "bg-blue-500 " : "bg-gray-500"}
          max-w-sm break-words whitespace-pre-wrap`}
      >
        <div>{item.content}</div>
      </div>
    </div>
  );
};

export default MessageItem;
