import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as MLBActions from "../../../actions/MLBActions";
import _ from "underscore";
import { isEmpty } from "lodash";
import lodash from "lodash";
import { useHistory } from "react-router-dom";

import { redirectTo } from "../../../utility/shared";
import { socket } from "../../../config/server_connection";
import { CONSTANTS } from "../../../utility/constants";
import classes from "./index.module.scss";
import XP2Icon from "../../../icons/XP2";
import XP3Icon from "../../../icons/XP3";
import XP1_5Icon from "../../../icons/XP1_5";
import Replace from "../../../icons/Replace";

export default function MyScoreCard() {
  const [liveStandingData, setLiveStandingData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [ranks, setRanks] = useState({
    ranking: 0,
    score: 0,
    game_id: 0,
    team_id: 0,
  });
  const [powers, setPowerss] = useState([]);
  const [pointss, setPointss] = useState([]);
  const dispatch = useDispatch();
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

  const history = useHistory();

  let tableRef = useRef();
  let _socket = null;
  const { gameLogs = [], selectedTeam = {} } = useSelector(
    (state) => state.mlb
  );
  const { game = {} } = useSelector((state) => selectedTeam);
  const {
    game_id = 0,
    PointsSystems = [],
    Powers = [],
  } = useSelector((state) => game);
  let prizePool = 0;
  prizePool = _.reduce(
    game?.PrizePayouts,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );
  useEffect(() => {
    setPointss(_.groupBy(PointsSystems, "type"));
    setPowerss(Powers);
  }, [game]);
  useEffect(() => {
    if (isEmpty(selectedTeam)) {
      return redirectTo({ path: "/my-game-center" });
    }
    _socket = socket();
    // return function cleanUP() {
    //   //disconnect the socket
    //   _socket?.emit(ON_ROOM_UN_SUB);
    //   _socket?.on(ON_ROOM_UN_SUB, () => {
    //     _socket?.disconnect();
    //     _socket = null;
    //   });
    // };
  }, []);

  React.useEffect(async () => {
    let liveStandingsData = await dispatch(
      MLBActions.getLiveStandings(game_id)
    );
    if (typeof liveStandingsData !== "undefined") {
      if (liveStandingsData.payload.error == false) {
        if (
          JSON.stringify(liveStandingsData.payload.data) !==
          JSON.stringify(liveStandingData)
        ) {
          var finalArr = [];
          var res = liveStandingsData.payload.data.powerDFSRanking;
          var user_id = parseInt(localStorage.PERSONA_USER_ID);
          var userRec = "";
          var leaderScore = 0;
          for (var i = 0; i < res.length; i++) {
            if (res[i].team.user.user_id == user_id) {
              userRec = res[i];
            } else {
              finalArr.push(res[i]);
            }
          }
          if (userRec !== "") {
            finalArr.unshift(userRec);
          }
          if (JSON.stringify(liveStandingData) !== JSON.stringify(finalArr))
            setLiveStandingData(finalArr);
        }
        //setModalState(!showModal);
      } else {
        // alert("We are experiencing technical issues with the Power functionality. Please try again shortly.");
      }
    }
  });

  useEffect(() => {
    if (_socket) {
      onSocketEmit(game_id, localStorage.PERSONA_USER_ID);
      onSocketListen();
    }
  }, [_socket]);

  //All Emit Events
  const onSocketEmit = (gameId, userId) => {
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
    _socket?.on(EMIT_ROOM, (res) => {
      const {
        game_id = "",
        score = 0,
        sport_id = "",
        status = null,
        team_id = "",
        defense = [],
        players = [],
        power_dfs_team_rankings = [],
        game_logs = [],
      } = res?.data || {};
      const teamD = defense[0] || {};
      setRanks(power_dfs_team_rankings[0] || {});
    });
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
  //set score and running totals
  useEffect(() => {
    if (!gameLogs?.length) {
      return;
    }

    let _logs = [];

    let filteredLogs = lodash.uniqBy(gameLogs, "play_id");

    for (let i = 0; i < filteredLogs?.length; i++) {
      const isPitcher = filteredLogs[i]?.play?.pitcher_id;
      const isAbOver = filteredLogs[i]?.play?.is_ab_over;
      const id = filteredLogs[i]?.play?.outcome_id;
      console.log("Outcome ID", id);

      if ((id === "kKS" || id === "kKL" || id === "kFT") && !isAbOver) {
        continue;
      }
      //total score
      const isHitter =
        filteredLogs[i]?.play?.hitter_id ===
        filteredLogs[i]?.effected_player?.player_id;

      const runners = filteredLogs[i]?.play?.runners;
      const rbiData = getRBI(filteredLogs[i]?.play?.runners, isHitter, id);
      const rsData = getRS(
        filteredLogs[i]?.play?.runners,
        filteredLogs[i]?.play?.outcome_id
      );

      const rbi = rbiData.rbi || 0;
      const rbiPts = rbi === 1 ? 2 : rbi !== 0 ? rbi * 2 : 0;
      let rs = rsData?.rs || 0;
      let rsPts = rs === 1 ? 2 : 0;
      const hasRunners = filteredLogs[i]?.play?.runners?.length ? true : false;

      let playPts = getPoints(id, isPitcher, isAbOver, hasRunners, isHitter);

      if (filteredLogs[i]?.play?.is_double_play === true) {
        playPts += 1;
      } else if (filteredLogs[i]?.play?.is_triple_play === true) {
        playPts += 2;
      }

      const totalScore = playPts + rbiPts + rsPts;
      filteredLogs[i].totalScore = totalScore;
      filteredLogs[i].runningTotal = 0;
      filteredLogs[i].rbi = rbi;
      filteredLogs[i].rbiPts = rbiPts;
      filteredLogs[i].rsPts = rsPts;
      filteredLogs[i].rs = rs;
      filteredLogs[i].playPts = playPts;

      _logs.push(filteredLogs[i]);

      if (runners && !isHitter) {
        for (let x = 0; x < runners.length; x++) {
          if (id === "aHR") {
            _logs.push(filteredLogs[i]);
          }

          if (
            runners[x].outcome_id === "ERN" ||
            runners[x].outcome_id === "URN" ||
            runners[x].outcome_id === "ERNu"
          ) {
            let temp = filteredLogs[i];
            temp.play.outcome_id = runners[x].outcome_id;
            rs += 1;
            rsPts += 2;
            const totalScore = rbiPts + rsPts;
            temp.totalScore = totalScore;
            temp.runningTotal = 0;
            temp.rbi = rbi;
            temp.rbiPts = rbiPts;
            temp.rsPts = rsPts;
            temp.rs = rs;
            temp.playPts = playPts;
            _logs.push(temp);
            _logs = lodash.uniqBy(_logs, "play_id", "play.outcome_id");
            break;
          }
        }
      } else if (isHitter && id !== "aHR") {
        const totalRunners = runners?.length;
        for (let x = 0; x < totalRunners || 0; x++) {
          if (
            runners[x].outcome_id === "ERN" ||
            runners[x].outcome_id === "URN" ||
            runners[x].outcome_id === "ERNu"
          ) {
            let temp = filteredLogs[i];
            temp.play.outcome_id = runners[x].outcome_id;
            rs += 1;
            rsPts += 2;
            const totalScore = 2;
            temp.totalScore = totalScore;
            temp.runningTotal = 0;
            temp.rbi = 1;
            temp.rbiPts = 2;
            temp.rsPts = 0;
            temp.rs = 0;
            temp.playPts = playPts;
            _logs.push(temp);
            _logs = lodash.uniqBy(_logs, "play_id", "play.outcome_id");
            break;
          }
        }
      }
    }

    //calculate running totals
    const logLength = _logs?.length;
    for (let i = 0; i < logLength; i++) {
      if (i === 0) _logs[i].runningTotal = _logs[i]?.totalScore;
      else {
        _logs[i].runningTotal =
          _logs[i - 1]?.runningTotal + _logs[i]?.totalScore;
      }
    }
    console.log("FINAL -------------LOGS----------------------", _logs);
    setLogs(_logs);
  }, [gameLogs]);

  useEffect(() => {
    if (history.location.pathname === "/mlb-live-powerdfs/my-score-details")
      tableRef?.current?.scrollIntoView();
  }, [tableRef]);

  const getPoints = (
    id,
    isPitcher = false,
    isAbOver = false,
    hasRunners = false,
    isHitter = false
  ) => {
    if (
      id === "aD" ||
      id === "aDAD3" ||
      id === "ADAD3" ||
      id === "aDAD4" ||
      id === "ADAD4" ||
      (id === "oDT3" && !isPitcher) ||
      (id === "oDT4" && !isPitcher)
    )
      return 5;
    if (id === "kKL" || id === "kKS" || id === "kFT") {
      return 2;
    }
    if (id === "aHR" && isHitter) return 10;

    if (
      (id === "oGO" ||
        id === "oFO" ||
        id === "aIBB" ||
        id === "aFCAD2" ||
        id === "aFCAD3" ||
        id === "aFCAD4" ||
        id === "aSBAD1" ||
        id === "aSBAD2" ||
        id === "aSBAD3" ||
        id === "aSBAD4" ||
        id === "aSFAD1" ||
        id === "aSFAD2" ||
        id === "aSFAD3" ||
        id === "aSFAD4" ||
        id === "bPO" ||
        id === "oDT3" ||
        id === "oDT4" ||
        id === "oFC" ||
        id === "oFC2" ||
        id === "oFC3" ||
        id === "oFC4" ||
        id === "oKLT1" ||
        id === "oKLT2" ||
        id === "oKLT3" ||
        id === "oKST1" ||
        id === "oKST2" ||
        id === "oKST3" ||
        id === "oLO" ||
        id === "oOP" ||
        id === "oPO" ||
        id === "oROET2" ||
        id === "oROET3" ||
        id === "oROET4" ||
        id === "oSB" ||
        id === "oSBT2" ||
        id === "oSBT3" ||
        id === "oSBT4" ||
        id === "oST4" ||
        id === "oTT4") &&
      !isHitter
    )
      return 1;

    if (
      (id === "PO" ||
        id === "POCS2" ||
        id === "POCS3" ||
        id === "POCS4" ||
        id === "TO1" ||
        id === "TO2" ||
        id === "TO3" ||
        id === "TO4" ||
        id === "FO1" ||
        id === "FO2" ||
        id === "FO3" ||
        id === "FO4" ||
        id === "CS2" ||
        id === "CS3" ||
        id === "CS4" ||
        id === "RI") &&
      hasRunners
    ) {
      return 1;
    }

    if (
      (id === "oSF" ||
        id === "oSFT2" ||
        id === "oSFT3" ||
        id === "oSFT4" ||
        id === "oST2" ||
        id === "oST3") &&
      !isHitter
    )
      return 1;

    if (
      (id === "aS" ||
        id === "aSAD2" ||
        id === "aSAD3" ||
        id === "aSAD4" ||
        id === "oST2" ||
        id === "oST3" ||
        id === "oST4") &&
      isHitter
    )
      return 3;

    if (id === "aSFAD4" || id === "aSBAD4" || id === "oKLT4" || id === "oKST4")
      return 2;

    if (id === "aT" || id === "aTAD4" || id === "oTT4") return 8;

    return 0;
  };

  const getRBI = (runners = [], isHitter, aHRId = "") => {
    let rbi = 0;
    for (let i = 0; i < runners?.length; i++) {
      if (
        runners[i]?.outcome_id === "ERN" ||
        runners[i]?.outcome_id === "URN" ||
        runners[i]?.outcome_id === "ERNu"
      ) {
        const [player] = gameLogs?.filter((p) => {
          return p?.effected_player?.player_id === isHitter;
        });
        if (aHRId === "aHR") {
          rbi += 1;
        } else if (player) {
          return { rbi: 1 };
        } else {
          return { rbi: 0 };
        }
      }
    }

    return {
      rbi,
    };
  };

  const getRS = (runners = [], id = "") => {
    let rs;
    for (let i = 0; i < runners?.length; i++) {
      if (id === "aHR") {
        // const [player] = gameLogs?.filter((p) => {
        //   return p?.effected_player?.player_id === runners[i]?.player_id;
        // });

        // if (player) {
        //   return { rs: 1 };
        // } else {
        //   return { rs: 0 };
        // }

        return { rs: 1 };
      }
    }

    return {
      rs,
    };
  };

  const RenderXP = (xp) => {
    if (xp?.name?.toLocaleLowerCase()?.match(/1.5x/g)) {
      return <XP1_5Icon />;
    } else if (xp?.name?.toLocaleLowerCase()?.match(/2x/g)) {
      return <XP2Icon />;
    } else if (xp?.name?.toLocaleLowerCase()?.match(/3x/g)) {
      return <XP3Icon />;
    } else {
      return "-";
    }
  };

  const Row = ({
    position,
    name,
    inning,
    plays,
    pts,
    totalPts,
    powers,
    score,
    runningTotal,
    rbi = {},
    runs = {},
    isHit = false,
    activePower = null,
    timeStamp = "",
    hasPlay = false,
    isNewRow = false,
  }) => (
    <div
      className={`${classes.card_row} ${classes.card_row_1} ${
        isHit ? classes.primary_bg : ""
      }`}
    >
      <span className={classes.child_1}>{position}</span>
      <span className={classes.child_2}>{name}</span>
      <span className={`${classes.child_3} ${classes.space}`}>{timeStamp}</span>
      <span className={classes.child_3}>{inning}</span>
      {hasPlay ? (
        <>
          <div className={classes.card_combine_row}>
            <span>
              <p className={classes.primary}>{plays}</p>
            </span>
            <span>
              <p className={classes.secondary}> {pts}</p>
            </span>
          </div>

          <div className={classes.card_combine_row}>
            <span>
              <p className={classes.primary}>{runs?.rs}</p>
            </span>
            <span>
              <p className={classes.secondary}> {runs?.pts}</p>
            </span>
          </div>

          <div className={classes.card_combine_row}>
            <span>
              <p className={classes.primary}>{rbi?.rbi}</p>
            </span>
            <span>
              <p className={classes.secondary}> {rbi?.pts}</p>
            </span>
          </div>
        </>
      ) : (
        <div className={classes.no_play}>
          <p>Player Swapped</p>
        </div>
      )}

      {/* <span className={`${classes.child_4} ${classes.center}`}><p className={classes.secondary}>{totalPts}</p></span> */}
      <span className={classes.center}>
        {isNewRow && activePower !== null && RenderXP(activePower)}
        {!hasPlay && <Replace size={40} />}
      </span>
      <span className={classes.center}>
        <p className={score < 0 ? classes.danger : classes.success}>
          {score < 0 ? `Reversed ${score}` : score}
        </p>
      </span>
      <span className={classes.center}>
        <p className={`${classes.primary} ${classes.border}`}>{runningTotal}</p>
      </span>
    </div>
  );

  return (
    <>
      <div className={classes.card_header}>
        <div className={classes.card_row}>
          <span className={classes.child_1}>Position</span>
          <span className={classes.child_2}>Name</span>
          <span className={`${classes.child_3} ${classes.space}`}>
            Time Stamp
          </span>
          <span className={classes.child_3}>Inning</span>
          <div className={classes.card_header_1}>
            <p>Game Plays</p>
            <div className={classes.card_combine_row}>
              <span>Plays</span>
              <span>Pts</span>
            </div>
          </div>
          <div className={classes.card_header_1}>
            <p>Runs</p>
            <div className={classes.card_combine_row}>
              <span>RS</span>
              <span>Pts</span>
            </div>
          </div>
          <div className={classes.card_header_1}>
            <p>RBI</p>
            <div className={classes.card_combine_row}>
              <span>RBI</span>
              <span>Pts</span>
            </div>
          </div>
          {/* <span className={classes.child_4}>Total Pts</span> */}
          <span className={classes.center}>Powers</span>
          <span className={classes.center}>My Score</span>
          <span className={classes.center}>Running Total</span>
        </div>
      </div>

      <div className={classes.card_body}>
        {logs && logs?.length ? (
          logs?.map((row, ind) => {
            const {
              active_powerplay = null,
              effected_player = {},
              fantasy_points_occured = 0,
              fantasy_points_occured_without_powerplay = 0,
              fantasy_points_after = 0,
              play = {},
              totalScore = 0,
              runningTotal = 0,
              rbi = 0,
              rbiPts = 0,
              rs = 0,
              rsPts = 0,
              playPts = 0,
              created_at: createdAt = "",
              isNewRow = false,
            } = row || {};

            const {
              active = true,
              bat_hand = "0",
              current_position = "0",
              current_team = 0,
              datafeed_id = "",
              height = "",
              is_injured = false,
              jersey_number = 0,
              name = "",
              player_id = 0,
              primary_position = "",
              throw_hand = "",
              type = "",
            } = effected_player || {};

            const {
              balls = 0,
              created_at = "",
              created_at_feed = "",
              // datafeed_id = "8850001a-fc26-4a9c-8fa8-482ef6184200",
              event_name = null,
              half = "",
              hitter_id = 0,
              inning_number = 0,
              inning_sequence = 0,
              is_ab_over = false,
              is_bunt = false,
              is_double_play = false,
              is_hit = false,
              is_passed_ball = false,
              is_triple_play = false,
              is_wild_pitch = false,
              match_id = 0,
              outcome_id = "",
              outs = 0,
              pitch_count = 0,
              pitch_speed = 0,
              pitch_type = null,
              pitch_zone = 0,
              pitcher_id = 0,
              play_id = 0,
              status = "",
              strikes = 0,
              type: pType = "",
              updated_at = "",
              updated_at_feed = "",
              runners = [],
            } = play || {};

            return (
              <Row
                position={type}
                name={name}
                inning={
                  `${half}`.toLocaleLowerCase() === "t"
                    ? `Top ${inning_number}`
                    : `Bot ${inning_number}`
                }
                plays={outcome_id}
                pts={playPts}
                totalPts="8"
                powers="1.5"
                score={totalScore}
                runningTotal={runningTotal}
                runs={{
                  rs: rs,
                  pts: rsPts,
                }}
                rbi={{
                  rbi: rbi,
                  pts: rbiPts,
                }}
                isHit={false}
                activePower={active_powerplay}
                timeStamp={moment(created_at || createdAt).format("hh:mm A")}
                hasPlay={play !== null}
                key={ind?.toString()}
                isNewRow={isNewRow}
              />
            );
          })
        ) : (
          <>No Data</>
        )}
      </div>
    </>
  );
}
