import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classes from "./index.module.scss";
import ClockIcon from "../../icons/Clock2";
import CalenderIcon from "../../icons/Calendar2";
import StadiumIcon from "../../icons/Stadium2";
import Tick2 from "../../icons/Tick2";
import DeleteIcon from "../../assets/delete.png";
import PlusIcon from "../../assets/plus.png";
import PowerPlayIcon from "../../assets/token.png";
import StarIcon from "../../icons/Star";
import TDShirtImage from "../../assets/td.png";
import TDBadge from "../../assets/tdBadge.png";
import ForwardArrow from "../../icons/ForwardArrow";
import { isEmpty } from "lodash";
import NHLTeamStats from "./NHLTeamStats";
import moment from "moment";
function SportsTeamSelectionCard(props) {
  const selector_all_data = useSelector((state) => state?.nhl?.allData);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    item = {},
    loading = false,
    onSelectDeselect = (id, matchId) => {},
    disabled = false,
    isSelected = false,
    btnTitle = "+ Select",
    btnIcon = "",
    mlbCard = false,
    image,
  } = props || {};

  const {
    id = "",
    name = "",
    city = "",
    nhl_team_season_stats: awayTeamStats = [],
    steps = [],
    playerStats = {},
    match_id,
    venue = {},
    teamStats = {},
    teamB = {},
    matchVenue = {},
    matchScheduled = "",
    is_starTeamD,
  } = item || {};


  const { name: stadium = "" } = matchVenue || {};
  const { name: teamBName } = teamB;
  const date = moment(matchScheduled).format("yyyy-MM-DD"),
    time = moment(matchScheduled).format("h:mm A");


  return (
    <div
      className={`${classes.container_body_card} ${mlbCard && classes.inset}`}
      className={`${classes.container_body_card} ${mlbCard && classes.inset} ${
        isSelected ? classes.activeBorder : ""
      }`}
    >
      <div className={classes.container_body_card_1}>
        <div className={classes.container_body_left}>
          {/* {isStarPlayer && (
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
          )} */}
          {is_starTeamD ? (
            <span className={classes.container_body_card_start_power}>
              <StarIcon solidcolor="#000" /> <p>Star Power</p>
            </span>
          ) : null}
          <div
            className={`${classes.container_body_card_header} ${
              isSelected ? classes.header_flex : ""
            }`}
          >
            <p
              className={`${classes.container_selected_p} ${
                isSelected ? classes.active : ""
              }`}
            >
              {!isSelected ? (
              <>
              <img
                onClick={() => onSelectDeselect(id, match_id)}
                // className={disabled && classes.disabled}
                src={PlusIcon}
                disabled={disabled}
                style = {btnTitle !== "Swap" ? {
                  marginRight: 5,
                  position: 'relative',
                  top: '-3px'
                } : {}}
              />
                {/* {" "}
                + Select
              </button> */}
              </>
            ) : (
              // <div className={classes.container_selected}>
              //   <p className={classes.container_selected_p_1}>
              //     <Tick2 />{" "}
              //   </p>
                <img
                  src={DeleteIcon}
                  onClick={() => onSelectDeselect(id, match_id)}
                  style = {btnTitle !== "Swap" ? {
                    marginRight: 5,
                    position: 'relative',
                    top: '-3px'
                  } : {}}
                />
              // </div>
            )}
              <span>{city}</span> {name}
            </p>
            
          </div>
          {mlbCard && currentStep === 1 && (
            <div className={classes.card_mlb_vs}>
              <p>Vs {teamBName}</p>
            </div>
          )}

          <div
            className={`
                ${classes.container_body_card_state} 
                ${isSelected && classes.active}`}
          >
            {/* {mlbCard && currentStep === 1 ? (
              <RenderMLBState team="home" name={name} />
            ) : isEmpty(playerStats) ? (
              <RenderMLBState team="home" name={name} />
            ) */}

            <NHLTeamStats teamStats={teamStats} />
          </div>

          {currentStep === 0 && (
            <>
              <div
                className={`${classes.team_vs} ${
                  isSelected ? classes.selectedColor : ""
                }`}
              >
                <p>Vs {teamBName}</p>
              </div>
              <div
                className={`
                ${classes.container_body_card_state} 
                ${isSelected && classes.active}`}
              >
                {/* {mlbCard && currentStep === 1 ? (
                  <RenderMLBState team="away" name={teamBName} />
                ) : isEmpty(playerStats) ? (
                  <RenderMLBState team="away" name={teamBName} />
                ) : (
                  <p>No Data</p>
                )} */}
              </div>
            </>
          )}
        </div>

        <div className={classes.container_body_right}>
          {image?.length>0 && (
          <div onClick={()=> window.open(image[0].trackingLink, "_blank")}>
            <div className={classes.right_img}>
              <img src={require(`../../assets/nhl_teamd/${image[0].shortName}.png`).default } alt={TDShirtImage}  />
              {/* <img src={TDShirtImage} alt="" /> */}
            </div>
          </div>

          )}
            {image?.length==0 && (
          <div className={classes.right_img}>
            <img src={TDShirtImage} alt="" />
          </div>
          )}
          {/* <img src={TDBadge} className={classes.img_badge} alt=""/>
          <p>Get Your Gear!</p> */}
        </div>
      </div>

      <div className={classes.container_card_footer_main}>
        <div className={classes.card_footer}>
          <div className={classes.divider}></div>
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
  item: {},
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  mlbCard: PropTypes.bool,
  steps: PropTypes.array,
  onSelectDeselect: PropTypes.func,
};

export default SportsTeamSelectionCard;
