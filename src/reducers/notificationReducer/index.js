import * as Actions from "../../actions/notificationActions";

const INITIAL_STATE = {
  alerts: [],
};

const notificationReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case Actions.CREATE_ALERT:
      return {
        alerts: [
          ...state.alerts,
          { message: actions.payload.message, type: actions.payload.type },
        ],
      };
    case Actions.REMOVE_SHOWN_ALERT:
      return {
        alerts: actions.payload.alerts,
      };
    default:
      return state;
  }
};

export default notificationReducer;
