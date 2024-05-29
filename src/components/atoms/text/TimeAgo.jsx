import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes}分`;
  } else if (diffHours < 24) {
    return `${diffHours}時間`;
  } else {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  }
};

const TimeAgo = ({ dateString }) => {
  return (
    <span className="text-sm text-gray-500">{formatDate(dateString)}</span>
  );
};

export default TimeAgo;
