import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";

const CommentItem = ({ item }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/users/${item.user.id}`);
  };

  return (
    <div key={item.id} className="p-4 border border-gray-800">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex">
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
        </div>
        <div className="text-left break-all">{item.body}</div>
      </div>
    </div>
  );
};

export default CommentItem;
