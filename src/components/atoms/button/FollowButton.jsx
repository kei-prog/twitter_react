import { useState } from "react";
import { postFollow } from "../../../apis/follow";

const FollowButton = ({ setErrorMessages, following, followUserId }) => {
  const [isFollowing, setIsFollowing] = useState(following);

  const handleFollowClick = async () => {
    const response = await postFollow(followUserId);
    if (response.success) {
      setIsFollowing(true);
    } else {
      setErrorMessages(response.errors);
    }
  };

  return (
    <>
      {isFollowing ? (
        <button className="px-8 py-1 font-bold text-black bg-white border border-gray-700 rounded-full hover:bg-gray-800 ">
          フォロー中
        </button>
      ) : (
        <button
          className="px-8 py-1 font-bold border border-gray-700 rounded-full hover:bg-gray-800 "
          onClick={handleFollowClick}
        >
          フォロー
        </button>
      )}
    </>
  );
};

export default FollowButton;
