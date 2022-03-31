import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./score_board.scss";
import classes from "./index.module.scss";
import { removeZeroBeforeDecimalPoint } from "../../../utility/shared";
import { isEmpty } from "lodash";
import ChallengePopUp from "../../ChallengePopup";
import DwallPopUp from "../../DwallPopup";
import { CONSTANTS } from "../../../utility/constants";
import { useSelector } from "react-redux";
import XP1_5 from "../../../icons/XP1_5";
import XP1_5_1 from "../../../icons/XP1_5_1";
import XP2Icon from "../../../icons/XP2";
import XP2Icon_1 from "../../../icons/XP2_1";
import XP3 from "../../../icons/XP3";
import XP3_1 from "../../../icons/XP3_1";
import XPIcon from "../../../icons/XPIcon";
import x3 from "../../../assets/images/3x.svg";
import x2 from "../../../assets/images/2x.svg";
import x1 from "../../../assets/images/1x.svg";
import { CardType } from "../../SportsLiveCard/CardType";
import NHLFooterStats from "../../SportsLiveCard/NHLFooterStats";
import NFLFooterStats from "../../SportsLiveCard/NFLFooterStats";

export default function Slide1(props) {
  let {
    data,
    baseBall,
    fieldText = "Batting",
    secondShow,
    fieldColor,
    notShow,
    cardType = "nhl",
  } = props || {};

  const {
    player = {},
    match = {},
    xp = {},
    score = 0,
    team_d_mlb_team,
    team_d_nhl_team,
    team_d_nfl_team,
  } = data || {};

  const {
    away_team = {},
    home_team = {},
    status = "",
    boxscore = [],
    date_time = "",
  } = match || {};

  const {
    // name= "",
    name: playerName = "",
    type = "",
    type1 = "",
    primary_position: type2 = "",
    pointsSummary = [],
    totalPts = 0,
    range = "",
    mlb_player_stats = [],
    nfl_player_season_stats = [],
    nhl_player_season_stats = [],
    boost = {},
    current_team = "",
    player_id = "",
    match_stats = [],
  } = player || {};

  const { name: NHLteamName = "" } = team_d_nhl_team || {};
  const { name: MLBteamName = "" } = team_d_mlb_team || {};
  const { name: NFLteamName = "" } = team_d_nfl_team || {};
  let teamName = "";

  if (cardType === CardType.NHL && NHLteamName) {
    teamName = NHLteamName;
  } else if (cardType === CardType.MLB && MLBteamName) {
    teamName = MLBteamName;
  } else if (cardType === CardType.NFL && NFLteamName) {
    teamName = NFLteamName;
  }

  const {
    batting_average = 0,
    earned_runs_average = 0,
    home_runs = 0,
  } = mlb_player_stats[0] || {};

  const {
    // batting_average = 0,
    // earned_runs_average = 0,
    // home_runs = 0,
  } = nfl_player_season_stats[0] || {};

  const {
    games_played = 0,
    goals = 0,
    assists = 0,
    points = 0,
    // batting_average = 0,
    // earned_runs_average = 0,
    // home_runs = 0,
  } = nhl_player_season_stats[0] || {};

  const {
    strikes = 0,
    balls = 0,
    hitter = {},
    pitcher = {},
    outs = 0,
    home_team_runs = 0,
    away_team_runs = 0,
    baserunner_1 = null,
    baserunner_2 = null,
    baserunner_3 = null,
    baserunner_4 = null,
    current_inning = 0,
    current_inning_half = null,
  } = boxscore[0] || {};

  const {
    active: isHitterActive = false,
    bat_hand: hBatHand = "",
    current_position: hCurrentPos = "",
    current_team: hCurrenTeam = 0,
    datafeed_id: hDataFeedId = "",
    height: hHeight = "",
    is_injured: isHInjured = true,
    jersey_number: jJersyNumber = 0,
    name: hitterName = "",
    player_id: hId = 0,
    primary_position: hPrimaryPos = "",
    throw_hand: hThrowHand = "",
    type: hitterType = "",
    mlb_player_stats: hitterStats = [],
    match_stats: hMatchStats = [],
  } = hitter || {};

  const {
    base_on_balls: hBOB = 0,
    batting_average: hbBA = 0,
    doubles: Hdoubles = 0,
    // earned_runs_average: hERA = 0,
    // hits: hHits = 0,
    home_runs: hHomeRuns = 0,
    innings_pitched: hIp = 0,
    losses: hLosses = 0,
    ops: HOPS = 0,
    player_id: hPlayerId = 0,
    // runs_batted_in: hRBI = 0,
    season_id: hSeasonId = 0,
    stats_id: hStatId = 0,
    stolen_bases: hStolenBases = 0,
    strike_outs: hStrikeOuts = 0,
    triples: hTriples = 0,
    type: hType = "",
    updated_at: hUpdateAt = "",
    walks_hits_per_innings_pitched: hWHPIP = 0,
    // wins: hWins = 0,
  } = hitterStats[0] || {};

  const {
    // batting_average: hbBA = 0,
    // created_at=  "2021-07-09T23:50:14.751Z",
    // data_id= 1164,
    earned_runs_average: hERA = 0,
    hits: hHits = 0,
    innings_pitched: hIP = null,
    // match_id= 6692,
    outs: hOuts = null,
    pitch_count: hPC = null,
    plate_appearances: hPA = 0,
    // player_id= 10801,
    runs: hRuns = 0,
    runs_batted_in: hRBI = 0,
    strike_outs: hSO = 0,
    // updated_at= "2021-07-09T23:50:14.751Z",
    walks: hWalks = 0,
  } = hMatchStats[0] || {};

  const {
    active: isPittcherActive = false,
    bat_hand: pBatHand = "",
    current_position: pCurrentPos = "",
    current_team: pCurrentTeam = 0,
    datafeed_id: pDataFeedId = "",
    height: pHeight = "",
    is_injured: isPInjured = false,
    jersey_number: pJersyNumber = 0,
    name: pitcherName = "",
    player_id: pId = 0,
    primary_position: pPrimaryPos = "",
    throw_hand: pThrowHand = "",
    type: pType = "",
    mlb_player_stats: pitcherStats = [],
  } = pitcher || {};

  const {
    base_on_balls: pBOB = 0,
    batting_average: pbBA = 0,
    doubles: pdoubles = 0,
    earned_runs_average: pERA = 0,
    hits: pHits = 0,
    home_runs: pHomeRuns = 0,
    innings_pitched: pIp = 0,
    losses: pLosses = 0,
    ops: pOPS = 0,
    player_id: pPlayerId = 0,
    runs_batted_in: pRBI = 0,
    season_id: pSeasonId = 0,
    stats_id: pStatId = 0,
    stolen_bases: pStolenBases = 0,
    strike_outs: pStrikeOuts = 0,
    triples: pTriples = 0,
    updated_at: pUpdateAt = "",
    walks_hits_per_innings_pitched: pWHPIP = 0,
    wins: pWins = 0,
  } = pitcherStats[0] || {};

  const formatName = (name) => {
    const n = `${name}`.split(" ");

    return `${n[0]?.substring(0, 1)}`?.toUpperCase() + ". " + `${n[1]}`;
  };

  return (
    <div className="carousel-item active">
      <div
        className="board__wrapper__content"
        style={
          secondShow && baseBall ? { height: "248px" } : { height: "227px" }
        }
      >
        <div className="row">
          <div className="col-12">
            <h2 style={{ marginTop: "5px" }}>
              {playerName ? playerName : teamName}
            </h2>
            {cardType === CardType.NHL ? (
              <p>
                G: {goals} | A: {assists} | SOG: 5
              </p>
            ) : null}
          </div>

          <div className="col-12 ps-2 pe-2">
            <div
              className="board__wrapper__fieldsText"
              style={{ color: fieldColor }}
            >
              <h4>{fieldText}</h4>
            </div>
          </div>

          {CardType.MLB === cardType ? (
            <>
              {secondShow && (
                <>
                  <div className="col-4 pe-0">
                    <img
                      style={{ maxWidth: "68px" }}
                      src="/images/bating.svg"
                      alt=""
                    />
                  </div>

                  <div className="col-8 roger">
                    <div>
                      {!isEmpty(hitter) && (
                        <>
                          <p>
                            <img src="/images/bat.svg" alt="" />{" "}
                            <span>{formatName(hitterName)}</span>
                          </p>
                          <p>
                            {removeZeroBeforeDecimalPoint(hbBA)} | {hHits}/{hPA}{" "}
                            | B: {balls}| S: {strikes}
                          </p>
                          {notShow ? null : <h4 className="mt-1">SINGLE</h4>}
                        </>
                      )}
                      {!isEmpty(pitcher) && (
                        <>
                          <p>
                            <img src="/images/baseball.svg" alt="" />{" "}
                            <span>{formatName(pitcherName)}</span>
                          </p>
                          <p className="mb-3">ERA: {pERA}</p>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : null}

          {CardType.NHL === cardType ? <NHLFooterStats /> : null}

          {CardType.NFL === cardType ? <NHLFooterStats /> : null}
        </div>
      </div>
    </div>
  );
}
