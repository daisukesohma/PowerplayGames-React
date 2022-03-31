import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, union } from "lodash";
import * as CryptoJS from "crypto-js";
import _ from "underscore";

import classes from "./index.module.scss";
import * as NFLActions from "../../actions/NFLActions";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import NFLHeaderImage from "../../assets/nfl-live.jpg";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import FooterImage from "../../assets/NHL-live-footer.png";
import RankCard from "../../components/RankCard";
import { CONSTANTS } from "../../utility/constants";
import SingleView from "./SingleView/SingleView";
import LearnMoreModal from "../../components/PowerCenterCardDetails/LearnMoreModal";
import { getLocalStorage, printLog, redirectTo } from "../../utility/shared";
import LiveStandings from "../../components/LiveStandings";
import PowerSidebar from "../../components/PowerCollapesible";
import MyScoreCard from "./MyScoreCard";
import TeamManager from "./TeamManager";

import SportsLiveCard from "../../components/SportsLiveCard";
import { socket } from "../../config/server_connection";
import SportsLiveCardTeamD from "../../components/SportsLiveCard/TeamD";
import Undo from "../../icons/Undo";
import { CardType } from "../../components/SportsLiveCard/CardType";
import Mobile from "../../pages/Mobile/Mobile";

const { D, K, QB, RB, TE, WR } = CONSTANTS.FILTERS.NFL;
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
} = CONSTANTS.SOCKET_EVENTS.NFL.LIVE;

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
// const dummy = dummyData;

// let _socket = null;
function NFLPowerdFsLive(props) {
  const [loading, setLoading] = useState(false);
  const [updatesLoaded, setUpdatesLoading] = useState(false);
  const [screenSize, setScreenSize] = useState(window.screen.width);

  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NFL_VIEW.FV);
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

  console.log("selectedTeam1", selectedTeam);

  const {
    live_data = [],
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.nfl);
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
    let a = await dispatch(NFLActions.getUserRemainingPowers(gameId, userId));
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

  async function useSwap(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NFLActions.updateUserRemainingPowers(gameId, userId, 4)
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
        NFLActions.updateUserRemainingPowers(gameId, userId, 5)
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
        NFLActions.updateUserRemainingPowers(gameId, userId, 6)
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
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NFL_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );

    console.log("decSelectedTeamData: ", decSelectedTeamData);
    return decSelectedTeamData;
  }

  useEffect(async () => {
    _socket = socket();
    setPowers();
    return function cleanUP() {
      isMatchUpdate = false;

      //reset logs
      dispatch(NFLActions.setGameLogs([]));

      //disconnect the socket
      _socket?.emit(ON_ROOM_UN_SUB);
      _socket?.on(ON_ROOM_UN_SUB, () => {
        _socket?.disconnect();
        _socket = null;
      });
    };
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
      console.log("Socket Emit Room");
      const {
        defense = [],
        players = [],
        power_dfs_team_rankings = [],
        game_logs = [],
      } = res?.data || {};

      console.log("res?.data Full Data", res?.data);
      console.log("res?.data", power_dfs_team_rankings[0]);

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

      dispatch(NFLActions.setGameLogs(sortedGameLogs));
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
    console.log("players players: ", players);
    const playersArr = new Array(8);
    const [playerQB] = players?.filter(
      (plr) => `${plr?.player?.primary_position}`?.toLocaleLowerCase() === QB
    );
    const playerRB = players?.filter(
      (plr) => `${plr?.player?.primary_position}`?.toLocaleLowerCase() === RB
    );
    const playerWR = players?.filter(
      (plr) => `${plr?.player?.primary_position}`?.toLocaleLowerCase() === WR
    );
    const [playerTE] = players?.filter(
      (plr) => `${plr?.player?.primary_position}`?.toLocaleLowerCase() === TE
    );
    const [playerK] = players?.filter(
      (plr) => `${plr?.player?.primary_position}`?.toLocaleLowerCase() === K
    );

    console.log("playerCenter", playerQB);
    playersArr[0] = { ...playerQB };

    if (playerRB?.length) {
      playersArr[1] = { ...playerRB[0] };
      playersArr[1].player.type1 = "RB1";
      playersArr[2] = { ...playerRB[1] };
      playersArr[2].player.type1 = "RB2";
    }

    if (playerWR?.length) {
      playersArr[3] = { ...playerWR[0] };
      playersArr[3].player.type1 = "WR1";
      playersArr[4] = { ...playerWR[1] };
      playersArr[4].player.type1 = "WR2";
    }

    playersArr[5] = { ...playerTE };

    playersArr[6] = { ...playerK };

    playersArr[7] = teamD;
    playersArr[7].team_d_nfl_team.type = D;

    let _totalScore = 0;
    for (let i = 0; i < playersArr?.length - 1; i++) {
      _totalScore += playersArr[i]?.score;
    }

    const _ranks = { ...ranks };

    setRanks({
      ..._ranks,
      score: _totalScore,
    });

    console.log("PLAYER: ", playersArr);

    dispatch(NFLActions.nflLiveData(playersArr));
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

      dispatch(NFLActions.nflLiveData(liveData));
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

      dispatch(NFLActions.nflLiveData(liveData));
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
        NFLActions.updateUserRemainingPowers(gameId, userId, power)
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
      return dispatch(NFLActions.nflLiveData(live_data));
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

  const setView = (viewType = CONSTANTS.NFL_VIEW.FV) => {
    switch (viewType) {
      case CONSTANTS.NFL_VIEW.FV:
        setCompressedView(false);
        break;

      case CONSTANTS.NFL_VIEW.C:
        setCompressedView(true);
        break;

      case CONSTANTS.NFL_VIEW.S:
        break;
    }
    setSelectedView(viewType);
  };

  const RenderView = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (selectedView === CONSTANTS.NFL_VIEW.S) {
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
          {item?.team_d_nfl_team && item?.team_d_nfl_team?.type === D ? (
            <SportsLiveCardTeamD
              data={item}
              compressedView={compressedView}
              key={index + "" + item?.team_d_nfl_team?.type}
              dwall={dwallCounts}
              challenge={challengeCounts}
              useDwall={useDwall}
              useChallenge={useChallenge}
              dataMain={selectedTeam}
              setPowers={setPowers}
            />
          ) : (
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
          <div className={classes.wrapper}>
            <Header4
              // outof={outOf}
              // enrolledUsers={enrolledUsers}
              outof={1000}
              enrolledUsers={10}
              titleMain1="NFL"
              titleMain2="PowerdFS"
              subHeader1="Introducing Live-Play Fantasy Football"
              subHeader2={
                <>
                  Use your <span>Powers</span> during the live game to drive
                  your team up the standings
                </>
              }
              contestBtnTitle="Gameplay Rules"
              prizeBtnTitle="Prize Grid"
              bgImageUri={NFLHeaderImage}
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
                  onFullView={() => setView(CONSTANTS.NFL_VIEW.FV)}
                  onCompressedView={() => setView(CONSTANTS.NFL_VIEW.C)}
                  onSingleView={() => setView(CONSTANTS.NFL_VIEW.S)}
                  activeTab={activeTab}
                  handleChangeTab={handleChangeTab}
                  // onPress={toggleLiveStandingModal}
                  // teamManagerLink="/nfl-live-powerdfs"
                  // scoreDetailLink="/nfl-live-powerdfs/my-score-details"
                  onGoBack={() => {
                    redirectTo(props, { path: "/my-game-center" });
                  }}
                />
                <Card ranks={ranks}>
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
                <div className={classes.left_side_footer}>
                  <img src={FooterImage} alt="" />
                </div>
              </div>

              <div className={classes.sidebar_container}>
                <Sidebar>
                  <CashPowerBalance
                    powerBalance={50000}
                    cashBalance={200000}
                    styles={{
                      width: "100%",
                      marginTop: "-40px",
                    }}
                    cashTitle="Prize Pool"
                    powerTitle="Top Prize"
                    centered
                    showIcons={false}
                  />
                  <RankCard currentWin={100000} {...props} />

                  <PowerSidebar
                    collapse={false}
                    swapCounts={swapCounts}
                    dwallCounts={dwallCounts}
                    challengeCounts={challengeCounts}
                    pointMultiplierCounts={pointMultiplierCounts}
                    pointBooster15x={pointBooster15x}
                    pointBooster2x={pointBooster2x}
                    pointBooster3x={pointBooster3x}
                    retroBoostCounts={retroBoostCounts}
                    powerUpCounts={powerUpCounts}
                    game={game}
                  />
                </Sidebar>
              </div>
            </div>
          </div>
          <Footer isBlack={true} />
          <LearnMoreModal
            title="Point Multipler"
            learnMoreModal={learnMoreModal}
            onCloseModal={onCloseModal}
          />
        </>
      ) : (
        <>
          <Mobile
            data={live_data}
            ranks={ranks}
            counts={{
              swapCounts,
              dwallCounts,
              challengeCounts,
              retroBoostCounts,
              powerUpCounts,
              pointMultiplierCounts,
            }}
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
            cardType="nfl"
          />
        </>
      )}
      <LiveStandings visible={showModal} onClose={toggleLiveStandingModal} />
    </>
  );
}

NFLPowerdFsLive.propTypes = {};

export default NFLPowerdFsLive;
