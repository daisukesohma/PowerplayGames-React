import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import classes from "./myGameCenterCard.module.scss";
import http from "../../config/http";
// import MLBPlayer from "../../assets/baseball-player-copy-new.png";
// import NFLPlayer from "../../assets/nfl-player.png";
// import NBAPlayer from "../../assets/nba-player.png";
// import NHLPlayer from "../../assets/new-hockey-playerlogo.png";
import MLBPlayerOppsite from "../../assets/baseball-player-copynew.png";
import NFLPlayer from "../../assets/nflCardBg.png";
import NBAPlayer from "../../assets/nbaCardBg.png";
import InfiniteEntry from "../../assets/invalid-name.svg";
import NHLPlayer from "../../assets/new-hockey-playerlogo.png";
import onenflbg from "../../assets/group-3-one-nfl.png";
import onenhlbg from "../../assets/group-3-one-nhl.png";
import MLBPlayerMobile from "../../assets/mobMLBCardBg.png";
import NFLPlayerMobile from "../../assets/mobNFLCardBg.png";
import NBAPlayerMobile from "../../assets/mobNBACardBg.png";
import NHLPlayerMobile from "../../assets/mobNHLCardBg.png";
import BlueTick from "../../assets/blue_tick.png";
import EditPencilIcon from "../../assets/icons/edit-pencil-primary.svg";
import PowerCenterCardDetails from "../PowerCenterCardDetails";
import OutlineButton from "../OutlineButton";
import ViewResults from "../../pages/MyGameCenter/ViewResults";
import FinalStandingsModal from "./FinalStandingsModal";
import LeaveGameModal from "./LeaveGameModal";
import { Carousel } from "react-responsive-carousel";
import PointSystem from "../PowerCenterCardDetails/PointSystem";
import PowersAvailable from "../PowerCenterMobileCard/PowersAvailable";
import PrizeGrid from "../PowerCenterMobileCard/PrizeGrid";
import TeamRoster from "../PowerCenterCardDetails/TeamRoster";
import Pitchers from "../PowerCenterMobileCard/Pitcher";
import PowerLearnMoreModal from "./PowerLearnMoreModal";
import { socket } from "../../config/server_connection";
import { CONSTANTS } from "../../utility/constants";
import ContestRules from "../PowerCenterCardDetails/ContestRules";
import * as MLBActions from "../../actions/MLBActions";
import { isEmpty } from "lodash";
import { printLog, redirectTo } from "../../utility/shared";
import rechargeHeading from "../../assets/rechargeIcon.png";

import BtcCurrency from "../../assets/btc-white.png";
import EthCurrency from "../../assets/ethereum-white.png";

import OrangePowerCurrency from "../../assets/power-orange.png";
import OrangeBtcCurrency from "../../assets/btc-orange.png";
import OrangeEthCurrency from "../../assets/ethereum-orange.png";
import LiveStandings from "../../components/LiveStandings";
import * as MLbActions from "../../actions/MLBActions";
import { useDispatch, useSelector } from "react-redux";
import WinnersPlayerDetails from "./WinnersPlayerDetails";
const MyGameCenterCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { liveStandings = [] } = useSelector((state) => state.nhl);
  const {
    ON_ROOM_SUB,
    ON_ROOM_UN_SUB,
    EMIT_ROOM,
    ON_POWER_APPLIED,
    ON_GLOBAL_RANKING_REQUEST,
    ON_FANTASY_LOGS_REQUEST,
    GET_GLOBAL_RANKING,
    MATCH_UPDATE,
    GLOBAL_RANKING,
    FANTASY_TEAM_UPDATE,
  } = CONSTANTS.SOCKET_EVENTS.MLB.LIVE;
  const {
    isMobile = false,
    id = null,
    title = "NHL",
    prize = 0,
    currentRank=0,
    currentWinnig=0,
    prize_currency = "USD",
    totalPoints = 0,
    outOf = null,
    total = 0,
    percent = null,
    inProgress = false,
    completed = false,
    editPicks = false,
    makePicks = false,
    timeToStart = "",
    viewResults = false,
    finalStandingsModal = false,
    game_set_start = "",
    start_time = "",
    PointsSystem = [],
    Power = [],
    PrizePayout = [],
    onDetailsClick = () => {},
    onBackClick = () => {},
    onNextClick = () => {},
    onEnter = () => {},
    onEdit = () => {},
    onViewResults = () => {},
    onViewResultsBack = () => {},
    onFinalStandings = () => {},
    game_id = 0,
    currency = "USD",
    game_type = "PowerdFS",
    end_time = "",
    game_set_end = "",
    showDetails=false,
    onWinnerClick=()=>{},
    showWinners=false,
    onWinnersBackClick=()=>{},
    totalEntries = 0,
  } = props || {};

  // const [showDetails, setShowDetails] = useState(false);
  // const [showWinners, setShowWinners] = useState(false);

  
  const [ranks, setRanks] = React.useState({
    ranking: 0,
    score: 0,
    game_id: 0,
    team_id: 0,
  });

  let _socket = null;

  React.useEffect(() => {
    _socket = socket();
    return function cleanUP() {
      //disconnect the socket
      _socket?.emit(ON_ROOM_UN_SUB);
      _socket?.on(ON_ROOM_UN_SUB, () => {
        _socket?.disconnect();
        _socket = null;
      });
    };
  }, []);
  React.useEffect(() => {
    if (_socket) {
      onSocketEmit(game_id, localStorage.PERSONA_USER_ID);
      onSocketListen();
    }
  }, [_socket]);
  //All Emit Events
  const onSocketEmit = (gameId, userId) => {
    _socket.emit(ON_ROOM_SUB, {
      gameId: gameId,
      userId: userId,
    });
  };

  //All listen events
  const onSocketListen = () => {
    //fetch data first time
    _socket?.on(EMIT_ROOM, (res) => {
      const { power_dfs_team_rankings = [] } = res?.data || {};

      // const teamD = defense[0] || {};
      setRanks(power_dfs_team_rankings[0] || {});
      // if (players && players?.length) {
      //   getPlayers(players, teamD);
      // }

      // const _gameLogs = [...game_logs];
      // const sortedGameLogs = _gameLogs.sort(
      //   (a, b) =>
      //     new Date(a?.play?.created_at).getTime() -
      //     new Date(b?.play?.created_at).getTime()
      // );

      // dispatch(MLBActions.setGameLogs(sortedGameLogs));
      // setLoading(false);
    });

    //MATCH_UPDATE
  };
  const getRank = (game_id) => {};

  const [leaveGameModal, setLeaveGameModal] = useState(false);
  const [powerLearnMoreModal, setPowerLearnMoreModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setModalState] = useState(false);
  const [isCompleted, setCompleted] = React.useState(0);

  // React.useEffect(async () => {
  //   const response = await dispatch(
  //     MLbActions.mlbData2(game_id)
  //   );
  //   console.log("response", response);
  //   setCompleted(response.completed);
  //   console.log("game_id", game_id);
  // },[game_id]);

  const getBackgroundImageWithStyle = () => {
    // let backgroundImageStyle = {
    //   backgroundRepeat: "no-repeat",
    //   backgroundAttachment: "inherit",
    //   border:
    //     (inProgress && "1px solid #214f24") ||
    //     (completed && "1px solid #8cc2ff"),
    // };
    // if (title === "MLB") {
    //   backgroundImageStyle.backgroundImage = `url(${MLBPlayer})`;
    //   //backgroundImageStyle.backgroundPosition = "-46px 18px";
    // } else if (title === "NFL") {
    //   backgroundImageStyle.backgroundImage = `url(${NFLPlayer})`;
    //   backgroundImageStyle.backgroundPosition = "100px 60px";
    // } else if (title === "NBA") {
    //   backgroundImageStyle.backgroundImage = `url(${NBAPlayer})`;
    //   backgroundImageStyle.backgroundPosition = "-75px 68px";
    // } else {
    //   backgroundImageStyle.backgroundImage = `url(${NHLPlayer})`;
    //   //backgroundImageStyle.backgroundPosition = "36px 106px";
    // }
    // return backgroundImageStyle;

    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
      border:
        (inProgress && "1px solid #214f24") ||
        (completed && "1px solid #8cc2ff"),
    };
    if (title === "MLB") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayerOppsite})`;
      //backgroundImageStyle.backgroundPosition = "100px 0px";
    } else if (title === "NFL" && game_type === "PowerdFs_One") {
      backgroundImageStyle.backgroundImage = `url(${onenflbg})`;
    } else if (title === "NFL") {
      backgroundImageStyle.backgroundImage = `url(${NFLPlayer})`;
      //backgroundImageStyle.backgroundPosition = "65px 60px";
    } else if (title === "NBA") {
      backgroundImageStyle.backgroundImage = `url(${NBAPlayer})`;
      //backgroundImageStyle.backgroundPosition = "-75px 68px";
    } else if (title === "NHL" && game_type === "PowerdFs_One") {
      backgroundImageStyle.backgroundImage = `url(${onenhlbg})`;
    } else {
      backgroundImageStyle.backgroundImage = `url(${NHLPlayer})`;
    }
    return backgroundImageStyle;
  };

  const getBackgroundImageWithStyleMobile = () => {
    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
      border: inProgress
        ? "1px solid #214f24"
        : completed
        ? "1px solid #688fbd"
        : "1px solid #17181a",
      backgroundColor: "#17181a",
      // backgroundSize: "auto"
    };
    if (title === "MLB") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayerMobile})`;
      //backgroundImageStyle.backgroundPosition = "180px -10px";
    } else if (title === "NFL") {
      backgroundImageStyle.backgroundImage = `url(${NFLPlayerMobile})`;
      backgroundImageStyle.backgroundPosition = "175px 0px";
    } else if (title === "NBA") {
      backgroundImageStyle.backgroundImage = `url(${NBAPlayerMobile})`;
      backgroundImageStyle.backgroundPosition = "35px -10px";
    } else {
      backgroundImageStyle.backgroundImage = `url(${NHLPlayerMobile})`;
      backgroundImageStyle.backgroundPosition = `calc(100% - 10px) 0px`;
    }
    return backgroundImageStyle;
  };

  const onLeaveClick = async (title) => {
    setIsLoading(true);
    let user_id = localStorage.PERSONA_USER_ID;

    if (game_id && user_id) {
      const res = await dispatch(MLBActions.leaveGame(user_id, game_id));
      if (res) {
        if(title=="NHL"){
         let resp=await http.delete(`http://localhost:4001/api/v1/services/fantasy/exitFantasyGame?userID=${user_id}&gameID=${game_id}`);
            if(resp){
              window.location.reload();
            }
        }
        else{
          window.location.reload();
        }
      }
      setIsLoading(false);
    }
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
          {/* <span
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
          </span> */}
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
    }
  };

  const getTitleContestByGameType = (gameType) => {
    if (gameType === "PowerdFS") {
      return (
        <div
          className={classes.__my_game_center_card_powerdfs}
          style={{ marginTop: inProgress || !completed ? 5 : 10 }}
        >
          <span
            className={
              classes.__my_game_center_card_powerdfs_hr +
              " " +
              classes.__my_game_center_card_powerdfs_hr_left
            }
          ></span>
          <p className={classes.__my_game_center_card_powerdfs_title}>
            <span
              className={classes.__my_game_center_card_powerdfs_title_first}
            >
              {title}
            </span>{" "}
            PowerdFS
          </p>
          <span
            className={
              classes.__my_game_center_card_powerdfs_hr +
              " " +
              classes.__my_game_center_card_powerdfs_hr_right
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
            <img src={rechargeHeading} style={{ marginLeft: 2 }} />
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
    } else {
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

  return (
    <>
      {isMobile ? (
        <>
          <div
            className={`${classes.__my_game_center_card_mobile} w-100`}
            style={getBackgroundImageWithStyleMobile()}
          >
            <Carousel
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              autoPlay={false}
              infiniteLoop={true}
              interval={300000}
              swipeScrollTolerance={100}
            >
              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>{ game_id } In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}><span></span>{ game_id } Completed</div>
                    </div>
                  )}

                  <div
                    style={{
                      padding:
                        !inProgress && !completed && "31px 16px 0px 16px",
                    }}
                  >
                    <div className={classes.__my_game_center_card_date_time}>
                      {game_set_start} | {start_time} ET
                    </div>
                    {/* {inProgress || completed || timeToStart != "" ? ( */}
                    {total == outOf ? (
                      <div className={classes.__my_game_center_card_full}>
                        <div className={classes.__my_game_center_card_full_img}>
                          <img src={BlueTick} width="18" height="18" alt="" />
                        </div>
                        <div
                          className={classes.__my_game_center_card_full_text}
                        >
                          Full{" "}
                          {
                            <CurrencyFormat
                              value={total}
                              displayType={"text"}
                              thousandSeparator={total >= 10000 ? true : false}
                              renderText={(value) => value}
                            />
                          }
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* <div
                  style={{
                    marginLeft: 20,
                    color: "#f2f2f2",
                    opacity: 0.6,
                    textAlign: "left",
                  }}
                >
                  ID {game_id}
                </div> */}
                <div
                  className={classes.__my_game_center_card_powerdfs}
                  style={{ marginTop: inProgress || !completed ? 5 : 10 }}
                >
                  <div className={classes.__my_game_center_card_powerdfs_title}>
                    <p>
                      <span
                        className={
                          classes.__my_game_center_card_powerdfs_title_first
                        }
                      >
                        {title}
                      </span>{" "}
                      {game_type === "NHL_Fantasy" ? 'Fantasy' : 'PowerdFS'}
                    </p>
                  </div>
                </div>
                <div className={classes.__my_game_center_card_prize_pool}>
                  <p
                    className={
                      classes.__my_game_center_card_prize_pool_common +
                      " " +
                      classes.__my_game_center_card_prize_pool_price
                    }
                  >
                    <CurrencyFormat
                      value={currentWinnig}
                      displayType={"text"}
                      // thousandSeparator={true}
                      thousandSeparator={prize >= 10000 ? true : false}
                      prefix={"$"}
                      renderText={(value) => <div>{value}</div>}
                    />
                    {/* ${prize} */}
                  </p>
                  <p
                    className={
                      classes.__my_game_center_card_prize_pool_common +
                      " " +
                      classes.__my_game_center_card_prize_pool_text
                    }
                  >
                    {inProgress ? "Currently Winning" : "Prize Pool"}
                  </p>
                </div>
                {inProgress || completed || timeToStart != "" ? null : (
                  <div className={classes.__my_game_center_card_total}>
                    {/* <p>
                      {outOf}
                      <span> of {total}</span>
                    </p> */}
                     {total ? (
                        <p>
                          {outOf} <span>of {total}</span>
                        </p>
                      ) : (
                        <p>
                          {outOf}{" "}
                          <span>
                            of <img src={InfiniteEntry} alt="infinite entry" style={{
                              width: "auto",
                              marginLeft: 3,
                              marginTop: 7,
                              marginBottom: 9                            
                              }}/>
                          </span>
                        </p>
                      )}
                  </div>
                )}
                {timeToStart && (
                  <div
                    className={
                      classes.__my_game_center_card_buttons_time_to_start
                    }
                  >
                    {timeToStart}
                  </div>
                )}
                {inProgress && (
                  <div
                    className={
                      classes.__my_game_center_card_buttons_your_current_rank
                    }
                  >
                    {title==="NHL" ? currentRank:ranks.ranking}
                    <br /> <span>Your Current Rank</span>
                  </div>
                )}
                Prize Pool
                <div
                  className={`${classes.__my_game_center_card_buttons} d-flex align-items-center justify-content-between`}
                >
                  {!completed && (
                    <OutlineButton
                      title="Team Manager"
                      onClick={onEnter}
                      styles={{
                        width: "140px",
                        fontSize: "12px",
                        margin: ".25rem",
                        height: 33,
                        flex: 1,
                      }}
                    />
                  )}

                  {editPicks && (
                    <OutlineButton
                      title="Edit Picks"
                      onClick={onEdit}
                      styles={{
                        width: "140px",
                        fontSize: "12px",
                        margin: ".25rem",
                        height: 33,
                        flex: 1,
                      }}
                      icon={
                        <img
                          alt="Edit Icon"
                          src={EditPencilIcon}
                          width="16px"
                          height="16px"
                        />
                      }
                    />
                  )}

                  {makePicks && (
                    <OutlineButton
                      title="Make Picks"
                      onClick={onEnter}
                      styles={{
                        width: "140px",
                        fontSize: "12px",
                        margin: ".25rem",
                        height: 33,
                        flex: 1,
                      }}
                    />
                  )}

                  {completed && (
                    <OutlineButton
                      title="View Results"
                      onClick={(game_id) => {
                        console.log("game_id", game_id);
                        //onFinalStandings(game_id)
                      }}
                      styles={{
                        // marginTop: 14,
                        margin: ".25rem",
                        fontSize: "12px",
                        height: 33,
                        flex: 1,
                        marginTop: 45,
                        color: "#688fbd",
                        border: "1px solid #688fbd",
                      }}
                    />
                  )}
                </div>
                <div style={{ textAlign: "left", paddingLeft: 20 }}>
                  <span style={{ fontSize: 10 }}>ID {game_id}</span>
                </div>
              </>

              {/* today */}
              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>{ game_id } In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span> { game_id } Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                {/* <PrizeGrid
                  getBackgroundImageWithStyle={getBackgroundImageWithStyle()}
                  PrizePayout={PrizePayout}
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                /> */}
                <ContestRules
                title={title}
                game_type={game_type}
                  game_set_start={game_set_start}
                  prize={prize}
                  powers={Power}
                  points={PointsSystem}
                  isMobileGameCenter={true}
                  showDateTime={false}
                />
              </>
              {/* today */}

              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>{ game_id } In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>{ game_id } Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <PrizeGrid
                  game_type={game_type}
                  getBackgroundImageWithStyle={getBackgroundImageWithStyle()}
                  PrizePayout={PrizePayout}
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                  game_set_start={game_set_start}
                  start_time={start_time}
                  showDateTime={false}
                />
              </>

              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>{ game_id } In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>{ game_id } Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <PowersAvailable
                  game_type={game_type}
                  Power={Power}
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                  learnMore={() => setPowerLearnMoreModal(true)}
                  game_set_start={game_set_start}
                  start_time={start_time}
                  showDateTime={false}
                />
              </>

              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>{ game_id } In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>{ game_id } Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <PointSystem
                  game_type={game_type}
                  PointsSystem={PointsSystem}
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                  showDateTime={false}
                />
              </>

              {/* <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <Pitchers
                  title={title}
                  PointsSystem={PointsSystem}
                  game_set_start={game_set_start}
                  start_time={start_time}
                  showDateTime={false}
                />
              </> */}

              <>
                <div className={classes.__my_game_center_card_mobile_header}>
                  {inProgress && (
                    <div className={classes.__my_game_center_card_in_progress}>
                      <div className={classes.__in_progress}>
                        <span></span>{ game_id } In Progress
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className={classes.__my_game_center_card_completed}>
                      <div className={classes.__completed}>
                        <span></span>{ game_id } Completed
                      </div>
                    </div>
                  )}

                  {!completed && !inProgress && (
                    <div className={classes.__close_icon_div}>
                      <div
                        className={classes.__close_icon}
                        onClick={() => setLeaveGameModal(true)}
                      >
                        x
                      </div>
                    </div>
                  )}
                </div>
                <TeamRoster
                  game_type={game_type}
                  isMobile={isMobile}
                  title={title}
                  inProgress={inProgress}
                />
              </>
            </Carousel>
          </div>

          {leaveGameModal && (
            <LeaveGameModal
              isMobile={isMobile}
              title={title}
              onCancel={() => setLeaveGameModal(false)}
              onLeave={() => onLeaveClick(title)}
            />
          )}
          {powerLearnMoreModal && (
            <PowerLearnMoreModal
              isMobile={isMobile}
              title={title}
              onCancel={() => setPowerLearnMoreModal(false)}
            />
          )}
        </>
      ) : 
     !showWinners ?(
    
     !showDetails   ? 
      (
        !viewResults ? (
          <div
            className={classes.__my_game_center_card}
            style={getBackgroundImageWithStyle()}
          >
            {inProgress && (
              <div className={classes.__my_game_center_card_in_progress}>
                <div className={classes.__in_progress}>
                  <span></span>
                  {game_id} In Progress
                </div>
              </div>
            )}
            {completed && (
              <div className={classes.__my_game_center_card_in_completed}>
                <div className={classes.__completed}>
                  <span></span>
                  {game_id} Completed
                </div>
              </div>
            )}
            {!completed && !inProgress && (
              <div
                className={classes.__close_icon}
                onClick={() => setLeaveGameModal(true)}
              >
                x
              </div>
            )}
            {!completed && !inProgress && (
              <span
                style={{
                  marginLeft: 24,
                  color: "#f2f2f2",
                  opacity: 0.6,
                  marginTop: 0,
                  fontSize: 10,
                  position: "absolute",
                  top: 5,
                }}
              >
                ID {game_id}
              </span>
            )}

            {getTitleContestByGameType(game_type)}
            {getDateContent()}
            {/* {getPrizeContestByGameType(game_type)} */}
            {/* {!completed && (
              <div className={classes.__start_time}>
                {game_set_start} | {start_time} ET
              </div>
            )}
            {completed && (
              <div className={classes.__start_time}>
                {game_set_start} | {start_time} ET
              </div>
            )} */}
            <div className={classes.__my_game_center_card_date_time}>
              {/* {userGames?.game?.game_set_end} | {userGames?.game?.start_time} ET */}
            </div>
            <div
              className={classes.__my_game_center_card_prize_pool}
              style={{
                margin: "0 24px",
                textAlign: game_type === "PowerdFS" ? "center" : "left",
              }}
            >
              <p
                className={
                  classes.__my_game_center_card_prize_pool_common +
                  " " +
                  classes.__my_game_center_card_prize_pool_price
                }
                style={{
                  textAlign: game_type === "PowerdFS" ? "center" : "left",
                }}
              >
                {/* {console.log("currentRank==>", currentRank?._id?.gameID==game_id)}
                {console.log(currentRank?._id?.userID==user_id && currentRank?._id?.gameID==game_id ?(currentRank.prize):(prize))} */}
                <CurrencyFormat
                  value={currentWinnig}
                  displayType={"text"}
                  thousandSeparator={currentWinnig >= 10000 ? true : false}
                  prefix={"$"}
                  renderText={(value) => <div>{value}</div>}
                />
              </p>
              <p
                className={
                  classes.__my_game_center_card_prize_pool_common +
                  " " +
                  classes.__my_game_center_card_prize_pool_text
                }
                style={{
                  textAlign: game_type === "PowerdFS" ? "center" : "left",
                  fontWeight: "normal",
                }}
              >
                {inProgress ? "Currently Winning" : "Prize Pool"}
              </p>
              <p>
              {inProgress && (
                <div
                  className={
                    classes.__my_game_center_card_buttons_your_current_rank
                  }
                >
                  <div className={classes.rank__number}>
                     {title==="NHL" ? currentRank:ranks.ranking}
                  </div>
                  <div className={classes.rank__title}>Your Current Rank</div> 
                </div>
              )}
              </p>
            </div>
            <div className={classes.__my_game_center_card_buttons}>
              {timeToStart && (
                <div
                  className={
                    classes.__my_game_center_card_buttons_time_to_start
                  }
                >
                  {timeToStart}
                </div>
              )}

            
              {!completed && (
                <OutlineButton title="Manage my Team" onClick={onEnter} />
              )}

              {editPicks && (
                <OutlineButton
                  title="Edit Picks"
                  onClick={onEdit}
                  styles={{ marginTop: 14 }}
                  icon={
                    <img
                      alt="Edit Icon"
                      src={EditPencilIcon}
                      width="16px"
                      height="16px"
                    />
                  }
                />
              )}

              {makePicks && (
                <OutlineButton title="Make Picks" onClick={onEnter} />
              )}
              {completed && (
                <OutlineButton
                  title="View Results"
                  onClick={() => {
                    onFinalStandings(game_id);
                    setModalState(true);
                    
                  }}
                  styles={{
                    marginTop: 14,
                    backgroundColor: "rgba(104, 143, 189, 0.06)",
                    color: "#688fbd",
                    border: "solid 1px #688fbd",
                  }}
                />
              )}
            </div>
            <div className={classes.__my_game_center_card_status_and_details}>
              {/* {inProgress || completed || timeToStart != "" ? ( */}
              {total == outOf ? (
                <div className={classes.__my_game_center_card_full}>
                  <div className={classes.__my_game_center_card_full_img}>
                    <img src={BlueTick} width="18" height="18" alt="" />
                  </div>
                  <div className={classes.__my_game_center_card_full_text}>
                    Entries :{" "} {totalEntries}
                    {/* <CurrencyFormat
                      value={total}
                      displayType={"text"}
                      thousandSeparator={total >= 10000 ? true : false}
                      renderText={(value) => value}
                    /> */}
                  </div>
                </div>
              ) : (
                <div className={classes.__my_game_center_card_total}>
                  {/* <p>
                    {outOf}
                    <span> of {total}</span>
                  </p> */}
                   {total ? (
            <p>
              {outOf} <span>of {total}</span>
            </p>
          ) : (
            <p>
              {outOf}{" "}
              <span>
                of <img src={InfiniteEntry} alt="infinite entry" style={{
                              width: "auto",
                              marginLeft: 3,
                              marginTop: 7,
                              marginBottom: 9                            
                            }}/>
              </span>
            </p>
          )}
                </div>
              )}

              <div className={classes.__my_game_center_card_details}>
                {completed ? (
                  <div
                    className={classes.__my_game_center_card_details_link}
                    onClick={() =>{
                      // onViewResults(id, game_id);
                      onWinnerClick(game_id);
                      // setShowDetails(false);
                    }}
                  >
                    Winners
                  </div>
                ) : (
                  <div
                    className={classes.__my_game_center_card_details_link}
                    onClick={() => {
                      onDetailsClick(game_id);
                      // setShowDetails(true);
                    }}
                  >
                    Details
                  </div>
                )}
                <div
                  className={
                    classes.__my_game_center_card_details_link_forward_arrow
                  }
                >
                  {">"}
                </div>
              </div>
            </div>
            {finalStandingsModal && (
              <FinalStandingsModal
                isVisible={finalStandingsModal}
                onClose={() => onFinalStandings(-1)}
                gameId={game_id}
                game_set_start={game_set_start}
                start_time={start_time}
                prize={prize}
                currency={currency}
              />
            )}
            {leaveGameModal && (
              <LeaveGameModal
                title={title}
                onCancel={() => setLeaveGameModal(false)}
                onLeave={() => onLeaveClick(title)}
              />
            )}
          </div>
        ) : (
          <ViewResults
            title={title}
            onViewResultsBack={() => onViewResultsBack()}
          />
        )
      ) : (
        <>{
          <PowerCenterCardDetails
            Power={Power}
            PrizePayout={PrizePayout}
            PointsSystem={PointsSystem}
            title={title}
            onBackClick={() => {onBackClick(); }}
            onNextClick={() => onNextClick()}
            myGameCenter={true}
            game_set_start={game_set_start}
            prize={prize}
            hideCard={() => {
              // setShowDetails(false);
            }}
            game_type={game_type}
          />}
        </>
      )
  ):( 
    <>
    <WinnersPlayerDetails
        isWinner={true}
        gameId={game_id}
        title={title}
        onBackClick={() => {onWinnersBackClick();}}
        prize={prize}
        endTime={end_time}
        gameSetEnd={game_set_end}
        completed={completed}
       
      />
    </>
  )}
      <LiveStandings
        visible={showModal}
        onClose={() => { setModalState(false) }}
        liveStandingData={liveStandings}
        endTime={end_time}
        gameSetEnd={game_set_end}
        completed={completed}
        prizePool={prize}
      />
    </>
  );
};

export default MyGameCenterCard;
