import UpdateProfileButton from "../atoms/button/UpdateProfileButton";
import TwitterJoinDate from "../atoms/text/TwitterJoinDate";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ userProfile, handleUserProfileUpdate }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (!userProfile) {
    return null;
  }

  return (
    <div>
      <div className="p-4 text-left break-all border border-gray-800">
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="text-xl font-bold text-blue-500 bg-transparent border-none hover:underline"
          >
            ← {userProfile.name}
          </button>
        </div>
        <div className="relative mb-4">
          {userProfile.header_url && (
            <img
              src={userProfile.header_url}
              alt="Header"
              className="object-cover w-full h-32"
            />
          )}
          {userProfile.avatar_url && (
            <div className="absolute w-24 h-24 border-4 border-none rounded-full left-4 top-16">
              <img
                src={userProfile.avatar_url}
                alt="Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end p-4">
          <UpdateProfileButton
            userProfile={userProfile}
            handleUserProfileUpdate={handleUserProfileUpdate}
          />
        </div>
        <div className="text-xl font-bold">{userProfile.name}</div>
        <div className="pt-4">{userProfile.introduction}</div>
        <a href={userProfile.website} className="text-blue-500 hover:underline">
          {userProfile.website}
        </a>
        <div className="pt-4">{userProfile.location}</div>
        <div className="pt-4 text-gray-500">
          <TwitterJoinDate createdAt={userProfile.created_at} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
