import { postGroup } from "../../../apis/group";
import { useNavigate } from "react-router-dom";

const MessageButton = ({ recipientId, setErrorMessages }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await postGroup(recipientId);
    if (response.success) {
      navigate("/group");
    } else {
      setErrorMessages(response.errors);
    }
  };

  return (
    <>
      <button
        className="p-2 me-2 font-bold border border-gray-700 rounded-full hover:bg-gray-800 "
        onClick={handleClick}
      >
        <img
          src={"/src/assets/message.svg"}
          alt="Message"
          className="w-5 h-5"
        />
      </button>
    </>
  );
};

export default MessageButton;
