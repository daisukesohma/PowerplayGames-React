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
import RenderPointsSummary from "../../SportsLiveCard/RenderPointsSummary";

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];
const NFLSummaryTitles = ["Inning", "Types", "Power", "Pts"];
const NHLSummaryTitles = ["Time", "Type", "Power", "Pts"];

export default function Slide1(props) {
  let {
    icons,
    double,
    baseBall,
    featured,
    title,
    subTitle,
    points,
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
    index,
    counts,
    player,
    setDetails,
    active_power_id,
    cardType = "nhl",
  } = props || {};

  const {
    name = "",
    type = "",
    type1 = "",
    primary_position: type2 = "",
    pointsSummary = [],
    totalPts = 0,
    range = "",
    mlb_player_stats = [],
    nfl_player_season_stats = [],
    nhl_player_season_stats = [],
    boost = {},
    current_team = "",
    player_id = "",
    match_stats = [],
  } = player || {};

  return (
    <div className="carousel-item">
      <div
        className="board__wrapper__content"
        style={
          secondShow && baseBall ? { height: "248px" } : { height: "227px" }
        }
      >
        <div className="row">
          <div className="col-12">
            <h2 style={{ marginTop: 0 }}>{name}</h2>
          </div>
        </div>
        {cardType === CardType.NHL ? (
          <RenderPointsSummary
            titleList={NHLSummaryTitles}
            tableList={pointsSummary}
            totalPoints={totalPts}
            largeView={false}
          />
        ) : null}

        {/* <div className="row">
          <div className="col-9">
            <h2 style={{ marginTop: 0 }}>{name}</h2>
            <p
              style={{
                marginTop: 7,
              }}
            >
              Points Summary
            </p>
          </div>
          <div className="col-3 point" style={{ padding: 0 }}>
            <p style={{ margin: 0, textAlign: "left" }}>Total Points </p>
            <h3
              style={{
                width: "70px",
                border: "none",
                backgroundColor: "rgba(242, 242, 242, 0.1)",
                marginRight: 6,
              }}
            >
              {points}
            </h3>
          </div>
          <div className="col-10 ps-2 ">
            <table className="board__wrapper__content__table">
              <thead>
                <th>Inning</th>
                <th>Type</th>
                <th>Power</th>
                <th>Pts</th>
              </thead>
              <tbody>
                <tr>
                  <td>Top 1st</td>
                  <td>Single</td>
                  <td>2x</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Top 1st</td>
                  <td>RBI 1</td>
                  <td>-</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Bot 4th</td>
                  <td>HR</td>
                  <td>3x</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>Bot 4th</td>
                  <td>RBI 4</td>
                  <td>3x</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>Bot 4th</td>
                  <td>RS 4</td>
                  <td>3x</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  );
}
