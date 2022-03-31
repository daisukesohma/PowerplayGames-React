import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, union } from "lodash";
import * as CryptoJS from "crypto-js";

import * as NHLActions from "../../../actions/NHLActions";
import { CONSTANTS } from "../../../utility/constants";
import SingleView from "../SingleView/SingleView";
import LearnMoreModal from "../../../components/PowerCenterCardDetails/LearnMoreModal";
import SportsLiveCard from "../../../components/SportsLiveCard";
import { getLocalStorage, printLog, redirectTo } from "../../../utility/shared";
import SportsLiveCardTeamD from "../../../components/SportsLiveCard/TeamD";
import x1_5Power from "../../../assets/icons/powers/x_1.5.png";
import x1_2Power from "../../../assets/icons/powers/x_1.2.svg";
import classes from "./index.module.scss";
import ScoreBoard from "../../../components/mobilecomponents/ScoreBoard";
import moment from "moment";

const { CENTER, XW, D, G, TD } = CONSTANTS.FILTERS.NHL;

export default function TeamManager(props) {
  const [screenSize, setScreenSize] = useState(window.screen.width);
  window.onresize = () => {
    setScreenSize(window.screen.width);
  };
  let {
    selectedView,
    compressedView,
    loading,
    swapCounts,
    dwallCounts,
    challengeCounts,
    pointMultiplierCounts,
    pointBooster15x,
    pointBooster2x,
    pointBooster3x,
    retroBoostCounts,
    powerUpCounts,
    setPlayerToSwap,
    onPowerApplied,
    POWER_IDs,
    setPowers,
    powers = [],
    matchEvents = [],
    nhlEventData={}
  } = props || {};

  const {
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.nhl);

  const {
    gameID = 0,
    live_players = [],
    live_teamD = {},
    live_home = {},
    live_away = {},
    period = 0,
    powersApplied = [],
    powersAvailable = "",
    selectedTeam = {},
    live_clock = "20:00",
    swappedPlayers=[]
  } = useSelector((state) => state.nhl);
  const { user = {} } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const selectedTeam1 = getTeamFromLocalStorage();
  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );
    return decSelectedTeamData;
  }
 
  const {
    game_id: gameId = "",
    user_id: userId = "",
    team_id: teamId = "",
    sport_id: sportId = "",
    game = {},
    Prizes = [],
  } = selectedTeam || {};
  const onChangeXp = async (xp, player) => {
    const _selectedXp = {
      xp,
    };
    const current_match_id = player?.match?.id;
    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";
    let indexOfPlayer = -1;

    indexOfPlayer = live_players.findIndex((x) => x?.id == player?.id);
    if (indexOfPlayer !== -1) {
      player.xp = _selectedXp;

      live_players[indexOfPlayer] = player;
      let power = 0;
      if (_selectedXp.xpVal === "1.5x") {
        power = 1;
      } else if (_selectedXp.xpVal === "2x") {
        power = 2;
      } else if (_selectedXp.xpVal === "3x") {
        power = 3;
      }
      // let requests = await dispatch(
      //   NHLActions.updateUserRemainingPowers(gameId, userId, power)
      // );
      //const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(selectedTeam?.gameID, selectedTeam?.userID, _selectedXp.xpVal, live_clock, live_teamD?.id)
      );
      console.log("requests", requests);
      // throw new Error("FOUND");
      if (requests?.data?.code == 200) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: player?.team?.id,
          powerId: power,
          multiplier: _selectedXp.xpVal,
          playerId: player?.id,
          matchId: current_match_id,
          userId: selectedTeam?.userID,
          gameId: gameID,
        });
        return dispatch(NHLActions.nhlLiveData(live_players));
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
      
    }
  };

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;
    const { userID, gameID } = selectedTeam || {};
    setPlayerToSwap(currentPlayer);
    onPowerApplied({
      fantasyTeamId: currentPlayer?.team?.id,
      matchId: currentPlayer.match?.id,
      playerId: currentPlayer.id,
      playerId2: newPlayer.id,
      matchIdP2: newPlayer?.match?.i,
      powerId: POWER_IDs.SWAP_POWER,
      userId: userID,
      gameId: gameID,
    });
  };

  async function useDwall(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gameId, userId, 5)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 5,
          userId: userId,
          gameId: gameId,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  async function useChallenge(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(selectedTeam?.gameID, selectedTeam?.userID, 6, live_clock, live_teamD?.id)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 6,
          userId: userId,
          gameId: gameId,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  async function useSwap(currentPlayer,action) {
    if (action) {
      // let requests = await dispatch(
      //   NHLActions.updateUserRemainingPowers(gameId, userId, 4)
      // );
      const current_match_id = currentPlayer?.match?.id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(selectedTeam?.gameID, selectedTeam?.userID, 4, live_clock, live_teamD?.id)
      );
      if (requests?.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: currentPlayer?.team?.id,
          matchId: current_match_id,
          powerId: 4,
          userId: selectedTeam?.userID,
          gameId: selectedTeam?.gameID,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  const TeamManagerCardHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          height: "36px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(104, 143, 189, 0.14)",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
      >
        {/* <img
          alt="Power Icon"
          style={{ objectFit: "contain" }}
          width={24}
          height={25}
          src={x1_2Power}
        /> */}
        <p className={classes.team_manager_card_header_title}>
          Use Powers to boost your points!
        </p>
      </div>
    );
  };

  const [swap, setSwap] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [loadingPlayerList, setLoadingPlayerList] = useState(false);
  const [swapPlayerList, setPlayerList] = useState({});
  const [filteredPlayerList, setFilteredPlayerList] = useState({});
  const { data: nhlData = [] } = useSelector((state) => state.nhl);

  const boostModal = (value, player = {}) => {
    if (value) {
      setSelectedPlayer(player);
    } else {
      setSelectedPlayer({});
    }
    setSecondModal(!secondModal);
  };
  // console.log("live_players------->>>>>>>",live_players);

  const swapModal = (value, player = {}) => {
    if (value) {
      setSelectedPlayer(player);
    } else {
      setSelectedPlayer({});
    }
    toggleReplaceModal(player);
    //setSwap(!swap);
  };

  const toggleReplaceModal = useCallback(
    async (player) => {
      setLoadingPlayerList(true);
      setSwap(true);
      const response = await dispatch(
        NHLActions.nhlData(props?.gameInfo?.game_id)
      );
      console.log("data?.type", player?.player?.type);
      if (response?.filterdList && response?.filterdList?.length) {
        const _mlbData = [...response?.filterdList];
        const [swapablePlayerData] = _mlbData?.filter(
          (data) =>
            data?.type === `${player?.player?.type}`?.toLocaleLowerCase()
        );
        if (
          swapablePlayerData &&
          swapablePlayerData?.listData &&
          swapablePlayerData?.listData?.length
        ) {
          const _time = moment(player?.match?.date_time)
            .clone()
            .format("h:mm A");
          const newListData = swapablePlayerData?.listData?.filter(
            (data, index) =>
              `${data?.time}` === _time &&
              data?.playerId !== player?.player_id &&
              data[index]?.player_id !== player?.player_id
          );
          const _dataToRender = {
            type: swapablePlayerData.type,
            listData: newListData,
          };
          setPlayerList(_dataToRender);
          setFilteredPlayerList(_dataToRender);
          //setSwap(true)
        }
      }
      setLoadingPlayerList(false);
    },
    [nhlData]
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  if (selectedView === CONSTANTS.NHL_VIEW.S) {
    return (
      <>
        <TeamManagerCardHeader />
        <SingleView
          data={[...live_players, { ...live_teamD, isTeamD: true }]}
          onChangeXp={onChangeXp}
          updateReduxState={updateReduxState}
          starPlayerCount={starPlayerCount}
          gameInfo={selectedTeam}
          dwall={dwallCounts}
          challenge={challengeCounts}
          useDwall={useDwall}
          useChallenge={useChallenge}
          dataMain={selectedTeam}
          useSwap={useSwap}
          swapCount={swapCounts}
          setPowers={setPowers}
          pointXpCount={{
            xp1: pointBooster15x,
            xp2: pointBooster2x,
            xp3: pointBooster3x,
          }}
        />
      </>
    );
  } else if (live_players && live_players?.length) {
    return (
      <>
        {screenSize > 550 ? (
          <>
            <TeamManagerCardHeader />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                maxWidth: 1020,
              }}
            >
              {console.log("live_players===>",live_players)}
              {live_players.map((item, index) => (
                <SportsLiveCard
                  data={{ player: item, ...item }}
                  // data={{
                  //   ...item,
                  //   player: {
                  //     name: item?.full_name,
                  //     positionID: item?.positionID,
                  //     primary_position: item?.primary_position,
                  //   },
                  // }}
                  compressedView={compressedView}
                  key={index + ""}
                  onChangeXp={onChangeXp}
                  updateReduxState={updateReduxState}
                  starPlayerCount={starPlayerCount}
                  gameInfo={selectedTeam}
                  useSwap={useSwap}
                  swapCount={swapCounts}
                  dataMain={selectedTeam}
                  setPowers={setPowers}
                  pointXpCount={{
                    xp1: pointBooster15x,
                    xp2: pointBooster2x,
                    xp3: pointBooster3x,
                  }}
                  cardType="nhl"
                  counts={{
                    swapCounts,
                    dwallCounts,
                    challengeCounts,
                    retroBoostCounts,
                    powerUpCounts,
                    pointMultiplierCounts,
                  }}
                  matchEvents={matchEvents}
                  getFantasyTeam={props.getFantasyTeam}
                  nhlEventData={nhlEventData}
                />
              ))}
              <SportsLiveCardTeamD
                data={live_teamD}
                compressedView={compressedView}
                key={live_teamD?.id}
                dwall={dwallCounts}
                challenge={challengeCounts}
                useDwall={useDwall}
                useChallenge={useChallenge}
                dataMain={selectedTeam}
                setPowers={setPowers}
                cardType="nhl"
                powers={powers}
              />
            </div>
          </>
        ) : (
          <>
            {live_players?.map((item, index) => (
              <ScoreBoard
                data={item}
                compressedView={compressedView}
                key={index + ""}
                // onChangeXp={onChangeXp}
                // updateReduxState={updateReduxState}
                starPlayerCount={starPlayerCount}
                // gameInfo={selectedTeam}
                // useSwap={useSwap}
                swapCount={swapCounts}
                // dataMain={selectedTeam}
                setPowers={setPowers}
                pointXpCount={{
                  xp1: pointBooster15x,
                  xp2: pointBooster2x,
                  xp3: pointBooster3x,
                }}
                cardType="nhl"
                counts={{
                  swapCounts,
                  dwallCounts,
                  challengeCounts,
                  retroBoostCounts,
                  powerUpCounts,
                  pointMultiplierCounts,
                }}
              />
            ))}
          </>
        )}
      </>
    );
  }

  return <p>Loading...</p>;
}
