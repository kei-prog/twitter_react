import { useState } from "react";
import TweetForm from "../components/molecules/TweetForm";

const TweetList = () => {
  return (
    <div className="flex-1 max-w-screen-sm">
      <TweetForm />
      <h2>ツイート一覧画面</h2>
    </div>
  );
};

export default TweetList;
