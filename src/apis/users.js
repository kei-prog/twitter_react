import axios from "axios";
import { USERS_REGISTRATIONS } from "../urls/index";

export const postUserRegistration = async (userData) => {
  try {
    const response = await axios.post(USERS_REGISTRATIONS, userData);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
