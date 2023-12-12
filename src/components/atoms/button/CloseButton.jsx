const CloseButton = ({ onClick }) => {
  return (
    <button
      className="text-white font-medium border-none p-0"
      onClick={onClick}
    >
      x
    </button>
  );
};

export default CloseButton;
