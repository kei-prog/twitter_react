import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "../atoms/button/MessageItem";

const MessageItems = ({
  messageItems,
  messageHasMore,
  fetchMoreMessageData,
}) => {
  return (
    <div className="border-b border-gray-800 flex-1">
      <InfiniteScroll
        dataLength={messageItems.length}
        next={fetchMoreMessageData}
        hasMore={messageHasMore}
        height="90vh"
        loader={<h4>Loading...</h4>}
        inverse={true}
        className="flex flex-col-reverse"
      >
        {messageItems.map((messageItem) => (
          <MessageItem key={messageItem.id} item={messageItem} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MessageItems;
