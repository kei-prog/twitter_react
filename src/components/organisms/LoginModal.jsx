import { useState } from "react";
import LoginForm from "../molecules/LoginForm";
import { postUserSignIn } from "../../apis/users";
import CloseButton from "../atoms/button/CloseButton";
import ErrorMessages from "../atoms/message/ErrrorMessages";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postUserSignIn(formData);
    if (!result.success) {
      setErrorMessages(result.errors);
    } else {
      navigate("/index");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0">
      <div className="relative top-20 mx-auto p-5 border w-96 rounded-md bg-black">
        <div className="text-left">
          <CloseButton onClick={onClose} />
        </div>
        <h3 className="text-left text-lg leading-6 text-white">ログイン</h3>
        <div className="mt-2 px-7 py-3">
          <ErrorMessages messages={errorMessages} />
          <form onSubmit={handleSubmit} className="text-left">
            <LoginForm formData={formData} handleChange={handleChange} />
            <button
              type="submit"
              className="bg-white text-black w-full py-2 mt-3 rounded-full"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
