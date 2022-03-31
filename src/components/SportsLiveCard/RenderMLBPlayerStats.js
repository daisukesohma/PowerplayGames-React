import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import classes from "./index.module.scss";
import BaseballStick from "../../icons/BaseballStick";
import Baseball from "../../icons/Baseball";
import EmptyRunner from "../../icons/Runners/EmptyRunner";
import RunnerRight from "../../icons/Runners/RunnerRight";
import RunnerTop from "../../icons/Runners/RunnerTop";
import RunnerLeft from "../../icons/Runners/RunnerLeft";
import RunnerTopRight from "../../icons/Runners/RunnerTopRight";
import RunnerTopLeft from "../../icons/Runners/RunnerTopLeft";
import RunnerTopRightLeft from "../../icons/Runners/RunnerTopRightLeft";
import RunnerLeftRight from "../../icons/Runners/RunnerLeftRight";
import { removeZeroBeforeDecimalPoint } from "../../utility/shared";

function RenderMLBPlayerStats(props) {
  const {
    hitter = {},
    pitcher = {},
    type = "",
    largeView = false,
    baserunner_1 = null,
    baserunner_2 = null,
    baserunner_3 = null,
    baserunner_4 = null,
    strikes = 0,
    balls = 0,
    batting_average = 0,
    showPitcher = false,
    isPitching = false,
  } = props || {};

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

  const renderBaseRunner = () => {
    if (
      baserunner_1 !== null &&
      baserunner_2 === null &&
      baserunner_3 === null &&
      baserunner_4 === null
    ) {
      return <RunnerRight />;
    } else if (
      baserunner_2 !== null &&
      baserunner_1 === null &&
      baserunner_3 === null &&
      baserunner_4 === null
    ) {
      return <RunnerTop />;
    } else if (
      baserunner_3 !== null &&
      baserunner_1 === null &&
      baserunner_2 === null &&
      baserunner_4 === null
    ) {
      return <RunnerLeft />;
    } else if (
      baserunner_1 !== null &&
      baserunner_2 !== null &&
      baserunner_3 === null &&
      baserunner_4 === null
    ) {
      return <RunnerTopRight />;
    } else if (
      baserunner_2 !== null &&
      baserunner_3 !== null &&
      baserunner_1 === null &&
      baserunner_4 === null
    ) {
      return <RunnerTopLeft />;
    } else if (
      baserunner_1 !== null &&
      baserunner_3 !== null &&
      baserunner_2 === null &&
      baserunner_4 === null
    ) {
      return <RunnerLeftRight />;
    } else if (
      baserunner_1 !== null &&
      baserunner_2 !== null &&
      baserunner_3 !== null
    ) {
      return <RunnerTopRightLeft />;
    }

    return <EmptyRunner />;
  };

  return (
    <div className={classes.mlbPlayerStats}>
      <div className={classes.mlbPlayerStats_left}>
        {!isEmpty(pitcher) && type !== "P" && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <Baseball />
              <p className={largeView && classes.large_view}>
                {formatName(pitcherName)}
              </p>
            </div>
            <span>ERA: {parseFloat(pERA).toFixed(2)}</span>
          </div>
        )}

        {!isEmpty(pitcher) && type === "P" && isPitching && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <Baseball />
              <p className={largeView && classes.large_view}>
                {formatName(pitcherName)}
              </p>
            </div>
            <span>ERA: {parseFloat(pERA).toFixed(2)}</span>
          </div>
        )}

        {!isEmpty(hitter) && (
          <div className={classes.mlbPlayerStats_left_1}>
            <div>
              <BaseballStick />
              <p className={largeView && classes.large_view}>
                {formatName(hitterName)}
              </p>
            </div>
            <span>
              {removeZeroBeforeDecimalPoint(hbBA)} | {hHits}/{hPA} | B: {balls}|
              S: {strikes}
            </span>
          </div>
        )}
      </div>
      {largeView && <>{renderBaseRunner()}</>}
    </div>
  );
}

RenderMLBPlayerStats.propTypes = {
  hitter: PropTypes.object,
  pitcher: PropTypes.object,
  largeView: PropTypes.bool,
  type: PropTypes.string,
  baserunner_1: PropTypes.number,
  baserunner_2: PropTypes.number,
  baserunner_3: PropTypes.number,
  baserunner_4: PropTypes.number,
  batting_average: PropTypes.number,
  strikes: PropTypes.number,
  balls: PropTypes.number,
  isPitching: PropTypes.bool,
};

export default RenderMLBPlayerStats;
