export const handleErrorResponse = (e, defaultErrorMessage) => {
  const errorMessages =
    e.response && e.response.data && e.response.data.errors
      ? e.response.data.errors.full_messages || e.response.data.errors
      : [defaultErrorMessage];
  return {
    success: false,
    errors: errorMessages,
  };
};
