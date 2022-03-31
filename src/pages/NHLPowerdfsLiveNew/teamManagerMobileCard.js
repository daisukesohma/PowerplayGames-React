import { Carousel } from "react-responsive-carousel";
import { useSelector } from 'react-redux';
import moment from "moment";
import { hasText } from "../../utility/shared";
import styles from './styles.module.scss';
import ClockIcon from "../../assets/icons/nhl/clock.svg";
import HockeyIcon from "../../assets/icons/nhl/hockey.svg";
import SoccerJerseyIcon from "../../assets/icons/nhl/soccer-jersey.svg";
import { useState } from "react";
import SwapModalMobile from "../../components/mobilecomponents/SwapModal";
import * as nhlActions from "../../actions/NHLActions";
import { isEmpty } from "lodash";
//import cardTeamImage from '../../assets/images/fanatics.jpg';
const TeamManagerMobileCard = (props) => {
    const { playerData = {}, type = '', setSecondModal, playerList, starPlayerCount, loadingPlayerList, selectedTeam, toggleReplaceModal, updateReduxState } = props;
    const { gameID } = selectedTeam || {};
    const [showReplaceModal, setReplaceModalState] = useState(false);
    const closeRenderModal = () => {
        setReplaceModalState(false);
    };

    const {
        fantasyPlayerPosition = "",
        full_name = "",
        id = "",
        match = {},
        positionID = 0,
        teamId = "",
        name = ""
    } = playerData;
    const { home = {}, away = {}, status = "Scheduled", scheduled = "", id: matchId } = match;
    const { 
        live_match_events = {}, 
        match_status = [],
        live_clock = "20:00",
        live_period = 0,
        live_strength = "even",
        setNhlEventData = [],
        live_team_logs = [],
        teamDPts = 0
    } = useSelector((state) => state.nhl);
    const { 
        playerActualScore = [], 
        posD1Points = 0,
        posD2Points = 0,
        posXW1Points = 0,
        posXW2Points = 0,
        posXW3Points = 0,
        posCenterPoints = 0,
        posGoaliePoints = 0,
        teamDActual = []
    } = live_team_logs;
    const getTeamPoints = (id, id2) => {
        let filteredData = match_status.filter(x => x.id == id);
        if(filteredData.length > 0)
        {
          let a = filteredData[filteredData.length - 1];
          if(a.away.id == id2){
            return a?.away?.points;
          }
          if(a.home.id == id2){
            return a?.home?.points;
          }
        }
        return false;
    };
    const getTeamDetails = (id) => {
        let filteredData = match_status.filter(x => x?.id == id);
        if(filteredData?.length > 0)
        {
          let a = filteredData[filteredData.length - 1];
          return a;
        }
        return false;
    };
    const getTeamData = (id) => {
        let liveClockData = setNhlEventData.filter(x => x?.id  == id);
        if(liveClockData?.length > 0)
        {
            let a = liveClockData[liveClockData.length - 1];      
            return a;
        }
        return false
    };
    const getStatus = (type) => {
        if (
          `${status}`?.toLocaleLowerCase() === "scheduled" &&
          moment().diff(moment(scheduled).format()) < 0
        ) {
          return `${moment(scheduled).format("MMM Do")} - ${moment(
            scheduled
          ).format("hh:mm A")}`;
        } else {
          let getMatchStatusDetails = match_status?.filter(x => x?.id == (type=='nhl'?matchId:match?.id));
          if(getMatchStatusDetails.length > 0)
          {
            let a = getMatchStatusDetails[getMatchStatusDetails.length - 1];
            return a?.status;
          }
          return status;
        }
        return status;
    };
    const RenderStatus = ({ success = false, danger = false }) => (
        <p className={styles.status}>
            {getStatus("nhl")=='inprogress' && setNhlEventData?.length==0?"starting soon":getStatus("nhl")}
        </p>
    );

    const onSwap = async (player,swapPlayer) => {
        console.log("onSwap", player, swapPlayer);
        
        // console.log("swapResponse", swapResponse);
        // console.log("props.swapCount", props.swapCount);
        if (props.swapCount === 0) {
          alert("You cannot swap the players.");
          return;
        }
        const [swapablePlayer] =
          !isEmpty(playerList) &&
          playerList?.listData?.length &&
          playerList?.listData?.filter(
            (player1) =>
              player1?.id === swapPlayer?.id && player1?.match?.id === swapPlayer?.match?.id
          );
    
    
        if (swapablePlayer) {
          let payload = {
            gameID: gameID,
            userID: localStorage.getItem('PERSONA_USER_ID'),
            playerID: player?.id,
            swapPlayerID: swapPlayer?.id,
            swapPlayerPositionID: player?.fantasyPlayerPosition + player?.positionID,
            period: live_period,
            timeApplied: live_clock
          }
          let swapResponse = await nhlActions.swapPlayer(payload);
          if(swapResponse.status == 200) {
            updateReduxState(player, swapablePlayer);
            closeRenderModal();
            props.getFantasyTeam();
            //props.useSwap(player, true);
          }
        }
      };

    return (
        <div className={styles.liveCards}>
            <div className={styles.overLine}></div>
            <div className={styles.positionHeading}>
                <span className={styles.position}>{type == "TD" ? "Team D" : fantasyPlayerPosition}{["XW","D"].indexOf(fantasyPlayerPosition) > -1 ? positionID : ""}:</span>
                {type == 'TD' ? (
                    <span className={styles.points}>{teamDPts} Pts</span>
                ) : (
                    <span className={styles.points}>
                        {fantasyPlayerPosition === "C" ? posCenterPoints : null}
                        {fantasyPlayerPosition === "G" ? posGoaliePoints : null}
                        {fantasyPlayerPosition === "D" && positionID === 1
                            ? posD1Points
                            : null}
                        {fantasyPlayerPosition === "D" && positionID === 2
                            ? posD2Points
                            : null}
                        {fantasyPlayerPosition === "XW" && positionID === 1
                            ? posXW1Points
                            : null}
                        {fantasyPlayerPosition === "XW" && positionID === 2
                            ? posXW2Points
                            : null}
                        {fantasyPlayerPosition === "XW" && positionID === 3
                            ? posXW3Points
                            : null}{" "} Pts
                    </span>
                )}
            </div>
            <div className={styles.mainDiv}>
                <div className={styles.leftSide + " leftSide"}>
                <Carousel
                autoPlay={false}
                showArrows={false}
                showIndicators={false}
                showStatus={false}
                infiniteLoop={true}
                interval={300000}
                swipeScrollTolerance={100}
                >
                    <div className={styles.cardStats}>
                        <p className={styles.playerName}>{type == "TD" ? name : full_name}</p>
                        <p className={styles.playersStats}>
                            {type == "TD" ? ( 
                                <>
                                    GA: {teamDActual && teamDActual?.goalsAgainst?teamDActual?.goalsAgainst:0} | SA: {teamDActual && teamDActual?.shotsAgainst?teamDActual?.shotsAgainst:0}
                                </> ) : (
                                    <>
                                        G: {playerActualScore?.find(x => x.playerID == id)?playerActualScore?.find(x => x.playerID == id)?.goals+playerActualScore?.find(x => x.playerID == id)?.overTimeGoals+playerActualScore?.find(x => x.playerID == id)?.shortHandedGoals : "0"} | A: {playerActualScore?.find(x => x.playerID == id)?playerActualScore?.find(x => x.playerID == id)?.assists:"0"} | SOG: {playerActualScore?.find(x => x.playerID ==  id)?playerActualScore?.find(x => x.playerID ==  id)?.shotsOnGoal:"0"}
                                    </>
                                )
                            }
                            
                        </p>
                        {<RenderStatus
                          success={
                            hasText(status, "batting") ||
                            hasText(status, "pitching") ||
                            hasText(status, "hitting")
                          }
                          danger={hasText(status, "deck")}
                        />}
                        <div className={styles.bottomStats}>
                            <p className={styles.teams}>
                                <span>
                                    <img src={HockeyIcon} alt="Hockey Icon" width={12} height={12} />
                                </span>
                                {type == "TD" && (
                                    playerData.alias == away?.alias ? 
                                        <><span>{away?.alias} {getTeamPoints(match?.id, away?.id) !== false ? getTeamPoints(match?.id, away?.id) : 0}</span> vs {home.alias} {getTeamPoints(match?.id, home?.id) !== false ? getTeamPoints(match?.id, home?.id) : 0}</>
                                    :
                                    playerData.alias == home?.alias && 
                                        <>{away?.alias} {getTeamPoints(match?.id, away?.id) !== false ? getTeamPoints(match?.id, away?.id) : 0} vs <span>{home.alias} {getTeamPoints(match?.id, home?.id) !== false ? getTeamPoints(match?.id, home?.id) : 0}</span></>
                                    )
                                }
                                {type == "" && (
                                    teamId == away?.id ? 
                                        <><span>{away?.alias} {getTeamPoints(match?.id, away?.id) !== false ? getTeamPoints(match?.id, away?.id) : 0}</span> vs {home.alias} {getTeamPoints(match?.id, home?.id) !== false ? getTeamPoints(match?.id, home?.id) : 0}</>
                                    :
                                    teamId == home?.id && 
                                        <>{away?.alias} {getTeamPoints(match?.id, away?.id) !== false ? getTeamPoints(match?.id, away?.id) : 0} vs <span>{home.alias} {getTeamPoints(match?.id, home?.id) !== false ? getTeamPoints(match?.id, home?.id) : 0}</span></>
                                    )
                                }
                            </p>
                            <p className={styles.periods}>
                                <span>
                                    <img src={ClockIcon} alt="Hockey Icon" width={12} height={12} />
                                </span>
                                P{getTeamDetails(match?.id) !== false ? (getTeamDetails(match?.id)?.period) : (live_period)} | {getTeamDetails(match?.id) !== false ? (typeof getTeamDetails(match?.id)?.eventData !== "undefined") ? getTeamDetails(match?.id)?.eventData?.clock : live_clock : live_clock}
                            </p>
                            <p className={styles.evens}>
                                <span>
                                    <img src={SoccerJerseyIcon} alt="Hockey Icon" width={12} height={12} />
                                </span>
                                {getTeamData(match?.id) !== false && (getTeamData(match?.id)?.home?.strength)==="even" 
                                    ? "Even Strength"
                                    : (getTeamData(match?.id)?.home?.strength) === undefined ? "Even Strength" : (getTeamData(match?.id)?.home?.alias ?getTeamData(match?.id)?.home?.alias:getTeamData(match?.id)?.home?.name +" "+ getTeamData(match?.id)?.home?.strength)
                                }
                            </p>
                        </div>
                    </div>
                    {/* <div className={styles.playerStatsSection}>
                        <p className={styles.playerName}>Aaron Rodgers</p>
                        <p className={styles.pointSummary}>
                            Points Summary
                        </p>
                        <div className={styles.statsTable}>
                            <div className={styles.top}>
                                <p>Time</p>
                                <p>Type</p>
                                <p>Power</p>
                                <p>Pts</p>
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                                <div className={styles.top}>
                                    <p>P1: 20:00</p>
                                    <p>Goal</p>
                                    <p>2x</p>
                                    <p>4</p>
                                </div>
                            </div>
                        </div>
                        <p className={styles.status}>
                            Total Points: 27
                        </p>
                    </div>
                    <div className={styles.teamImage}>
                        <img src={cardTeamImage} />
                    </div> */}
                </Carousel>
                </div>
                <div className={styles.fixedRight}>
                    <div className={styles.points}>
                        <p>Points</p>
                        {type == 'TD' ? (
                            <span className={styles.points}>{teamDPts}</span>
                        ) : (
                            <span className={styles.points}>
                                {fantasyPlayerPosition === "C" ? posCenterPoints : null}
                                {fantasyPlayerPosition === "G" ? posGoaliePoints : null}
                                {fantasyPlayerPosition === "D" && positionID === 1
                                    ? posD1Points
                                    : null}
                                {fantasyPlayerPosition === "D" && positionID === 2
                                    ? posD2Points
                                    : null}
                                {fantasyPlayerPosition === "XW" && positionID === 1
                                    ? posXW1Points
                                    : null}
                                {fantasyPlayerPosition === "XW" && positionID === 2
                                    ? posXW2Points
                                    : null}
                                {fantasyPlayerPosition === "XW" && positionID === 3
                                    ? posXW3Points
                                    : null}{" "}
                            </span>
                        )}
                    </div>
                    <div className={styles.powers}>
                        {/*In future if want to add third power please remove below comment*/}
                        {/* <button style={{ background: "none", borderWidth: 0 }}>
                            <img
                                src={`/images/retro-boostBig.svg`}
                                alt="PowerName"
                            />
                        </button> */}
                        {type == 'TD' ? (
                            <>
                                <button style={{ background: "none", borderWidth: 0 }}>
                                    <img
                                        src={`/images/challenge-power.svg`}
                                        alt="PowerName"
                                    />
                                </button>
                                <button style={{ background: "none", borderWidth: 0 }}>
                                    <img
                                        src={`/images/sheilds.svg`}
                                        alt="PowerName"
                                    />
                                </button>
                            </>
                        ) : (
                            <>
                                <button style={{ background: "none", borderWidth: 0 }} onClick={() => {toggleReplaceModal(playerData); setReplaceModalState(true)}}>
                                    <img
                                        src={`/images/repeat.svg`}
                                        alt="PowerName"
                                    />
                                </button>
                                <button style={{ background: "none", borderWidth: 0 }} onClick={() => setSecondModal(true)}>
                                    <img
                                        src={`/images/xp.svg`}
                                        alt="PowerName"
                                    />
                                </button>
                            </>
                        )}
                        
                    </div>
                </div>
            </div>
            <SwapModalMobile
                player={playerData}
                visible={showReplaceModal}
                onClose={closeRenderModal}
                onSwap={onSwap}
                scrollable={true}
                playerList={playerList}
                starPlayerCount={starPlayerCount}
                loading={loadingPlayerList}
                dataMain={selectedTeam}
                pageType="nhl"
            />
    </div>
    );
};
export default TeamManagerMobileCard;