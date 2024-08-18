import { useNavigate } from "react-router-dom";

const NotificationItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tweet/${item.target_json.tweet_id}`);
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    navigate(`/users/${item.send_user.id}`);
  };

  const notificationContent = () => {
    switch (item.notification_type) {
      case "follow":
        return `${item.send_user.name}にフォローされました`;
      case "favorite":
        return `${item.send_user.name}がツイートにいいねしました`;
      case "comment":
        return `${item.send_user.name}がツイートにコメントしました`;
    }
  };

  return (
    <div key={item.id} className="p-4 border border-gray-800">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex">
            {item.send_user.avatar_url && (
              <img
                src={item.send_user.avatar_url}
                alt="Avatar"
                className="w-12 h-12 mr-4 rounded-full"
                onClick={handleUserClick}
              />
            )}
            <div className="font-bold text-left">
              <span className="mr-4" onClick={handleUserClick}>
                {notificationContent()}
              </span>
            </div>
          </div>
        </div>
        {["favorite", "comment"].includes(item.notification_type) && (
          <div
            className="mt-2 text-left text-gray-600 break-all cursor-pointer"
            onClick={handleClick}
          >
            {item.target_json.tweet.body}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
