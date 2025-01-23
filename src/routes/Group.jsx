import { useState, useEffect } from "react";
import { getGroup } from "../apis/group";
import SideMenu from "../components/molecules/SideMenu";
import ErrorMessages from "../components/atoms/message/ErrorMessages";
import GroupItems from "../components/molecules/GroupItems";
import { getMessage } from "../apis/message";
import MessageItems from "../components/molecules/MessageItems";
import MessageForm from "../components/molecules/MessageForm";

const Group = () => {
  const [isGroupSelected, setIsGroupSelected] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [messageItems, setMessageItems] = useState([]);
  const [messageOffset, setMessageOffset] = useState(0);
  const [messageHasMore, setMessageHasMore] = useState(true);

  const selectGroup = (groupId) => {
    setMessageItems([]);
    setMessageOffset(0);
    setMessageHasMore(true);
    setIsGroupSelected(true);
    setGroupId(groupId);
    fetchMoreMessageData(groupId, 0);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  const handleBackClick = () => {
    setIsGroupSelected(false);
  };

  const handleAddMessage = (messageData) => {
    setMessageItems([messageData, ...messageItems]);
  };

  const fetchMoreData = async () => {
    const response = await getGroup(offset);
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

  const fetchMoreMessageData = async (
    groupIdValue = groupId,
    offsetValue = messageOffset,
  ) => {
    const response = await getMessage(groupIdValue, offsetValue);
    if (response.success) {
      const newMessageItems = response.data;

      if (newMessageItems.length === 0) {
        setMessageHasMore(false);
        return;
      }
      if (offsetValue === 0) {
        setMessageItems(newMessageItems);
        setMessageOffset(newMessageItems.length);
      } else {
        setMessageItems([...messageItems, ...newMessageItems]);
        setMessageOffset(messageOffset + newMessageItems.length);
      }
    } else {
      setMessageHasMore(false);
      setErrorMessages(response.errors);
    }
  };

  return (
    <div className="flex flex-1">
      <SideMenu />
      <div className="flex border border-gray-800">
        <div
          className={`px-4 w-[28rem] ${isGroupSelected ? "hidden lg:block" : "block"}`}
        >
          <ErrorMessages
            messages={errorMessages}
            className="flex items-center justify-center"
          />
          <div className="text-left pt-4 text-xl font-bold">メッセージ</div>
          <GroupItems
            items={items}
            hasMore={hasMore}
            fetchMoreData={fetchMoreData}
            fetchMoreMessageData={fetchMoreMessageData}
            selectGroup={selectGroup}
          />
        </div>
        <div
          className={`flex border border-gray-800 w-[40rem] ${isGroupSelected ? "block" : "hidden lg:block"} `}
        >
          {isGroupSelected ? (
            <div className="px-4 h-full flex flex-1 flex-col">
              <div className="lg:hidden text-2xl font-bold cursor-pointer">
                <button onClick={handleBackClick}>←</button>
              </div>
              <MessageItems
                messageItems={messageItems}
                messageHasMore={messageHasMore}
                fetchMoreMessageData={fetchMoreMessageData}
              />
              <MessageForm
                setErrorMessages={setErrorMessages}
                onAddMessage={handleAddMessage}
                groupId={groupId}
              />
            </div>
          ) : (
            <div className="flex items-center max-w-md h-screen ps-20">
              <div className="text-center text-4xl font-bold">
                メッセージを選択
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Group;
