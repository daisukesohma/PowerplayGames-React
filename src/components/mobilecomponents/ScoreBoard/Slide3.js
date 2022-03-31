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
    type,
    index,
    counts,
    player,
    setDetails,
    active_power_id,
    cardType = "nhl",
  } = props || {};

  return (
    <div className="carousel-item ">
      <div
        className="board__wrapper__content"
        style={
          secondShow && baseBall ? { height: "248px" } : { height: "227px" }
        }
      >
        <div className="row">
          <div className="col-12">
            <h2 style={{ marginTop: "5px" }}>{title}</h2>
            <div className="board__wrapper__content__imageHolder">
              <img src="/images/fanatics.jpg" alt="files" />
              <div>
                <Link to="#">
                  <button>Shop Now!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
