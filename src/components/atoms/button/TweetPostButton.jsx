import React from "react";

const TweetPostButton = ({ isDisabled }) => {
  return (
    <button
      type="submit"
      className={`py-2 font-bold rounded-full px-7 bg-blue-400 ${
        isDisabled ? "opacity-50" : " hover:bg-blue-500"
      }`}
      disabled={isDisabled}
    >
      ポストする
    </button>
  );
};

export default TweetPostButton;
