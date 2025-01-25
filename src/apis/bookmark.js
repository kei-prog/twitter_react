import axios from "axios";
import { BOOKMARKS, getBookmarkUrl } from "../urls/index";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const postBookmark = async (tweetId) => {
  try {
    await axiosInstance.post(getBookmarkUrl(tweetId));
    return { success: true };
  } catch (e) {
    return handleErrorResponse(e, "ブックマークに失敗しました。");
  }
};

export const getBookmark = async (offset) => {
  try {
    const response = await axiosInstance.get(BOOKMARKS, {
      params: { offset: offset },
    });
    return { success: true, data: response.data };
  } catch (e) {
    return handleErrorResponse(e, "ブックマーク情報の取得に失敗しました。");
  }
};
