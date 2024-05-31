import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";

const TweetItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tweet/${item.id}`);
  };

  return (
    <div
      key={item.id}
      className="h-24 p-4 border border-gray-800 cursor-pointer"
      onClick={handleClick}
    >
      <div className="font-bold text-left">
        {item.user.name} <TimeAgo dateString={item.created_at} />
      </div>
      <div className="text-left">{item.body}</div>
    </div>
  );
};

export default TweetItem;
