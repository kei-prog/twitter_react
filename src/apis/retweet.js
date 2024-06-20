import axios from "axios";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";
import { getRetweetUrl } from "../urls";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const postRetweet = async (tweetId) => {
  try {
    const response = await axiosInstance.post(getRetweetUrl(tweetId));
    return {
      success: true,
      status: response.status,
    };
  } catch (e) {
    return handleErrorResponse(e, "リツイートに失敗しました。");
  }
};
