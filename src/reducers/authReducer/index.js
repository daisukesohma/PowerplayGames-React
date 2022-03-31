import * as Actions from "../../actions/authActions";

const INITIAL_STATE = {
  loading: false,
  user: '',
};

const authReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case Actions.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case Actions.AUTH_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };

    case Actions.GET_AUTH:
      return {
        ...state,
        loading: false,
        user: actions.payload,
      };

    case Actions.SET_AUTH:
      return {
        ...state,
        user: actions.payload,
      };

    case Actions.RESET_AUTH:
      return {
        ...state,
        loading: false,
        success: false,
        failed: false,
        user: {},
      };

    case Actions.GET_USER_INFO:
      return {
        ...state,
        user: actions.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
