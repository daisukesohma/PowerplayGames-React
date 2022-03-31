import http from "../config/http";
import { URLS } from "../config/urls";
import moment from "moment";

import { CONSTANTS } from "../utility/constants";
import { printLog } from "../utility/shared";

export const NFL_DATA = "[NFL] GET_SET_DATA";
export const NFL_LIVE_DATA = "[NFL] NFL_LIVE_DATA";
export const NFL_STAR_PLAYER_COUNT = "[NFL] STAR_PLAYER_COUNT";
export const NFL_EDIT_PLAYERS = "[NFL] NFL_EDIT_PLAYERS";
export const NFL_USER_SAVED_GAMES = "[NFL] NFL_USER_SAVED_GAMES";
export const NFL_USER_EDITED_GAMES = "[NFL] NFL_USER_EDITED_GAMES";
export const SET_GAME_LOGS = "[NFL] SET_GAME_LOGS";
export const SET_SELECTED_TEAM = "[NFL] SET_SELECTED_TEAM";

const { FILTERS } = CONSTANTS;
const { QB, RB, WR, TE, K, D } = FILTERS.NFL;

export function nflData(gameId) {
  return async (dispatch) => {
    try {
      const response = await http.get(`${URLS.DFS.NFL}?game_id=${gameId}`);
      const { data: { nflSchedule = [], game_id = "", sport_id = "" } = {} } =
        response.data || {};

      const nflPlayerList = [];
      const nflTeams = [];
      for (let i = 0; i < nflSchedule?.length; i++) {
        const {
          away_team = {},
          home_team = {},
          date_time = "",
          venue = {},
          match_id = "",
        } = nflSchedule[i] || {};

        const awayTeam = getTeam(
          away_team,
          home_team,
          match_id,
          venue,
          date_time
        );

        const homeTeam = getTeam(
          home_team,
          away_team,
          match_id,
          venue,
          date_time
        );

        nflTeams.push(awayTeam);
        nflTeams.push(homeTeam);

        const {
          nfl_match_lineups: awayTeamPlayers = [],
          name: awayTeamName = "",
        } = away_team || {};
        const {
          nfl_match_lineups: homeTeamPlayers = [],
          name: homeTeamName = "",
        } = home_team || {};
        const _awayTeamPlayersList = getPlayers(
          awayTeamPlayers,
          awayTeamName,
          homeTeamName,
          venue,
          match_id,
          date_time,
          awayTeam?.team_id,
          homeTeam?.team_id
        );
        const _homeTeamPlayersList = getPlayers(
          homeTeamPlayers,
          homeTeamName,
          awayTeamName,
          venue,
          match_id,
          date_time,
          homeTeam?.team_id,
          awayTeam?.team_id
        );
        const playersList = [..._awayTeamPlayersList, ..._homeTeamPlayersList];
        nflPlayerList.push(...playersList);
      }

      //filter the data on the basis of types
      const filterdList = [];
      const qbTypePlayers = getFilterPlayersList(QB, nflPlayerList);
      const qrTypePlayers = getFilterPlayersList(RB, nflPlayerList);
      const wrypePlayers = getFilterPlayersList(WR, nflPlayerList);
      const teTypePlayers = getFilterPlayersList(TE, nflPlayerList);
      const kTypePlayers = getFilterPlayersList(K, nflPlayerList);
      const dTypePlayers = { type: D, listData: nflTeams };
      filterdList.push(qbTypePlayers);
      filterdList.push(qrTypePlayers);
      filterdList.push(wrypePlayers);
      filterdList.push(teTypePlayers);
      filterdList.push(kTypePlayers);
      filterdList.push(dTypePlayers);
      nflPlayerList.push(...nflTeams);

      dispatch({
        type: NFL_DATA,
        payload: { filterdList: filterdList, allData: nflPlayerList },
        game_id,
        sport_id,
      });

      return {
        filterdList: filterdList,
        allData: nflPlayerList,
        game_id,
        sport_id,
      };
    } catch (err) {
      return err;
    }
  };
}

function getTeam(currentTeam, opponentTeam, match_id, venue, date_time) {
  const time = moment(date_time).format("LT");
  const date = moment(date_time).format("YYYY-MM-DD");
  return {
    ...currentTeam,
    teamBName: opponentTeam.name,
    teamBCity: opponentTeam.city,
    match_id,
    venue,
    time,
    date,
    type: "d",
  };
}

function getPlayers(
  playerList,
  homeTeam = "",
  awayTeam = "",
  venue = {},
  match_id = "",
  date_time = "",
  teamId = "",
  awayTeamId = ""
) {
  const _playerList = [];

  if (playerList?.length) {
    for (let i = 0; i < playerList?.length; i++) {
      const {
        primary_position = "",
        current_team = "",
        is_injured = "",
        name = "",
        player_id = "",
        type = "",
        nfl_player_season_stats = [],
        current_position = "",
      } = playerList[i]?.player || {};

      const nfl_player_stats = nfl_player_season_stats;

      const nflPlayerStats =
        (nfl_player_stats?.length && nfl_player_stats[0]) || {};

      const time = moment(date_time).format("LT");
      const date = moment(date_time).format("YYYY-MM-DD");

      const player = {
        primary_position: primary_position,
        currentTeamId: current_team,
        isInjured: is_injured,
        playerName: name,
        playerId: player_id,
        type,
        homeTeam,
        awayTeam,
        match_id,
        date: date,
        time: time,
        stadium: venue?.name,
        playerStats: { ...nflPlayerStats },
        team_id: teamId,
        awayTeam_id: awayTeamId,
        current_position,
      };

      _playerList.push(player);
    }
  }

  return _playerList;
}

function getFilterPlayersList(filter = "", playersList = []) {
  const list =
    playersList?.length &&
    playersList?.filter(
      (player) => `${player.type}`?.toLocaleLowerCase() === filter
    );

  const players = {
    type: filter,
    listData: [...list],
  };

  return players;
}

export function nflLiveData(payload) {
  return (dispatch) =>
    dispatch({
      type: NFL_LIVE_DATA,
      payload,
    });
}

export function setStarPlayerCount(payload) {
  return (dispatch) =>
    dispatch({
      type: NFL_STAR_PLAYER_COUNT,
      payload,
    });
}

export function saveAndGetSelectPlayers(payload) {
  return async (dispatch) => {
    try {
      const response = await http.post(URLS.DFS.NFL_SAVE_PLAYERS, payload);
      const { message = "", error = false } = response.data || {};
      if (!error && message === "Success") {
        //get the live page players and save them in redux
        try {
          if (!payload.game_id || !payload.sport_id || !payload.user_id) {
            return alert(
              "Invalid informations",
              payload.game_id,
              payload.user_id,
              payload.sport_id
            );
          }
        } catch (er) {}
      }
    } catch (err) {}
  };
}

export async function getSavedTeamPlayers(payload) {
  try {
    const playersResponse = await http.post(URLS.DFS.NFL_LIVE_PAGE_PLAYERS, {
      game_id: payload.game_id,
      sport_id: payload.sport_id,
      user_id: payload.user_id,
    });

    const { data = {} } = playersResponse.data || {};

    const {
      game_id,
      sport_id,
      user_id,
      team_id,
      teamD = {},
      players = [],
    } = data || {};

    for (let i = 0; i < players?.length; i++) {
      const player = players[i];
      Object.assign(player, {
        playerName: player?.name,
        playerId: player?.player_id,
      });

      delete player?.name;
    }

    return {
      players,
      teamD,
      team_id,
    };
  } catch (err) {
    console.log(err);
  }
}

export function getMlbLivePlayPlayerTeamData(payload) {
  return async (dispatch) => {
    const teamPlayers = await getSavedTeamPlayers(payload);

    return teamPlayers;
  };
}

export function getAndSetEditPlayers(
  payload = { game_id: 0, sport_id: 0, user_id: 0 }
) {
  return async (dispatch) => {
    const teamPlayers = await getSavedTeamPlayers(payload);
    const players = teamPlayers?.players || [];
    const teamD = teamPlayers?.teamD;
    const savedPlayers = [];
    for (let i = 0; i < players?.length; i++) {
      const obj = {
        matchId: players[i]?.match_id,
        playerId: players[i]?.player_id,
      };
      savedPlayers.push(obj);
    }

    const teamDObj = {
      team_id: teamD[0]?.team_d,
      match_id: teamD[0]?.match_id,
    };

    savedPlayers.push(teamDObj);

    return dispatch(
      setEditPlayers({
        team_id: teamPlayers.team_id,
        data: savedPlayers,
        isEdit: true,
      })
    );
  };
}

export function setEditPlayers(
  payload = { data: [], isEdit: false, team_id: 0 }
) {
  return (dispatch) => {
    dispatch({
      type: NFL_EDIT_PLAYERS,
      payload: {
        data: payload?.data,
        isEdit: payload?.isEdit,
        team_id: payload?.team_id,
      },
    });
  };
}

export function getUserGames(user_id) {
  return async (dispatch) => {
    try {
      const userGamesResponse = await http.post(URLS.DFS.NFL_USER_GAMES, {
        user_id: user_id,
      });
      const { data = {} } = userGamesResponse || {};
      await dispatch({
        type: NFL_USER_SAVED_GAMES,
        payload: data?.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function editDfsTeamPlayer(payload) {
  return async (dispatch) => {
    try {
      const userEditedGame = await http.post(URLS.DFS.NFL_EDIT_TEAM_PLAYER, {
        payload,
      });
      const { data = {} } = userEditedGame || {};

      await dispatch({
        type: NFL_USER_EDITED_GAMES,
        payload: data?.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function calculateAdminFee(user_id, game_id) {
  return async (dispatch) => {
    try {
      http.post(
        `${process.env.REACT_APP_API_URL}/${URLS.DFS.CALCULATE_ADMIN_FEE}`,
        {
          user_id,
          game_id,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function deductUserBalance(user_id, game_id) {
  return async (dispatch) => {
    try {
      http.post(
        `${process.env.REACT_APP_API_URL}/${URLS.DFS.DEDUCT_USER_BALANCE}`,
        {
          user_id,
          game_id,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function savePrizePool(user_id, game_id) {
  return async (dispatch) => {
    try {
      http.post(
        `${process.env.REACT_APP_API_URL}/${URLS.DFS.SAVE_PRIZE_POOL}`,
        {
          user_id,
          game_id,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function setGameLogs(data) {
  return (dispatch) => {
    return dispatch({
      type: SET_GAME_LOGS,
      payload: data,
    });
  };
}

export function getUserRemainingPowers(game_id, user_id) {
  return async (dispatch) => {
    try {
      const response = await http.get(
        `${process.env.REACT_APP_API_URL}/api/v1${URLS.DFS.GET_USERS_POWERS}?game_id=${game_id}&user_id=${user_id}`
      );
      return dispatch({
        type: "userPowers",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function updateUserRemainingPowers(
  game_id,
  user_id,
  power_id,
  type = "powerDec"
) {
  return async (dispatch) => {
    try {
      console.log("PAYLOAD: ", game_id, user_id, power_id);
      const response = await http.patch(
        `${process.env.REACT_APP_API_URL}/api/v1${URLS.DFS.UPDATE_USERS_POWERS}`,
        {
          game_id: game_id,
          user_id: user_id,
          power_id: power_id,
          type: type,
        }
      );
      return dispatch({
        type: "userPowers",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setSelectedTeam(payload) {
  return async (dispatch) => {
    return await dispatch({
      type: SET_SELECTED_TEAM,
      payload,
    });
  };
}
