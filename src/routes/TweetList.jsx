import TweetForm from "../components/molecules/TweetForm";
import TweetItems from "../components/molecules/TweetItems";

const TweetList = () => {
  return (
    <div className="flex-1 max-w-screen-sm">
      <TweetForm />
      <TweetItems />
    </div>
  );
};

export default TweetList;
