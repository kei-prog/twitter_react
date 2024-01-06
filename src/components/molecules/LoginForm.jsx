import InputField from "../atoms/field/InputField";

const LoginForm = ({ formData, handleChange }) => {
  return (
    <div>
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
    </div>
  );
};

export default LoginForm;
