import { useState } from "react";
import twitterText from "twitter-text";
import ReactTextareaAutosize from "react-textarea-autosize";
import MessagePostButton from "../atoms/button/MessagePostButton";
import { postMessage } from "../../apis/message";

const MessageForm = ({ setErrorMessages, onAddMessage, groupId }) => {
  const [message, setMessage] = useState("");
  const [isMessagePostButtonDisabled, setIsMessagePostButtonDisabled] =
    useState(true);

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    const messageLength = twitterText.parseTweet(newMessage).weightedLength;

    if (messageLength <= 500) {
      setMessage(newMessage);
      setIsMessagePostButtonDisabled(newMessage.trim() === "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);

    try {
      const messageResponse = await postMessage(message.trim(), groupId);
      if (messageResponse.success) {
        onAddMessage(messageResponse.data);
        setMessage("");
        setIsMessagePostButtonDisabled(true);
      } else {
        setErrorMessages(messageResponse.errors);
      }
    } catch (error) {
      setErrorMessages(["メッセージの投稿に失敗しました。"]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isMessagePostButtonDisabled) {
        handleSubmit(e);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-800 m-2 p-4 rounded-3xl text-right"
    >
      <ReactTextareaAutosize
        className="w-full text-lg focus:border-none focus:outline-none bg-transparent"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        placeholder="新しいメッセージを作成"
        maxRows={5}
      />
      <MessagePostButton isDisabled={isMessagePostButtonDisabled} />
    </form>
  );
};

export default MessageForm;
