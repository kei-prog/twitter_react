import { useState } from "react";
import twitterText from "twitter-text";
import { postTweet, postTweetImages } from "../../apis/tweet";
import TweetPostButton from "../atoms/button/TweetPostButton";
import ErrorMessages from "../atoms/message/ErrorMessages";
import ImageUploadButton from "../atoms/button/ImageUploadButton";
import ImagePreview from "../atoms/field/ImagePreview";
import ReactTextareaAutosize from "react-textarea-autosize";

const TweetForm = () => {
  const [tweet, setTweet] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isTweetButtonDisabled, setIsTweetButtonDisabled] = useState(true);

  const handleImageChange = (e) => {
    setErrorMessages([]);
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      setErrorMessages(["画像は4枚までです。"]);
      return;
    }

    const newPreviews = files.map((image) => URL.createObjectURL(image));

    setImages((prevImages) => [...prevImages, ...files]);
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    setIsTweetButtonDisabled(false);
    e.target.value = null;
  };

  const handleTweetChange = (e) => {
    const newTweet = e.target.value;
    const tweetLength = twitterText.parseTweet(newTweet).weightedLength;

    if (tweetLength <= 280) {
      setTweet(newTweet);
      setIsTweetButtonDisabled(newTweet.trim() === "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);

    try {
      const tweetResponse = await postTweet(tweet.trim());
      if (tweetResponse.success) {
        if (images.length > 0) {
          await postTweetImages(tweetResponse.data.id, images);
        }

        setTweet("");
        setImages([]);
        setPreviews([]);
        setIsTweetButtonDisabled(true);
      } else {
        setErrorMessages(tweetResponse.errors);
      }
    } catch (error) {
      setErrorMessages(["ツイートの投稿に失敗しました。"]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setPreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="text-right">
      <ErrorMessages
        messages={errorMessages}
        className="flex items-center justify-center"
      />
      <ReactTextareaAutosize
        className="w-full text-xl focus:border-none focus:outline-none"
        value={tweet}
        onChange={handleTweetChange}
        placeholder="いまどうしてる？"
        maxRows={25}
      />
      <ImagePreview previews={previews} handleRemoveImage={handleRemoveImage} />
      <ImageUploadButton
        handleImageChange={handleImageChange}
        imageCount={images.length}
      />
      <TweetPostButton isDisabled={isTweetButtonDisabled} />
    </form>
  );
};

export default TweetForm;
