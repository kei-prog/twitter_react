import InfiniteScroll from "react-infinite-scroll-component";
import TweetItem from "../atoms/button/TweetItem";

const TweetItems = ({ items, hasMore, fetchMoreData }) => {
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
