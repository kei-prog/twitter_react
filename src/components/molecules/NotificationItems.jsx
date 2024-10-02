import InfiniteScroll from "react-infinite-scroll-component";
import NotificationItem from "../atoms/button/NotificationItem";

const NotificationItems = ({ items, hasMore, fetchMoreData }) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </InfiniteScroll>
      {items.length === 0 && (
        <div className="pt-4 text-lg">通知はありません</div>
      )}
    </div>
  );
};

export default NotificationItems;
