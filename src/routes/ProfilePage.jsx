import { useEffect, useState } from "react";
import ErrorMessages from "../components/atoms/message/ErrorMessages";
import TweetItems from "../components/molecules/TweetItems";
import { useParams } from "react-router-dom";
import UserProfile from "../components/molecules/UserProfile";
import { getUserProfile } from "../apis/users";
import ProfileTabs from "../components/molecules/ProfileTabs";
import CommentItems from "../components/molecules/CommentItems";
import { getUserComments } from "../apis/comment";
import SideMenu from "../components/molecules/SideMenu";

const ProfilePage = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("tweets");
  const [commentItems, setCommentItems] = useState([]);
  const [commentHasMore, setCommentHasMore] = useState(true);
  const [commentOffset, setCommentOffset] = useState(0);

  const handleUserProfileUpdate = (newUserProfile) => {
    setUserProfile(newUserProfile);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchMoreData = async () => {
    const response = await getUserProfile(id, offset);

    if (response.success) {
      const userProfileData = {
        id: response.data.id,
        name: response.data.name,
        introduction: response.data.introduction,
        website: response.data.website,
        location: response.data.location,
        created_at: response.data.created_at,
        avatar_url: response.data.avatar_url,
        header_url: response.data.header_url,
        following: response.data.following,
      };
      setUserProfile(userProfileData);

      const newItems = response.data.tweets;

      if (newItems.length === 0) {
        setHasMore(false);
        return;
      }
      setItems([...items, ...newItems]);
      setOffset(offset + newItems.length);
    } else {
      setHasMore(false);
      setErrorMessages(response.errors);
    }
  };

  const fetchComments = async () => {
    const response = await getUserComments(id, commentOffset);

    if (response.success) {
      const newItems = response.data;
      if (newItems.length === 0) {
        setCommentHasMore(false);
        return;
      }
      setCommentItems([...commentItems, ...newItems]);
      setCommentOffset(commentOffset + newItems.length);
    } else {
      setCommentHasMore(false);
      setErrorMessages(response.errors);
    }
  };

  const onDeleteComment = (commentId) => {
    const updateItems = commentItems.filter((item) => item.id !== commentId);
    setCommentItems(updateItems);
    setOffset(offset - 1);
  };

  return (
    <div className="flex flex-1">
      <SideMenu />
      <div className="flex-1 max-w-screen-sm">
        <ErrorMessages
          messages={errorMessages}
          className="flex items-center justify-center"
        />
        <UserProfile
          userProfile={userProfile}
          handleUserProfileUpdate={handleUserProfileUpdate}
          setErrorMessages={setErrorMessages}
        />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "tweets" && (
          <TweetItems
            items={items}
            hasMore={hasMore}
            fetchMoreData={fetchMoreData}
          />
        )}
        {activeTab === "comments" && (
          <CommentItems
            items={commentItems}
            hasMore={commentHasMore}
            fetchComments={fetchComments}
            onDeleteComment={onDeleteComment}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
