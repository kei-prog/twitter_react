import React from "react";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";
import ImagePreview from "./ImagePreview";

const TweetDetail = ({ tweet }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleUserClick = () => {
    navigate(`/users/${tweet.user.id}`);
  };

  return (
    <div className="p-4 border border-gray-800">
      <button
        className="flex items-center mb-4 border-none"
        onClick={handleBack}
      >
        <span className="mr-2 text-2xl font-bold">← ポストする</span>
      </button>

      <div className="flex items-center">
        {tweet.user.avatar_url && (
          <img
            src={tweet.user.avatar_url}
            alt="Avatar"
            className="w-12 h-12 mr-4 rounded-full cursor-pointer"
            onClick={handleUserClick}
          />
        )}
        <h1
          className="text-xl font-bold text-left cursor-pointer"
          onClick={handleUserClick}
        >
          {tweet.user.name}
        </h1>
      </div>
      <div className="pt-3 text-left break-all">{tweet.body}</div>
      {tweet.images && tweet.images.length > 0 && (
        <ImagePreview previews={tweet.images} />
      )}
      <div className="pt-3 text-left">
        <TimeAgo dateString={tweet.created_at} />
      </div>
    </div>
  );
};

export default TweetDetail;
