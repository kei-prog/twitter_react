import axios from "axios";
import { USERS_REGISTRATIONS } from "../urls/index";
import { USERS_SESSIONS } from "../urls/index";
import { USERS_VALIDATE_TOKEN } from "../urls/index";

export const postUserRegistration = async (userData) => {
  try {
    const response = await axios.post(USERS_REGISTRATIONS, userData);
    return response.data;
  } catch (e) {
    const errorMessages =
      e.response && e.response.data && e.response.data.errors
        ? e.response.data.errors.full_messages
        : ["エラーが発生しました。"];
    return {
      success: false,
      errors: errorMessages,
    };
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
    const errorMessages =
      e.response && e.response.data && e.response.data.errors
        ? e.response.data.errors
        : ["ログインに失敗しました。"];

    return {
      success: false,
      errors: errorMessages,
    };
  }
};

export const validateUserToken = async () => {
  try {
    await axios.get(USERS_VALIDATE_TOKEN, {
      withCredentials: true,
    });
    return { success: true };
  } catch (e) {
    const errorMessages =
      e.response && e.response.data && e.response.data.errors
        ? e.response.data.errors
        : ["トークンの検証に失敗しました。"];
    return { success: false, errors: errorMessages };
  }
};
