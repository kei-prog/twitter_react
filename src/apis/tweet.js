import axios from "axios";
import { TWEETS, getTweetImagesUrl, getTweetUrl } from "../urls/index";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";

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
    return handleErrorResponse(e, "ツイートの取得に失敗しました。");
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
    return handleErrorResponse(e, "ツイートの取得に失敗しました。");
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
    return handleErrorResponse(e, "ツイートの投稿に失敗しました。");
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
    return handleErrorResponse(e, "画像のアップロードに失敗しました。");
  }
};
