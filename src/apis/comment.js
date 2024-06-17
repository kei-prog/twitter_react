import axios from "axios";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";
import { getCommentUrl, getUserCommentsUrl } from "../urls";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const getComments = async (tweetId, offset) => {
  try {
    const response = await axiosInstance.get(getCommentUrl(tweetId, offset), {
      params: { offset: offset },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    return handleErrorResponse(e, "コメントの取得に失敗しました。");
  }
};

export const getUserComments = async (userId, offset) => {
  try {
    const response = await axiosInstance.get(getUserCommentsUrl(userId), {
      params: { offset: offset },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    return handleErrorResponse(e, "コメントの取得に失敗しました。");
  }
};

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
