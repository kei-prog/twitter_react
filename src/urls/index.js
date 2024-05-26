const DEFAULT_API_LOCALHOST = "http://localhost:3000/api/v1";

export const USERS_REGISTRATIONS = `${DEFAULT_API_LOCALHOST}/users`;
export const USERS_SESSIONS = `${DEFAULT_API_LOCALHOST}/users/sign_in`;
export const USERS_VALIDATE_TOKEN = `${DEFAULT_API_LOCALHOST}/users/validate_token`;
export const TWEETS = `${DEFAULT_API_LOCALHOST}/tweets`;
export const getTweetImagesUrl = (tweet_id) =>
  `${DEFAULT_API_LOCALHOST}/tweets/${tweet_id}/images`;
