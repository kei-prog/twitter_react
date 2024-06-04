import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTweets } from "../../apis/tweet";
import TweetItem from "../atoms/button/TweetItem";

const TweetItems = ({ setErrorMessages, addTweet }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    if (addTweet) {
      setItems([addTweet, ...items]);
      setOffset(offset + 1);
    }
  }, [addTweet]);

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

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {items.map((item) => (
        <TweetItem key={item.id} item={item} />
      ))}
    </InfiniteScroll>
  );
};

export default TweetItems;
