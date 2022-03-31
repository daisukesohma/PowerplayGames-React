import http from "../config/http";
import { URLS } from "../config/urls";
import { CONSTANTS } from "../utility/constants";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  printLog,
} from "../utility/shared";

import { savePersonaUserId } from "./personaActions";

import jwtDecode from "jwt-decode";
import { createAlert } from "./notificationActions";
export const AUTH_LOADING = "[AUTH] AUTH LOADING";
export const AUTH_LOADING_FALSE = "[AUTH] AUTH LOADING FALSE";
export const GET_AUTH = "[AUTH] GET AUTH";
export const RESET_AUTH = "[AUTH] RESET AUTH";
export const SET_AUTH = "[AUTH] SET AUTH";
export const GET_USER_INFO = "[AUTH] GET USER INFO";

export function authenticate(user) {
  return async (dispatch) => {
    try {
      const request = await http.post(URLS.AUTH.LOGIN, user);
      if (request.data.status === true) {
        //save in local storage.
        setLocalStorage(
          CONSTANTS.LOCAL_STORAGE_KEYS.USER,
          request?.data?.token
        );
        savePersonaUserId(request?.data?.user_id);
        return dispatch({
          type: GET_AUTH,
          payload: request?.data,
        });
      } else {
        return request.data;
      }
    } catch (err) {
      console.log("login error");
    }
  };
}

export function register(user) {
  const request = http.post(URLS.AUTH.REGISTER, user);

  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    return request.then((response) =>
      dispatch({ type: GET_AUTH, payload: response.data })
    );
  };
}

export function setupUser() {
  const token = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
  if (token) {
    const user = jwtDecode(token);
    return { type: SET_AUTH, payload: user };
  }
  return { type: "DUMMY" };
}

export function updateUser(user) {
  const request = http.put(URLS.AUTH.UPDATE_DETAILS, user);

  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    return request.then((response) => {
      if (response.data.status) {
        dispatch(createAlert(response?.data?.message, "success"));
        return dispatch({ type: GET_AUTH, payload: user });
      } else {
        dispatch(createAlert(response?.data?.message, "error"));
        return dispatch({
          type: AUTH_LOADING_FALSE,
        });
      }
    });
  };
}

export function getUserInfo() {
  const request = http.get(URLS.AUTH.UPDATE_DETAILS);

  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    return request.then((response) => {
      return dispatch({ type: GET_USER_INFO, payload: response.data });
    });
  };
}

export function deleteUserAccount(data) {
  const request = http.post(URLS.AUTH.DELETE_USER_ACCOUNT, data);

  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    return request.then((response) => {
      if (response.status === 200) {
        dispatch(createAlert(response?.data?.message, "success"));
        removeLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
        return dispatch({ type: RESET_AUTH });
      } else {
        dispatch(createAlert(response?.data?.message, "error"));
      }
    });
  };
}

export function changeAccountPassword(oldPassword, newPassword) {
  const request = http.post(URLS.AUTH.CHANGE_PASSWORD, {
    oldPassword,
    newPassword,
  });

  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    return request
      .then((response) => {
        if (response.status === 200) {
          dispatch(createAlert(response?.data?.message, "success"));
        } else {
          dispatch(createAlert(response?.data?.message, "error"));
        }
        return dispatch({ type: AUTH_LOADING_FALSE });
      })
      .catch((error) => {
        dispatch(createAlert(error?.response?.message, "error"));
        return dispatch({ type: AUTH_LOADING_FALSE });
      });
  };
}

export function resetAuth() {
  return {
    type: RESET_AUTH,
  };
}

export function showAuthLoading() {
  return (dispatch) => {
    return dispatch({ type: AUTH_LOADING });
  };
}

export function disableAuthLoading() {
  return (dispatch) => {
    return dispatch({
      type: AUTH_LOADING_FALSE,
    });
  };
}

export function verifyRegistredEmail(data) {
  return async (dispatch) => {
    try {
      return await http.post(
        `${process.env.REACT_APP_API_URL}/${URLS.AUTH.VERIFY_REGISTERED_EMAIL}`,
        {
          email: data?.email,
        })
    } catch (err) {
      return err
    }
  };
}