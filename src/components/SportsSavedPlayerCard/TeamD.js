import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import classes from "./index.module.scss";
import {
  getNumberSuffix,
  hasText,
  removeZeroBeforeDecimalPoint,
} from "../../utility/shared";
import RenderMLBPlayerStats from "./RenderMLBPlayerStats";
import SportsLiveCardFooter from "./SportsLiveCardFooter";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
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

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];
const text = process.env.REACT_APP_POST_SHARING_TEXT;

function SportsLiveCardTeamD(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showVideoOverlay, setVideoOverlayState] = useState(true);

  const {
    data = {},
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    onSelectCard = () => {},
    cardType = CardType.MLB,
  } = props || {};

  const {
    match_id = "",
    match = {},
    team_d_mlb_team: team = {},
    score = 0,
  } = data || {};

  const {
    away_team = {},
    home_team = {},
    status = "",
    date_time = "",
    boxscore = [],
  } = match || {};

  const {
    name = "",
    type = "",
    points = 0,
    playerStats = {},
    pointsSummary = [],
    totalPts = 0,
    range = "",
    xp = {},
    mlb_team_stats = [],
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
    let powerss = props.dataMain?.game?.Powers;

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
  };

  const isPowerLocked = (type) => {
    let powerss = props.dataMain?.game?.Powers;
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

  const getStatus = () => {
    if (`${status}`?.toLocaleLowerCase() === "scheduled") {
      return `${moment(date_time).format("MMM Do")} - ${moment(
        date_time
      ).format("hh:mm A")}`;
    } else if (
      `${status}`?.toLocaleLowerCase() === "closed" ||
      `${status}`?.toLocaleLowerCase() === "completed"
    ) {
      return "Game Over";
    } else if (`${status}`.toLocaleUpperCase() === "inprogress")
      return "In Progress";

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
          Stats
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
                  <Challenge size={largeView ? 28 : 24} />
                </button>
              </Tooltip>
            ) : props.challenge == 0 ? (
              <div style={{ opacity: 0.5 }}>
                <ChallengePopUp
                  component={({ showPopUp }) => (
                    <button className={classes.team_d_icon_button}>
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
                    className={classes.team_d_icon_button}
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
                <button className={classes.team_d_icon_button}>
                  <ShieldIcon size={largeView ? 28 : 24} />
                </button>
              </Tooltip>
            ) : props.dwall == 0 ? (
              <div style={{ opacity: 0.5 }}>
                <DwallPopUp
                  component={({ showPopUp }) => (
                    <button className={classes.team_d_icon_button}>
                      <ShieldIcon size={largeView ? 28 : 24} />
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
                        ? { opacity: 0.3, pointerEvents: "none" }
                        : {}
                    }
                  >
                    <ShieldIcon size={largeView ? 28 : 24} />
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
                  <Challenge size={largeView ? 28 : 24} />
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
                <button className={classes.team_d_icon_button}>
                  <ShieldIcon size={largeView ? 28 : 24} />
                </button>
              </Tooltip>
            ) : props.dwall == 0 ? (
              <div style={{ opacity: 0.5 }}>
                <DwallPopUp
                  component={({ showPopUp }) => (
                    <button>
                      <ShieldIcon size={largeView ? 28 : 24} />
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
                        ? { opacity: 0.3, pointerEvents: "none" }
                        : {}
                    }
                  >
                    <ShieldIcon size={largeView ? 28 : 24} />
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
          success ||
          getStatus() === "Pitching" ||
          (getStatus() === "Hitting" && classes.success)
        } 
        ${danger && classes.danger}`}
      >
        {getStatus()}
      </span>
    </p>
  );

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
        Team {type}
      </p>
      <div className={classes.header_teams}>
        <p
          className={team_id === away_team.team_id ? classes.current_team : ""}
        >
          {away_team?.name} {away_team_runs}
        </p>{" "}
        vs{" "}
        <span
          className={team_id === home_team.team_id ? classes.current_team : ""}
        >
          {home_team?.name} {home_team_runs}
        </span>
      </div>
    </div>
  );

  const RenderSingleViewStats = () => (
    <div className={classes.single_view_state}>
      <p className={classes.single_view_cat}>{type}</p>
      <div>
        <p className={classes.single_view_pts}>
          Pts: <span className={xp && xp?.xp && classes.active}>30</span>
        </p>
      </div>
      <p>
        Bot 1st
        <span className={classes.divider_1}>|</span>2 Out
      </p>
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

  return (
    <>
      <div
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
                {!singleView && <RenderStatPoints />}
                {!compressedView && (
                  <>
                    {singleView && <RenderSingleViewStats />}
                    {cardType === CardType.MLBR ? (
                      <RenderChallengeButton />
                    ) : (
                      <RenderStatus
                        success={
                          hasText(status, "batting") ||
                          hasText(status, "pitching") ||
                          hasText(status, "hitting")
                        }
                        danger={hasText(status, "deck")}
                      />
                    )}

                    {/* {getStatus() === "Game Over" ? (
                      <>
                        <button className={classes.card_footer_btn}>
                          See your {type} scoring details
                        </button>
                      </>
                    ) : ( */}
                    {getStatus() !== "Game Over" &&
                      !singleView &&
                      RenderFooter()}
                  </>
                )}
              </>
            ) : (
              <>
                <RenderPointsSummary
                  titleList={MLBSummaryTitles}
                  tableList={pointsSummary}
                  totalPoints={totalPts}
                  largeView={largeView}
                />
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
