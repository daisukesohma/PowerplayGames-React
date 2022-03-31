import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import * as MLBActions from "../../actions/MLBActions";
import * as NHLActions from "../../actions/NHLActions";
import classes from "./index.module.scss";

import SidebarBtnIcon from "../../assets/nhl-sidebar-icon.png";
import RankIcon from "../../icons/Ranks/RankIcon";
import { redirectTo, setNumberComma } from "../../utility/shared";
import { useDispatch, useSelector } from "react-redux";
import LiveStandings from "../LiveStandings";

function RankCard(props) {
  const [showModal, setModalState] = useState(false);
  const [currentWinnings, setCurrentWinnings] = useState(0);
  const [leader, setLeader] = useState(0);
  const [currentRank, setCurrentRank] = useState(0);
  const dispatch = useDispatch();
  const {
    showButton = true,
    ranks = {},
    onClickStandings = () => {},
    sportsType = "nhl",
  } = props || {};
  const { ranking = 0, score = 0, game_id = 0, team_id = 0 } = ranks || {};
  const { gameID, liveStandings = [] } = useSelector((state) => state.nhl);
  const { user_id } = useSelector((state) => state.auth.user);
  const gameStatus=props?.location?.state?.gameStatus
  React.useEffect(() => {
    console.log("liveStandings", liveStandings);
    let leaderScore=0;
    if(liveStandings.length > 0) {
      liveStandings.forEach((element,index) => {
        if(element?._id?.userID == user_id) {
          setCurrentRank(element?.rank);
          setCurrentWinnings(element?.prize);
        }
        // leaderScore=liveStandings[index]?.totalValue
         leaderScore = Math.max(...liveStandings.map(o=>o.totalValue));   
        setLeader(leaderScore);
      });
    }
  }, [liveStandings]);

  React.useEffect(() => {
    if (gameID) {
      onClickStandings();
    }
  }, [gameID]);

  const toggleLiveStandingModal = async () => {
    onClickStandings();
    if (!showModal) {
      setModalState(!showModal);
    }
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <div className={classes.sidebar_header}>
      <div className={classes.header_rank}>
        <p>
          <div className={classes.live_dot} /> Live Rank
          <div className={classes.separater} />
          <strong>{currentRank}</strong>
        </p>
      </div>

      <div className={classes.sidebar_header_content}>
        <div>
          <div className={classes.sidebar_header_left}>
            <div className={classes.sidebar_header_1}>
              <p>Currently Winning:</p>
              <p
                className={`${classes.sidebar_header_p2} ${classes.sidebar_header_p2_1}`}
              >
                ${gameStatus!=="Activated"?(setNumberComma(currentWinnings ? (currentWinnings).toFixed(2) : 0)):0}
              </p>
            </div>
            <div className={classes.sidebar_header_1}>
              <p className={classes.sidebar_header_p1}>Leader's Score:</p>
              <p
                className={`${classes.sidebar_header_p1} ${classes.sidebar_header_p1_1}`}
                style={{ fontSize: 24, fontFamily: "Teko" }}
              >
                {" "}
                {leader}{" "}
              </p>
            </div>
            {/* {props?.currentWin && (
              <div className={classes.sidebar_header_1}>
                <p>Currently Winning:</p>
                <p
                  className={`${classes.sidebar_header_p2} ${classes.sidebar_header_p2_1}`}
                >
                  ${setNumberComma(props?.currentWin)}
                </p>
              </div>
            )} */}
            {/* <div className={classes.sidebar_header_2}>
              <div className={classes.sidebar_left}>
                <div>
                  <p>My Score:</p>
                  <p className={classes.sidebar_header_p2}>{score}</p>
                </div>
                <div>
                  <p className={classes.sidebar_header_p1}>Leader:</p>
                  <p
                    className={`${classes.sidebar_header_p1} ${classes.sidebar_header_p1_1}`}
                  >
                    66
                  </p>
                </div>
              </div>
               <RankIcon rank={ranking} /> 
            </div> */}
          </div>
        </div>
      </div>

      {showButton && (
        <button onClick={toggleLiveStandingModal}>
          <img
            src={SidebarBtnIcon}
            width={19}
            style={{ marginRight: "10px" }}
          />{" "}
          See Full Standings
        </button>
      )}

      <LiveStandings
        gameStatus={props?.location?.state?.gameStatus}
        isInProgressGame={true}
        visible={showModal}
        onClose={closeModal}
        liveStandingData={liveStandings}
        prizePool={props.prizePool}
      />
    </div>
  );
}

RankCard.propTypes = {
  showButton: PropTypes.bool,
  currentWin: PropTypes.number,
  ranks: PropTypes.number,
};

export default RankCard;
