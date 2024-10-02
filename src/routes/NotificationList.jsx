import { useState, useEffect } from "react";
import ErrorMessages from "../components/atoms/message/ErrorMessages";
import SideMenu from "../components/molecules/SideMenu";
import { getNotifications } from "../apis/notification";
import NotificationItems from "../components/molecules/NotificationItems";

const NotificationList = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    const response = await getNotifications(offset);
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
    <div className="flex flex-1">
      <SideMenu />
      <div className="flex-1 max-w-screen-sm">
        <ErrorMessages
          messages={errorMessages}
          className="flex items-center justify-center"
        />
        <NotificationItems
          items={items}
          hasMore={hasMore}
          fetchMoreData={fetchMoreData}
        />
      </div>
    </div>
  );
};

export default NotificationList;
