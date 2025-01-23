import InfiniteScroll from "react-infinite-scroll-component";
import GroupItem from "../atoms/button/GroupItem";
import { useState } from "react";

const GroupItems = ({
  items,
  hasMore,
  fetchMoreData,
  fetchMoreMessageData,
  selectGroup,
}) => {
  const [isSelectedId, setIsSelectedId] = useState(null);

  const handleSelectGroup = (id) => {
    setIsSelectedId(id);
    selectGroup(id);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height="90vh"
      >
        {items.map((item) => (
          <GroupItem
            key={item.id}
            item={item}
            fetchMoreMessageData={fetchMoreMessageData}
            selectGroup={() => handleSelectGroup(item.id)}
            isSelected={isSelectedId === item.id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default GroupItems;
