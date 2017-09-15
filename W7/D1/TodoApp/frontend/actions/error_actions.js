export const RECIEVE_ERRORS = "RECIEVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveErrors = (errors) => ({
    type: RECIEVE_ERRORS,
    errors
  }
);

export const clearErrors = () => ({
  type: CLEAR_ERRORS
  }
);
