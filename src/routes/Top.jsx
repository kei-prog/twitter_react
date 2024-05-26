import TopButtons from "../components/molecules/TopButtons";
import TopPageText from "../components/atoms/text/TopPageText";
import TopImage from "../components/atoms/image/TopImage";

const Top = () => {
  return (
    <div className="items-center h-screen md:flex">
      <div className="w-16 md:w-auto">
        <TopImage />
      </div>
      <div className="flex flex-col">
        <TopPageText />
        <TopButtons />
      </div>
    </div>
  );
};

export default Top;
