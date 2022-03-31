import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, union } from "lodash";
import * as CryptoJS from "crypto-js";

import * as NFLActions from "../../../actions/NFLActions";
import { CONSTANTS } from "../../../utility/constants";
import SingleView from "../SingleView/SingleView";
import LearnMoreModal from "../../../components/PowerCenterCardDetails/LearnMoreModal";
import SportsLiveCard from "../../../components/SportsLiveCard";
import { getLocalStorage, printLog, redirectTo } from "../../../utility/shared";
import { socket } from "../../../config/server_connection";
import SportsLiveCardTeamD from "../../../components/SportsLiveCard/TeamD";
import x1_5Power from "../../../assets/icons/powers/x_1.5.png";
import x1_2Power from "../../../assets/icons/powers/x_1.2.svg";
import classes from "./index.module.scss";
import ScoreBoard from "../../../components/mobilecomponents/ScoreBoard";
import moment from "moment";

const { D, K, QB, RB, TE, WR } = CONSTANTS.FILTERS.NFL;

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
  } = props || {};

  const {
    live_data = [],
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.nfl);
  const { user = {} } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const selectedTeam = getTeamFromLocalStorage();

  const {
    game_id: gameId = "",
    user_id: userId = "",
    team_id: teamId = "",
    sport_id: sportId = "",
    game = {},
    Prizes = [],
  } = selectedTeam || {};

  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );

    return decSelectedTeamData;
  }

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
        <img
          alt="Power Icon"
          style={{ objectFit: "contain" }}
          width={24}
          height={25}
          src={x1_2Power}
        />
        <p className={classes.team_manager_card_header_title}>
          1.2x Booster Applied to all your players!
        </p>
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (selectedView === CONSTANTS.NFL_VIEW.S) {
    return (
      <>
        <TeamManagerCardHeader />

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
      </>
    );
  } else if (live_data && live_data?.length) {
    return (
      <>
        {screenSize > 550 ? (
          <>
            <TeamManagerCardHeader />

            {live_data?.map((item, index) => (
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
                    cardType="nfl"
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
                    cardType="nfl"
                    pointXpCount={{
                      xp1: pointBooster15x,
                      xp2: pointBooster2x,
                      xp3: pointBooster3x,
                    }}
                  />
                )}
              </>
            ))}
          </>
        ) : (
          <>
            {live_data?.map((item, index) => (
              <ScoreBoard
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
                cardType="nfl"
                counts={{
                  swapCounts,
                  dwallCounts,
                  challengeCounts,
                  retroBoostCounts,
                  powerUpCounts,
                  pointMultiplierCounts,
                }}
                // boostModal={boostModal}
                // swapModal={swapModal}
                // showTagLine={true}
                // tagLine={item?.team_d_nhl_team?.type}
                // tagLine={
                //   data?.team_d_mlb_team?.type === CONSTANTS.FILTERS.MLB.D
                //     ? `${data?.team_d_mlb_team?.type}`.toLocaleUpperCase()
                //     : primary_position
                // }
                // firstTeam={`${away_team?.name} ${away_team_runs}`}
                // secondTeam={`${home_team?.name} ${home_team_runs}`}
                // double={false}
                // featured={false}
                // icons={false}
                // baseBall={type === "P" ? false : !isEmpty(hitter)}
                // title={name}
                // subTitle={RenderSubTitle(
                //   type,
                //   innings_pitched,
                //   pitch_count,
                //   strike_outs,
                //   walks,
                //   batting_average,
                //   hits,
                //   plate_appearances,
                //   runs_batted_in,
                //   runs
                // )}
                // hitter={hitter}
                // pitcher={pitcher}
                // strikes={strikes}
                // balls={balls}
                // fieldText={showStatusText(status, date_time)}
                // fieldColor="#3f9946"
                // points={score}
                // footerText={footerTitle(
                //   current_inning_half,
                //   current_inning,
                //   outs
                // )}
                // secondShow={true}
                // key={`${index}`}
                // type={type}
                // index={index}
                // ranks={ranks}
                // counts={counts}
                // player={data}
                // active_power_id={active_power_id}
              />
            ))}
          </>
        )}
      </>
    );
  }

  return <p>Loading...</p>;
}
