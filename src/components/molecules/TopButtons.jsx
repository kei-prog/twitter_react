import CreateAccountButton from "../atoms/button/CreateAccountButton";
import LoginButton from "../atoms/button/LoginButton";

const TopButtons = () => {
  return (
    <div className="flex flex-col space-y-3 mt-4">
      <CreateAccountButton />
      <LoginButton />
    </div>
  );
};

export default TopButtons;
