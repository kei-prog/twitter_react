const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center border border-gray-800 cursor-pointer">
      <div
        className={`p-2 mr-4 ${
          activeTab === "tweets" ? "border-blue-800 border-b-2" : ""
        }`}
        onClick={() => setActiveTab("tweets")}
      >
        ポスト
      </div>
      <div
        className={`p-2 mr-4 ${
          activeTab === "comments" ? "border-blue-800 border-b-2" : ""
        }`}
        onClick={() => setActiveTab("comments")}
      >
        コメント
      </div>
    </div>
  );
};

export default ProfileTabs;
