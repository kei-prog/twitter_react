const ErrorMessages = ({ messages, className }) => {
  if (!messages || messages.length === 0) return null;

  const uniqueMessages = messages.filter((message, index, self) => {
    return self.indexOf(message) === index;
  });

  return (
    <div className={`text-red-500 ${className}`}>
      {uniqueMessages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default ErrorMessages;
