import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "../atoms/button/CommentItem";

const CommentItems = ({ items, hasMore, fetchComments }) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchComments}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item) => (
          <CommentItem key={item.id} item={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CommentItems;
