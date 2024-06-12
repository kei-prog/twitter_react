import axios from "axios";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";
import { getCommentUrl } from "../urls";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const postComment = async (tweetId, comment) => {
  try {
    const response = await axiosInstance.post(getCommentUrl(tweetId), {
      comment: { body: comment },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    return handleErrorResponse(e, "コメントの投稿に失敗しました。");
  }
};
