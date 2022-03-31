import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ClockIcon from "../../icons/Clock2";
import CalenderIcon from "../../icons/Calendar2";
import StadiumIcon from "../../icons/Stadium2";
import Tick2 from "../../icons/Tick2";
import DeleteIcon from "../../assets/delete.png";
import PlusIcon from "../../assets/plus.png";
import StarIcon from "../../icons/Star";
import ForwardArrow from "../../icons/ForwardArrow";
import AidIcon from "../../icons/AidIcon";
import MLBPlayerStat from "./MLBPlayerStat";
import NFLPlayerStat from "./NFLPlayerStats";
import NHLPlayerStat from "./NHLPlayerStats";
import StarterStats from "./StarterStats";
import { PAGE_TYPES } from "./PageTypes";
import MLBDetailStats from "./MLBDetailStats";
import AdImage from "../../assets/img.jpg";
import { useDispatch, useSelector } from "react-redux";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./carousel.scss";

import { useMediaQuery } from "react-responsive";
import moment from "moment";

var teamsArray = [
  "Anaheim Ducks	Ducks	https://fanatics.93n6tx.net/c/2068372/620845/9663",
  "Arizona Coyotes	Coyotes	https://fanatics.93n6tx.net/c/2068372/620810/9663",
  "Boston Bruins	Bruins	https://fanatics.93n6tx.net/c/2068372/620812/9663",
  "Buffalo Sabres	Sabres	https://fanatics.93n6tx.net/c/2068372/620814/9663",
  "Calgary Flames	Flames	https://fanatics.93n6tx.net/c/2068372/620815/9663",
  "Carolina Hurricanes	Hurricanes	https://fanatics.93n6tx.net/c/2068372/620816/9663",
  "Chicago Blackhawks	Blackhawks	https://fanatics.93n6tx.net/c/2068372/620817/9663",
  "Colorado Avalanche	Avalanche	https://fanatics.93n6tx.net/c/2068372/620819/9663",
  "Columbus Blue Jackets	Jackets	https://fanatics.93n6tx.net/c/2068372/620820/9663",
  "Dallas Stars	Stars	https://fanatics.93n6tx.net/c/2068372/620822/9663",
  "Detroit Red Wings	Wings	https://fanatics.93n6tx.net/c/2068372/620823/9663",
  "Edmonton Oilers	Oilers	https://fanatics.93n6tx.net/c/2068372/620824/9663",
  "Florida Panthers	Panthers	https://fanatics.93n6tx.net/c/2068372/620825/9663",
  "Los Angeles Kings	Kings	https://fanatics.93n6tx.net/c/2068372/620826/9663",
  "Minnesota Wild	Wild	https://fanatics.93n6tx.net/c/2068372/620828/9663",
  "Montreal Canadiens	Canadiens	https://fanatics.93n6tx.net/c/2068372/620830/9663",
  "Nashville Predators	Predators	https://fanatics.93n6tx.net/c/2068372/620831/9663",
  "New Jersey Devils	Devils	https://fanatics.93n6tx.net/c/2068372/620833/9663",
  "New York Islanders	Islanders	https://fanatics.93n6tx.net/c/2068372/620835/9663",
  "New York Rangers	Rangers	https://fanatics.93n6tx.net/c/2068372/620836/9663",
  "Ottawa Senators	Senators	https://fanatics.93n6tx.net/c/2068372/620838/9663",
  "Philadelphia Flyers	Flyers	https://fanatics.93n6tx.net/c/2068372/620839/9663",
  "Pittsburgh Penguins	Penguins	https://fanatics.93n6tx.net/c/2068372/620840/9663",
  "San Jose Sharks	Sharks	https://fanatics.93n6tx.net/c/2068372/620841/9663",
  "Seattle Kracken	Kracken	https://fanatics.93n6tx.net/c/2068372/860547/9663?subId1=Seattle_Kraken",
  "St. Louis Blues	Blues	https://fanatics.93n6tx.net/c/2068372/620842/9663",
  "Tampa Bay Lightning	Lightning	https://fanatics.93n6tx.net/c/2068372/620843/9663",
  "Toronto Maple Leafs	Leafs	https://fanatics.93n6tx.net/c/2068372/620844/9663",
  "Vancouver Canucks	Canucks	https://fanatics.93n6tx.net/c/2068372/620845/9663",
  "Vegas Golden Knights	Knights	https://fanatics.93n6tx.net/c/2068372/620846/9663",
  "Washington Capitals	Capitals	https://fanatics.93n6tx.net/c/2068372/620847/9663",
  "Winnipeg Jets	Jets	https://fanatics.93n6tx.net/c/2068372/620848/9663",
];

function SportsSelectionCard3(props) {
  const [currentStep, setCurrentStep] = useState(0);
  const {setNhlEventData=[]}=useSelector((state)=>state.nhl)
  const {
    live_clock = "20:00",
    live_period = 0,
  } = useSelector((state) => state.nhl);
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  const {
    player = {},
    loading = false,
    onSelectDeselect = (id, matchId) => { },
    disabled = false,
    isSelected = false,
    btnTitle = "+ Select",
    btnIcon = "",
    pageType = PAGE_TYPES.MLB,
    type = "",
    showArrow = true,
    image,
  } = props || {};

  const {
    playerId = "",
    full_name: playerName = "",
    id = "",
    full_name = "",
    homeTeam = "",
    awayTeam = "",
    date = "",
    time = "",
    stadium = "",
    isStarPlayer = false,
    playerStats = {},
    position = "",
    match_id,
    primary_position = "",
    is_star_player = false,
    is_starPlayer = false,
    injured = false,
    is_injured = false,
    isInjured = false,
    status = "",
    match = {},
    seasons = [],
    team = {},
  } = player || {};
  const { home = {}, away = {}, scheduled, venue = {} } = match || {};

  const { teams = [] } = seasons[seasons.length - 1] || {};
  const { statistics = {}, goaltending = {} } = teams[teams.length - 1] || {};

  // let [teams, setTeams] = useState([]);
  // let [statistics, setStatistics] = useState({});

  // useEffect(() => {
  //   if (seasons) {
  //     if (seasons.length > 0) {
  //       setTeams(seasons[seasons.length - 1]);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (teams) {
  //     for (let item of teams) {
  //       if (item.id == team.id) {
  //         setStatistics(item.statistics);
  //         break;
  //       }
  //     }
  //   }
  // }, [teams]);
  const getTeamData = (id) => {
    let liveClockData = setNhlEventData.filter(x => x?.id  == id);
      if(liveClockData?.length > 0)
      {
        let a = liveClockData[liveClockData.length - 1];
        return a;
      }
    return false
  };
  const checkIfIsStarPlayer = () => {
    if (pageType === PAGE_TYPES.NHL) {
      if (is_starPlayer) return true;
    } else {
      if (type == "p" || type == "P") {
        if (player?.playerStats?.earned_runs_average < 3.5) {
          return true;
        }
      } else {
        if (
          player?.playerStats?.batting_average > 0.29 ||
          player?.playerStats?.home_runs > 30
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const nextStep = () => {
    let _currentStep = currentStep;
    if (_currentStep == 0) {
      _currentStep = 2;
    } else if (_currentStep == 2) {
      _currentStep = 0;
    }
    // if (currentStep !== 2) {
    //   _currentStep++;
    // } else {
    //   _currentStep = 0;
    // }

    setCurrentStep(_currentStep);
  };

  const renderStats = () => {
    switch (pageType) {
      case PAGE_TYPES.MLB:
        return (
          <MLBPlayerStat
            playerStats={playerStats}
            active={isSelected}
            position={type}
          />
        );

      case PAGE_TYPES.NFL:
        return (
          <NFLPlayerStat
            playerStats={playerStats}
            active={isSelected}
            position={primary_position}
          />
        );

      case PAGE_TYPES.NHL:
        return (
          <NHLPlayerStat
            playerStats={{ statistics, goaltending }}
            active={isSelected}
            position={type}
          />
        );

      default:
        return <MLBPlayerStat playerStats={playerStats} active={isSelected} />;
    }
  };

  return (
    <div
      className={`${classes.container_body_card} ${checkIfIsStarPlayer()
        ? classes.container_body_card_start_power_background
        : ``
        } ${isSelected ? classes.activeBorder : ""}`}
    >
      {checkIfIsStarPlayer() && (
        <span className={classes.container_body_card_start_power}>
          <StarIcon solidcolor="#000" /> <p>Star Power</p>
        </span>
      )}
      <div className={classes.container_body_card_header_outer}>
        <div className={classes.container_body_card_header_outer_left}>
          <div className={classes.container_body_card_header}>
            <p
              className={`${classes.container_selected_p} ${isSelected ? classes.active : ""
                }`}
            >
              {pageType === PAGE_TYPES.NHL ? (
                <>
                {!isSelected ? (
                  <>
              <img
                onClick={() => {
                  if (pageType === PAGE_TYPES.NHL) {
                    if(btnTitle == "Swap" || btnTitle == "swap")
                    {
                      onSelectDeselect(player);
                    }
                    else {
                      onSelectDeselect(id, match?.id);
                    }
                  } else {
                    onSelectDeselect(playerId, match?.id);
                  }
                }}
                src={PlusIcon}
                className={disabled && classes.disabled}
                disabled={disabled}
                style = {btnTitle !== "Swap" ? {
                  // backgroundColor: "#f2f2f233",
                  // border: "none",
                  // color: "#a9a9a9",
                  // fontSize: 12,
                  // fontWeight: 600,
                  // width: 84,
                  // height: 28,
                  // borderRadius: 4,
                  // display: "flex",
                  // alignItems: "center",
                  // justifyContent: "space-evenly"
                  marginRight: 5,
                  position: 'relative',
                  top: '-3px'
                } : {}}
              />
                {/* {btnIcon && btnIcon} {btnTitle || "+"}
              </button> */}
              </>
            ) : (
              // <div className={classes.container_selected}>
              //   <p className={classes.container_selected_p_1}>
              //     <Tick2 /> Selected{" "}
                  <img
                    src={DeleteIcon}
                    style = {btnTitle !== "Swap" ? {
                      // backgroundColor: "#f2f2f233",
                      // border: "none",
                      // color: "#a9a9a9",
                      // fontSize: 12,
                      // fontWeight: 600,
                      // width: 84,
                      // height: 28,
                      // borderRadius: 4,
                      // display: "flex",
                      // alignItems: "center",
                      // justifyContent: "space-evenly"
                      marginRight: 5,
                      position: 'relative',
                      top: '-3px'
                    } : {}}
                    onClick={() => onSelectDeselect(id, match?.id)}
                  />
              //   </p>
              // </div>
            )}
                  <span>{primary_position}</span>
                  {full_name}
                </>
              ) : (
                <>
                
                  <span>{primary_position}</span>
                  {playerName}
                </>
              )}
            </p>
            {(isInjured || is_injured || injured || status === "IR") && (
              <div className={classes.injured}>
                <AidIcon />
                <span>Injured</span>
              </div>
            )}
            
          </div>
          <div
            className={
              classes.card_state_main_container + " sports_selection_card_carousel"
            }
          >
            {isMobile ? (
              <Carousel
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                autoPlay={false}
                infiniteLoop={false}
                interval={1e11}
                swipeScrollTolerance={100}
              // className=".carousel .control-dots"
              >
                <>
                  {renderStats()}
                  <div className={classes.container_card_footer_main}>
                    <div className={classes.card_footer_left}>
                      <p>
                        <span className={player?.isFromAwayTeam ? classes.teamA : classes.teamB}>{away.name}</span> VS{" "}
                        <span className={player?.isFromHomeTeam ? classes.teamA : classes.teamB}>{home.name}</span>
                      </p>

                      <div className={classes.divider}></div>
                      <p className={classes.container_body_footer}>
                        {pageType === PAGE_TYPES.NHL ? (
                          <>
                            <span>
                              <ClockIcon /> {moment(scheduled).format("h:mm A")}
                            </span>
                            <span>
                              <CalenderIcon />
                              {moment(scheduled).format("YYYY-MM-DD")}
                            </span>
                            <span>
                              <StadiumIcon /> {venue.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              <ClockIcon /> {time}
                            </span>
                            <span>
                              <CalenderIcon /> {date}
                            </span>
                            <span>
                              <StadiumIcon /> {stadium}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </>

                {/* <MLBDetailStats position={primary_position} /> */}

                {/* <>
                  <StarterStats position={primary_position} />
                  <div
                    className={classes.container_card_footer_main}
                    style={{ marginTop: "10px" }}
                  >
                    <div className={classes.card_footer_left}>
                      <div className={classes.divider}></div>
                      <p className={classes.container_body_footer}>
                        {pageType === PAGE_TYPES.NHL ? (
                          <>
                            <span>
                              <ClockIcon /> {moment(scheduled).format("h:mm A")}
                            </span>
                            <span>
                              <CalenderIcon />
                              {moment(scheduled).format("YYYY-MM-DD")}
                            </span>
                            <span>
                              <StadiumIcon /> {venue.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              <ClockIcon /> {time}
                            </span>
                            <span>
                              <CalenderIcon /> {date}
                            </span>
                            <span>
                              <StadiumIcon /> {stadium}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </> */}

                {/* <img
                  src={AdImage}
                  onClick={() => {
                    if (pageType == "nhl") {
                      let teamName = player?.team?.name;
                      if (teamName) {
                        let teamIndex = teamsArray.findIndex(
                          (x) => x.indexOf(teamName) >= 0
                        );
                        if (teamIndex >= 0) {
                          let teamRecord = teamsArray[teamIndex];
                          let convertSpace = teamRecord.replaceAll(/\t/g, " ");
                          let splitted = convertSpace.split(" ");
                          window.open(splitted[splitted.length - 1]);
                        }
                      }
                    }
                  }}
                /> */}
              </Carousel>
            ) : (
              <>
                {currentStep === 0 ? (
                  renderStats()
                ) : currentStep === 1 ? (
                  <MLBDetailStats position={primary_position} />
                ) : (
                  <img
                    src={AdImage}
                    onClick={() => {
                      if (pageType == "nhl") {
                        let teamName = player?.team?.name;
                        if (teamName) {
                          let teamIndex = teamsArray.findIndex(
                            (x) => x.indexOf(teamName) >= 0
                          );
                          if (teamIndex >= 0) {
                            let teamRecord = teamsArray[teamIndex];
                            let convertSpace = teamRecord.replaceAll(/\t/g, " ");
                            let splitted = convertSpace.split(" ");
                            window.open(splitted[splitted.length - 1]);
                          }
                        }
                      }
                    }}
                  />
                )}
              </>
            )}
    
          </div>
          <p>
            <span className={classes.teamA} style={btnTitle == "Swap" ? {color: "#f2f2f2", fontWeight: 300} : away?.name?.indexOf(team?.name) > -1 ? {color: "#688fbd !important", fontWeight: 600} : {color: "#f2f2f2", fontWeight: 300}}>
              {PAGE_TYPES.NHL === pageType ? away?.name : awayTeam}
            </span>{" "}
            VS{" "}
            <span className={classes.teamB} style={btnTitle == "Swap" ? {color: "#f2f2f2", fontWeight: 300} : home?.name?.indexOf(team?.name) !== -1 ? {color: "#688fbd", fontWeight: 600} : {color: "#f2f2f2", fontWeight: 300}}>
              {PAGE_TYPES.NHL === pageType ? home?.name : homeTeam}
            </span>{" "}
          </p>
        </div>
        <div className={classes.container_body_card_header_outer_right}>
              {image?.length>0 && (
          <div onClick={()=> window.open(image[0].trackingLink, "_blank")}>
            <div className={classes.right_img}>
              <img src={require(`../../assets/nhl_teamd/${image[0].shortName}.png`).default } alt=""  />
              {/* <img src={TDShirtImage} alt="" /> */}
            </div>
          </div>

          )}
        </div>
      </div>
      {isMobile ? null : (
        <div className={classes.container_card_footer_main}>
          {currentStep === 0 && (
            <div className={classes.card_footer_left}>
              

              <div className={classes.divider}></div>
              <p className={classes.container_body_footer} style={btnTitle == "Swap" ? {justifyContent: "left"} : {}}>
                {pageType === PAGE_TYPES.NHL ? (
                  btnTitle == "Swap" ? (
                    <div className={classes.swap_div}>
                      <span className={classes.swap_span_first}>
                        {/* Bot. 7 */}
                        P{ getTeamData(player?.matchId) !== false ? (getTeamData(player?.matchId)?.period) : (live_period)} 
                      </span> | 
                      <span className={classes.swap_span_second}>
                        {/* 2 Out */}
                         {getTeamData(player?.matchId) !== false ? (typeof getTeamData(player?.matchId)?.eventData?.clock !== "undefined") ? getTeamData(player?.matchId)?.eventData?.clock : live_clock : live_clock}
                      </span> | 
                      <span className={classes.swap_span_last}>
                        {venue.name}
                      </span>
                    </div>
                  ) : (
                    <>
                    <span>
                      <ClockIcon /> {moment(scheduled).format("h:mm A")}
                    </span>
                    <span>
                      <CalenderIcon />
                      {moment(scheduled).format("YYYY-MM-DD")}
                    </span>
                    <span>
                      <StadiumIcon /> {venue.name}
                    </span>
                  </>
                  )
                ) : (
                  <>
                    <span>
                      <ClockIcon /> {time}
                    </span>
                    <span>
                      <CalenderIcon /> {date}
                    </span>
                    <span>
                      <StadiumIcon /> {stadium}
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
          {props.showArrow && (
            <div className={classes.card_footer_right} onClick={nextStep}>
              <ForwardArrow color={"#fb6e00"} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

SportsSelectionCard3.propTypes = {
  item: PropTypes.object,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  btnTitle: PropTypes.string,
  btnIcon: PropTypes.element,
  onSelectDeselect: PropTypes.func,
  loading: PropTypes.bool,
  pageType: PropTypes.string,
  type: PropTypes.string,
};

export default SportsSelectionCard3;
