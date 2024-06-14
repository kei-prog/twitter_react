import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";
import ImagePreview from "../field/ImagePreview";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropdownMenu from "../field/DropDownMenu";
import ConfirmationModal from "../field/ConfirmationModal";
import CommentModal from "../../organisms/CommentModal";

const TweetItem = ({ item, handleDeleteClick }) => {
  const navigate = useNavigate();
  const [dropDownDisabled, setDropDownDisabled] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
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
        <div className="pt-3">
          <img
            src={"/src/assets/comment.svg"}
            alt="comment"
            className="w-5 h-5"
            onClick={handleCommentClick}
          />
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
