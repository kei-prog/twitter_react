import TimeAgo from "../text/TimeAgo";

const TweetItem = ({ item }) => {
  return (
    <div key={item.id} className="h-24 p-4 border border-gray-800">
      <div className="font-bold text-left">
        {item.user.name} <TimeAgo dateString={item.created_at} />
      </div>
      <div className="text-left">{item.body}</div>
    </div>
  );
};

export default TweetItem;
