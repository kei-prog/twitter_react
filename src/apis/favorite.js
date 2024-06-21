import axios from "axios";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";
import { getFavoriteUrl } from "../urls";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const postFavorite = async (tweetId) => {
  try {
    const response = await axiosInstance.post(getFavoriteUrl(tweetId));
    return {
      success: true,
      status: response.status,
    };
  } catch (e) {
    return handleErrorResponse(e, "いいねに失敗しました。");
  }
};
