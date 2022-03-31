export const CREATE_ALERT = "[NOTIFICATION] CREATE ALERT";
export const REMOVE_SHOWN_ALERT = "[NOTIFICATION] REMOVE SHOWN ALERT";

export function createAlert(message, type) {
  return (dispatch) => {
    dispatch({ type: CREATE_ALERT, payload: { message, type } });
  };
}

export function removeShownAlert(alerts) {
  return (dispatch) => {
    dispatch({ type: REMOVE_SHOWN_ALERT, payload: { alerts } });
  };
}
