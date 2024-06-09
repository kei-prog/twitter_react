import InfiniteScroll from "react-infinite-scroll-component";
import TweetItem from "../atoms/button/TweetItem";
import ErrorMessages from "../atoms/message/ErrorMessages";
import { useState } from "react";
import { deleteTweet } from "../../apis/tweet";

const TweetItems = ({ items, hasMore, fetchMoreData, onDeleteTweet }) => {
  const [errorMessages, setErrorMessages] = useState([]);

  const handleDeleteClick = async (item) => {
    const response = await deleteTweet(item.id);
    if (response.success) {
      onDeleteTweet(item.id);
    } else {
      setErrorMessages(response.errors);
    }
  };

  return (
    <div>
      <ErrorMessages messages={errorMessages} />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item) => (
          <TweetItem
            key={item.id}
            item={item}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default TweetItems;
