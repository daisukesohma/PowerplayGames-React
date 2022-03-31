import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import * as $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./index.module.scss";
import {
  getNumberSuffix,
  hasText,
  removeZeroBeforeDecimalPoint,
} from "../../utility/shared";
import RenderMLBPlayerStats from "./RenderMLBPlayerStats";
import SportsLiveCardFooter from "./SportsLiveCardFooter";
import ChallengeIcon from "../../assets/icons/powers/challenge-power.svg";
import DwallIcon from "../../assets/icons/powers/d-wall-power.svg";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import ShieldIconGrey from "../../icons/group-2@2x.png";
import Challenge from "../../icons/Challenge";
import { isEmpty } from "lodash";
import RenderPointsSummary from "./RenderPointsSummary";
import SportsLiveCardOverlay from "./SportsLiveCardOverlay";
import { CardType } from "./CardType";
import ChallengePopUp from "../ChallengePopup";
import DwallPopUp from "../DwallPopup";
import { nodeName } from "jquery";
import Tooltip from "../ToolTip";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import NHLFooterStats from "./NHLFooterStats";

import ClockIcon from "../../assets/icons/nhl/clock.svg";
import MiniStar from "../../assets/mini_star.png";
import StarPower from "../../assets/star_power.png";

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];
const NFLSummaryTitles = ["Inning", "Types", "Power", "Pts"];
const NHLSummaryTitles = ["Time", "Type", "Power", "Pts"];

const text = process.env.REACT_APP_POST_SHARING_TEXT;

function SportsLiveCardTeamD(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showVideoOverlay, setVideoOverlayState] = useState(true);

  const { teamDPts = 0, match_status = [] } = useSelector((state) => state.nhl);
  const [showPleaseWait, setShowPleaseWait] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showTimerText, setShowTimerText] = useState("");
  const [isDwallActive, setIsDwallActive] = useState(false);
  const {
    data = {},
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    onSelectCard = () => {},
    cardType = CardType.MLB,
    key = "",
    powers = []
  } = props || {};
  const { live_team_logs = [] } = useSelector((state) => state.nhl);
  const { teamDActual = [] } = live_team_logs;  

  const history = useHistory();
  const {
    powersAvailable: powersAvailables = []
  } = history?.location?.state || {};

  const {  selectedTeam = {} } = useSelector((state) => state.nhl);
  const { powersAvailable = [] } = selectedTeam;
  // NHL TeamD
  const { stats } = data || {};
  const {
    savesAgainst = 0,
    goalsAgainst = 0,
    points = 0,
    status = "scheduled",
  } = stats || {};
  const { live_clock = "20:00", live_period } = useSelector(
    (state) => state.nhl
  );

  const {
    name = "",
    type = "",
    match_id = "",
    match = {},
    team_d_mlb_team,
    team_d_nfl_team,
    team_d_nhl_team,
    score = 0,
    is_starTeamD = false
  } = data || {};

  let team = {};
  if (team_d_mlb_team) {
    team = team_d_mlb_team;
  } else if (team_d_nfl_team) {
    team = team_d_nfl_team;
  } else if (team_d_nhl_team) {
    team = team_d_nhl_team;
  }

  const {
    away_team = {},
    home_team = {},
    // status = "inprogress",
    date_time = "",
    boxscore = [],
    scheduled = "",
  } = match || {};

  const {
    playerStats = {},
    pointsSummary = [],
    totalPts = 0,
    range = "",
    xp = {},
    mlb_team_stats = [],
    nfl_team_stats = [],
    nhl_team_stats = [],
    team_id,
    team_match_stats = [],
  } = team || {};

  const {
    data_id = 0,
    hr_against = 0,
    // match_id = 0,
    runs_against = 0,
    // team_id = 0,
  } = team_match_stats[0] || {};

  const {
    abbr = 0,
    loses = 0,
    season_id = 0,
    stats_id = 0,
    status: teamStatus = null,
    wins: teamWins = 0,
  } = mlb_team_stats[0] || {};

  const {
    games_played = 0,
    goals = 0,
    assists = 0,
    // points = 0,
  } = nhl_team_stats[0] || {};

  const {
    hits = 0,
    doubles = 0,
    triples = 0,
    home_runs = 0,
    stolen_bases = 0,
    runs_batted_in = 0,
    average_runs_against = 0,
    batting_average = 0,
    wins = 0,
    losses = 0,
    innings_pitched = 0,
    balls = 0,
    strikes = 0,
    earned_runs_average = 0,
    base_on_balls = 0,
    walks_hits_per_innings_pitched = 0,
    hitter = {},
    pitcher = {},
    outs = 0,
    home_team_runs = 0,
    away_team_runs = 0,
    current_inning = 0,
    current_inning_half = "",
    baserunner_1 = null,
    baserunner_2 = null,
    baserunner_3 = null,
    baserunner_4 = null,
    away_team_id = "",
    home_team_id = "",
  } = boxscore[0] || {};

  const isPowerAvailable = (type) => {
    let powerss = powersAvailables;
    if(powerss == undefined) {
      powerss = powersAvailable;
    }
    if(powerss == "") powerss = [];
    if (powerss) {
      let available = 0;
      if (type === "Swap Player") {
        type = "Swap";
      }
      for (var i = 0; i < powerss.length; i++) {
        if (powerss[i].powerName === type) {
          available = 1;
          break;
        }
      }
      return available;
    }
  };

  useEffect(() => {
    if(showTimer && isDwallActive)
    {
      setTimeout(() => {
        var fiveMinutes = 60 * 2,
        display = $('#times');
        startTimer(fiveMinutes, display);
      }, 2000);
    }
  }, [showTimer, isDwallActive]);

  const isPowerLocked = (type) => {
    let powerss = powersAvailables;
    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (powerss) {
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
    }
    return locked;
  };

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

  const isGameOverOrNotStarted = () => {
    return status === "scheduled" || getStatus() === "Game Over";
  };

  // const getStatus = () => {
  //   if (`${status}`?.toLocaleLowerCase() === "scheduled") {
  //     return `${moment(date_time).format("MMM Do")} - ${moment(
  //       date_time
  //     ).format("hh:mm A")}`;
  //   } else if (
  //     `${status}`?.toLocaleLowerCase() === "closed" ||
  //     `${status}`?.toLocaleLowerCase() === "completed"
  //   ) {
  //     return "Game Over";
  //   } else if (`${status}`.toLocaleUpperCase() === "inprogress")
  //     return "In Progress";
  //     if(showTimer == false){
  //       setShowTimer(true);
  //       return "";
  //     }
  //     else
  //       return status;
  // };

  const getStatus = () => {
    if (
      `${status}`?.toLocaleLowerCase() === "scheduled" &&
      moment().diff(moment(scheduled).format()) < 0
    ) {
      return `${moment(scheduled).format("MMM Do")} - ${moment(
        scheduled
      ).format("hh:mm A")}`;
    } else {
      
      let getMatchStatusDetails = match_status?.filter(x => (x?.home?.id == data?.id || x?.away?.id == data?.id));
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

  const RenderStatPoints = ({}) => (
    <div className={classes.stat_points}>
      <div className={classes.stat_points_container}>
        <p
          className={`${classes.stat_points_title} ${
            largeView && classes.large_view
          }`}
        >
          PGPs
        </p>
        <div className={`${classes.stat} ${largeView && classes.large_view}`}>
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            Runs Against:{match_id === data.match_id ? runs_against : 0} <br />
            HR Against: {match_id === data.match_id ? hr_against : 0}
          </p>
        </div>
      </div>

      <div className={classes.stat_points_container}>
        <p
          className={`${classes.stat_points_title} ${
            largeView && classes.large_view
          }`}
        >
          {xp?.xpVal} Points
        </p>
        <div
          className={`${classes.points} ${classes.team_d_width} ${
            largeView && classes.large_view_d
          }`}
        >
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {score}
          </p>
        </div>
      </div>
      <div
        className={`${classes.team_d_icons} ${largeView && classes.large_view}`}
      >
        {cardType === CardType.MLBR ? (
          <>
            {isPowerAvailable("Challenge") === 0 ||
            isPowerLocked("Challenge") === 1 ? (
              <Tooltip
                disabled={isGameOverOrNotStarted()}
                toolTipContent={
                  <div className={classes.xp_icons}>
                    {isPowerAvailable("Challenge") === 0 ? (
                      <div>Not Available</div>
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
                    <button className={classes.team_d_icon_button}>
                      <Challenge
                        size={30}
                        // size={largeView ? 28 : 24}
                      />
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
                    className={classes.team_d_icon_button}
                    style={
                      isGameOverOrNotStarted()
                        ? { opacity: 0.3, pointerEvents: "none" }
                        : {}
                    }
                  >
                    <Challenge
                      size={30}
                      // size={largeView ? 28 : 24}
                    />
                  </button>
                )}
                challenge={props.challenge}
                useChallenge={props.useChallenge}
              />
            )}

            {isPowerAvailable("D-Wall") === 0 ||
            isPowerLocked("D-Wall") === 1 ? (
              <Tooltip
                disabled={isGameOverOrNotStarted()}
                toolTipContent={
                  <div className={classes.xp_icons}>
                    {isPowerAvailable("D-Wall") === 0 ? (
                      <div>Not Available</div>
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
                <button className={classes.team_d_icon_button} style={{ background: "none", border: 0 }}>
                  <ShieldIcon
                    size={30}
                    // size={largeView ? 28 : 24}
                  />
                </button>
              </Tooltip>
            ) : props.dwall == 0 ? (
              <div style={{ opacity: 0.5 }}>
                <DwallPopUp
                  component={({ showPopUp }) => (
                    <button className={classes.team_d_icon_button} style={{ background: "none", border: 0 }}>
                      <ShieldIcon
                        size={30}
                        // size={largeView ? 28 : 24}
                      />
                    </button>
                  )}
                  dwall={props.dwall}
                  useDwall={props.useDwall}
                />
              </div>
            ) : (
              <DwallPopUp
                component={({ showPopUp }) => (
                  <button
                    onClick={showPopUp}
                    className={classes.team_d_icon_button}
                    style={
                      isGameOverOrNotStarted()
                        ? { opacity: 0.3, pointerEvents: "none", background: "none", border: 0  }
                        : {background: "none", border: 0}
                    }
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
          </>
        ) : (
          <>
            {isPowerAvailable("Challenge") === 0 ||
            isPowerLocked("Challenge") === 1 ? (
              <Tooltip
                toolTipContent={
                  <div className={classes.xp_icons}>
                    {isPowerAvailable("Challenge") === 0 ? (
                      <div>Not Available</div>
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
                    <button>
                      <Challenge size={largeView ? 28 : 24} />
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
                  >
                    <Challenge size={largeView ? 28 : 24} />
                  </button>
                )}
                challenge={props.challenge}
                useChallenge={props.useChallenge}
              />
            )}

            {isPowerAvailable("D-Wall") === 0 ||
            isPowerLocked("D-Wall") === 1 ? (
              <Tooltip
                disabled={isGameOverOrNotStarted()}
                toolTipContent={
                  <div className={classes.xp_icons}>
                    {isPowerAvailable("D-Wall") === 0 ? (
                      <div>Not Available</div>
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
                <button className={classes.team_d_icon_button} style={{background: "none", border: 0 }}>
                  <ShieldIcon
                    size={30}
                    // size={largeView ? 28 : 24}
                  />
                </button>
              </Tooltip>
            ) : props.dwall == 0 ? (
              <div style={{ opacity: 0.5 }}>
                <DwallPopUp
                  component={({ showPopUp }) => (
                    <button style={{background: "none", border: 0 }}>
                      <ShieldIcon
                        size={30}
                        // size={largeView ? 28 : 24}
                      />
                    </button>
                  )}
                  dwall={props.dwall}
                  useDwall={props.useDwall}
                />
              </div>
            ) : (
              <DwallPopUp
                component={({ showPopUp }) => (
                  <button
                    onClick={showPopUp}
                    style={
                      isGameOverOrNotStarted()
                        ? { opacity: 0.3, pointerEvents: "none", background: "none", border: 0 }
                        : {background: "none", border: 0 }
                    }
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
          </>
        )}
      </div>
    </div>
  );

  const RenderNHLStatPoints = ({}) => (
    <div className={classes.stat_points}>
      <div className={classes.stat_points_container}>
        <div className={`${classes.stat} ${largeView && classes.large_view}`}>
          <p
            className={`${classes.stat_points_title} ${
              largeView && classes.large_view
            }`}
          >
            PGPs
          </p>
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            GA: {teamDActual && teamDActual?.goalsAgainst?teamDActual?.goalsAgainst:0}
            <br />
            SA: {teamDActual && teamDActual?.shotsAgainst?teamDActual?.shotsAgainst:0}
          </p>
        </div>
      </div>

      <div className={classes.stat_points_container}>
        <div
          className={`${classes.points} ${largeView && classes.large_view} ${
            largeView && classes.large_view_d
          }`}
        >
          <p
            className={`${classes.stat_points_title} ${
              largeView && classes.large_view
            }`}
          >
            {xp?.xpVal} Powers
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              minHeight: 28,
            }}
          >
            
            <>
              {isDwallActive && 
                <img src={ShieldIconGrey} style={{width: 30}}/>
              }
              {isPowerAvailable("D-Wall") === 0 ? <div style={{
                opacity: 0.5
              }}><ShieldIcon
                      size={30}
                      // size={largeView ? 28 : 24}
                    /></div> : isPowerLocked("D-Wall") === 1 ? (
                <Tooltip
                  disabled={isGameOverOrNotStarted()}
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
              ) : props.dwall == 0 ? (
                <div style={{ opacity: 0.5 }}>
                  <DwallPopUp
                    component={({ showPopUp }) => (
                      <button
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
                </div>
              )  : (
                isDwallActive == false && 
                  <DwallPopUp
                    component={({ showPopUp }) => (
                      <button
                        onClick={showPopUp}
                        style={
                          isGameOverOrNotStarted()
                            ? { opacity: 0.3, pointerEvents: "none" }
                            : {}
                        }
                        style={{background: "none", border: 0}}
                      >
                        <ShieldIcon
                          size={30}
                          // size={largeView ? 28 : 24}
                        />
                      </button>
                    )}
                    dwall={props.dwall}
                    useDwall={props.useDwall}
                    setIsDwallActive={setIsDwallActive}
                    isDwallActive={isDwallActive}
                    setShowPleaseWait={setShowPleaseWait}
                  />
            )}
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
            </>
            {/* {xp1 == 0 && xp2 == 0 && xp3 == 0 ? (
              <div style={{ opacity: 0.5 }}>{renderXp()}</div>
            ) : (
              <RenderXpToolTip />
            )} */}
          </div>
        </div>
      </div>
      </div>
  );
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var a = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        setShowTimerText("D-Wall • " + minutes + ":" + seconds);

        if (--timer < 0) {
            clearInterval(a);
            setShowTimer(false);
            setIsDwallActive(false);
            setShowTimerText("");
            return;
        }
    }, 1000);
}

  const RenderStatus = ({ success = false, danger = false }) => {
    return (
    <p
      className={`${classes.container_status} ${
        singleView ? classes.margin_top_bottom_8 : classes.margin_top_bottom_16
      } ${largeView && classes.large_view}`}
    >
      <span
        className={`
        ${largeView && classes.large_view}
        ${
          success ||
          getStatus() === "Pitching" ||
          (getStatus() === "Hitting" && classes.success)
        } 
        ${danger && classes.danger}`}
      >
        {showPleaseWait && 
          <div id="times" style={{width: "100%", color: "#8cc2ff"}}>Activating</div>
        }
        {!showPleaseWait && 
          <>
            <div id="times" style={{width: "100%", color: "#8cc2ff"}}>{showTimerText}</div>
            {isDwallActive == false ? getStatus() : ""}
          </>
        }
      </span>
    </p>
    
  )};

  const RenderChallengeButton = () => {
    return (
      <button className={classes.challenge_btn}>
        Click here to Challenge!
      </button>
    );
  };

  const RenderHeader = () => (
    <div className={classes.card_header}>
      <p className={classes.card_header_title}>
        <span className={classes.border} />
        <span>
          Team D:
          <span className={classes.card_header_points}>{teamDPts} Pts</span>
        </span>
      </p>
    </div>
  );

  const RenderSingleViewStats = () => (
    <div className={classes.single_view_state}>
      <p>Team D</p>
      <div>
        <p className={classes.single_view_pts}>
          Pts:&nbsp;
          <span className={xp && xp?.xp && classes.active}>{teamDPts}</span>
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

  const RenderHeaderIcons = () =>
    singleView && <VideoIcon size={singleView && 23} />;

  const RenderFooter = () => {
    if (showMidThird()) {
      return (
        <div className={classes.third_text}>
          <p>Mid {getNumberSuffix(current_inning)}</p>
        </div>
      );
    } else if (showEndThird()) {
      <div className={classes.third_text}>
        <p>End {getNumberSuffix(current_inning)}</p>
      </div>;
    }

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
      />
    );
  };

  const RenderStarPower = ({}) => {
    return (
      <>
        {is_starTeamD && (
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

  return (
    <>
      <div
        key={key}
        className={`${classes.card_wrapper} ${
          singleView ? classes.singleViewCardWrapper : ""
        }`}
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
                      <RenderChallengeButton />
                    ) : (
                      <>
                        <RenderStatus
                          success={
                            hasText(status, "batting") ||
                            hasText(status, "pitching") ||
                            hasText(status, "hitting")
                          }
                          danger={hasText(status, "deck")}
                        />
                      </>
                    )}

                    {/* {getStatus() === "Game Over" ? (
                      <>
                        <button className={classes.card_footer_btn}>
                          See your {type} scoring details
                        </button>
                      </>
                    ) : ( */}
                    {cardType === CardType.MLB ? (
                      <>
                        {getStatus() !== "Game Over" &&
                          !singleView &&
                          RenderFooter()}
                      </>
                    ) : null}

                    {getStatus() !== "Game Over" &&
                    cardType === CardType.NHL &&
                    !singleView ? (
                      <>
                      <NHLFooterStats isTeamD={true} teamD={data} cardType={cardType} />
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

          {!showEndThird() &&
            !showMidThird() &&
            getStatus() !== "Game Over" &&
            !compressedView &&
            !singleView && (
              <SportsLiveCardFooter
                showSummary={showSummary}
                onClickBack={() => setSummaryState(false)}
                onClickDetails={() => setSummaryState(true)}
                title={footerTitle()}
                largeView={largeView}
              />
            )}

          {/* {cardType !== CardType.MLBR && (
            <SportsLiveCardOverlay
              text="Video review is available now"
              visible={!singleView && showVideoOverlay}
              onGotIt={() => setVideoOverlayState(false)}
              largeView={largeView}
            />
          )} */}
        </div>
      </div>
    </>
  );
}

SportsLiveCardTeamD.propTypes = {
  data: PropTypes.object,
  compressedView: PropTypes.bool,
  largeView: PropTypes.bool,
  singleView: PropTypes.bool,
  active: PropTypes.bool,
  cardType: PropTypes.string,
  onSelectCard: PropTypes.func,
};

export default SportsLiveCardTeamD;
