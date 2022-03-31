import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import * as mlbActions from "../../actions/MLBActions";
import * as nflActions from "../../actions/NFLActions";
import * as nhlActions from "../../actions/NHLActions";
import classes from "./index.module.scss";
import Replace from "../../icons/Replace";
import XPIcon from "../../icons/XPIcon";
import Challenge from "../../icons/Challenge";
import ChallengePopUp from "../ChallengePopup";
import StarPower from "../../assets/star_power.png";
import {
  getNumberSuffix,
  hasText,
  removeZeroBeforeDecimalPoint,
} from "../../utility/shared";
import RenderMLBPlayerStats from "./RenderMLBPlayerStats";
import SportsLiveCardFooter from "./SportsLiveCardFooter";
import XP1_5 from "../../icons/XP1_5";
import XP1_5_1 from "../../icons/XP1_5_1";
import XP2Icon from "../../icons/XP2";
import XP2Icon_1 from "../../icons/XP2_1";
import XP3 from "../../icons/XP3";
import XP3_1 from "../../icons/XP3_1";
import ShieldIcon from "../../icons/ShieldIcon";
import MiniStar from "../../assets/mini_star.png";
import Tooltip from "../ToolTip";
import DwallPopUp from "../DwallPopup";
import { Tooltip as ReactStrapToolip } from "reactstrap";
import {
  Tooltip as ReactBootstrapTooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { isEmpty } from "lodash";
import { CONSTANTS } from "../../utility/constants";
import RenderPointsSummary from "./RenderPointsSummary";
import RenderModal from "./RenderModal";
import { CardType } from "./CardType";
import HomeRun from "./HomeRun";
import ActivatedBoost from "./ActivatedBoost";
import NFLFooterStats from "./NFLFooterStats";
import NHLFooterStats from "./NHLFooterStats";
import BaseballStick from "../../icons/BaseballStick";
import Baseball from "../../icons/Baseball";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";

import ClockIcon from "../../assets/icons/nhl/clock.svg";

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];
const NFLSummaryTitles = ["Inning", "Types", "Power", "Pts"];
const NHLSummaryTitles = ["Time", "Type", "Power", "Pts"];

function SportsLiveCard(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showReplaceModal, setReplaceModalState] = useState(false);
  const [showscrollable, setShowscrollable] = useState(true);
  const [playerList, setPlayerList] = useState({});
  const [loadingPlayerList, setLoadingPlayerList] = useState(false);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const history = useHistory();
  const {
    powersAvailable: powersAvailables = []
  } = history?.location?.state || {};
  const dispatch = useDispatch();
  const { data: mlbData = [] } = useSelector((state) => state.mlb);
  const { data: nflData = [] } = useSelector((state) => state.nfl);
  const {
    data: nhlData = [],
    gameID,
    live_clock = "20:00",
    live_period = 1,
    selectedTeam = {},
    match_status = [],
    swappedPlayers = [],
    live_players = []
  } = useSelector((state) => state.nhl);
  const { powersAvailable = [] } = selectedTeam;
  const [tooltipOpen1, setTooltipOpen1] = useState(false);
  const toggle1 = () => setTooltipOpen1(!tooltipOpen1);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const toggle2 = () => setTooltipOpen2(!tooltipOpen2);
  const {
    data = {},
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    starPlayerCount = 0,
    onSelectCard = () => {},
    onChangeXp = (xp, player) => {},
    updateReduxState = (currentPlayer, newPlayer) => {},
    cardType = CardType.MLB,
    isHomeRun = false,
    gameInfo = {},
    pointXpCount = {},
    currentPlayerList = [],
    key = "",
    dataMain = {},
    rightSide = false,
  } = props || {};

  const { player = {}, match = {}, matchId="",xp = {}, score = 0 } = data || {};
  const { xp1 = 0, xp2 = 1, xp3 = 2 } = pointXpCount || {};

  const { live_team_logs = [] } = useSelector((state) => state.nhl);
  const {setNhlEventData=[]}=useSelector((state)=>state.nhl)

  // console.log('live_team_logs ==> ', live_team_logs)

  const { playerActualScore = [], posD1Points = 0,
    posD2Points = 0,
    posXW1Points = 0,
    posXW2Points = 0,
    posXW3Points = 0,
    posCenterPoints = 0,
    posGoaliePoints = 0 } = live_team_logs;   
  const {
    full_name = "",
    positionID = "",
    name = "" || full_name,
    type = "",
    type1 = "",
    primary_position = "",
    fantasyPlayerPosition = "",
    is_starPlayer = false,
    pointsSummary = [],
    totalPts = 0,
    range = "",
    mlb_player_stats = [],
    nfl_player_season_stats = [],
    nhl_player_season_stats = [],
    stats = {},
    boost = {},
    current_team = "",
    player_id = "",
    match_stats = [],
    id:pid = "",
  } = data || {};
  const {
    batting_average = 0,
    earned_runs_average = 0,
    home_runs = 0,
  } = mlb_player_stats[0] || {};


  // const {
  //   games_played = 0,
  //   goals = 0,
  //   assists = 0,
  //   points = 0,
  //   // batting_average = 0,
  //   // earned_runs_average = 0,
  //   // home_runs = 0,
  // } = nhl_player_season_stats[0] || {};

  const {
    pointSystem = {}
  } = dataMain;

  const {
    goalie = {},
    skater = {},
    teamD = {},
  } = pointSystem;

  const {
    goalsAgainst: goalsAgaints = 0,
    save: saves = 0
  } = goalie;

  let {
    goals = 0,
    assists = 0,
    shotsOnGoal = 0,
    shotsAgainst = 0,
    goalsAgainst = 0,
    points = 0,
  } = stats || {};

  const {
    match_id = 0,
    pitch_count = 0,
    walks = 0,
    hits = 0,
    runs = 0,
    runs_batted_in = 0,
    innings_pitched = 0,
    strike_outs = 0,
    plate_appearances = 0,
  } = match_stats?.[0] || {};

  const {
    away: away_team = {},
    home: home_team = {},
    boxscore = [],
    scheduled = "",
    last_updated = "",
    status = "Scheduled"
  } = match || {};
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

//   function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     var a = setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = minutes + ":" + seconds;
//         setShowTimerText("D-Wall • " + minutes + ":" + seconds);

//         if (--timer < 0) {
//             clearInterval(a);
//             setShowTimer(false);
//             setIsDwallActive(false);
//             setShowTimerText("");
//             return;
//         }
//     }, 1000);
// }

  useEffect(() => {
    if (boxscore?.length) {
      setIsMatchOver(false);
    } else {
      setIsMatchOver(true);
    }
  }, [boxscore]);

  useEffect(() => {
    if (compressedView) setSummaryState(false);
  }, [compressedView]);

  const footerTitle = () => {
    if (isEmpty(current_inning_half)) {
      return ``;
    }

    const currentInningHalf = `${current_inning_half}`.toLocaleLowerCase();
    if (currentInningHalf === "b") {
      return `Bot ${current_inning} | ${outs} outs`;
    }

    return `Top ${current_inning} | ${outs} outs`;
  };

  const showMidThird = () => {
    return outs === 3 && `${current_inning_half}`.toLocaleLowerCase() === "t";
  };

  const showEndThird = () => {
    return outs === 3 && `${current_inning_half}`.toLocaleLowerCase() === "b";
  };
  const closeRenderModal = () => {
    setReplaceModalState(false);
  };
  const toggleReplaceModal = useCallback(async () => {
    if (cardType === CardType.MLB) {
      setLoadingPlayerList(true);
      setReplaceModalState(!showReplaceModal);
      const response = await dispatch(mlbActions.mlbData(gameID));

      if (response?.filterdList && response?.filterdList?.length) {
        const _mlbData = [...response?.filterdList];
        const [swapablePlayerData] = _mlbData?.filter(
          (data) => data?.type === `${type}`?.toLocaleLowerCase()
        );

        if (
          swapablePlayerData &&
          swapablePlayerData?.listData &&
          swapablePlayerData?.listData?.length
        ) {
          const _time = moment(scheduled).clone().format("h:mm A");
          const newListData = swapablePlayerData?.listData?.filter(
            (data, index) =>
              `${data?.time}` === _time &&
              data?.playerId !== player_id &&
              currentPlayerList[index]?.player_id !== player_id
          );

          const _dataToRender = {
            type: swapablePlayerData.type,
            listData: newListData,
          };

          setPlayerList(_dataToRender);
        }
      }
      setLoadingPlayerList(false);
    }
    if (cardType === CardType.NFL) {
      setLoadingPlayerList(true);
      setReplaceModalState(!showReplaceModal);
      const response = await dispatch(nflActions.nflData(gameID));

      if (response?.filterdList && response?.filterdList?.length) {
        const _nflData = [...response?.filterdList];
        const [swapablePlayerData] = _nflData?.filter(
          (data) => data?.type === `${type}`?.toLocaleLowerCase()
        );

        if (
          swapablePlayerData &&
          swapablePlayerData?.listData &&
          swapablePlayerData?.listData?.length
        ) {
          const _time = moment(scheduled).clone().format("h:mm A");
          const newListData = swapablePlayerData?.listData?.filter(
            (data, index) =>
              `${data?.time}` === _time &&
              data?.playerId !== player_id &&
              currentPlayerList[index]?.player_id !== player_id
          );

          const _dataToRender = {
            type: swapablePlayerData.type,
            listData: newListData,
          };

          setPlayerList(_dataToRender);
        }
      }
      setLoadingPlayerList(false);
    }
    if (cardType === CardType.NHL) {
      setLoadingPlayerList(true);
      setReplaceModalState(true);
      const response = await dispatch(nhlActions.getFantasyPlayers(gameID));
      // console.log("respodesrrs==>",response);
      if (response?.filterdList && response?.filterdList?.length) {
        const _nhlData = [...response?.filterdList];
        const [swapablePlayerData] = _nhlData?.filter(
          (data) => data?.type === fantasyPlayerPosition?.toLocaleLowerCase()
        );
        if (
          swapablePlayerData &&
          swapablePlayerData?.listData &&
          swapablePlayerData?.listData?.length
        ) {
          const _time = moment(scheduled).clone().format("h:mm A");

          const newListData = swapablePlayerData?.listData?.filter(
            (data, index) => {
              return (
                moment(data?.match?.scheduled).clone().format("h:mm A") == _time
              );
            }
          );
          const _dataToRender = {
            type: swapablePlayerData.type,
            listData: newListData,
          };
          setPlayerList(_dataToRender);
        }
      }
      setLoadingPlayerList(false);
    }
  }, [mlbData, nflData, nhlData]);

  

  function isPowerAvailable(type) {
    let powerss = powersAvailables;
    if (powerss == undefined) {
      powerss = powersAvailable;
    }
    if(powerss == "") powerss = [];
    if (!powerss || powerss === undefined) {
      return 0;
    }
    
    let available = 0;
    if (type === "Swap Player") {
      type = "Swap";
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
    let powerss = powersAvailables;
    if (powerss == undefined) {
      powerss = powersAvailable;
    }
    if(powerss == "") powerss = [];
    if (!powerss || powerss === undefined) {
      return 0;
    }

    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    for (var i = 0; i < powerss.length; i++) {
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
    if (isPowerAvailable(type) == 0) {
      locked = 0;
    }
    // console.log("isPowerAvailabletype", type, powerss, locked);
    return locked;
  }

  const onSwap = async (player,swapPlayer) => {
    console.log("onSwap", player, swapPlayer);
    
    // console.log("swapResponse", swapResponse);
    // console.log("props.swapCount", props.swapCount);
    if (props.swapCount === 0) {
      alert("You cannot swap the players.");
      return;
    }
    const [swapablePlayer] =
      !isEmpty(playerList) &&
      playerList?.listData?.length &&
      playerList?.listData?.filter(
        (player1) =>
          player1?.id === swapPlayer?.id && player1?.match?.id === swapPlayer?.match?.id
      );


    if (swapablePlayer) {
      let payload = {
        gameID: gameID,
        userID: localStorage.getItem('PERSONA_USER_ID'),
        playerID: player?.id,
        swapPlayerID: swapPlayer?.id,
        swapPlayerPositionID: player?.fantasyPlayerPosition + player?.positionID,
        period: live_period,
        timeApplied: live_clock
      }
      let swapResponse = await nhlActions.swapPlayer(payload);
      if(swapResponse.status == 200) {
        updateReduxState(player, swapablePlayer);
        closeRenderModal();
        props.getFantasyTeam();
        //props.useSwap(player, true);
      }
    }
  };

  const isPitching = () => {
    if ((type === "P" || type === "p") && player_id === pitcher?.player_id)
      return true;
    else if (
      (type === "P" || type === "p") &&
      player_id !== pitcher?.player_id &&
      home_team.team_id === pitcher?.current_team
    )
      return true;
  };

  const getStatus = (type) => {
    // console.log("stttttttttt===>",match_status);
    if (
      `${status}`?.toLocaleLowerCase() === "scheduled" &&
      moment().diff(moment(scheduled).format()) < 0
    ) {
      return `${moment(scheduled).format("MMM Do")} - ${moment(
        scheduled
      ).format("hh:mm A")}`;
    } else {
      let getMatchStatusDetails = match_status?.filter(x => x?.id == (type=='nhl'?matchId:match?.id));
      if(getMatchStatusDetails.length > 0)
      {
        let a = getMatchStatusDetails[getMatchStatusDetails.length - 1];
        return a?.status;
      }
      return status;
      // return '';
    }
    // if (
    //   `${status}`?.toLocaleLowerCase() === "closed" ||
    //   `${status}`?.toLocaleLowerCase() === "completed"
    // ) {
    //   return "Game Over";
    // }
    // else if (
    //   (!showEndThird() || !showMidThird()) &&
    //   (type === "P" || type === "p") &&
    //   player_id === pitcher?.player_id
    // ) {
    //   return "Pitching";
    // } else if (
    //   (!showEndThird() || !showMidThird()) &&
    //   (type === "P" || type === "p") &&
    //   !isPitching()
    // ) {
    //   return "Dugout";
    // } else if (
    //   (!showEndThird() || !showMidThird()) &&
    //   player_id === hitter?.player_id &&
    //   hitter
    // ) {
    //   return "Hitting";
    // } else if (
    //   (showEndThird() || showMidThird()) &&
    //   `${status}`.toLocaleUpperCase() === "inprogress"
    // )
    //   return "In Progress";
    // else if (status === "inprogress") return "In Progress";

    return status;
  };

  const isGameOverOrNotStarted = () => {
    return (
      `${status}`?.toLocaleLowerCase() === "scheduled" ||
      getStatus() === "Game Over"
    );
  };

  const getCurrentInningHalf = () => {
    if (isEmpty(current_inning_half)) return null;

    return `${current_inning_half}`.toLocaleLowerCase();
  };

  const showFooterStats = () => {
    if (showMidThird()) {
      return (
        <div className={classes.third_text}>
          <p>Mid {getNumberSuffix(current_inning)}</p>
        </div>
      );
    } else if (showEndThird()) {
      return (
        <div className={classes.third_text}>
          <p>End {getNumberSuffix(current_inning)}</p>
        </div>
      );
    }

    if (type === "P" || (type === "p" && isPitching())) {
      return (
        <RenderMLBPlayerStats
          hitter={hitter}
          pitcher={pitcher}
          type={type}
          baserunner_1={baserunner_1}
          baserunner_2={baserunner_2}
          baserunner_3={baserunner_3}
          baserunner_4={baserunner_4}
          strikes={strikes}
          balls={balls}
          largeView={compressedView || !compressedView}
          batting_average={removeZeroBeforeDecimalPoint(batting_average)}
          showImage={true}
          isPitching={isPitching()}
          // {...props}
        />
      );
    } else if (type !== "P" || type !== "p") {
      return (
        <RenderMLBPlayerStats
          hitter={hitter}
          pitcher={pitcher}
          type={type}
          baserunner_1={baserunner_1}
          baserunner_2={baserunner_2}
          baserunner_3={baserunner_3}
          baserunner_4={baserunner_4}
          strikes={strikes}
          balls={balls}
          largeView={compressedView || !compressedView}
          batting_average={removeZeroBeforeDecimalPoint(batting_average)}
          // {...props}
        />
      );
    }
  };

  const renderXp = () => {
    let svgSize = singleView ? 14 : largeView ? 30 : 30;
    if (xp && xp?.xp === CONSTANTS.XP.xp1_5)
      return <div><div className={classes.point_timer}>2:00</div><XP1_5_1 className={classes.xp_svg} size={svgSize} /></div>;
    else if (xp && xp?.xp === CONSTANTS.XP.xp2)
      return  <div><div className={classes.point_timer}>2:00</div><XP2Icon_1 className={classes.xp_svg} size={svgSize} /></div>;
    else if (xp && xp?.xp === CONSTANTS.XP.xp3)
      return  <div><div className={classes.point_timer}>2:00</div><XP3_1 className={classes.xp_svg} size={svgSize} /></div>;

    if (!singleView && cardType !== CardType.NHL) {
      return <><div id="times" style={{width: "100%", color: "#8cc2ff"}}>&nbsp;</div><XPIcon size={svgSize} /></>;
    } else if (!singleView && cardType === CardType.NHL) {
      if (type === "G") {
        return <ShieldIcon size={svgSize} />;
      } else {
        return <><div id="times" style={{fontSize:13, fontWeight: 300}}>&nbsp;</div><XPIcon size={svgSize} /></>;
      }
    }

    return null;
  };

  const RenderStarPower = ({}) => {
    return (
      <>
        {is_starPlayer && (
          <img
            className={`${classes.star_power} ${
              singleView && classes.mini_star
            }`}
            src={singleView ? MiniStar : StarPower}
            alt=""
          />
        )}
      </>
    );
  };

  const RenderXpToolTip = () => (
    <div className={classes.stat_xp}>
      {cardType === CardType.MLB ? (
        <div
          className={classes.stat_xp_mlbr}
          onClick={() => onChangeXp(0, data)}
        >
          <XPIcon
            className={{ opacity: 0.1 }}
            size={singleView ? 14 : largeView ? 28 : 24}
          />
        </div>
      ) : null}

      {cardType === CardType.NFL ? (
        <div
          className={classes.stat_xp_mlbr}
          onClick={() => onChangeXp(0, data)}
        >
          <XPIcon
            className={{ opacity: 0.1 }}
            size={singleView ? 14 : largeView ? 28 : 24}
          />
        </div>
      ) : null}

      {cardType === CardType.NHL ? (
        <>
          {fantasyPlayerPosition === "G" ? (
            <div
              className={classes.stat_xp_mlbr}
              // onClick={() => onChangeXp(0, data)}
            >
              <div className={classes.state_g_dwall}>
              {/* <ShieldIcon
                className={{ opacity: 0.1 }}
                size={singleView ? 14 : largeView ? 30 : 30}
              /> */}
              {isPowerAvailable("D-Wall") === 0 ?
                  <div style={{
                    opacity: 0.5
                  }}><ShieldIcon
                  size={30}
                  // size={largeView ? 28 : 24}
                /></div>
                :
              isPowerLocked("D-Wall") === 1 ? (
                <Tooltip
                  toolTipContent={
                    <div className={classes.xp_icons}>
                      {isPowerLocked("D-Wall") === 1 ? (
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <p
                            style={{
                              paddingTop: "1px",
                              paddingRight: "2px",
                              paddingLeft: "5px",
                            }}
                          >
                            Share to unlock:
                          </p>
                          <div>
                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                              style={{ marginRight: 10, marginBottom: 5 }}
                            >
                              <FacebookIcon />
                            </button>

                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                            >
                              <TwitterIcon />
                            </button>
                          </div>
                        </div>
                      ) : isPowerLocked("D-Wall") === 1 ? (
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <p
                            style={{
                              paddingTop: "1px",
                              paddingRight: "2px",
                              paddingLeft: "5px",
                            }}
                          >
                            Share to unlock:
                          </p>
                          <div>
                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                            >
                              <FacebookIcon />
                            </button>

                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                            >
                              <TwitterIcon />
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  }
                >
                  <button
                    className={classes.team_d_icon_button}
                    style={{ background: "none", border: 0 }}
                  >
                    <ShieldIcon
                      size={30}
                      // size={largeView ? 28 : 24}
                    />
                  </button>
                </Tooltip>
              ) : (
                <DwallPopUp
                  component={({ showPopUp }) => (
                    <button
                      onClick={showPopUp}
                      style={
                        isGameOverOrNotStarted()
                          ? { opacity: 0.3, pointerEvents: "none" }
                          : {}
                      }
                      style={{ background: "none", border: 0 }}
                    >
                      <ShieldIcon
                        size={30}
                        // size={largeView ? 28 : 24}
                      />
                    </button>
                  )}
                  dwall={props.dwall}
                  useDwall={props.useDwall}
                />
              )}
           </div>
            {isPowerAvailable("Challenge") === 0 ? <div style={{opacity: 0.5}}>
            <Challenge size={largeView ? 28 : 30} />
            </div> :
            isPowerLocked("Challenge") === 1 ? (
              <Tooltip
                toolTipContent={
                  <div className={classes.xp_icons}>
                    {isPowerLocked("Challenge") === 1 ? (
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <p
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-evenly",
                            paddingTop: "1px",
                              paddingRight: "2px",
                              paddingLeft: "5px",
                          }}
                        >
                         
                            Share to unlock:
                          </p>
                          <div>
                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                              style={{ marginRight: 10, marginBottom: 5 }}
                            >
                              <FacebookIcon />
                            </button>

                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                            >
                              <TwitterIcon />
                            </button>
                          </div>
                        </div>
                      ) : isPowerLocked("Challenge") === 1 ? (
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <p
                            style={{
                              paddingTop: "1px",
                              paddingRight: "2px",
                              paddingLeft: "5px",
                            }}
                          >
                            Share to unlock:
                          </p>
                          <div>
                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                            >
                              <FacebookIcon />
                            </button>

                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                            >
                              <TwitterIcon />
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  }
                  disabled={isGameOverOrNotStarted()}
                >
                  <button className={classes.team_d_icon_button}>
                    <Challenge
                      size={30}
                      // size={largeView ? 28 : 24}
                    />
                  </button>
                </Tooltip>
              ) : props.challenge == 0 ? (
                <div style={{ opacity: 0.5 }}>
                  <ChallengePopUp
                    component={({ showPopUp }) => (
                      <button style={{ background: "none", border: 0 }}>
                        <Challenge size={largeView ? 28 : 30} />
                      </button>
                    )}
                    challenge={props.challenge}
                    useChallenge={props.useChallenge}
                  />
                </div>
              ) : (
                <ChallengePopUp
                  component={({ showPopUp }) => (
                    <button
                      onClick={showPopUp}
                      style={
                        isGameOverOrNotStarted()
                          ? { opacity: 0.3, pointerEvents: "none" }
                          : {}
                      }
                      style={{ background: "none", border: 0 }}
                    >
                      <Challenge size={largeView ? 30 : 30} />
                    </button>
                  )}
                  challenge={props.challenge}
                  useChallenge={props.useChallenge}
                />
              )}
            </div>
            
          ) : null}

          {fantasyPlayerPosition !== "G" ? (
            // <div
            //   className={classes.stat_xp_mlbr}
            //   onClick={() => onChangeXp(0, data)}
            // >
            //   <XPIcon
            //     className={{ opacity: 0.1 }}
            //     size={singleView ? 14 : largeView ? 28 : 24}
            //   />
            // </div>
            <>
              {xp?.xp == CONSTANTS.XP.xp1_5 ||
              xp?.xp == CONSTANTS.XP.xp2 ||
              xp?.xp == CONSTANTS.XP.xp3 ? (
                renderXp()
              ) : (
                isPowerAvailable("Point Booster") === 0 ?
                  <div style={{
                    opacity: 0.5
                  }}><XPIcon
                    size={30}
                  /></div>
                :
                <Tooltip
                  disabled={false}
                  toolTipContent={
                    <div className={classes.xp_icons}>
                      {isPowerLocked("Point Booster") === 1 ? (
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <p
                            style={{
                              paddingTop: "1px",
                              paddingRight: "2px",
                              paddingLeft: "5px",
                            }}
                          >
                            Share to unlock:
                          </p>
                          <div>
                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                            >
                              <FacebookIcon />
                            </button>

                            <button
                              onClick={() => {
                                var left = window.screen.width / 2 - 600 / 2,
                                  top = window.screen.height / 2 - 600 / 2;
                                window.open(
                                  `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                                  "targetWindow",
                                  "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                    left +
                                    ",top=" +
                                    top
                                );
                              }}
                            >
                              <TwitterIcon />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div
                            className={`${classes.xp_block} ${
                              xp1 <= 0 && classes.disabled
                            }`}
                          >
                            <XP1_5
                              onClick={() =>
                                onChangeXp(CONSTANTS.XP.xp1_5, data)
                              }
                            />
                            <p>
                              <span>{xp1}</span> left
                            </p>
                          </div>
                          <div
                            className={`${classes.xp_block} ${
                              xp2 <= 0 && classes.disabled
                            }`}
                          >
                            <XP2Icon
                              onClick={() => onChangeXp(CONSTANTS.XP.xp2, data)}
                            />
                            <p>
                              <span>{xp2}</span> left
                            </p>
                          </div>
                          <div
                            className={`${classes.xp_block} ${
                              xp3 <= 0 && classes.disabled
                            }`}
                          >
                            <XP3
                              onClick={() => onChangeXp(CONSTANTS.XP.xp3, data)}
                            />
                            <p>
                              <span>{xp3}</span> left
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  }
                >
                  {renderXp()}
                </Tooltip>
              )}
            </>
          ) : null}
        </>
      ) : null}

      {cardType === CardType.MLBR ? (
        <>
          {xp?.xp == CONSTANTS.XP.xp1_5 ||
          xp?.xp == CONSTANTS.XP.xp2 ||
          xp?.xp == CONSTANTS.XP.xp3 ? (
            renderXp()
          ) : (
            <Tooltip
              disabled={isGameOverOrNotStarted()}
              toolTipContent={
                <div className={classes.xp_icons}>
                  {isPowerAvailable("Point Booster") === 0 ? (
                    <div>Not Available</div>
                  ) : isPowerLocked("Point Booster") === 1 ? (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <p
                        style={{
                          paddingTop: "1px",
                          paddingRight: "2px",
                          paddingLeft: "5px",
                        }}
                      >
                        Share to unlock:
                      </p>
                      <div>
                        <button
                          onClick={() => {
                            var left = window.screen.width / 2 - 600 / 2,
                              top = window.screen.height / 2 - 600 / 2;
                            window.open(
                              `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                              "targetWindow",
                              "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                left +
                                ",top=" +
                                top
                            );
                          }}
                        >
                          <FacebookIcon />
                        </button>

                        <button
                          onClick={() => {
                            var left = window.screen.width / 2 - 600 / 2,
                              top = window.screen.height / 2 - 600 / 2;
                            window.open(
                              `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                              "targetWindow",
                              "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                left +
                                ",top=" +
                                top
                            );
                          }}
                        >
                          <TwitterIcon />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`${classes.xp_block} ${
                          xp1 <= 0 && classes.disabled
                        }`}
                      >
                        <XP1_5
                          onClick={() => onChangeXp(CONSTANTS.XP.xp1_5, data)}
                        />
                        <p>
                          <span>{xp1}</span> left
                        </p>
                      </div>
                      <div
                        className={`${classes.xp_block} ${
                          xp2 <= 0 && classes.disabled
                        }`}
                      >
                        <XP2Icon
                          onClick={() => onChangeXp(CONSTANTS.XP.xp2, data)}
                        />
                        <p>
                          <span>{xp2}</span> left
                        </p>
                      </div>
                      <div
                        className={`${classes.xp_block} ${
                          xp3 <= 0 && classes.disabled
                        }`}
                      >
                        <XP3
                          onClick={() => onChangeXp(CONSTANTS.XP.xp3, data)}
                        />
                        <p>
                          <span>{xp3}</span> left
                        </p>
                      </div>
                    </>
                  )}
                </div>
              }
            >
              {renderXp()}
            </Tooltip>
          )}
        </>
      ) : null}
    </div>
  );

  const RenderStatPoints = ({}) => (
    <div className={classes.stat_points}>
      <div className={classes.stat_points_container}>
        <p
          className={`${classes.stat_points_title} ${
            largeView && classes.large_view
          }`}
          id={`TooltipPGP1_${key}`}
        >
          <OverlayTrigger
            placement={"top"}
            overlay={
              <ReactBootstrapTooltip>
                Point Generating Plays
              </ReactBootstrapTooltip>
            }
          >
            <span>PGPs</span>
          </OverlayTrigger>
        </p>

        <div className={`${classes.stat} ${largeView && classes.large_view}`}>
          {type === "P" ? (
            <>
              <p className={`${classes.p} ${largeView && classes.large_view}`}>
                IP:{" "}
                {match_id === data.match_id
                  ? parseFloat(innings_pitched).toFixed(1)
                  : 0}{" "}
                | PC: {match_id === data.match_id ? pitch_count : 0}
              </p>
              <p className={`${classes.p} ${largeView && classes.large_view}`}>
                K:{match_id === data.match_id ? strike_outs : 0} | BB:
                {match_id === data.match_id ? walks : 0}
              </p>
            </>
          ) : (
            <>
              <p>
                {removeZeroBeforeDecimalPoint(batting_average)} |{" "}
                {match_id === data.match_id ? hits : 0}/
                {match_id === data.match_id ? plate_appearances : 0}
              </p>
              <p>
                RBI: {match_id === data.match_id ? runs_batted_in : 0} | R:{" "}
                {match_id === data.match_id ? runs : 0}
              </p>
            </>
          )}
        </div>
      </div>

      <div className={classes.stat_points_container}>
        <p
          className={`${classes.stat_points_title} ${
            largeView && classes.large_view
          }`}
        >
          Points
        </p>
        <div
          className={`${classes.points} ${largeView && classes.large_view} ${
            largeView && classes.large_view_d
          }`}
        >
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {score}
          </p>
          {xp1 == 0 && xp2 == 0 && xp3 == 0 ? (
            <div style={{ opacity: 1 }}>{renderXp()}</div>
          ) : (
            <RenderXpToolTip />
          )}
        </div>
      </div>
    </div>
  );

  const RenderNHLStatPoints = ({}) => (
    <div className={classes.stat_points}>
      <div
        className={classes.stat_points_container}
        style={{ position: "relative" }}
      >
        <div className={`${classes.stat} ${largeView && classes.large_view}`}>
          <p
            className={`${classes.stat_points_title} ${
              largeView && classes.large_view
            }`}
            id={`TooltipPGP2_${key}`}
          >
            <OverlayTrigger
              placement={"top"}
              overlay={
                <ReactBootstrapTooltip>
                  Point Generating Plays
                </ReactBootstrapTooltip>
              }
            >
              <span>PGPs</span>
            </OverlayTrigger>
          </p>
          {fantasyPlayerPosition == "G" ? (
            <p className={`${classes.p} ${largeView && classes.large_view}`}>
              
              Saves: {playerActualScore?.find(x => x.playerID == pid)?playerActualScore?.find(x => x.playerID == pid)?.saves : "0"}
              <br />
              GA: {Math.abs(playerActualScore?.find(x => x.playerID == pid)?playerActualScore?.find(x => x.playerID == pid)?.goalsAgainst : "")}
            </p>
          ) : (
          
            <p className={`${classes.p} ${largeView && classes.large_view}`}>
              {/* G: {goals} | A: {assists} */}
              G: {playerActualScore?.find(x => x.playerID == player?.id)?playerActualScore?.find(x => x.playerID == player?.id)?.goals+playerActualScore?.find(x => x.playerID == player?.id)?.overTimeGoals+playerActualScore?.find(x => x.playerID == player?.id)?.shortHandedGoals : "0"} | A: {playerActualScore?.find(x => x.playerID == player?.id)?playerActualScore?.find(x => x.playerID == player?.id)?.assists:"0"}
              <br />
              {/* SOG: {shotsOnGoal} */}
              SOG: {playerActualScore?.find(x => x.playerID ==  player?.id)?playerActualScore?.find(x => x.playerID ==  player?.id)?.shotsOnGoal:"0"}
            </p>
          )} 
          <div
            style={{
              position: "absolute",
              right: 8,
              top: "35%",
              transform: "translate(0, -36%)",
              zIndex: 1,
            }}
          >
            {xp1 == 0 && xp2 == 0 && xp3 == 0 ? (
              <div style={{ opacity: 0.5 }}>{renderXp()}</div>
            ) : (
              <RenderXpToolTip />
            )}
          </div>
        </div>
      </div>

      <div className={classes.stat_points_container}>
        <div
          className={`${classes.points} ${largeView && classes.large_view} ${
            largeView && classes.large_view_d
          }`}
        >
          <p
            className={`${classes.points_points_title} ${
              largeView && classes.large_view
            }`}
          >
            Points
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              minHeight: 28,
            }}
          >
            <p className={`${classes.p} ${largeView && classes.large_view}`}>
              {fantasyPlayerPosition === "C" ? posCenterPoints : null}
              {fantasyPlayerPosition === "G" ? posGoaliePoints : null}
              {fantasyPlayerPosition === "D" && positionID === 1
                ? posD1Points
                : null}
              {fantasyPlayerPosition === "D" && positionID === 2
                ? posD2Points
                : null}
              {fantasyPlayerPosition === "XW" && positionID === 1
                ? posXW1Points
                : null}
              {fantasyPlayerPosition === "XW" && positionID === 2
                ? posXW2Points
                : null}
              {fantasyPlayerPosition === "XW" && positionID === 3
                ? posXW3Points
                : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const RenderStatus = ({ success = false, danger = false }) => (
    <p
      className={`${classes.container_status} ${
        singleView ? classes.margin_top_bottom_8 : classes.margin_top_bottom_16
      } ${largeView && classes.large_view}`}
    >
      <span
        className={`
        ${largeView && classes.large_view}
        ${
          success || getStatus() === "Pitching" || getStatus() === "Hitting"
            ? classes.success
            : ""
        } 
        ${danger && classes.danger}`}
      >
        {getStatus("nhl")=='inprogress' && setNhlEventData?.length==0?"starting soon":getStatus("nhl")}
      </span>
    </p>
  );

  const RenderMlbRechargeStatus = () => {
    if (isHomeRun) {
      return <HomeRun largeView={largeView} />;
    }

    if (!isEmpty(boost)) {
      return <ActivatedBoost largeView={largeView} boost={boost} />;
    }

    return (
      <RenderStatus
        success={
          hasText(status, "batting") ||
          hasText(status, "pitching") ||
          hasText(status, "hitting")
        }
        danger={hasText(status, "deck")}
      />
    );
  };

  const RenderHeader = () => (
    <div className={classes.card_header}>
      <p className={classes.card_header_title}>
        <span className={classes.border} />
        {cardType === CardType.MLB ? (
          <span>
            {type === "XB" || type === "OF" ? type1 : type}:
            <span className={classes.card_header_points}>14 Pts</span>
          </span>
        ) : null}

        {cardType === CardType.NFL ? (
          <span>
            {type === "RB" || type === "WR" ? type1 : type}:
            <span className={classes.card_header_points}>14 Pts</span>
          </span>
        ) : null}

        {cardType === CardType.NHL ? (
          <span>
            {fantasyPlayerPosition === "XW" || type === "D"
              ? fantasyPlayerPosition + positionID 
              : fantasyPlayerPosition}
            :
            <span className={classes.card_header_points}>
              {fantasyPlayerPosition === "C" ? posCenterPoints : null}
              {fantasyPlayerPosition === "G" ? posGoaliePoints : null}
              {fantasyPlayerPosition === "D" && positionID === 1
                ? posD1Points
                : null}
              {fantasyPlayerPosition === "D" && positionID === 2
                ? posD2Points
                : null}
              {fantasyPlayerPosition === "XW" && positionID === 1
                ? posXW1Points
                : null}
              {fantasyPlayerPosition === "XW" && positionID === 2
                ? posXW2Points
                : null}
              {fantasyPlayerPosition === "XW" && positionID === 3
                ? posXW3Points
                : null}{" "}
              Pts
            </span>
          </span>
        ) : null}
      </p>
    </div>
  );

  const RenderSingleViewStats = () => (
    <div className={classes.single_view_state}>
      <p className={classes.single_view_cat}>
        {fantasyPlayerPosition === "XW" || type === "D"
          ? fantasyPlayerPosition + positionID
          : fantasyPlayerPosition}
      </p>
      <div>
        <p className={classes.single_view_pts}>
          Pts:&nbsp;
          <span className={xp && xp?.xp && classes.active}>
            {fantasyPlayerPosition === "C" ? posCenterPoints : null}
            {fantasyPlayerPosition === "G" ? posGoaliePoints : null}
            {fantasyPlayerPosition === "D" && positionID === 1
              ? posD1Points
              : null}
            {fantasyPlayerPosition === "D" && positionID === 2
              ? posD2Points
              : null}
            {fantasyPlayerPosition === "XW" && positionID === 1
              ? posXW1Points
              : null}
            {fantasyPlayerPosition === "XW" && positionID === 2
              ? posXW2Points
              : null}
            {fantasyPlayerPosition === "XW" && positionID === 3
              ? posXW3Points
              : null}
          </span>
          {renderXp()}
        </p>
      </div>
      <div className={classes.single_footer_stats_row}>
        <img src={ClockIcon} alt="Hockey Icon" width={12} height={14} />
        <p>
          P{live_period} | {live_clock}
        </p>
      </div>
    </div>
  );

  const RenderTeamDHeader = () =>
    !singleView && <span className={classes.teamd_range}>{range}</span>;

  const RenderHeaderIcons = () => (
    <>
      {!showSummary && (
        <>
          {isPowerAvailable("Swap") === 0 ? (
            <div style={{ opacity: 0.5 }}>
              <Replace
                size={singleView ? 23 : 22}
              />
            </div>
          ) : (
            <Replace
              size={singleView ? 23 : 28}
              onClick={toggleReplaceModal}
              className={isGameOverOrNotStarted()}
            />
          )}
        </>
      )}
    </>
  );

  return (
    <>
      <div
        key={key}
        className={`${classes.card_wrapper} ${
          singleView ? classes.singleViewCardWrapper : ""
        }`}
        style={{ minWidth: props?.rightSide ? 280 : 245 }}
      >
        {!singleView && <RenderHeader />}

        <div
          className={`${classes.card_container} ${
            !compressedView && !singleView && classes.height_284
          }
          ${largeView && !compressedView && classes.height_340}
          ${singleView && classes.single_view_hover}
          ${active && classes.active}
        `}
          onClick={() => onSelectCard(data)}
        >
          <RenderStarPower />
          <div className={classes.container_header}>
            <p
              className={`${classes.container_title} ${
                largeView && classes.large_view
              }`}
            >
              {name} <RenderTeamDHeader />
            </p>
            <RenderHeaderIcons />
          </div>
          {!singleView && <div className={classes.divider} />}

          <div className={classes.container_body}>
            {!showSummary ? (
              <>
                {!singleView && cardType === CardType.MLB ? (
                  <RenderStatPoints />
                ) : null}

                {!singleView && cardType === CardType.NFL ? (
                  <RenderNHLStatPoints />
                ) : null}

                {!singleView && cardType === CardType.NHL ? (
                  <RenderNHLStatPoints />
                ) : null}

                {!compressedView && (
                  <>
                    {singleView && <RenderSingleViewStats />}
                    {cardType === CardType.MLBR ? (
                      <RenderMlbRechargeStatus />
                    ) : null}

                    {getStatus() !== "Game Over" &&
                    cardType === CardType.MLB &&
                    !singleView ? (
                      <>
                        (
                        <RenderStatus
                          success={
                            hasText(status, "batting") ||
                            hasText(status, "pitching") ||
                            hasText(status, "hitting")
                          }
                          danger={hasText(status, "deck")}
                        />
                        ){showFooterStats()}
                      </>
                    ) : null}

                    {getStatus() !== "Game Over" &&
                    cardType === CardType.NFL &&
                    !singleView ? (
                      <>
                        <RenderStatus
                          success={
                            hasText(status, "batting") ||
                            hasText(status, "pitching") ||
                            hasText(status, "hitting")
                          }
                          danger={hasText(status, "deck")}
                        />
                        <NFLFooterStats />
                      </>
                    ) : null}

                    {getStatus() !== "Game Over" &&
                    cardType === CardType.NHL ? (
                      <>
                        <RenderStatus
                          success={
                            hasText(status, "batting") ||
                            hasText(status, "pitching") ||
                            hasText(status, "hitting")
                          }
                          danger={hasText(status, "deck")}
                        />
                        {!singleView ? (
                          <NHLFooterStats player={rightSide ? data : player} matchEvents={props.matchEvents} cardType={cardType}/>
                        ) : null}
                      </>
                    ) : null}
                  </>
                )}
              </>
            ) : (
              <>
                {cardType === CardType.MLB ? (
                  <RenderPointsSummary
                    titleList={MLBSummaryTitles}
                    tableList={pointsSummary}
                    totalPoints={totalPts}
                    largeView={largeView}
                  />
                ) : null}

                {cardType === CardType.NFL ? (
                  <RenderPointsSummary
                    titleList={NFLSummaryTitles}
                    tableList={pointsSummary}
                    totalPoints={totalPts}
                    largeView={largeView}
                  />
                ) : null}

                {cardType === CardType.NHL ? (
                  <RenderPointsSummary
                    titleList={NHLSummaryTitles}
                    tableList={pointsSummary}
                    totalPoints={totalPts}
                    largeView={largeView}
                  />
                ) : null}
              </>
            )}
          </div>

          {!compressedView &&
            !singleView &&
            getStatus() !== "Game Over" &&
            !showEndThird() &&
            !showMidThird() && (
              <SportsLiveCardFooter
                showSummary={showSummary}
                onClickBack={() => setSummaryState(false)}
                onClickDetails={() => setSummaryState(true)}
                title={footerTitle()}
                largeView={largeView}
              />
            )}
        </div>
      </div>
      <RenderModal
        player={player}
        visible={showReplaceModal}
        onClose={closeRenderModal}
        onSwap={onSwap}
        scrollable={showscrollable}
        playerList={playerList}
        starPlayerCount={starPlayerCount}
        loading={loadingPlayerList}
        dataMain={dataMain}
        pageType="nhl"
      />
    </>
  );
}

SportsLiveCard.propTypes = {
  data: PropTypes.object,
  compressedView: PropTypes.bool,
  largeView: PropTypes.bool,
  singleView: PropTypes.bool,
  isHomeRun: PropTypes.bool,
  boost: PropTypes.object,
  cardType: PropTypes.string,
  starPlayerCount: PropTypes.number,
  playerList: PropTypes.array,
  active: PropTypes.bool,
  onSelectCard: PropTypes.func,
  onChangeXp: PropTypes.func,
  updateReduxState: PropTypes.func,
  gameInfo: PropTypes.object,
  pointXpCount: PropTypes.object,
  currentPlayerList: PropTypes.array,
};

export default SportsLiveCard;
