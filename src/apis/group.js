import axios from "axios";
import { GROUPS } from "../urls/index";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const postGroup = async (recipientId) => {
  try {
    await axiosInstance.post(GROUPS, {
      recipient_id: recipientId,
    });
    return { success: true };
  } catch (e) {
    return handleErrorResponse(e, "エラーが発生しました。");
  }
};

export const getGroup = async (offset) => {
  try {
    const response = await axiosInstance.get(GROUPS, {
      params: { offset: offset },
    });
    return { success: true, data: response.data };
  } catch (e) {
    return handleErrorResponse(e, "グループ情報の取得に失敗しました。");
  }
};
