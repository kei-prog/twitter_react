import InputField from "../atoms/field/InputField";

const UserForm = ({ formData, handleChange }) => {
  return (
    <div>
      <InputField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="名前"
      />
      <InputField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="メールアドレス"
      />
      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="パスワード"
      />
      <InputField
        type="password"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={handleChange}
        placeholder="パスワード確認"
      />
      <InputField
        type="date"
        name="birthday"
        value={formData.birthday}
        onChange={handleChange}
        placeholder="生年月日"
      />
    </div>
  );
};

export default UserForm;
