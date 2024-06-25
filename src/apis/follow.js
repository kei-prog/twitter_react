import axios from "axios";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";
import { getFollowUrl } from "../urls";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const postFollow = async (userId) => {
  try {
    await axiosInstance.post(getFollowUrl(userId));
    return {
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e, "フォローに失敗しました。");
  }
};

export const deleteFollow = async (useid) => {
  try {
    await axiosInstance.delete(getFollowUrl(useid));
    return {
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e, "フォロー解除に失敗しました。");
  }
};
