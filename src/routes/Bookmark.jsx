import ErrorMessages from "../components/atoms/message/ErrorMessages";
import { getBookmark } from "../apis/bookmark";
import { useEffect, useState } from "react";
import SideMenu from "../components/molecules/SideMenu";
import TweetItems from "../components/molecules/TweetItems";
import { useNavigate } from "react-router-dom";

const Bookmark = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const handleUnBookmark = (tweetId) => {
    const updateItems = items.filter((item) => item.id !== tweetId);
    setItems(updateItems);
    setOffset(offset - 1);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchMoreData = async () => {
    const response = await getBookmark(offset);
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

  const handleDeleteTweet = (tweetId) => {
    const updatedItems = items.filter((item) => item.id !== tweetId);
    setItems(updatedItems);
    setOffset(offset - 1);
  };

  return (
    <>
      <SideMenu />
      <div className="flex-1 max-w-screen-sm">
        <div className="flex text-2xl font-bold ">
          <div className="cursor-pointer">
            <button onClick={handleBackClick}>←</button>
          </div>
          <div className="ms-5">ブックマーク</div>
        </div>
        <ErrorMessages
          messages={errorMessages}
          className="flex items-center justify-center"
        />
        <TweetItems
          items={items}
          hasMore={hasMore}
          fetchMoreData={fetchMoreData}
          onDeleteTweet={handleDeleteTweet}
          onUnBookmark={handleUnBookmark}
        />
      </div>
    </>
  );
};

export default Bookmark;
