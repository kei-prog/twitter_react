import axios from "axios";
import { TWEETS, getTweetImagesUrl, getTweetUrl } from "../urls/index";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const getTweets = async (offset) => {
  try {
    const response = await axiosInstance.get(TWEETS, {
      params: { offset: offset },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    const errorMessages =
      e.response && e.response.data && e.response.data.errors
        ? e.response.data.errors
        : ["ツイートの取得に失敗しました。"];
    return {
      success: false,
      errors: errorMessages,
    };
  }
};

export const getTweet = async (tweetId) => {
  try {
    const response = await axiosInstance.get(getTweetUrl(tweetId));
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    const errorMessages =
      e.response && e.response.data && e.response.data.errors
        ? e.response.data.errors
        : ["ツイートの取得に失敗しました。"];
    return {
      success: false,
      errors: errorMessages,
    };
  }
};

export const postTweet = async (tweet) => {
  try {
    const response = await axiosInstance.post(TWEETS, {
      tweet: { body: tweet },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    const errorMessages =
      e.response && e.response.data && e.response.data.errors
        ? e.response.data.errors.full_messages
        : ["ツイートの投稿に失敗しました。"];
    return {
      success: false,
      errors: errorMessages,
    };
  }
};

export const postTweetImages = async (tweetId, images) => {
  try {
    const formData = new FormData();
    formData.append("tweet_id", tweetId);
    images.forEach((image) => {
      formData.append("images[]", image);
    });

    await axiosInstance.post(getTweetImagesUrl(tweetId), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
    };
  } catch (e) {
    const errorMessages =
      e.response && e.response.data && e.response.data.errors
        ? e.response.data.errors
        : ["画像のアップロードに失敗しました。"];
    return {
      success: false,
      errors: errorMessages,
    };
  }
};
