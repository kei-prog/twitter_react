import { useState } from "react";
import UserProfileModal from "../../organisms/UserProfileModal";

const UpdateProfileButton = ({ userProfile, handleUserProfileUpdate }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        className="px-8 py-1 font-bold border border-gray-800 rounded-full hover:bg-gray-800 "
        onClick={handleOpenModal}
      >
        プロフィールを編集
      </button>

      {isModalOpen && (
        <UserProfileModal
          onClose={handleCloseModal}
          userProfile={userProfile}
          handleUserProfileUpdate={handleUserProfileUpdate}
        />
      )}
    </>
  );
};

export default UpdateProfileButton;
