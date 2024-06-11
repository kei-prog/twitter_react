import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";
import ImagePreview from "./ImagePreview";
import { UserContext } from "../../../contexts/UserContext";
import DropdownMenu from "./DropDownMenu";
import ConfirmationModal from "./ConfirmationModal";
import { deleteTweet } from "../../../apis/tweet";

const TweetDetail = ({ tweet }) => {
  const [dropDownDisabled, setDropDownDisabled] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (dropDownDisabled) {
      const closeDropDown = () => {
        setDropDownDisabled(false);
      };
      document.addEventListener("click", closeDropDown);
      return () => {
        document.removeEventListener("click", closeDropDown);
      };
    }
  }, [dropDownDisabled]);

  const handleDeleteClick = async (item) => {
    const response = await deleteTweet(item.id);
    if (response.success) {
      navigate("/index");
    } else {
      setErrorMessages(response.errors);
    }
  };

  const closeConfirmationMessage = () => {
    setConfirmationMessage(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleUserClick = () => {
    navigate(`/users/${tweet.user.id}`);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // ツイートクリックイベントが発火しないようにする
    setDropDownDisabled(!dropDownDisabled);
  };

  const handleConfirmDeleteClick = () => {
    setConfirmationMessage(!confirmationMessage);
  };

  return (
    <div className="p-4 border border-gray-800">
      <button
        className="flex items-center mb-4 border-none"
        onClick={handleBack}
      >
        <span className="mr-2 text-2xl font-bold">← ポストする</span>
      </button>
      <div className="flex justify-between">
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
        {userId === tweet.user.id && (
          <div
            className="relative text-sm text-gray-500 hover:text-blue-500"
            onClick={handleDropdownClick}
          >
            ・・・
            {dropDownDisabled && (
              <DropdownMenu
                handleConfirmDeleteClick={handleConfirmDeleteClick}
              />
            )}
          </div>
        )}
      </div>
      <div className="pt-3 text-left break-all">{tweet.body}</div>
      {tweet.images && tweet.images.length > 0 && (
        <ImagePreview previews={tweet.images} />
      )}
      <div className="pt-3 text-left">
        <TimeAgo dateString={tweet.created_at} />
      </div>
      {confirmationMessage && (
        <ConfirmationModal
          onClose={closeConfirmationMessage}
          onConfirm={() => {
            handleConfirmDeleteClick();
            handleDeleteClick(tweet);
          }}
        />
      )}
    </div>
  );
};

export default TweetDetail;
