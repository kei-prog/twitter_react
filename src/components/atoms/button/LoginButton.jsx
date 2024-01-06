import { useState } from "react";
import LoginModal from "../../organisms/LoginModal";

const LoginButton = () => {
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
        className="bg-black border-white hover:bg-gray-950 text-white
                   font-bold w-60 py-2 rounded-full"
        onClick={handleOpenModal}
      >
        ログイン
      </button>

      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default LoginButton;
