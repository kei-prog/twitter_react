import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";
import ImagePreview from "../field/ImagePreview";

const TweetItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tweet/${item.id}`);
  };

  const handleUserClick = (e) => {
    e.stopPropagation(); // ツイートクリックイベントが発火しないようにする
    navigate(`/users/${item.user.id}`);
  };

  return (
    <div
      key={item.id}
      className="p-4 border border-gray-800 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center">
        {item.user.avatar_url && (
          <img
            src={item.user.avatar_url}
            alt="Avatar"
            className="w-12 h-12 mr-4 rounded-full"
            onClick={handleUserClick}
          />
        )}
        <div className="font-bold text-left">
          <span className="mr-4" onClick={handleUserClick}>
            {item.user.name}
          </span>
          <TimeAgo dateString={item.created_at} />
        </div>
      </div>
      <div className="text-left break-all">{item.body}</div>
      {item.images && item.images.length > 0 && (
        <ImagePreview previews={item.images} />
      )}
    </div>
  );
};

export default TweetItem;
