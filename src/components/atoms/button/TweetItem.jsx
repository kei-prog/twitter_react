import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";
import ImagePreview from "../field/ImagePreview";

const TweetItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tweet/${item.id}`);
  };

  return (
    <div
      key={item.id}
      className="p-4 border border-gray-800 cursor-pointer"
      onClick={handleClick}
    >
      <div className="font-bold text-left">
        {item.user.name} <TimeAgo dateString={item.created_at} />
      </div>
      <div className="text-left break-all">{item.body}</div>
      {item.images && item.images.length > 0 && (
        <ImagePreview previews={item.images} />
      )}
    </div>
  );
};

export default TweetItem;
