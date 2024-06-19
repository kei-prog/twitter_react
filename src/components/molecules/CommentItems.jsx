import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "../atoms/button/CommentItem";
import { deleteComment } from "../../apis/comment";

const CommentItems = ({ items, hasMore, fetchComments, onDeleteComment }) => {
  const handleDeleteClick = async (item) => {
    const response = await deleteComment(item.id);
    if (response.success) {
      onDeleteComment(item.id);
    } else {
      setErrorMessages(response.errors);
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchComments}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item) => (
          <CommentItem
            key={item.id}
            item={item}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CommentItems;
