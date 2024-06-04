import { useState } from "react";
import ErrorMessages from "../components/atoms/message/ErrorMessages";
import TweetForm from "../components/molecules/TweetForm";
import TweetItems from "../components/molecules/TweetItems";

const TweetList = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [addTweet, setAddTweet] = useState(null);

  const handleAddTweet = (tweet, previews) => {
    const newTweet = { ...tweet, images: previews };
    setAddTweet(newTweet);
  };

  return (
    <div className="flex-1 max-w-screen-sm">
      <ErrorMessages
        messages={errorMessages}
        className="flex items-center justify-center"
      />
      <TweetForm
        setErrorMessages={setErrorMessages}
        onAddTweet={handleAddTweet}
      />
      <TweetItems setErrorMessages={setErrorMessages} addTweet={addTweet} />
    </div>
  );
};

export default TweetList;
