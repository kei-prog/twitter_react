import axios from "axios";
import { USERS_REGISTRATIONS } from "../urls/index";
import { USERS_SESSIONS } from "../urls/index";
import { USERS_VALIDATE_TOKEN } from "../urls/index";
import { handleErrorResponse } from "../components/atoms/message/errorHndler";

export const postUserRegistration = async (userData) => {
  try {
    const response = await axios.post(USERS_REGISTRATIONS, userData);
    return response.data;
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
    await axios.get(USERS_VALIDATE_TOKEN, {
      withCredentials: true,
    });
    return { success: true };
  } catch (e) {
    return handleErrorResponse(e, "トークンの検証に失敗しました。");
  }
};
