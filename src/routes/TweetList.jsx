import { useState } from "react";
import ErrorMessages from "../components/atoms/message/ErrorMessages";
import TweetForm from "../components/molecules/TweetForm";
import TweetItems from "../components/molecules/TweetItems";

const TweetList = () => {
  const [errorMessages, setErrorMessages] = useState([]);

  return (
    <div className="flex-1 max-w-screen-sm">
      <ErrorMessages
        messages={errorMessages}
        className="flex items-center justify-center"
      />
      <TweetForm setErrorMessages={setErrorMessages} />
      <TweetItems setErrorMessages={setErrorMessages} />
    </div>
  );
};

export default TweetList;
