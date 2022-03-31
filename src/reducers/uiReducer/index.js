import {
  SET_HIDE_DEPOSIT_FORM,
  SET_SHOW_DEPOSIT_FORM,
  SET_SHOW_TOAST,
  SET_HIDE_TOAST,
} from "../../actions/uiActions";

const INITIAL_STATE = {
  depositFormData: null,
  toastData: null,
};

const uiReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case SET_HIDE_DEPOSIT_FORM:
      return {
        ...state,
        depositFormData: null,
      };
    case SET_SHOW_DEPOSIT_FORM:
      return {
        ...state,
        depositFormData: actions.payload,
      };

    case SET_HIDE_TOAST:
      return {
        ...state,
        showToast: null,
      };
    case SET_SHOW_TOAST:
      return {
        ...state,
        toastData: actions.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
