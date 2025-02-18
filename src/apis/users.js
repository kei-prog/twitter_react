import axios from "axios";
import {
  PROFILE_UPDATE,
  USERS_REGISTRATIONS,
  getUserUrl,
  USERS_SESSIONS,
  USERS_VALIDATE_TOKEN,
} from "../urls/index";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const postUserRegistration = async (userData) => {
  try {
    const response = await axios.post(USERS_REGISTRATIONS, userData);
    return response.data;
  } catch (e) {
    return handleErrorResponse(e, "エラーが発生しました。");
  }
};

export const postUserDelete = async () => {
  try {
    const response = await axiosInstance.delete(USERS_REGISTRATIONS);
    return {
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e, "エラーが発生しました。");
  }
};

export const postUserSignIn = async (userData) => {
  try {
    await axios.post(USERS_SESSIONS, userData, {
      withCredentials: true,
    });

    return {
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e, "ログインに失敗しました。");
  }
};

export const validateUserToken = async () => {
  try {
    const response = await axios.get(USERS_VALIDATE_TOKEN, {
      withCredentials: true,
    });
    return { success: true, data: { id: response.data.data.id } };
  } catch (e) {
    return handleErrorResponse(e, "トークンの検証に失敗しました。");
  }
};

export const getUserProfile = async (user_id, offset) => {
  try {
    const response = await axiosInstance.get(getUserUrl(user_id), {
      params: { offset: offset },
    });
    return { success: true, data: response.data };
  } catch (e) {
    return handleErrorResponse(e, "ユーザー情報の取得に失敗しました。");
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await axios.patch(PROFILE_UPDATE, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { success: true, data: response.data };
  } catch (e) {
    return handleErrorResponse(e, "ユーザー情報の更新に失敗しました。");
  }
};
