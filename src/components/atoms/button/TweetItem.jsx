import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";
import ImagePreview from "../field/ImagePreview";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropdownMenu from "../field/DropDownMenu";
import ConfirmationModal from "../field/ConfirmationModal";
import CommentModal from "../../organisms/CommentModal";
import { postRetweet } from "../../../apis/retweet";
import { postFavorite } from "../../../apis/favorite";

const TweetItem = ({ item, handleDeleteClick, setErrorMessages }) => {
  const navigate = useNavigate();
  const [dropDownDisabled, setDropDownDisabled] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const { userId } = useContext(UserContext);
  const [retweetCount, setRetweetCount] = useState(item.retweet_count);
  const [favoriteCount, setFavoriteCount] = useState(item.favorite_count);

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

  const closeConfirmationMessage = () => {
    setConfirmationMessage(false);
  };

  const handleClick = () => {
    navigate(`/tweet/${item.id}`);
  };

  const handleUserClick = (e) => {
    e.stopPropagation(); // ツイートクリックイベントが発火しないようにする
    navigate(`/users/${item.user.id}`);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // ツイートクリックイベントが発火しないようにする
    setDropDownDisabled(!dropDownDisabled);
  };

  const handleConfirmDeleteClick = () => {
    setConfirmationMessage(!confirmationMessage);
  };

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const handleCommentClick = (e) => {
    e.stopPropagation();
    setIsCommentModalOpen(!isCommentModalOpen);
  };

  const handleRetweetClick = async (e) => {
    e.stopPropagation();
    try {
      const retweetResponse = await postRetweet(item.id);
      if (retweetResponse.success) {
        if (retweetResponse.status === 201) {
          setRetweetCount(retweetCount + 1);
        } else if (retweetResponse.status === 204) {
          setRetweetCount(retweetCount - 1);
        }
      } else {
        setErrorMessages(retweetResponse.errors);
      }
    } catch (error) {
      setErrorMessages(["リツイートに失敗しました。"]);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      const favoriteResponse = await postFavorite(item.id);
      if (favoriteResponse.success) {
        if (favoriteResponse.status === 201) {
          setFavoriteCount(favoriteCount + 1);
        } else if (favoriteResponse.status === 204) {
          setFavoriteCount(favoriteCount - 1);
        }
      } else {
        setErrorMessages(favoriteResponse.errors);
      }
    } catch (error) {
      setErrorMessages(["リツイートに失敗しました。"]);
    }
  };

  return (
    <div key={item.id} className="p-4 border border-gray-800">
      <div className="cursor-pointer" onClick={handleClick}>
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
          {userId === item.user.id && (
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
        <div className="text-left break-all">{item.body}</div>
        <div className="flex">
          <div className="pt-3">
            <img
              src="/src/assets/comment.svg"
              alt="comment"
              className="w-5 h-5"
              onClick={handleCommentClick}
            />
          </div>
          <div className="pt-3 ps-10">
            <img
              src="/src/assets/retweet.svg"
              alt="retweet"
              className="w-5 h-5"
              onClick={handleRetweetClick}
            />
          </div>
          <span className="pt-3 ps-1">{retweetCount}</span>
          <div className="pt-3 ps-10">
            <img
              src="/src/assets/heart.svg"
              alt="favorite"
              className="w-5 h-5"
              onClick={handleFavoriteClick}
            />
          </div>
          <span className="pt-3 ps-1">{favoriteCount}</span>
        </div>
      </div>
      {item.images && item.images.length > 0 && (
        <ImagePreview previews={item.images} />
      )}
      {confirmationMessage && (
        <ConfirmationModal
          onClose={closeConfirmationMessage}
          onConfirm={() => {
            handleConfirmDeleteClick();
            handleDeleteClick(item);
          }}
          message="ポストを削除しますか？"
        />
      )}
      {isCommentModalOpen && (
        <CommentModal
          item={item}
          handleUserClick={handleUserClick}
          setIsCommentModalOpen={setIsCommentModalOpen}
        />
      )}
    </div>
  );
};

export default TweetItem;
