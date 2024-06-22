const DEFAULT_API_LOCALHOST = "http://localhost:3000/api/v1";

export const USERS_REGISTRATIONS = `${DEFAULT_API_LOCALHOST}/users`;
export const USERS_SESSIONS = `${DEFAULT_API_LOCALHOST}/users/sign_in`;
export const USERS_VALIDATE_TOKEN = `${DEFAULT_API_LOCALHOST}/users/validate_token`;
export const PROFILE_UPDATE = `${DEFAULT_API_LOCALHOST}/profile`;
export const getUserUrl = (user_id) =>
  `${DEFAULT_API_LOCALHOST}/users/${user_id}`;
export const TWEETS = `${DEFAULT_API_LOCALHOST}/tweets`;
export const getTweetImagesUrl = (tweet_id) =>
  `${DEFAULT_API_LOCALHOST}/tweets/${tweet_id}/images`;
export const getTweetUrl = (tweet_id) =>
  `${DEFAULT_API_LOCALHOST}/tweets/${tweet_id}`;
export const getCommentUrl = (tweet_id) =>
  `${DEFAULT_API_LOCALHOST}/tweets/${tweet_id}/comments`;
export const getUserCommentsUrl = (user_id) =>
  `${DEFAULT_API_LOCALHOST}/users/${user_id}/comments`;
export const getCommentDetailUrl = (comment_id) =>
  `${DEFAULT_API_LOCALHOST}/comments/${comment_id}`;
export const getRetweetUrl = (tweet_id) =>
  `${DEFAULT_API_LOCALHOST}/tweets/${tweet_id}/toggle_retweet`;
export const getFavoriteUrl = (tweet_id) =>
  `${DEFAULT_API_LOCALHOST}/tweets/${tweet_id}/toggle_favorite`;
export const getFollowUrl = (user_id) =>
  `${DEFAULT_API_LOCALHOST}/users/${user_id}/follows`;
