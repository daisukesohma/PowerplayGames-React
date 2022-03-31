import React from "react";
import classes from "./index.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MLBPlayer from "../../assets/baseball-player-faded.png";
import NFLPlayer from "../../assets/nfl-player-mobile.png";
import NBAPlayer from "../../assets/nba-player-mobile.png";
import NHLPlayer from "../../assets/nhl-player-mobile.png";
import InfiniteEntry from "../../assets/invalid-name.svg";
import PowerCenterCardDetails from "../PowerCenterCardDetails";
import OutlineButton from "../OutlineButton";
import PrizeGrid from "./PrizeGrid";
import PowersAvailable from "./PowersAvailable";
import PointSystem from "./PointSystem";
import TeamRoster from "./TeamRoster";
import Pitchers from "./Pitcher";
import ContestRules from "../PowerCenterCardDetails/ContestRules";
import "./carousel.scss";

const PowerCenterMobileCard = (props) => {
  const {
    id = null,
    title = "",
    prize = null,
    currency = "$",
    prize_currency = "USD",
    outOf = null,
    total = null,
    game_type = "",
    game_set_start = "",
    start_time = "",
    entry_fee = null,
    paid_game = false,
    targeted_game = false,
    percent = null,
    totalPoints = null,
    PointsSystem = [],
    Power = [],
    PrizePayout = [],
    showDetails = false,
    onDetailsClick = () => {},
    onBackClick = () => {},
    onNextClick = () => {},
    onEnter = () => {},
    userHasEntered = false,
    totalEntries = 0
  } = props || {};

  const getBackgroundImageWithStyle = () => {
    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
    };
    if (title === "MLB") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayer})`;
      backgroundImageStyle.backgroundPosition = "-16px -13px";
      backgroundImageStyle.backgroundSize = "contain";
    } else if (title === "NFL") {
      backgroundImageStyle.backgroundImage = `url(${NFLPlayer})`;
      backgroundImageStyle.backgroundPosition = "-16px 10px";
    } else if (title === "NBA") {
      backgroundImageStyle.backgroundImage = `url(${NBAPlayer})`;
      backgroundImageStyle.backgroundPosition = "-157px -4px";
    } else {
      backgroundImageStyle.backgroundImage = `url(${NHLPlayer})`;
      backgroundImageStyle.backgroundPosition = "0px 27px";
    }
    return backgroundImageStyle;
  };

  return !showDetails ? (
    <div
      className={classes.__power_center_card}
      style={getBackgroundImageWithStyle()}
    >
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        autoPlay={false}
        infiniteLoop={true}
        interval={300000}
        className=".carousel .control-dots"
        swipeScrollTolerance={100}
      >
        <div className={classes.__power_center_card_container}>
          <div style={{ flex: 1 }}></div>
          <div className={classes.__power_center_card_content}>
            <span className={classes.__power_center_card_game_id}>ID {id}</span>
            <div className={classes.__power_center_card_date_time}>
              {game_set_start} | {start_time} ET
            </div>
            <div className={classes.__power_center_card_powerdfs}>
              <p className={classes.__power_center_card_powerdfs_title}>
                <span
                  className={classes.__power_center_card_powerdfs_title_first}
                >
                  {title}
                </span>{" "}
                {/* {title !== "Levels" && "PowerdFS"} */}
                {game_type === "NHL_Fantasy" ? "Fantasy" : "PowerdFS"}
              </p>
            </div>
            <div className={classes.__power_center_card_prize_pool}>
              <p
                className={
                  classes.__power_center_card_prize_pool_common +
                  " " +
                  classes.__power_center_card_prize_pool_price
                }
              >
                ${prize}
              </p>
              <p
                className={
                  classes.__power_center_card_prize_pool_common +
                  " " +
                  classes.__power_center_card_prize_pool_text
                }
              >
                Prize Pool
              </p>
            </div>
            <div className={classes.__power_center_card_total}>
              {total || total == null ? (
                <p>
                  {totalEntries} <span>of {total}</span>
                </p>
              ) : (
                <p>
                  {totalEntries}{" "}
                  <span>
                    of <img src={InfiniteEntry} alt="infinite entry" />
                  </span>
                </p>
              )}
            </div>
            <div className={classes.__power_center_card_enter}>
              {userHasEntered ? (
                <>
                  <OutlineButton title={`Entered`} />
                </>
              ) : paid_game || paid_game === null ? (
                <OutlineButton
                  title={`Enter  •  $${entry_fee}`}
                  onClick={onEnter}
                />
              ) : (
                <OutlineButton title={`Enter  •  Free`} onClick={onEnter} />
              )}
            </div>
          </div>
        </div>
        <ContestRules
          title={title}
          game_type={game_type}
          game_set_start={game_set_start}
          start_time={start_time}
          prize={prize}
          powers={Power}
          points={PointsSystem}
          isMobileGameCenter={true}
          showDateTime={true}
        />
        <PrizeGrid
          game_type={game_type}
          PrizePayout={PrizePayout}
          game_set_start={game_set_start}
          start_time={start_time}
        />
        <PowersAvailable
          game_type={game_type}
          title={title}
          Power={Power}
          game_set_start={game_set_start}
          start_time={start_time}
        />
        <PointSystem
          game_type={game_type}
          title={title}
          PointsSystem={PointsSystem}
          game_set_start={game_set_start}
          start_time={start_time}
        />
        <Pitchers
          title={title}
          game_type={game_type}
          PointsSystem={PointsSystem}
          game_set_start={game_set_start}
          start_time={start_time}
        />
        <TeamRoster
          title={title}
          game_type={game_type}
          game_set_start={game_set_start}
          start_time={start_time}
        />
      </Carousel>
    </div>
  ) : (
    <PowerCenterCardDetails
      Power={Power}
      PrizePayout={PrizePayout}
      PointsSystem={PointsSystem}
      entry_fee={entry_fee}
      title={title}
      onBackClick={() => onBackClick()}
      onNextClick={() => onNextClick()}
      onEnter={onEnter}
      prize={prize}
      userHasEntered={userHasEntered}
      game_set_start={game_set_start}
    />
  );
};

export default PowerCenterMobileCard;
