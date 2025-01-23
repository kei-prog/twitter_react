const GroupItem = ({ item, selectGroup, isSelected }) => {
  const handleClick = () => {
    selectGroup();
  };

  return (
    <div
      className={`flex items-center justify-start border-b border-gray-300 py-2 
                  hover:bg-gray-900 ${isSelected ? "bg-gray-700" : ""}  `}
      onClick={handleClick}
    >
      <div className="w-10 h-10  ">
        {item?.sender?.avatar_url ? (
          <img
            src={item.sender.avatar_url}
            alt="avatar"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="max-w-full truncate min-w-0 text-left ml-2 flex flex-col">
        <div className="truncate">
          <span>{item.sender.name}</span>
        </div>
        <div className="truncate">{item.latest_message?.content ?? ""}</div>
      </div>
    </div>
  );
};

export default GroupItem;
