import { useState } from "react";
import UserRegistrationModal from "../../organisms/UserRegistrationModal";

const CreateAccountButton = () => {
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
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-60 py-2 rounded-full"
        onClick={handleOpenModal}
      >
        アカウントを作成
      </button>

      <UserRegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default CreateAccountButton;
