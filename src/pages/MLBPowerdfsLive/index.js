import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, union } from "lodash";
import * as CryptoJS from "crypto-js";

import classes from "./index.module.scss";
import * as MLBActions from "../../actions/MLBActions";
import _ from "underscore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/mlb_compress_header.jpg";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import RankCard from "../../components/RankCard";
import { CONSTANTS } from "../../utility/constants";
import SingleView from "./SingleView/SingleView";
import LearnMoreModal from "../../components/PowerCenterCardDetails/LearnMoreModal";
import SportsLiveCard from "../../components/SportsLiveCard";
import { getLocalStorage, printLog, redirectTo } from "../../utility/shared";
import { socket } from "../../config/server_connection";
import SportsLiveCardTeamD from "../../components/SportsLiveCard/TeamD";
import Mobile from "../../pages/Mobile/Mobile";
import PrizeModal from "../../components/PrizeModal";
import PowerSidebar from "../../components/PowerCollapesible";

import MyScoreCard from "./MyScoreCard";
import TeamManager from "./TeamManager";
import LiveStandings from "../../components/LiveStandings";

const { D, P, C, OF, XB, SS } = CONSTANTS.FILTERS.MLB;
const {
  ON_ROOM_SUB,
  ON_ROOM_UN_SUB,
  EMIT_ROOM,
  ON_POWER_APPLIED,
  ON_GLOBAL_RANKING_REQUEST,
  ON_FANTASY_LOGS_REQUEST,
  GET_GLOBAL_RANKING,
  MATCH_UPDATE,
  GLOBAL_RANKING,
  FANTASY_TEAM_UPDATE,
} = CONSTANTS.SOCKET_EVENTS.MLB.LIVE;

let _socket = null;
let isMatchUpdate = false;

const POWER_IDs = {
  SWAP_POWER: 4,
  D_WALL: 5,
  CHALLENGE: 6,
  RETRO_BOOST: 10,
  POINT_BOOSTER_1_5X: 11,
  POINT_BOOSTER_2X: 12,
  POINT_BOOSTER_3X: 13,
};

function MLBPowerdFsLive(props) {
  const [loading, setLoading] = useState(false);
  const [updatesLoaded, setUpdatesLoading] = useState(false);
  const [screenSize, setScreenSize] = useState(window.screen.width);

  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);
  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const [points, setPoints] = useState(0);

  const [playerIds, setPlayerIds] = useState([]);
  const [matchUpdateData, setMatchUpdateData] = useState({});
  const [ranks, setRanks] = useState({
    ranking: 0,
    score: 0,
    game_id: 0,
    team_id: 0,
  });
  const [powersInventory, setPowersInventory] = useState({
    swap: 2,
    point_multiplier: 0,
    d_wall: 1,
    challenge: 1,
  });
  const [playerToSwap, setPlayerToSwap] = useState({});

  const [swapCounts, setSwapCounts] = useState(0);
  const [dwallCounts, setDwallCounts] = useState(0);
  const [challengeCounts, setChallengeCounts] = useState(0);
  const [pointMultiplierCounts, setPointMultiplierCounts] = useState(0);
  const [pointBooster15x, setPointBooster15xCounts] = useState(0);
  const [pointBooster2x, setPointBooster2xCounts] = useState(0);
  const [pointBooster3x, setPointBooster3xCounts] = useState(0);
  const [retroBoostCounts, setRetroBoostCounts] = useState(0);
  const [powerUpCounts, setPowerUpCounts] = useState(0);
  const [showGameLogs, setGameLogsPageState] = useState(false);
  const [showPrizeModal, setPrizeModalState] = useState(false);
  const [prizes, setPrizes] = useState([]);

  const dispatch = useDispatch();
  const selectedTeam = getTeamFromLocalStorage();

  const {
    live_data = [],
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.mlb);
  const { user = {} } = useSelector((state) => state.auth);
  const { token = "", user_id } = user || {};

  const onCloseModal = () => setLearnMoreModal(false);

  const {
    game_id: gameId = "",
    user_id: userId = "",
    team_id: teamId = "",
    sport_id: sportId = "",
    game = {},
    Prizes = [],
  } = selectedTeam || {};

  let prizePool,
    topPrize = 0,
    entry_fee = 0,
    currency;

  prizePool = _.reduce(
    game?.PrizePayouts,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );
  topPrize = parseFloat(
    _.max(game?.PrizePayouts, function (ele) {
      return ele.amount;
    }).amount
  );
  entry_fee = game?.entry_fee;
  currency = game?.currency;

  async function setPowers() {
    let a = await dispatch(MLBActions.getUserRemainingPowers(gameId, userId));
    if (a === undefined) {
      return;
    }

    let remainingPowers = a.payload;
    let challenge = 0;
    let swap = 0;
    let point_booster = 0;
    let p15 = 0;
    let p2 = 0;
    let p3 = 0;
    let dwall = 0;
    let retro_boost = 0;
    let power_up = 0;
    for (let i = 0; i < remainingPowers.length; i++) {
      let rec = remainingPowers[i].fantasy_powers;
      if (rec !== undefined && rec !== null) {
        if (rec.name === "D-Wall") {
          dwall = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Challenge") {
          challenge = remainingPowers[i].remaining_amount;
        } else if (rec.name === "1.5x Point Booster") {
          p15 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "2x Point Booster") {
          p2 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "3x Point Booster") {
          p3 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "Swap") {
          swap = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Retro Boost") {
          retro_boost = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Power-Up") {
          power_up = remainingPowers[i].remaining_amount;
        }
      }
    }
    setChallengeCounts(challenge);
    setSwapCounts(swap);
    setDwallCounts(dwall);
    setPointMultiplierCounts(point_booster);
    setRetroBoostCounts(retro_boost);
    setPowerUpCounts(power_up);
    setPointBooster15xCounts(p15);
    setPointBooster2xCounts(p2);
    setPointBooster3xCounts(p3);
  }

  function isPowerAvailable(type) {
    let powerss = game?.Powers;
    let available = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    if (typeof powerss == "undefined") {
      return;
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          available = 1;
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          available = 1;
          break;
        }
      }
    }
    return available;
  }

  function isPowerLocked(type) {
    let powerss = game?.Powers;
    if (typeof powerss == "undefined") {
      return;
    }
    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          if (
            powerss[i].SocialMediaUnlock == true ||
            powerss[i].SocialMediaUnlock == "true"
          ) {
            locked = 1;
          }
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          if (
            powerss[i].SocialMediaUnlock == true ||
            powerss[i].SocialMediaUnlock == "true"
          ) {
            locked = 1;
          }
          break;
        }
      }
    }
    return locked;
  }

  async function useSwap(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        MLBActions.updateUserRemainingPowers(gameId, userId, 4)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 4,
          userId: userId,
          gameId: game_id,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  async function useDwall(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        MLBActions.updateUserRemainingPowers(gameId, userId, 5)
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
        MLBActions.updateUserRemainingPowers(gameId, userId, 6)
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

  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );

    return decSelectedTeamData;
  }

  useEffect(async () => {
    _socket = socket();
    setPowers();
  }, []);

  useEffect(() => {
    setPlayerToSwap({});
    if (_socket) {
      onSocketEmit();

      onSocketListen();
    }
  }, [_socket]);

  useEffect(() => {
    if (isEmpty(matchUpdateData) && isEmpty(matchUpdateData.data)) return;

    setMatchUpdates();
  }, [matchUpdateData]);

  //All Emit Events
  const onSocketEmit = () => {
    _socket.emit(ON_ROOM_SUB, {
      gameId: gameId,
      userId: userId,
    });

    //ON_GLOBAL_RANKING_REQUEST
    _socket.emit(ON_GLOBAL_RANKING_REQUEST, {
      gameId: gameId,
    });
    //ON_FANTASY_LOGS_REQUEST
    _socket.emit(ON_FANTASY_LOGS_REQUEST, {
      fantasyTeamId: 172,
    });

    //GET_GLOBAL_RANKING -> Standings
    _socket.emit(GET_GLOBAL_RANKING, {
      gameId: gameId,
      upperLimit: 0,
      lowerLimit: 10,
    });
  };

  //All listen events
  const onSocketListen = () => {
    //fetch data first time
    setLoading(true);
    _socket?.on(EMIT_ROOM, (res) => {
      const {
        defense = [],
        players = [],
        power_dfs_team_rankings = [],
        game_logs = [],
      } = res?.data || {};
      const teamD = defense[0] || {};
      setRanks(power_dfs_team_rankings[0] || {});
      if (players && players?.length) {
        getPlayers(players, teamD);
      }
      const _gameLogs = [...game_logs];
      const sortedGameLogs = _gameLogs.sort((a, b) =>
        a?.play === null && b?.play !== null
          ? new Date(a?.created_at).getTime() -
            new Date(b?.created_at).getTime()
          : a?.play !== null && b?.play === null
          ? new Date(a?.play?.created_at).getTime() -
            new Date(b?.created_at).getTime()
          : new Date(a?.play?.created_at).getTime() -
            new Date(b?.play?.created_at).getTime()
      );
      dispatch(MLBActions.setGameLogs(sortedGameLogs));
      setLoading(false);
    });

    //MATCH_UPDATE
    _socket?.on(MATCH_UPDATE, (res) => {
      printLog(res);
      setMatchUpdateData(res);
    });

    //GLOBAL_RANKING
    _socket?.on(GLOBAL_RANKING, (res) => {
      printLog("GLOBAL_RANKING: ", res);
    });

    //FANTASY_TEAM_UPDATE
    _socket?.on(FANTASY_TEAM_UPDATE, (res) => {
      onFantasyTeamUpdate(res);
    });
  };

  const getPlayers = async (players = [], teamD = {}) => {
    const playersArr = new Array(8);
    const [playerP] = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === P
    );
    const [playerC] = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === C
    );
    const [playerSS] = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === SS
    );
    const playerXB = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === XB
    );
    const playerOF = players?.filter(
      (plr) => `${plr?.player?.type}`?.toLocaleLowerCase() === OF
    );

    playersArr[0] = { ...playerP };

    playersArr[1] = { ...playerC };
    playersArr[2] = { ...playerSS };

    if (playerXB?.length) {
      playersArr[3] = { ...playerXB[0] };
      playersArr[3].player.type1 = "XB1";
      playersArr[4] = { ...playerXB[1] };
      playersArr[4].player.type1 = "XB2";
    }

    if (playerOF?.length) {
      playersArr[5] = { ...playerOF[0] };
      playersArr[5].player.type1 = "OF1";
      playersArr[6] = { ...playerOF[1] };
      playersArr[6].player.type1 = "OF2";
    }
    playersArr[7] = teamD;
    playersArr[7].team_d_mlb_team.type = D;

    let _totalScore = 0;
    for (let i = 0; i < playersArr?.length - 1; i++) {
      _totalScore += playersArr[i]?.score;
    }

    const _ranks = { ...ranks };

    setRanks({
      ..._ranks,
      score: _totalScore,
    });

    dispatch(MLBActions.mlbLiveData(playersArr));
  };

  const setMatchUpdates = () => {
    const { match_id } = matchUpdateData?.data || {};
    const dataToUpdate = live_data?.filter(
      (match) => match?.match_id === match_id
    );

    if (dataToUpdate.length) {
      for (let i = 0; i < dataToUpdate.length; i++) {
        const { match = {} } = dataToUpdate[i] || {};
        const updateMatch = {
          ...match,
          boxscore: [{ ...match?.boxscore[0], ...matchUpdateData?.data }],
        };

        delete dataToUpdate[i].match;
        dataToUpdate[i].match = updateMatch;
      }

      const liveData = union(live_data, dataToUpdate);

      dispatch(MLBActions.mlbLiveData(liveData));
    }
  };

  const onFantasyTeamUpdate = (res) => {
    const { log = {}, updated_player = {} } = res?.data || {};

    const { fantasy_points_after = 0 } = log || {};
    setPoints(fantasy_points_after);
    if (!live_data?.length) return;

    const liveData = [...live_data];
    if (!isEmpty(playerToSwap)) {
      const updatedPlayerIndex = liveData?.indexOf(playerToSwap);
      if (updatedPlayerIndex !== -1) {
        liveData[updatedPlayerIndex] = updated_player;
      }

      dispatch(MLBActions.mlbLiveData(liveData));
    }
  };

  const onChangeXp = async (xp, player) => {
    const _selectedXp = {
      xp,
    };
    const current_match_id = selectedTeam.players[0].match_id;

    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";

    let indexOfPlayer = -1;
    indexOfPlayer = live_data?.indexOf(player);
    if (indexOfPlayer !== -1) {
      player.xp = _selectedXp;

      live_data[indexOfPlayer] = player;
      let power = 0;
      if (_selectedXp.xpVal === "1.5x") {
        power = 1;
      } else if (_selectedXp.xpVal === "2x") {
        power = 2;
      } else if (_selectedXp.xpVal === "3x") {
        power = 3;
      }
      let requests = await dispatch(
        MLBActions.updateUserRemainingPowers(gameId, userId, power)
      );
      // throw new Error("FOUND");
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          powerId: power,
          multiplier: _selectedXp.xpVal,
          playerId: player.player_id,
          matchId: current_match_id,
          userId: userId,
          gameId: gameId,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
      return dispatch(MLBActions.mlbLiveData(live_data));
    }
  };

  const onPowerApplied = (data) => {
    _socket.emit(ON_POWER_APPLIED, data);
  };

  const onClickStandings = () => {};

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;
    const { team_id, user_id, game_id } = selectedTeam || {};
    setPlayerToSwap(currentPlayer);
    onPowerApplied({
      fantasyTeamId: team_id,
      matchId: currentPlayer.match_id,
      playerId: currentPlayer.player_id,
      playerId2: newPlayer.playerId,
      matchIdP2: newPlayer.match_id,
      powerId: POWER_IDs.SWAP_POWER,
      userId: user_id,
      gameId: game_id,
    });
  };

  const setView = (viewType = CONSTANTS.NHL_VIEW.FV) => {
    switch (viewType) {
      case CONSTANTS.NHL_VIEW.FV:
        setCompressedView(false);
        break;

      case CONSTANTS.NHL_VIEW.C:
        setCompressedView(true);
        break;

      case CONSTANTS.NHL_VIEW.S:
        break;
    }
    setSelectedView(viewType);
  };

  const RenderView = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (selectedView === CONSTANTS.NHL_VIEW.S) {
      return (
        <SingleView
          data={live_data}
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
      );
    } else if (live_data && live_data?.length) {
      return live_data?.map((item, index) => (
        <>
          {item?.team_d_mlb_team && item?.team_d_mlb_team?.type === D ? (
            <SportsLiveCardTeamD
              data={item}
              compressedView={compressedView}
              key={index + "" + item?.team_d_mlb_team?.type}
              dwall={dwallCounts}
              challenge={challengeCounts}
              useDwall={useDwall}
              useChallenge={useChallenge}
              dataMain={selectedTeam}
              setPowers={setPowers}
            />
          ) : (
            <>
              <SportsLiveCard
                data={item}
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
              />
            </>
          )}
        </>
      ));
    }
  };

  const RenderLiveState = ({ isLive = false }) =>
    isLive ? (
      <p className={classes.currentState}>
        <span className={classes.orb} /> Live Game In Progress
      </p>
    ) : (
      <p className={`${classes.currentState} ${classes.column}`}>
        5d 4h 15min
        <span className={classes.span_text}>Live Game Stars in</span>
      </p>
    );

  window.onresize = () => {
    setScreenSize(window.screen.width);
  };

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = () => {
    setActiveTab(activeTab === 0 ? 1 : 0);
  };
  const [showModal, setModalState] = useState(false);
  const toggleLiveStandingModal = () => {
    setModalState(!showModal);
  };

  return (
    <>
      {screenSize > 550 ? (
        <>
          <Header />
          <div className="teamManagerDiv">
            <div className={classes.wrapper}>
              <Header4
                // outof={outOf}
                // enrolledUsers={enrolledUsers}
                outof={1000}
                enrolledUsers={10}
                titleMain1="MLB"
                titleMain2="PowerdFS"
                subHeader1="Introducing Live-Play Fantasy Baseball"
                subHeader2={
                  <>
                    Use your <span>Powers</span> during the live game to drive
                    your team up the standings
                  </>
                }
                contestBtnTitle="Gameplay Rules"
                prizeBtnTitle="Prize Grid"
                bgImageUri={BaseballImage}
                compressedView
                currentState={<RenderLiveState isLive />}
                onClickPrize={() => setPrizeModalState(true)}
                selectedTeam={selectedTeam}
                token={token}
                livePage={true}
              />

              <div className={classes.container}>
                <div className={classes.container_left_side}>
                  <NHLLiveSportsHeader
                    btnTitle1="Full View"
                    btnTitle2="Compressed"
                    btnTitle3="Single"
                    selectedView={selectedView}
                    onFullView={() => setView(CONSTANTS.NHL_VIEW.FV)}
                    onCompressedView={() => setView(CONSTANTS.NHL_VIEW.C)}
                    onSingleView={() => setView(CONSTANTS.NHL_VIEW.S)}
                    activeTab={activeTab}
                    handleChangeTab={handleChangeTab}
                    // teamManagerLink="/mlb-live-powerdfs"
                    // scoreDetailLink="/mlb-live-powerdfs/my-score-details"
                    onGoBack={() => {
                      redirectTo(props, { path: "/my-game-center" });
                    }}
                    state={selectedTeam}
                    {...props}
                  />

                  <Card ranks={selectedTeam}>
                    {activeTab === 0 ? (
                      <TeamManager
                        compressedView={compressedView}
                        selectedView={selectedView}
                        loading={loading}
                        swapCounts={swapCounts}
                        dwallCounts={dwallCounts}
                        challengeCounts={challengeCounts}
                        pointMultiplierCounts={pointMultiplierCounts}
                        pointBooster15x={pointBooster15x}
                        pointBooster2x={pointBooster2x}
                        pointBooster3x={pointBooster3x}
                        retroBoostCounts={retroBoostCounts}
                        powerUpCounts={powerUpCounts}
                        setPlayerToSwap={setPlayerToSwap}
                        onPowerApplied={onPowerApplied}
                        POWER_IDs={POWER_IDs}
                        setPowers={setPowers}
                      />
                    ) : (
                      <MyScoreCard />
                    )}
                  </Card>
                  <div
                    className={classes.left_side_footer}
                    style={{ position: "relative" }}
                  >
                    <a
                      href="https://fanatics.93n6tx.net/c/2068372/1126094/9663"
                      target="_blank"
                      id="1126094"
                    >
                      <img
                        src="https://a.impactradius-go.com/display-ad/9663-1126094"
                        border="0"
                        alt=""
                        width="1000"
                        height="640"
                      />
                    </a>
                    <div style={{ position: "absolute", bottom: 0, right: 5 }}>
                      {selectedTeam.game_id}
                    </div>
                  </div>
                </div>

                <div className={classes.sidebar_container}>
                  <Sidebar>
                    <CashPowerBalance
                      entryFee={entry_fee}
                      currency={currency}
                      powerBalance={topPrize}
                      cashBalance={prizePool}
                      styles={{
                        width: "100%",
                        marginTop: "-40px",
                      }}
                      entryTitle="Entry Fee"
                      cashTitle="Prize Pool"
                      powerTitle="Top Prize"
                      entryTitle="Entry Fee"
                      centered
                      showIcons={false}
                      entryFee={selectedTeam?.game?.entry_fee}
                      currency={"USD"}
                    />
                    <RankCard
                      ranks={ranks}
                      currentWin={100000}
                      onClickStandings={onClickStandings}
                      game_id={selectedTeam.game_id}
                      prizePool={prizePool}
                      {...props}
                    />

                    <PowerSidebar
                      collapse={false}
                      // swapCounts={swapCounts}
                      // dwallCounts={dwallCounts}
                      // challengeCounts={challengeCounts}
                      // pointMultiplierCounts={pointMultiplierCounts}
                      // pointBooster15x={pointBooster15x}
                      // pointBooster2x={pointBooster2x}
                      // pointBooster3x={pointBooster3x}
                      // retroBoostCounts={retroBoostCounts}
                      // powerUpCounts={powerUpCounts}
                      // game={game}
                    />
                  </Sidebar>
                </div>
              </div>
            </div>
          </div>
          <Footer isBlack={true} />
          <LearnMoreModal
            title="Point Multipler"
            learnMoreModal={learnMoreModal}
            onCloseModal={onCloseModal}
          />
          <PrizeModal
            visible={showPrizeModal}
            sportsName="MLB"
            data={selectedTeam?.game?.PrizePayouts}
            onClose={() => setPrizeModalState(false)}
          />
        </>
      ) : (
        <>
          <Mobile
            data={live_data}
            ranks={ranks}
            gameInfo={selectedTeam}
            updateReduxState={updateReduxState}
            onChangeXp={onChangeXp}
            useSwap={useSwap}
            prizePool={prizePool}
            counts={{
              swapCounts,
              dwallCounts,
              challengeCounts,
              retroBoostCounts,
              powerUpCounts,
              pointMultiplierCounts,
              pointBooster15x,
              pointBooster2x,
              pointBooster3x,
            }}
          />
        </>
      )}
      <LiveStandings visible={showModal} onClose={toggleLiveStandingModal} />
    </>
  );
}

MLBPowerdFsLive.propTypes = {};

export default MLBPowerdFsLive;
