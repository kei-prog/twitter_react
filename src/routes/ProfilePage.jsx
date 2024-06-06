import { useEffect, useState } from "react";
import ErrorMessages from "../components/atoms/message/ErrorMessages";
import TweetItems from "../components/molecules/TweetItems";
import { useParams } from "react-router-dom";
import UserProfile from "../components/molecules/UserProfile";
import { getUserProfile } from "../apis/users";

const ProfilePage = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  const handleUserProfileUpdate = (newUserProfile) => {
    setUserProfile(newUserProfile);
  };

  useEffect(() => {
    fetchMoreData();
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

  return (
    <div className="flex-1 max-w-screen-sm">
      <ErrorMessages
        messages={errorMessages}
        className={"flex items-center justify-center"}
      />
      <UserProfile
        userProfile={userProfile}
        handleUserProfileUpdate={handleUserProfileUpdate}
      />
      <TweetItems
        items={items}
        hasMore={hasMore}
        fetchMoreData={fetchMoreData}
      />
    </div>
  );
};

export default ProfilePage;
