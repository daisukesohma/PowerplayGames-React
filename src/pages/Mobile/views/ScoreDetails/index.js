import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import _ from "underscore";
import ScoreCard from "../../../../components/mobilecomponents/ScoreCard";
import SwingAway from "../../../../components/mobilecomponents/SwingAway/SwingAway";
import PoweredBy from "./../../../../components/mobilecomponents/PoweredBy";

const ScoreDetails = () => {
  const { gameLogs = [], selectedTeam = {} } = useSelector(
    (state) => state.mlb
  );
  const { game = {} } = useSelector((state) => selectedTeam);
  const { game_id = 0, PointsSystems = [], Powers = [] } = useSelector(
    (state) => game
  );
  const [logs, setLogs] = useState([]);
  let prizePool = 0;
  prizePool = _.reduce(
    game?.PrizePayouts,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );
  const getPoints = (
    id,
    isPitcher = false,
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

    if (id === "aHR") return 10;

    if (
      id === "oGO" ||
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
      id === "oTT4" ||
      id === "PO" ||
      id === "POCS2" ||
      id === "POCS3" ||
      id === "POCS4" ||
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
      id === "RI"
    )
      return 1;

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
      id === "aS" ||
      id === "aSAD2" ||
      id === "aSAD3" ||
      id === "aSAD4" ||
      id === "oST2" ||
      id === "oST3" ||
      id === "oST4"
    )
      return 3;

    if (id === "aSFAD4" || id === "aSBAD4" || id === "oKLT4" || id === "oKST4")
      return 2;

    if (id === "aT" || id === "aTAD4" || id === "oTT4") return 8;

    return 0;
  };

  const getRBI = (runners = [], aHRId = "") => {
    let rbi;
    for (let i = 0; i < runners?.length; i++) {
      if (
        runners[i]?.outcome_id === "ERN" ||
        runners[i]?.outcome_id === "URN" ||
        runners[i]?.outcome_id === "ERNu"
      ) {
        const [player] = gameLogs?.filter((p) => {
          return p?.effected_player?.player_id === runners[i]?.player_id;
        });

        if (aHRId === "aHR" && player) {
          rbi += 1;
          return {
            rbi,
          };
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
  useEffect(() => {
    if (!gameLogs?.length) {
      return;
    }
    const _logs = [];
    for (let i = 0; i < gameLogs?.length; i++) {
      const isPitcher =
        gameLogs[i]?.play?.pitcher_id ===
        gameLogs[i]?.effected_player?.player_id;
      const isAbOver = gameLogs[i]?.play?.is_ab_over;
      const id = gameLogs[i]?.play?.outcome_id;

      if (id === "kKL" && !isAbOver) {
        continue;
      }

      //total score
      const rbiData = getRBI(gameLogs[i]?.play?.runners, id);
      const rsData = getRS(
        gameLogs[i]?.play?.runners,
        gameLogs[i]?.play?.outcome_id
      );

      const isHitter =
        gameLogs[i]?.play?.hitter_id ===
        gameLogs[i]?.effected_player?.player_id;
      const rbi = rbiData.rbi || 0;
      const rbiPts = rbi === 1 ? 2 : rbi !== 0 ? rbi * 2 : 0;
      const rs = rsData?.rs || 0;
      const rsPts = rs === 1 ? 2 : 0;
      const hasRunners = gameLogs[i]?.play?.runners?.length ? true : false;

      const playPts = getPoints(id, isPitcher, isAbOver, hasRunners, isHitter);

      const totalScore = playPts + rbiPts + rsPts;
      gameLogs[i].totalScore = totalScore;
      gameLogs[i].runningTotal = 0;
      gameLogs[i].rbi = rbi;
      gameLogs[i].rbiPts = rbiPts;
      gameLogs[i].rsPts = rsPts;
      gameLogs[i].rs = rs;
      gameLogs[i].playPts = playPts;
      _logs.push(gameLogs[i]);
    }

    //calculate running totals
    for (let i = 0; i < _logs?.length; i++) {
      if (i === 0) _logs[i].runningTotal = _logs[i]?.totalScore;

      if (i !== 0 && _logs[i - 1] && _logs[i - 1]?.totalScore) {
        _logs[i].runningTotal =
          _logs[i - 1]?.runningTotal + _logs[i]?.totalScore;
      }
    }

    setLogs(_logs);
  }, [gameLogs]);
  return (
    <>
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
          return (<ScoreCard
            collapseId={ind+1}
            showFull={ind == 0 ? true : false}
            sideTitle={type}
            title={name}
            subtitle={
              `${half}`.toLocaleLowerCase() === "t"
                ? `Top ${inning_number}`
                : `Bot ${inning_number}`
            }
            totalPts="8"
            image="/images/2xGold.svg"
            myScore={totalScore}
            clr="#4bb654"
            bgClr="rgba(43, 105, 48, 0.1)"
            runnungTotal={runningTotal}
            runs={{
              rs: rs?rs:0,
              pts: rsPts?rsPts:0,
            }}
            rbi={{
              rbi: rbi?rbi:0,
              pts: rbiPts?rbiPts:0,
            }}
            plays={outcome_id}
            pts={playPts}
            hasPlay={play !== null}
          />)
        }) 
      ): (<>No Data</>)}
      
      <PoweredBy />

      <SwingAway />
    </>
  );
};

export default ScoreDetails;
