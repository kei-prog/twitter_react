import MessagePostIcon from "/src/assets/message-post.svg?react";

const MessagePostButton = ({ isDisabled }) => {
  return (
    <button
      type="submit"
      className={`rounded-full w-8 h-8 hover:bg-gray-700 border-none flex items-center justify-center`}
      disabled={isDisabled}
      aria-label="メッセージ送信ボタン"
    >
      <MessagePostIcon
        className={`w-5 h-5 ${isDisabled ? "text-blue-700" : "text-blue-500"}`}
      />
    </button>
  );
};

export default MessagePostButton;
