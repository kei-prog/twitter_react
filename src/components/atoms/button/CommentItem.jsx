import { useNavigate } from "react-router-dom";
import TimeAgo from "../text/TimeAgo";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropdownMenu from "../field/DropDownMenu";
import ConfirmationModal from "../field/ConfirmationModal";

const CommentItem = ({ item, handleDeleteClick }) => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const [dropDownDisabled, setDropDownDisabled] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);

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

  const handleUserClick = () => {
    navigate(`/users/${item.user.id}`);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setDropDownDisabled(!dropDownDisabled);
  };

  const handleConfirmDeleteClick = () => {
    setConfirmationMessage(!confirmationMessage);
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
          {confirmationMessage && (
            <ConfirmationModal
              onClose={closeConfirmationMessage}
              onConfirm={() => {
                handleConfirmDeleteClick();
                handleDeleteClick(item);
              }}
              message="コメントを削除しますか？"
            />
          )}
        </div>
        <div className="text-left break-all">{item.body}</div>
      </div>
    </div>
  );
};

export default CommentItem;
