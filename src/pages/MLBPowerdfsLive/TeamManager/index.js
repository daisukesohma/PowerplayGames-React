import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, union } from "lodash";
import * as CryptoJS from "crypto-js";

import * as MLBActions from "../../../actions/MLBActions";
import _ from "underscore";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Header4 from "../../../components/Header4";
import BaseballImage from "../../../assets/mlb_compress_header.jpg";
import Card from "../../../components/PowerpickCard";
import Sidebar from "../../../components/Sidebar";
import CashPowerBalance from "../../../components/CashPowerBalance";
import XPIcon from "../../../icons/XPIcon";
import LockIcon from "../../../icons/Lock";
import TwitterIcon from "../../../icons/TwitterIcon";
import FacebookIcon from "../../../icons/FacebookIcon";
import ReplaceAllIcon from "../../../icons/Replace";
import ShieldIcon from "../../../icons/ShieldIcon";
import ChallengeIcon from "../../../icons/Challenge";
import RetroIcon from "../../../icons/RetroBoost";
import PowerUpIcon from "../../../icons/PowerUp";
import NHLLiveSportsHeader from "../../../components/NHLLiveSportsHeader";
import FooterImage from "../../../assets/NHL-live-footer.png";
import RankCard from "../../../components/RankCard";
import { CONSTANTS } from "../../../utility/constants";
import SingleView from "../SingleView/SingleView";
import LearnMoreModal from "../../../components/PowerCenterCardDetails/LearnMoreModal";
import SportsLiveCard from "../../../components/SportsLiveCard";
import { getLocalStorage, printLog, redirectTo } from "../../../utility/shared";
import { socket } from "../../../config/server_connection";
import SportsLiveCardTeamD from "../../../components/SportsLiveCard/TeamD";
import Mobile from "../../../pages/Mobile/Mobile";
import PowerCollapesible from "../../../components/PowerCollapesible";
import PrizeModal from "../../../components/PrizeModal";
import x1_5Power from "../../../assets/icons/powers/x_1.5.png";
import classes from "./index.module.scss";

const { D, P, C, OF, XB, SS } = CONSTANTS.FILTERS.MLB;

export default function TeamManager(props) {
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
  } = useSelector((state) => state.mlb);
  const { user = {} } = useSelector((state) => state.auth);

  const selectedTeam = getTeamFromLocalStorage();
  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );

    return decSelectedTeamData;
  }

  const dispatch = useDispatch();

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
          src={x1_5Power}
        />
        <p className={classes.team_manager_card_header_title}>
          1.5x Booster Applied to all your players!
        </p>
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (selectedView === CONSTANTS.NHL_VIEW.S) {
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
        <TeamManagerCardHeader />
        {live_data?.map((item, index) => (
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
        ))}
      </>
    );
  }

  return <p>Loading...</p>;
}
