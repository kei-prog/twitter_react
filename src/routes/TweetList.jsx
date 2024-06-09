import { useState, useEffect } from "react";
import ErrorMessages from "../components/atoms/message/ErrorMessages";
import TweetForm from "../components/molecules/TweetForm";
import TweetItems from "../components/molecules/TweetItems";
import { getTweets } from "../apis/tweet";

const TweetList = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [addTweet, setAddTweet] = useState(null);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    const response = await getTweets(offset);
    if (response.success) {
      const newItems = response.data;

      if (newItems.length === 0) {
        setHasMore(false);
        return;
      }
      setItems([...items, ...newItems]);
      setOffset(offset + newItems.length);
    } else {
      setHasMore(false);
      setErrorMessages(response.errors);
    }
  };

  const handleAddTweet = (tweet, previews) => {
    const newTweet = { ...tweet, images: previews };
    setAddTweet(newTweet);
  };

  const handleDeleteTweet = (tweetId) => {
    const updatedItems = items.filter((item) => item.id !== tweetId);
    setItems(updatedItems);
    setOffset(offset - 1);
  };

  useEffect(() => {
    if (addTweet) {
      setItems([addTweet, ...items]);
      setOffset(offset + 1);
    }
  }, [addTweet]);

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
      <TweetItems
        items={items}
        hasMore={hasMore}
        fetchMoreData={fetchMoreData}
        onDeleteTweet={handleDeleteTweet}
      />
    </div>
  );
};

export default TweetList;
