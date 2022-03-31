import http from "../config/http";
import { URLS } from "../config/urls";
import moment from "moment";

import { CONSTANTS } from "../utility/constants";
import { printLog } from "../utility/shared";

export const NBA_DATA = "[NBA] GET_SET_DATA";
export const NBA_LIVE_DATA = "[NBA] NBA_LIVE_DATA";
export const NBA_STAR_PLAYER_COUNT = "[NBA] STAR_PLAYER_COUNT";
export const NBA_EDIT_PLAYERS = "[NBA] NBA_EDIT_PLAYERS";

const { FILTERS } = CONSTANTS;
const { C, PG, SG, F, D } = FILTERS.NBA;

export function nbaData(payload) {
  return async (dispatch) => {
    try {
      const response = await http.get(URLS.DFS.MLB);
      const { data: { mlbSchedule = [], game_id = "", sport_id = "" } = {} } =
        response.data || {};

      const mlbPlayerList = [];
      const mlbTeams = [];
      for (let i = 0; i < mlbSchedule?.length; i++) {
        const {
          away_team = {},
          home_team = {},
          date_time = "",
          venue = {},
          match_id = "",
        } = mlbSchedule[i] || {};

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

        mlbTeams.push(awayTeam);
        mlbTeams.push(homeTeam);

        const {
          mlb_match_lineups: awayTeamPlayers = [],
          name: awayTeamName = "",
        } = away_team || {};
        const {
          mlb_match_lineups: homeTeamPlayers = [],
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
        mlbPlayerList.push(...playersList);
      }

      //filter the data on the basis of types
      const filterdList = [];
      const pTypePlayers = getFilterPlayersList(C, mlbPlayerList);
      const ofTypePlayers = getFilterPlayersList(PG, mlbPlayerList);
      const cTypePlayers = getFilterPlayersList(SG, mlbPlayerList);
      const ssTypePlayers = getFilterPlayersList(F, mlbPlayerList);
      const dTypePlayers = { type: D, listData: mlbTeams };
      filterdList.push(pTypePlayers);
      filterdList.push(ofTypePlayers);
      filterdList.push(cTypePlayers);
      filterdList.push(ssTypePlayers);
      filterdList.push(dTypePlayers);
      mlbPlayerList.push(...mlbTeams);

      return dispatch({
        type: NBA_DATA,
        payload: { filterdList: filterdList, allData: mlbPlayerList },
        game_id,
        sport_id,
      });
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
        mlb_player_stats = [],
        current_position = "",
      } = playerList[i]?.player || {};

      const mlbPlayerStats =
        (mlb_player_stats?.length && mlb_player_stats[0]) || {};

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
        playerStats: { ...mlbPlayerStats },
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

export function nbaLiveData(payload) {
  return (dispatch) =>
    dispatch({
      type: NBA_LIVE_DATA,
      payload,
    });
}

export function setStarPlayerCount(payload) {
  return (dispatch) =>
    dispatch({
      type: NBA_STAR_PLAYER_COUNT,
      payload,
    });
}

export function setEditPlayers(payload = { data: [], isEdit: false }) {
  return (dispatch) => {
    dispatch({
      type: NBA_EDIT_PLAYERS,
      payload: {
        data: payload?.data,
        isEdit: payload?.isEdit,
      },
    });
  };
}
