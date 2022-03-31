import { CONSTANTS } from "../utility/constants";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../utility/shared";

export const savePersonaUserId = (id) => {
  setLocalStorage(CONSTANTS.PERSONA_USER_ID, id);
};

export const removePersonaUserId = () => {
  removeLocalStorage(CONSTANTS.PERSONA_USER_ID);
};

export const getPersonaUserId = () => {
  return getLocalStorage(CONSTANTS.PERSONA_USER_ID);
};
