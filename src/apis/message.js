import axios from "axios";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";
import { getMessageUrl } from "../urls";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const postMessage = async (message, groupId) => {
  try {
    const response = await axiosInstance.post(getMessageUrl(groupId), {
      content: message,
    });
    return { success: true, data: response.data };
  } catch (e) {
    return handleErrorResponse(e, "メッセージの投稿に失敗しました。");
  }
};

export const getMessage = async (groupId, offset) => {
  try {
    const response = await axiosInstance.get(getMessageUrl(groupId), {
      params: { offset: offset },
    });
    return { success: true, data: response.data };
  } catch (e) {
    return handleErrorResponse(e, "メッセージ情報の取得に失敗しました。");
  }
};
