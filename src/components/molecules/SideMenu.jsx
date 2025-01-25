import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/index");
  };
  const handleNotification = () => {
    navigate("/notifications");
  };
  const handleGroup = () => {
    navigate("/group");
  };
  const handleBookmark = () => {
    navigate("/bookmark");
  };

  return (
    <div className="sticky top-0 w-16 h-screen pt-4 lg:w-72">
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
          <button
            className="flex focus:outline-none"
            onClick={handleBookmark}
            aria-label="ホームボタン"
          >
            <img
              src="/src/assets/home.svg"
              alt="home"
              className="w-6 h-6 rounded-full"
            />
            <span className="hidden lg:block ms-4">ホーム</span>
          </button>
        </li>
        <li
          className="flex mb-6 text-xl text-left cursor-pointer"
          onClick={handleNotification}
        >
          <button
            className="flex focus:outline-none"
            onClick={handleBookmark}
            aria-label="通知ボタン"
          >
            <img
              src="/src/assets/notification.svg"
              alt="notification"
              className="flex w-6 h-6 rounded-full"
            />
            <span className="hidden lg:block ms-4">通知</span>
          </button>
        </li>
        <li
          className="flex mb-6 text-xl text-left cursor-pointer"
          onClick={handleGroup}
        >
          <button
            className="flex focus:outline-none"
            onClick={handleBookmark}
            aria-label="メッセージボタン"
          >
            <img
              src="/src/assets/message.svg"
              alt="message"
              className="flex w-6 h-6 rounded-full"
            />
            <span className="hidden lg:block ms-4">メッセージ</span>
          </button>
        </li>
        <li className="flex mb-6 text-xl text-left cursor-pointer">
          <button
            className="flex focus:outline-none"
            onClick={handleBookmark}
            aria-label="ブックマークボタン"
          >
            <img
              src="/src/assets/bookmark.svg"
              alt="bookmark"
              className="flex w-6 h-6 rounded-full"
            />
            <span className="hidden lg:block ms-4">ブックマーク</span>
          </button>
        </li>
        <li className="flex mb-6 text-xl text-left cursor-pointer">
          <img
            src="/src/assets/person.svg"
            alt="person"
            className="flex w-6 h-6 rounded-full"
          />
          <span className="hidden lg:block ms-4">退会する</span>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
