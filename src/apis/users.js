import axios from "axios";
import { USERS_REGISTRATIONS } from "../urls/index";

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
