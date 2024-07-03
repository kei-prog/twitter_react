import axios from "axios";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";
import { NOTIFICATIONS, getNotificationUrl } from "../urls";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const getNotifications = async (offset) => {
  try {
    const response = await axiosInstance.get(NOTIFICATIONS, {
      params: { offset: offset },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    return handleErrorResponse(e, "通知の取得に失敗しました。");
  }
};

export const updateNotification = async (notificationId) => {
  try {
    await axiosInstance.patch(getNotificationUrl(notificationId));
    return {
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e, "通知の更新に失敗しました。");
  }
};
