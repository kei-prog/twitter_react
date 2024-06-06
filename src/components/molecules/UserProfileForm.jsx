import InputField from "../atoms/field/InputField";
import TextArea from "../atoms/field/TextArea";

const UserProfileForm = ({ formData, handleChange }) => {
  return (
    <div>
      <InputField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="名前"
        maxLength={50}
      />
      <TextArea
        name="introduction"
        value={formData.introduction}
        onChange={handleChange}
        placeholder="自己紹介"
        maxLength={160}
        rows={3}
      />
      <InputField
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="場所"
        maxLength={30}
      />
      <InputField
        type="url"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="ウェブサイト"
        maxLength={100}
      />
    </div>
  );
};

export default UserProfileForm;
