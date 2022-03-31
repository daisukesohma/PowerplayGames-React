import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ClockIcon from "../../icons/Clock2";
import CalenderIcon from "../../icons/Calendar2";
import StadiumIcon from "../../icons/Stadium2";
import Tick2 from "../../icons/Tick2";
import DeleteIcon from "../../assets/delete.png";
import PowerPlayIcon from "../../assets/token.png";
import StarIcon from "../../icons/Star";
import TDShirtImage from "../../assets/td.png";
import TDBadge from "../../assets/tdBadge.png";
import ForwardArrow from "../../icons/ForwardArrow";
import { isEmpty } from "lodash";

function SportsTeamSelectionCard(props) {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    item = {},
    loading = false,
    onSelectDeselect = (playerId, matchId) => {},
    disabled = false,
    isSelected = false,
    btnTitle = "+ Select",
    btnIcon = "",
    mlbCard = false,
  } = props || {};

  const {
    playerName: name = "",
    avgVal = 0,
    homeTeam = "",
    awayTeam = "",
    date = "",
    time = "",
    stadium = "",
    playerId = "",
    isStarPlayer = false,
    steps = [],
    playerStats = {},
    injured = false,
    position = "",
    match_id,
  } = item || {};

  const {
    hits = 0,
    doubles = 0,
    triples = 0,
    home_runs = 0,
    stolen_bases = 0,
    runs_batted_in = 0,
    batting_average = 0,
    wins = 0,
    losses = 0,
    innings_pitched = 0,
    strike_outs = 0,
    earned_runs_average = 0,
    base_on_balls = 0,
    walks_hits_per_innings_pitched = 0,
  } = playerStats || {};

  const RenderMLBState = () => (
    <div
      className={`${classes.card_state_mlb} ${isSelected && classes.active}`}
    >
      <div>
        <span>Toronto SP</span>
        <p>N. Eovaldi</p>
        <span>(1-2, 3.00 ERA)</span>
      </div>

      <div>
        <span>Baltimore SP</span>
        <p>J. Means</p>
        <span>(3-1, 2.89 ERA)</span>
      </div>
    </div>
  );

  const RenderOtherState = () => (
    <div className={`${classes.card_state} ${isSelected && classes.active}`}>
      <div className={classes.card_state_title}>
        <span>W</span>
        <span>L</span>
        <span>ARA</span>
        <span>FPPG</span>
      </div>
      <div className={classes.card_state_values}>
        <span>{wins}</span>
        <span>{losses}</span>
        <span>{0}</span>
        <span>{0}</span>
      </div>
    </div>
  );

  const nextStep = () => {
    let _currentStep = currentStep;
    if (currentStep < steps?.length - 1) {
      _currentStep++;
    } else {
      _currentStep = 0;
    }

    setCurrentStep(_currentStep);
  };

  return (
    <div
      className={`${classes.container_body_card} ${mlbCard && classes.inset}`}
    >
      <div className={classes.container_body_card_1}>
        <div className={classes.container_body_left}>
          {isStarPlayer && (
            <span
              className={`${classes.container_body_card_start_power} ${
                mlbCard && classes.inset
              }`}
            >
              {" "}
              {mlbCard ? (
                <StarIcon solidcolor="#000" />
              ) : (
                <img src={PowerPlayIcon} />
              )}{" "}
              Star Power{" "}
            </span>
          )}
          <div className={classes.container_body_card_header}>
            <p
              className={`${classes.container_selected_p} ${
                isSelected ? classes.active : ""
              }`}
            >
              {name}
            </p>
            {!isSelected ? (
              <button
                onClick={() => onSelectDeselect(playerId, match_id)}
                className={disabled && classes.disabled}
                disabled={disabled}
              >
                {" "}
                + Select
              </button>
            ) : (
              <div className={classes.container_selected}>
                <p className={classes.container_selected_p_1}>
                  <Tick2 /> Selected{" "}
                  <img
                    src={DeleteIcon}
                    onClick={() => onSelectDeselect(playerId, match_id)}
                  />
                </p>
              </div>
            )}
          </div>
          {mlbCard && currentStep === 1 && (
            <div className={classes.card_mlb_vs}>
              <p>VS {awayTeam}</p>
            </div>
          )}

          <div
            className={`
                ${classes.container_body_card_state} 
                ${isSelected && classes.active}`}
          >
            {mlbCard && currentStep === 1 ? (
              <RenderMLBState />
            ) : isEmpty(playerStats) ? (
              <RenderOtherState />
            ) : (
              <p>No Data</p>
            )}
          </div>

          {currentStep === 0 && (
            <div className={classes.team_vs}>
              <p>VS {awayTeam}</p>
            </div>
          )}
          <div className={classes.divider}></div>
        </div>

        <div className={classes.container_body_right}>
          <div className={classes.right_img}>
            <img src={TDShirtImage} />
          </div>
          <img src={TDBadge} className={classes.img_badge} />
          <p>Get Your Gear!</p>
        </div>
      </div>

      <div className={classes.container_card_footer_main}>
        <div className={classes.card_footer}>
          <p className={classes.container_body_footer}>
            <span>
              <ClockIcon /> {time}
            </span>
            <span>
              <CalenderIcon /> {date}
            </span>
            <span>
              <StadiumIcon /> {stadium}
            </span>
          </p>
        </div>

        {/* {mlbCard && (
          <div className={classes.forwardArrow} onClick={nextStep}>
            <ForwardArrow color="#fb6e00" />
          </div>
        )} */}
      </div>
    </div>
  );
}

SportsTeamSelectionCard.propTypes = {
  title: PropTypes.string,
  avgVal: PropTypes.number,
  teamA: PropTypes.string,
  teamB: PropTypes.string,
  time: PropTypes.string,
  date: PropTypes.string,
  stadium: PropTypes.string,
  id: PropTypes.number,
  isSelected: PropTypes.bool,
  isStarPlayer: PropTypes.bool,
  disabled: PropTypes.bool,
  mlbCard: PropTypes.bool,
  steps: PropTypes.array,
  onSelectDeselect: PropTypes.func,
};

export default SportsTeamSelectionCard;
