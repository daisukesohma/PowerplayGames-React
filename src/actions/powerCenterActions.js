import { URLS } from "../config/urls";

import axios from "axios";

export const GET_ALL_POWER_GAMES = "GET_ALL_POWER_GAMES";

export function getAllGames(user_id) {
  return (dispatch) => {
    const server = window.location.hostname;
    const env =
      (["test.powerplaysystems.com", "localhost", "192.168.127.43"].indexOf(server) > -1) ? "dev" : "prod";
    const api = `${process.env.REACT_APP_API_URL}/${URLS.GAMES.ALL_POWER_GAMES}?status=Activated&user_id=${user_id}&forenvironment=${env}`;
    axios
      .get(api)
      .then((res) => {
        dispatch({
          type: GET_ALL_POWER_GAMES,
          payload: res?.data,
        });
        return res?.data;
      })
      .catch((er) => {
        console.log(er);
        return er?.message;
      });
  };
}
