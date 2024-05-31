import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTweet } from "../apis/tweet";
import TweetDetail from "../components/atoms/field/TweetDetail";
import ErrorMessages from "../components/atoms/message/ErrorMessages";

const TweetDetailPage = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchTweet = async () => {
      const response = await getTweet(id);
      if (response.success) {
        setTweet(response.data);
      } else {
        setErrorMessages(response.errors);
      }
    };

    fetchTweet();
  }, [id]);

  return (
    <div className="flex-1 max-w-screen-sm">
      <ErrorMessages messages={errorMessages} />
      {tweet && <TweetDetail tweet={tweet} />}
    </div>
  );
};

export default TweetDetailPage;
