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
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

const Slider = ({
  data = {},
  icons,
  double,
  baseBall,
  featured,
  title,
  subTitle,
  points = 0,
  fieldText,
  secondShow,
  hitter,
  pitcher,
  strikes,
  balls,
  footerText,
  fieldColor,
  imageTochanged,
  notShow,
  otherIcons,
  boostModal,
  swapModal,
  type,
  index,
  counts,
  setDetails,
  active_power_id,
  cardType = "nhl",
}) => {

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

  const getStatus = () => {
    if (`${player?.match?.status}`?.toLocaleLowerCase() === "scheduled") {
      return "scheduled";
    } else if (
      `${player?.match?.status}`?.toLocaleLowerCase() === "closed" ||
      `${player?.match?.status}`?.toLocaleLowerCase() === "completed"
    ) {
      return "Game Over";
    }
    return player?.match?.status;
  };

  const isGameOverOrNotStarted = () => {
    return (
      `${player?.match?.status}`?.toLocaleLowerCase() === "scheduled" ||
      getStatus() === "Game Over"
    );
  };

  const getImage = () => {
    if (active_power_id == 1) {
      return x1;
    } else if (active_power_id == 2) {
      return x2;
    } else if (active_power_id == 3) {
      return x3;
    }
  };

  return (
    <Row className="pb-3">
      <Col xs={10} className="pe-0">
        <div
          style={{ position: "relative" }}
          id={`carouselExampleIndicators-${index}`}
          className="carousel slide"
        >
          <div
            className="carousel-indicators board__wrapper__indicators"
            style={baseBall ? { bottom: "13px" } : { bottom: "9px" }}
          >
            <button
              type="button"
              data-bs-target={`#carouselExampleIndicators-${index}`}
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target={`#carouselExampleIndicators-${index}`}
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target={`#carouselExampleIndicators-${index}`}
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {featured && featured === true && (
            <div className="badge">
              <div>
                <span className="me-1 ">
                  <img src="/images/star.svg" alt="" />
                </span>

                <span className="star">STAR POWER</span>
              </div>
            </div>
          )}

          <div className="carousel-inner">
            <Slide1 cardType={cardType} data={data} boxscore={boxscore} />

            <Slide2 player={player} />

            <Slide3 player={player} />
          </div>

          <div className="endTag">
            {" "}
            <p className="pt-1">{footerText}</p>
          </div>
        </div>
      </Col>
      <Col xs={2} className="p-0 points-sidebar">
        <div className={classes.points_container}>
          <div style={{ textAlign: "center" }}>
            <p>Points {double && "2x"}</p>
            <span>{points}</span>
          </div>
        </div>
        <div
          className="iconSides"
          // style={
          //   icons
          //     ? { padding: "36.4px 0" }
          //     : !icons && baseBall
          //     ? { padding: "66.3px 0" }
          //     : { padding: "55.3px 0" }
          // }
        >
          {type == "D" ? (
            <>
              {counts.challengeCounts === 0 || isGameOverOrNotStarted() ? (
                <button style={{ background: "none", borderWidth: 0 }}>
                  <img
                    className={"mt-2 disabled"}
                    style={{ width: 40, height: 40 }}
                    src={`${
                      type == "D"
                        ? "/images/challenge-power.svg"
                        : "images/shafal.svg"
                    }`}
                    alt=""
                  />
                </button>
              ) : (
                <ChallengePopUp
                  component={({ showPopUp }) => (
                    <button
                      // onClick={showPopUp}
                      style={{ background: "none", borderWidth: 0 }}
                    >
                      <img
                        className={"mt-2 disabled"}
                        style={{ width: 40, height: 40 }}
                        src={`${
                          type == "D"
                            ? "/images/challenge-power.svg"
                            : "images/shafal.svg"
                        }`}
                        alt=""
                      />
                    </button>
                  )}
                  challenge={10}
                  useChallenge={() => {}}
                />
              )}
              {counts.dwallCounts === 0 || isGameOverOrNotStarted() ? (
                <button style={{ background: "none", borderWidth: 0 }}>
                  <img
                    className={`${
                      icons === true ? "pt-3 disabled" : "pt-4 mt-2 disabled"
                    }`}
                    style={{ width: 40 }}
                    src={`${"/images/sheild.svg"}`}
                    alt=""
                  />
                </button>
              ) : (
                <DwallPopUp
                  component={({ showPopUp }) => (
                    <button
                      style={{ background: "none", borderWidth: 0 }}
                      // onClick={showPopUp}
                    >
                      <img
                        className={`${icons === true ? "pt-3" : "pt-4 mt-2"}`}
                        style={{ width: 40 }}
                        src={`${"/images/sheild.svg"}`}
                        alt=""
                      />
                    </button>
                  )}
                  dwall={10}
                  useDwall={() => {}}
                />
              )}
            </>
          ) : (
            <>
              {counts.swapCounts === 0 || isGameOverOrNotStarted() ? (
                <img
                  style={{ width: 40, height: 40 }}
                  src={`${
                    type == "D"
                      ? "/images/challenge-power.svg"
                      : "images/shafal.svg"
                  }`}
                  alt=""
                  className={"mt-2 disabled"}
                />
              ) : (
                <img
                  onClick={
                    !otherIcons && !imageTochanged
                      ? () => swapModal(true, player)
                      : null
                  }
                  style={{ width: 40, height: 40 }}
                  src={`${
                    type == "D"
                      ? "/images/challenge-power.svg"
                      : "images/shafal.svg"
                  }`}
                  alt=""
                  className={"mt-2 disabled"}
                />
              )}
              {counts.pointMultiplierCounts === 0 ||
              isGameOverOrNotStarted() ? (
                <img
                  className={`${
                    icons === true ? "pt-3 diabled" : "pt-4 mt-2 disabled"
                  }`}
                  style={{ width: 40 }}
                  src={`${
                    imageTochanged && !otherIcons
                      ? "/images/2x.svg"
                      : type == "D"
                      ? "/images/sheild.svg"
                      : active_power_id == null
                      ? "/images/xp.svg"
                      : getImage()
                  }`}
                  alt=""
                />
              ) : (
                <img
                  onClick={
                    !otherIcons && !imageTochanged
                      ? () =>
                          active_power_id == null
                            ? boostModal(true, player)
                            : null
                      : null
                  }
                  className={`${icons === true ? "pt-3" : "pt-4 mt-2"}`}
                  style={{ width: 40 }}
                  src={`${
                    imageTochanged && !otherIcons
                      ? "/images/2x.svg"
                      : type == "D"
                      ? "/images/sheild.svg"
                      : active_power_id == null
                      ? "/images/xp.svg"
                      : getImage()
                  }`}
                  alt=""
                />
              )}
            </>
          )}

          {icons && (
            <>
              <img className="pt-3" src="/images/retro-boost.svg" alt="" />
              <h4>0:30</h4>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Slider;
