const InputField = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-black border border-gray-700 rounded-md px-3 py-3 w-full ${className}`}
    />
  );
};

export default InputField;
