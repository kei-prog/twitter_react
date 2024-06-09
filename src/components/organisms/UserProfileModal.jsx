import { useState } from "react";
import UserProfileForm from "../molecules/UserProfileForm";
import { updateProfile } from "../../apis/users";
import ErrorMessages from "../atoms/message/ErrorMessages";
import CameraButton from "../atoms/button/CameraButton";

const UserProfileModal = ({
  onClose,
  userProfile,
  handleUserProfileUpdate,
}) => {
  const { avatar_url, header_url, ...initialFormData } = userProfile;
  const [formData, setFormData] = useState(initialFormData);
  const [avatarUrl, setAvatarUrl] = useState(avatar_url);
  const [headerUrl, setHeaderUrl] = useState(header_url);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e, type) => {
    setErrorMessages([]);
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === "avatar") {
      setAvatarUrl(previewUrl);
    } else if (type === "header") {
      setHeaderUrl(previewUrl);
    }
    setFormData(() => ({
      ...formData,
      [type]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      handleUserProfileUpdate({
        ...formData,
        avatar_url: avatarUrl,
        header_url: headerUrl,
      });
      onClose();
    } else {
      setErrorMessages(result.errors);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="p-8 bg-black w-[600px]">
        <div className="flex justify-between my-4">
          <div>
            <button
              className="px-4 py-2 font-bold text-white rounded-full hover:bg-gray-800"
              onClick={() => onClose()}
            >
              x
            </button>
            <span className="pl-4 text-2xl font-bold">プロフィールを編集</span>
          </div>
          <button
            className="px-4 py-2 mr-2 font-bold text-black bg-white rounded-full hover:bg-gray-300"
            onClick={handleSubmit}
          >
            保存
          </button>
        </div>

        <ErrorMessages messages={errorMessages} />

        <div className="relative mb-4">
          <div className="absolute z-50 w-24 h-24 border-4 border-none rounded-full top-28 left-4">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full rounded-full"
              />
            )}
            <CameraButton onChange={handleImageChange} type="avatar" />
          </div>
        </div>
        <div className="relative mb-32">
          {headerUrl ? (
            <img src={headerUrl} alt="Header" className="w-full h-32" />
          ) : (
            <div className="w-full h-32 bg-gray-700" />
          )}
          <CameraButton onChange={handleImageChange} type="header" />
        </div>

        <UserProfileForm formData={formData} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default UserProfileModal;
