import http from "../config/http";
import { URLS } from "../config/urls";
import moment from "moment";

import { CONSTANTS } from "../utility/constants";
import { printLog } from "../utility/shared";

export const NHL_UPDATE_STATE = "[NHL] NHL_UPDATE_STATE";
export const NHL_DATA = "[NHL] GET_SET_DATA";
export const NHL_LIVE_DATA = "[NHL] NHL_LIVE_DATA";
export const NHL_LIVE_DATA_UPDATE = "[NHL] NHL_LIVE_DATA_UPDATE";
export const NHL_STAR_PLAYER_COUNT = "[NHL] STAR_PLAYER_COUNT";
export const NHL_EDIT_PLAYERS = "[NHL] NHL_EDIT_PLAYERS";
export const NHL_USER_SAVED_GAMES = "[NHL] NHL_USER_SAVED_GAMES";
export const NHL_USER_EDITED_GAMES = "[NHL] NHL_USER_EDITED_GAMES";
export const SET_GAME_LOGS = "[NHL] SET_GAME_LOGS";
export const SET_SELECTED_TEAM = "[NHL] SET_SELECTED_TEAM";
export const NHL_FINAL_STANDINGS = "[NHL] FINAL_STANDINGS";
export const NHL_LIVE_MATCH_EVENTS = "[NHL] LIVE_MATCH_EVENTS";
export const NHL_LIVE_MATCH_STATUS = "[NHL] LIVE_MATCH_STATUS";
export const NHL_RESET = "[NHL] RESET";

const { FILTERS } = CONSTANTS;
const { CENTER, XW, LW, RW, D, G, TD } = FILTERS.NHL;

export function nhlData(gameId) {
  return async (dispatch) => {
    try {
      const response = await http.post(
        `https://nhl.powerplaysystems.com/api/v1/services/fantasy/getFantasyPlayers`,
        {
          gameID: gameId,
        }
      );
      const {
        data: {
          players: nhlSchedule = [],
          game_id = "",
          sport_id = "",
          matches = [],
          teams = [],
        } = {},
      } = response.data || {};

      const nhlPlayerList = [];
      const nhlTeams = [];
      for (let i = 0; i < nhlSchedule?.length; i++) {
        const {
          draft: { team_id = "" },
        } = nhlSchedule[i];
        let teamDetails = teams.filter((x) => x.id == team_id);
        const { id: teamID = "" } = teamDetails;
        let matchDetails = matches.filter(
          (x) => x.away == teamID || x.home == teamID
        );

        const {
          away: away_team = {},
          home: home_team = {},
          scheduled: date_time = "",
          venue = {},
          id: match_id = "",
        } = matchDetails || {};

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

        nhlTeams.push(awayTeam);
        nhlTeams.push(homeTeam);

        const { nhl_players: awayTeamPlayers = [], name: awayTeamName = "" } =
          away_team || {};
        const { nhl_players: homeTeamPlayers = [], name: homeTeamName = "" } =
          home_team || {};
        const _awayTeamPlayersList = getPlayers(
          awayTeamPlayers,
          awayTeamName,
          homeTeamName,
          venue,
          match_id,
          date_time,
          awayTeam?.id,
          homeTeam?.id
        );
        const _homeTeamPlayersList = getPlayers(
          homeTeamPlayers,
          homeTeamName,
          awayTeamName,
          venue,
          match_id,
          date_time,
          homeTeam?.id,
          awayTeam?.id
        );
        const playersList = [..._awayTeamPlayersList, ..._homeTeamPlayersList];
        nhlPlayerList.push(...playersList);
      }

      //filter the data on the basis of types
      const filterdList = [];
      const centerTypePlayers = getFilterPlayersList(CENTER, nhlPlayerList);
      const xwTypePlayers = getFilterPlayersList(XW, nhlPlayerList);
      const dTypePlayers = getFilterPlayersList(D, nhlPlayerList);
      const gTypePlayers = getFilterPlayersList(G, nhlPlayerList);
      const tdTypePlayers = { type: TD, listData: nhlTeams };
      // console.log("centerTypePlayers: ", centerTypePlayers);
      // console.log("xwTypePlayers: ", xwTypePlayers);
      // console.log("dTypePlayers: ", dTypePlayers);
      // console.log("gTypePlayers: ", gTypePlayers);
      // console.log("tdTypePlayers: ", tdTypePlayers);
      filterdList.push(centerTypePlayers);
      filterdList.push(xwTypePlayers);
      filterdList.push(dTypePlayers);
      filterdList.push(gTypePlayers);
      filterdList.push(tdTypePlayers);
      nhlPlayerList.push(...nhlTeams);

      dispatch({
        type: NHL_DATA,
        payload: { filterdList: filterdList, allData: nhlPlayerList },
        game_id,
        sport_id,
      });

      return {
        filterdList: filterdList,
        allData: nhlPlayerList,
        game_id,
        sport_id,
      };
    } catch (err) {
      return err;
    }
  };
}

export function getFantasyPlayers(gameID) {
  return async (dispatch) => {
    try {
      const response = await http.post(
        `https://nhl.powerplaysystems.com/api/v1/services/fantasy/getFantasyPlayers`,
        { gameID: gameID }
      );

      let { teams = [], players = [], matches = [] } = response.data || {};
      teams.forEach((item) => {
        item.type = TD;
        // item.match_id = 1;
        matches.forEach((match) => {
          if (match?.home?.id === item.id) {
            item.match_id=match?.id
            item.teamB = match.away;
            item.matchVenue = match.venue;
            item.matchScheduled = match.scheduled;
          } else if (match.away.id === item.id) {
            item.match_id=match?.id
            item.teamB = match.home;
            item.matchVenue = match.venue;
            item.matchScheduled = match.scheduled;
          }
        });
      });
      players.forEach((item) => {
        if (
          item.primary_position.toLocaleLowerCase() === LW ||
          item.primary_position.toLocaleLowerCase() === RW
        ) {
          item.type = XW;
        } else {
          item.type = item.primary_position;
        }
        matches.forEach((match) => {
          if (match?.home?.id === item.team.id) {
            item.match = match;
          } else if (match.away.id === item.team.id) {
            item.match = { ...match };
            let { home, away } = match;
            item.match.home = { ...away };
            item.match.away = { ...home };
          }
        });
      });

      //filter the data on the basis of types
      const filterdList = [];
      const centerTypePlayers = getFilterPlayersList(CENTER, players);
      const xwTypePlayers = getFilterPlayersList(XW, players);
      const dTypePlayers = getFilterPlayersList(D, players);
      const gTypePlayers = getFilterPlayersList(G, players);
      const tdTypePlayers = { type: TD, listData: teams };

      filterdList.push(centerTypePlayers);
      filterdList.push(xwTypePlayers);
      filterdList.push(dTypePlayers);
      filterdList.push(gTypePlayers);
      filterdList.push(tdTypePlayers);
      // nhlPlayerList.push(...nhlTeams);

      dispatch({
        type: NHL_DATA,
        payload: { filterdList: filterdList, allData: [...players, ...teams] },
        game_id: gameID,
        sport_id: 2,
      });
      return {
        filterdList: filterdList,
        allData: [...players, ...teams],
        game_id: gameID,
        sport_id: 2,
      };
    } catch (err) {
      return err;
    }
  };
}

export function createFantasyTeam(payload1) {
  return async (dispatch) => {
    try {
      const response = await http.post(
        "https://nhl.powerplaysystems.com/api/v1/services/fantasy/createTeam",
        payload1
      );
      const { message = "", error = false } = response.data || {};
      if (!error && message === "Success") {
        //get the live page players and save them in redux
        try {
          if (!payload1.gameID || !payload1.userID) {
            return alert(
              "Invalid informations...",
              payload1.game_id,
              payload1.userId
            );
          }
        } catch (er) {
          console.log("er >> ", er);
        }
      }
    } catch (err) {
      console.log("err >> ", err);
    }
  };
}
export function getLiveWinningStatus(payload) {
  try {
    return async function (dispatch) {
       return await http.get(
        `https://nhl.powerplaysystems.com/api/v1/services/fantasy/getUserFantasyRanking?userID=${payload.userID}`,
      );
      // const { playerRank = [] } = playersResponse.finalRankings || [];
      // console.log("playersResponse==1212121212121212>",playerRank);

     
    };
  } catch (err) {
    console.log(err);
  }
}
export function editFantasyTeam(payload) {
  return async (dispatch) => {
    try {
      const response = await http.post(
        "https://nhl.powerplaysystems.com/api/v1/services/fantasy/editFantasyTeam",
        payload
      );
      const { message = "", error = false } = response.data || {};
      const { data = {} } = response || {};

      await dispatch({
        type: NHL_USER_EDITED_GAMES,
        payload: data?.data,
      });
    } catch (err) {}
  };
}
const getFinalLivePlayers = (live_players, swappedPlayers) => {
  let finalList = [];
  for (let i = 0; i < live_players.length; i++) {
    let rec = live_players[i];
    let findPlayerInSwapped = swappedPlayers.findIndex(
      (x) => x.previousPlayerID == rec.id
    );
    if (findPlayerInSwapped == -1) {
      finalList.push(rec);
    } else {
      let a = swappedPlayers.find(
        (x) => x.previousPlayerID == rec.id
      ).newPlayerData;
      a["match"] = swappedPlayers.find(
        (x) => x.previousPlayerID == rec.id
      ).match;
      a["positionID"] = parseInt(
        swappedPlayers
          .find((x) => x.previousPlayerID == rec.id)
          .newPlayerPosition.replace(/^\D+/g, "")
      );
      finalList.push(a);
    }
  }
  return finalList;
};
export function getFantasyTeam(payload) {
  return async (dispatch) => {
    try {
      const response = await http.post(
        "https://nhl.powerplaysystems.com/api/v1/services/fantasy/getFantasyTeam",
        payload
      );
      const {
        message = "",
        error = false,
        fantasyTeam = {},
      } = response.data || {};

      try {
        dispatch({
          type: NHL_LIVE_DATA_UPDATE,
          payload: {
            live_players: getFinalLivePlayers(
              fantasyTeam.players,
              typeof fantasyTeam?.swappedPlayer !== "undefined"
                ? fantasyTeam.swappedPlayer
                : []
            ),
            live_teamD: fantasyTeam.teamD,
            gameID: fantasyTeam.gameID,
            powersApplied: fantasyTeam.powersApplied,
            powersAvailable: fantasyTeam.powersAvailable,
            swappedPlayers:
              typeof fantasyTeam?.swappedPlayer !== "undefined"
                ? fantasyTeam.swappedPlayer
                : [],
          },
        });
      } catch (er) {
        console.log(er);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function add_live_events(data) {
  return {
    type: NHL_LIVE_MATCH_EVENTS,
    payload: data,
  };
}

export function add_match_status(data) {
  return {
    type: NHL_LIVE_MATCH_STATUS,
    payload: data,
  };
}

export function getFinalStandings(gameID, userID) {
  return async (dispatch) => {
    try {
      await dispatch({
        type: NHL_FINAL_STANDINGS,
        payload: [],
      });
      const response = await http.post(
        `https://nhl.powerplaysystems.com/api/v1/services/fantasy/getFantasyRankings`,
        { gameID, userID }
      );

      let finalPoints = response?.data?.finalPoints;

      finalPoints = finalPoints.sort((a, b) =>
        a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
      );
      await dispatch({
        type: NHL_FINAL_STANDINGS,
        payload: finalPoints,
      });
    } catch (error) {
      return false;
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
    type: "td",
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
        nhl_player_season_stats = [],
        current_position = "",
      } = playerList[i] || {};

      const nhl_player_stats = nhl_player_season_stats;

      const nhlPlayerStats =
        (nhl_player_stats?.length && nhl_player_stats[0]) || {};

      const time = moment(date_time).format("LT");
      const date = moment(date_time).format("YYYY-MM-DD");

      const player = {
        primary_position: primary_position,
        currentTeamId: current_team,
        isInjured: is_injured,
        playerName: name,
        playerId: player_id,
        type: primary_position,
        homeTeam,
        awayTeam,
        match_id,
        date: date,
        time: time,
        stadium: venue?.name,
        playerStats: { ...nhlPlayerStats },
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
  if (filter == "lw" || filter == "rw") {
    filter = "xw";
  }
  let list =
    (playersList?.length &&
      playersList?.filter(
        (player) =>
          `${player.fantasyPlayerPosition}`?.toLocaleLowerCase() === filter
      )) ||
    [];

  // console.log(filter);
  // console.log(playersList);
  // console.log(list);

  list.forEach((item) => {
    item.match_id = 1;
    // item.type = item.primary_position;
  });

  const players = {
    type: filter,
    listData: [...list],
  };

  return players;
}

export function nhlLiveData(payload) {
  return (dispatch) =>
    dispatch({
      type: NHL_LIVE_DATA,
      payload,
    });
}

export function nhlLiveDataUpdate(payload) {
  return (dispatch) =>
    dispatch({
      type: NHL_LIVE_DATA_UPDATE,
      payload,
    });
}

export function setStarPlayerCount(payload) {
  return (dispatch) =>
    dispatch({
      type: NHL_STAR_PLAYER_COUNT,
      payload,
    });
}

export function saveAndGetSelectPlayers(payload) {
  return async (dispatch) => {
    try {
      const response = await http.post(URLS.DFS.NHL_SAVE_PLAYERS, payload);
      const { message = "", error = false } = response.data || {};
      if (!error && message === "Success") {
        //get the live page players and save them in redux
        try {
          if (!payload.game_id || !payload.sport_id || !payload.sport_id) {
            return alert(
              "Invalid informations",
              payload.game_id,
              payload.user_id,
              payload?.sport_id
            );
          }
        } catch (er) {
          console.log("1. er >> ", er);
        }
      }
    } catch (err) {
      console.log("2. err >> ", err);
    }
  };
}

export function getSavedTeamPlayers(payload) {
  try {
    return async function (dispatch) {
      const playersResponse = await http.post(
        "https://nhl.powerplaysystems.com/api/v1/services/fantasy/getFantasyTeam",
        {
          gameID: payload.gameID,
          sportID: payload.sportID,
          userID: payload.userID,
        }
      );

      const { fantasyTeam = {} } = playersResponse.data || {};

      const {
        game_id,
        sport_id,
        user_id,
        _id: team_id = "",
        teamD = {},
        players = [],
      } = fantasyTeam || {};

      // for (let i = 0; i < players?.length; i++) {
      //   const player = players[i];
      //   Object.assign(player, {
      //     playerName: player?.name,
      //     playerId: player?.player_id,
      //   });

      //   delete player?.name;
      // }
      return {
        players,
        teamD,
        team_id,
        fantasyTeam,
      };
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
  payload = { gameID: 0, sportID: 0, userID: 0 }
) {
  return async (dispatch) => {
    const teamPlayers = await dispatch(getSavedTeamPlayers(payload));
    const players = teamPlayers?.players || [];
    const teamD = teamPlayers?.teamD || {};
    const savedPlayers = [...players];
    // for (let i = 0; i < players?.length; i++) {
    //   const obj = {
    //     matchId: players[i]?.match_id,
    //     playerId: players[i]?.player_id,
    //   };
    //   savedPlayers.push(obj);
    // }

    // const teamDObj = {
    //   team_id: teamD[0]?.team_d,
    //   match_id: teamD[0]?.match_id,
    // };
    const teamDObj = teamD;

    savedPlayers.push(teamDObj);
    return dispatch(
      setEditPlayers({
        team_id: teamPlayers?.team_id,
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
      type: NHL_EDIT_PLAYERS,
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
      const userGamesResponse = await http.post(URLS.DFS.NHL_USER_GAMES, {
        user_id: user_id,
      });
      const { data = {} } = userGamesResponse || {};
      await dispatch({
        type: NHL_USER_SAVED_GAMES,
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
      const userEditedGame = await http.post(URLS.DFS.NHL_EDIT_TEAM_PLAYER, {
        payload,
      });
      const { data = {} } = userEditedGame || {};

      await dispatch({
        type: NHL_USER_EDITED_GAMES,
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
  live_clock,
  player_id
) {
  return async (dispatch) => {
    try {
      const time = moment().format("YYYY-MM-DD HH:mm:ss");
      const response = await http.post(
        `https://nhl.powerplaysystems.com/api/v1/services/fantasy/fantasyPowerApplied`,
        {
          gameID: game_id,
          userID: user_id,
          powerApplied: power_id,
          timeApplied: time,
          playerID: player_id,
        }
      );
      return response;
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

export function setLiveNhlData(payload) {
  return (dispatch) => dispatch({ type: NHL_LIVE_DATA, payload });
}
export function setNhlData(payload) {
  return (dispatch) => dispatch({ type: NHL_DATA, payload });
}
export function starPlayerCount(payload) {
  return (dispatch) => dispatch({ type: NHL_STAR_PLAYER_COUNT, payload });
}

export const swapPlayer = async (payload) => {
  const response = await http.post(
    "https://nhl.powerplaysystems.com/api/v1/services/fantasy/swapFantasyPlayer",
    payload
  );
  return response;
};
