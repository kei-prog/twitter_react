import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/index");
  };
  const handleNotification = () => {
    navigate("/notifications");
  };

  return (
    <div className="sticky top-0 w-16 h-screen pt-4 md:w-72">
      <img
        src="/src/assets/X-icon.jpg"
        alt="User"
        className="w-10 h-10 mb-6 rounded-full"
      />
      <ul>
        <li
          className="flex mb-6 text-xl text-left cursor-pointer"
          onClick={handleHome}
        >
          <img
            src="/src/assets/home.svg"
            alt="home"
            className="w-6 h-6 rounded-full"
          />
          <span className="hidden md:block ms-4">ホーム</span>
        </li>
        <li
          className="flex mb-6 text-xl text-left cursor-pointer"
          onClick={handleNotification}
        >
          <img
            src="/src/assets/notification.svg"
            alt="notification"
            className="flex w-6 h-6 rounded-full"
          />
          <span className="hidden md:block ms-4">通知</span>
        </li>
        <li className="flex mb-6 text-xl text-left cursor-pointer">
          <img
            src="/src/assets/message.svg"
            alt="message"
            className="flex w-6 h-6 rounded-full"
          />
          <span className="hidden md:block ms-4">メッセージ</span>
        </li>
        <li className="flex mb-6 text-xl text-left cursor-pointer">
          <img
            src="/src/assets/bookmark.svg"
            alt="bookmark"
            className="flex w-6 h-6 rounded-full"
          />
          <span className="hidden md:block ms-4">ブックマーク</span>
        </li>
        <li className="flex mb-6 text-xl text-left cursor-pointer">
          <img
            src="/src/assets/person.svg"
            alt="person"
            className="flex w-6 h-6 rounded-full"
          />
          <span className="hidden md:block ms-4">退会する</span>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
