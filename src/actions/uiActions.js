export const SET_SHOW_DEPOSIT_FORM = "SHOW_DEPOSIT_FORM";
export const SET_HIDE_DEPOSIT_FORM = "SET_HIDE_DEPOSIT_FORM";

export const SET_SHOW_TOAST = "SET_SHOW_TOAST";
export const SET_HIDE_TOAST = "SET_HIDE_TOAST";

export const showDepositForm = (currency) => {
  document.body.classList.add("overflow-hidden");
  return (dispatch) =>
    dispatch({
      type: SET_SHOW_DEPOSIT_FORM,
      payload: currency ? currency : "USD",
    });
};

export const hideDepositForm = () => {
  document.body.classList.remove("overflow-hidden");
  return (dispatch) => dispatch({ type: SET_HIDE_DEPOSIT_FORM });
};

export const showToast = (message, appearance, options = {}) => {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_TOAST,
      payload: { message, appearance, options },
    });
    dispatch({ type: SET_HIDE_TOAST });
  };
};
