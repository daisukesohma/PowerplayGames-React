import React from "react";
import classes from "./powerCenterCard.module.scss";
import MLBPlayer from "../../assets/mlb-player.png";
import MLBPlayerOppsite from "../../assets/baseball-player-copynew.png";
import NFLPlayer from "../../assets/nflCardBg.png";
import NBAPlayer from "../../assets/nbaCardBg.png";
import NHLPlayer from "../../assets/new-hockey-playerlogo.png";
import InfiniteEntry from "../../assets/invalid-name.svg";
import PowerCenterCardDetails from "../PowerCenterCardDetails";
import OutlineButton from "../OutlineButton";
import OutlineButtonViceVersa from "../OutlineButtonViceVersa";

import PowerCurrency from "../../assets/power-white.png";
import BtcCurrency from "../../assets/btc-white.png";
import EthCurrency from "../../assets/ethereum-white.png";

import OrangePowerCurrency from "../../assets/power-orange.png";
import OrangeBtcCurrency from "../../assets/btc-orange.png";
import OrangeEthCurrency from "../../assets/ethereum-orange.png";
import rechargeIcon from "../../assets/group-25.png";

import onenflbg from "../../assets/group-3-one-nfl.png";
import onenhlbg from "../../assets/group-3-one-nhl.png";

import { getTimeZone } from "../../utility/shared";
import rechargeHeading from "../../assets/rechargeIcon.png";

const PowerCenterCard = (props) => {
  const {
    id = null,
    title = "",
    prize = 0,
    currency = "$",
    prize_currency = "USD",
    outOf = 0,
    total = 0,
    percent = 0,
    game_type = "PowerdFS",
    game_set_start = "",
    start_time = "",
    paid_game = false,
    entry_fee = 0,
    targeted_game = false,
    showDetails = false,
    totalPoints = 0,
    onDetailsClick = () => {},
    onBackClick = () => {},
    onNextClick = () => {},
    onEnter = () => {},
    PointsSystem = [],
    Power = [],
    PrizePayout = [],
    userHasEntered = false,
    totalEntries = 0
  } = props || {};
  const getBackgroundImageWithStyle = () => {
    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
    };
    if (title === "MLB") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayerOppsite})`;
      //backgroundImageStyle.backgroundPosition = "100px 0px";
    } else if (title === "NFL") {
      backgroundImageStyle.backgroundImage = `url(${NFLPlayer})`;
      //backgroundImageStyle.backgroundPosition = "65px 60px";
    } else if (title === "NBA") {
      backgroundImageStyle.backgroundImage = `url(${NBAPlayer})`;
      //backgroundImageStyle.backgroundPosition = "-75px 68px";
    } else if (title === "NHL" && game_type === "PowerdFs_One") {
      backgroundImageStyle.backgroundImage = `url(${onenhlbg})`;
    } else if (title === "NFL" && game_type === "PowerdFs_One") {
      backgroundImageStyle.backgroundImage = `url(${onenflbg})`;
    } else {
      backgroundImageStyle.backgroundImage = `url(${NHLPlayer})`;
    }
    return backgroundImageStyle;
  };

  const numberWithCommas = (x) => {
    if (x >= 10000) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return x;
  };

  const getCurrency = (currency) => {
    if (currency.toUpperCase() === "BTC") {
      return BtcCurrency;
    } else if (currency.toUpperCase() === "ETH") {
      return EthCurrency;
    }
  };

  const getEnterCurrency = (currency) => {
    if (currency.toUpperCase() === "PWRS") {
      return OrangePowerCurrency;
    } else if (currency.toUpperCase() === "BTC") {
      return OrangeBtcCurrency;
    } else if (currency.toUpperCase() === "ETH") {
      return OrangeEthCurrency;
    }
  };

  const onEnterModal = () => {};

  const getTitleContestByGameType = (gameType) => {
    
    if (gameType === "PowerdFS") {
      return (
        <div className={classes.__power_center_card_powerdfs}>
          <span
            className={
              classes.__power_center_card_powerdfs_hr +
              " " +
              classes.__power_center_card_powerdfs_hr_left
            }
          ></span>
          <p className={classes.__power_center_card_powerdfs_title}>
            <span className={classes.__power_center_card_powerdfs_title_first}>
              {title}
            </span>{" "}
            PowerdFS
          </p>
          <span
            className={
              classes.__power_center_card_powerdfs_hr +
              " " +
              classes.__power_center_card_powerdfs_hr_right
            }
          ></span>
        </div>
      );
    } else if (gameType === "PowerdFs_promo") {
      return (
        <div className={classes.__card_title}>
          <p className={classes.__card_title_text}>
            {title}{" "}
            <span className={classes.__card__title_first}>PowerdFS</span>
            <br /> Manager Challenge!
          </p>
        </div>
      );
    } else if (gameType === "PowerdFs_Recharge") {
      return (
        <div className={classes.__card_title}>
          <p className={classes.__card_title_text}>
            {title}
            <img src={rechargeHeading} style={{marginLeft: 2}}/>
          </p>
        </div>
      );
    } else if (gameType === "PowerdFs_One") {
      return (
        <div className={classes.__card_title}>
          <p className={classes.__card_title_text} style={{ fontSize: 20 }}>
            {title}{" "}
            <span className={classes.__card__title_first}>PowerdFS One</span>
          </p>
        </div>
      );
    } 
     else {
      return (
        <div className={classes.__card_title}>
          <p className={classes.__card_title_text}>
            {title}{" "}
            <span className={classes.__card__title_first}>{gameType === "NHL_Fantasy" ? 'Fantasy' : 'PowerdFS'}</span>
            {gameType === "NHL_Fantasy" ? 
            '' : 
            <> <br />${totalPoints} Point Challenge!</>
            }
          </p>
        </div>
      );
    }
  };

  const getDateContent = () => {
    return (
      <div className={classes.__start_end_date}>
        <span className={classes.__date_text} style={{ marginBottom: 0 }}>
          {game_set_start} | {start_time} ET
        </span>
      </div>
    );
  };

  const getPrizeContestByGameType = (gameType) => {
    if (gameType === "PowerdFS") {
      return (
        <div className={classes.__power_center_card_prize_pool}>
          <p
            className={
              classes.__power_center_card_prize_pool_common +
              " " +
              classes.__power_center_card_prize_pool_price
            }
          >
            {currency === "USD" ? (
              `$`
            ) : currency === "PWRS" ? (
              prize_currency === "USD" ? (
                `$`
              ) : (
                <img src={getCurrency(prize_currency)} width="20" alt="" />
              )
            ) : (
              <img src={getCurrency(currency)} width="20" alt="" />
            )}
            {numberWithCommas(prize)}
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
      );
    } else if (gameType === "PowerdFs_promo") {
      return (
        <div className={classes.__current_jackpot}>
          <span className={classes.__current_jackpot_text}>
            Manage your team to victory and win
          </span>
          <h1 className={classes.__current_jackpot_amount}>
            {" "}
            {currency === "USD" ? (
              `$`
            ) : currency === "PWRS" ? (
              prize_currency === "USD" ? (
                `$`
              ) : (
                <img src={getCurrency(prize_currency)} width="20" alt="" />
              )
            ) : (
              <img src={getCurrency(currency)} width="20" alt="" />
            )}
            {prize}!
          </h1>
        </div>
      );
    } else if (gameType === "PowerdFs_Recharge") {
      return (
        <div className={classes.__current_jackpot}>
          <span
            className={classes.__current_jackpot_text}
            style={{ fontWeight: 400 }}
          >
            Power your team <br />
            to victory!
          </span>
          <h1
            className={classes.__current_jackpot_amount}
            style={{ marginBottom: 0 }}
          >
            {" "}
            {currency === "USD" ? (
              `$`
            ) : currency === "PWRS" ? (
              prize_currency === "USD" ? (
                `$`
              ) : (
                <img src={getCurrency(prize_currency)} width="20" alt="" />
              )
            ) : (
              <img src={getCurrency(currency)} width="20" alt="" />
            )}
            {prize}!
          </h1>
          <p
            style={{
              marginBottom: 25,
              color: "#f2f2f2",
              opacity: 0.6,
              marginTop: 10,
            }}
          >
            Prize Pool
          </p>
        </div>
      );
    } else if (gameType === "PowerdFs_One") {
      return (
        <div className={classes.__current_jackpot}>
          <span
            className={classes.__current_jackpot_text}
            style={{ fontWeight: 400, height: "auto", marginTop: 16 }}
          >
            Try our fast paced <br />
            {title == "NFL" || title == "NBA"
              ? "One-Quarter"
              : title == "MLB"
              ? "One-Inning"
              : "One-Period"}{" "}
            Game!
          </span>
          <h1
            className={classes.__current_jackpot_amount}
            style={{ marginBottom: 10, marginTop: 20 }}
          >
            {" "}
            {currency === "USD" ? (
              `$`
            ) : currency === "PWRS" ? (
              prize_currency === "USD" ? (
                `$`
              ) : (
                <img src={getCurrency(prize_currency)} width="20" alt="" />
              )
            ) : (
              <img src={getCurrency(currency)} width="20" alt="" />
            )}
            {prize}
          </h1>
          <p
            style={{
              marginBottom: 48,
              color: "#f2f2f2",
              opacity: 0.6,
              marginTop: 10,
            }}
          >
            Prize Pool
          </p>
        </div>
      );
    } else {
      return (
        <div className={classes.__current_jackpot}>
          <span className={classes.__current_jackpot_text}>
            {gameType === "NHL_Fantasy" ? <span className={classes.__current_jackpot_text}>Pick Today <br /> & Win Today!</span> : `Manage your team to ${totalPoints} points and win`}
          </span>
          <h1 className={classes.__current_jackpot_amount}>
            {" "}
            {currency === "USD" ? (
              `$`
            ) : currency === "PWRS" ? (
              prize_currency === "USD" ? (
                `$`
              ) : (
                <img src={getCurrency(prize_currency)} width="20" alt="" />
              )
            ) : (
              <img src={getCurrency(currency)} width="20" alt="" />
            )}
            {gameType === "NHL_Fantasy" ? `${prize}` : `${prize}!`}
          </h1>
            {gameType === "NHL_Fantasy" ?
              <p
                style={{
                  marginBottom: 52,
                  color: "#f2f2f2",
                  opacity: 0.6,
                  marginTop: -10,
                }}
              >
                Prize Pool
              </p>
              : ""
            }
        </div>
      );
    }
  };

  return !showDetails ? (
    <div
      className={`${
        game_type === "PowerdFS"
          ? classes.__power_center_card
          : classes.__power_center__challenge_card
      }`}
      style={getBackgroundImageWithStyle()}
    >
      <span className={classes.topId}>ID {id}</span>
      {game_type !== "PowerdFS" && game_type !== "NHL_Fantasy" && (
        <div className={classes.__win_power}>
          <span className={classes.__win_power_span}>
            You have the Powers to win!
          </span>
        </div>
      )}
      {getTitleContestByGameType(game_type)}
      {getDateContent()}
      {getPrizeContestByGameType(game_type)}
      <div className={classes.__card_button}>
        {userHasEntered ? (
          <OutlineButton
            title={`Entered`}
            styles={{ fontWeight: 600 }}
          />
        ) : (
          game_type == "PowerdFs_challenge" || game_type == "PowerdFs_promo" ? (
            <OutlineButton
              title={`Enter`}
              onClick={onEnter}
              styles={{ fontWeight: 600 }}
            />
          ) : paid_game ? (
            <OutlineButton
              title={`Enter  •  $${entry_fee}`}
              onClick={onEnter}
              styles={{ fontWeight: 600 }}
            />
          ) : (
            <OutlineButton
              title={`Free Entry`}
              onClick={onEnter}
              styles={{ fontWeight: 600 }}
            />
          )
        )}
      </div>
      <div className={classes.__power_center_card_status_and_details}>
        <div className={classes.__power_center_card_total}>
          {console.log("targeted_game===>",targeted_game),
          console.log("targeted_game==total=>",total),
          console.log("targeted_game==totaloutOf=>",totalEntries)}
          {total ? (
            <p>
              {totalEntries} <span>of {total}</span>
            </p>
          ) : (
            <p>
              {totalEntries}{" "}
              <span>
                of <img src={InfiniteEntry} alt="infinite entry" style={{verticalAlign: "inherit"}}/>
              </span>
            </p>
          )}
        </div>
        <div className={classes.__power_center_card_details}>
          <div
            className={classes.__power_center_card_details_link}
            onClick={() => {
              onDetailsClick(id);
            }}
          >
            Details
          </div>
          <div
            className={classes.__power_center_card_details_link_forward_arrow}
          >
            {">"}
          </div>
        </div>
      </div>
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
      game_set_start={game_set_start}
      prize={numberWithCommas(prize)}
      userHasEntered={userHasEntered}
      game_type={game_type}
    />
  );
};

export default PowerCenterCard;
