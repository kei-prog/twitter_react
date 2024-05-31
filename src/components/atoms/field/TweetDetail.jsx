import React from "react";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";
import ImagePreview from "./ImagePreview";

const TweetDetail = ({ tweet }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 border border-gray-800">
      <button
        className="flex items-center mb-4 border-none"
        onClick={handleBack}
      >
        <span className="mr-2 text-2xl font-bold"> ← ポストする</span>
      </button>
      <h1 className="text-xl font-bold text-left">{tweet.user.name}</h1>{" "}
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
