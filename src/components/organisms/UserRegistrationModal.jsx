import { useState } from "react";
import UserForm from "../molecules/UserForm";
import { postUserRegistration } from "../../apis/users";
import CloseButton from "../atoms/button/CloseButton";

const UserRegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    birthday: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUserRegistration(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0">
      <div className="relative top-20 mx-auto p-5 border w-96 rounded-md bg-black">
        <div className="text-left">
          <CloseButton onClick={onClose} />
        </div>
        <h3 className="text-left text-lg leading-6 text-white">
          アカウントを作成
        </h3>
        <div className="mt-2 px-7 py-3">
          <form onSubmit={handleSubmit} className="text-left">
            <UserForm formData={formData} handleChange={handleChange} />
            <button
              type="submit"
              className="bg-white text-black w-full py-2 mt-3 rounded-full"
            >
              登録
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationModal;
