import {React, useState,useEffect,useRef} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";

import "./stats.scss";
import HockeyIcon from "../../assets/icons/nhl/hockey.svg";
import ClockIcon from "../../assets/icons/nhl/clock.svg";
import SoccerIcon from "../../assets/icons/nhl/soccer.svg";
import SoccerJerseyIcon from "../../assets/icons/nhl/soccer-jersey.svg";
import * as NHLActions from "../../actions/NHLActions";


function NHLFooterStats(props) {
  const {
    player = {},
    isTeamD = false,
    teamD = {},
    onClickBack = () => {},
    onClickDetails = () => {},
    showSummary = false,
    largeView = false,
    title = "",
    cardType,
  } = props || {};
  const {
    live_match_events = {},
    match_status = [],
    
  } = useSelector((state) => state.nhl);
  const { live_team_logs = [] } = useSelector((state) => state.nhl);
  const {setNhlEventData=[]}=useSelector((state)=>state.nhl)
  const {live_players=[]}=useSelector((state)=>state.nhl)
  const {previousClock=""}=useSelector((state)=>state.nhl)

  const dispatch = useDispatch();

  const { players}=live_team_logs;
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

///live clock setup....

const [timeLeft, setTimeLeft] = useState("20:00");
const [oldClockData, setOldClockData] = useState(null)
const [checkClockData, setCheckClockData] = useState("20:00")

let myString = "20:00";

const calculateTimeLeft = (newClock) => {
  setCheckClockData(newClock)


  let myString1 = newClock
  let newminute1
  let newSecond1 
  let difference1;
  let myStringParts1
  let myStringParts
  let newminute
  let newSecond
  let newClockData;
  // console.log("differenceCal=upperTime==>",upperTime);
  let i=0
  const interval =  setInterval(async () => {
    // console.log("eventClock===newClock2222==>",newClockData);
    // if(!newClockData){
    //   newClockData=newClock
    // }
    if(newClockData===null || newClockData===undefined){
      myStringParts1 = myString1?.split(':')
     newminute1= myStringParts1[0]
     newSecond1= myStringParts1[1];
    difference1=moment({ minutes: "00", seconds: "10"}).add({ minutes: newminute1, seconds: newSecond1}).format('mm:ss');
     myStringParts = difference1.split(':')
     newminute= myStringParts[0]
     newSecond= myStringParts[1];
  }
  else{
    myStringParts = myString1?.split(':')
    newminute= myStringParts[0]
    newSecond= myStringParts[1];
    myStringParts1 = newClockData?.split(':')
    newminute1= myStringParts1[0]
    newSecond1= myStringParts1[1];
    difference1=moment({ minutes: newminute1, seconds: newSecond1}).subtract({ minutes: newminute1, seconds: newSecond1}).format('mm:ss');

  }
 

  let difference2=moment({ minutes: newminute, seconds: newSecond}).subtract({ minutes: newminute1, seconds: newSecond1}).format('mm:ss');
  // let differenceCal=moment.duration(`00:${difference2}`).asSeconds()
  let upperTime=moment.duration(`00:${difference1}`).asSeconds()
  // console.log("differenceCal=upperTime=",upperTime-i);
  let difference=upperTime-i
  if (moment.duration(`00:${difference2}`).asSeconds() >=i) {
    let formatted = moment.utc(difference*1000).format('mm:ss');
    // console.log("formatted==>",moment.duration(`00:${difference2}`).asSeconds());
    // console.log("formatted-----2--->",i);
    setTimeLeft(formatted)
    if (moment.duration(`00:${difference2}`).asSeconds() ==i){
      newClockData=formatted
      // await dispatch({
      //     type: NHLActions.NHL_UPDATE_STATE,
      //     payload: {
      //       previousClock:formatted,
      //     },
      //   });
      return true
        // clearInterval(interval);
    }
    i++
    }

  // const difference = +new Date(`${year}-10-1`) - +new Date();
  // // const difference = new Date().getTime(myString) - new Date().getTime(myString1);

  // console.log("doisisisisisisissi--->",new Date());
  // console.log("doisisisisisisissi2--->",new Date().getTime(newClock));
  // // const total = Date.parse() - Date.parse(new Date());

  // let timeLeft = {};
  // console.log("differenceCal[0]==>",difference2);
  // if (moment.duration(`00:${difference2}`).asSeconds() > 0) {
  //   timeLeft = {
  //     minutes: Math.floor((difference2 / 1000 / 60) % 60),
  //     seconds:Math.floor((difference2 / 1000) % 60),
  //   };
  // }
  // console.log("timeLeft=====>",moment.duration(`00:${difference2}`).asSeconds());
  // return difference2

  }, 1000);
  // clearInterval(interval);

};



const timerComponents = [];
timeLeft &&Object.keys(timeLeft).forEach((interval) => {
  if (!timeLeft[interval]) {
    return;
  }
  if(interval=='minutes')
  timerComponents.push(
    <span>
      {timeLeft[interval]}{":"}
    </span>
  );
  else{
    timerComponents.push(
      <span>
        {timeLeft[interval]}
      </span>
    );
  }
});

  const getTeamPoints1 = (id) => {
    let filteredData = match_status.filter(x => x?.id == id);
    if(filteredData?.length > 0)
    {
      let a = filteredData[filteredData.length - 1];
      return a;
    }
    return false;
  };
  // console.log("setNhlEventData==>",setNhlEventData);

  // useEffect(() => {
  //   let difference2
  //   let newminute1="18"
  //   let newSecond1="30"
  // //   console.log(`initializing interval`);
  // //   let j="19:55"
  // //   // const interval =  setInterval(() => {
  // //     // setTimeLeft(calculateTimeLeft("20:00","19:20"));
  // //     for(let i=0;i<9;i++)
  // //     {
  // //       calculateTimeLeft(j);
  // //     }
  // //   // }, 5000);
  //   setInterval(() => {
  // //     // setTimeLeft(calculateTimeLeft("20:00","19:20"));
  // //     for(let i=0;i<9;i++)
  // //     {
  //   difference2=moment({ minutes: "20", seconds: "00"}).subtract({ minutes: newminute1, seconds: newSecond1}).format('mm:ss');
  //       calculateTimeLeft(difference2);
  //       newminute1="19"
  //       newSecond1="00"
  // //     }
  //   }, 12000);
    // return () => {
    //   console.log(`clearing interval`);
    //   clearInterval(interval);
    // };
  // }, []);
 

  const getTeamData = (id) => {
    
    // let liveClockData=[];
    // if(live_players && setNhlEventData ){
    //   live_players?.forEach((livePlayer) => {

    //   // if(player?.id===livePlayer?.id){ 
    //     // console.log("setNhlEventData=player?.id=>",player?.id);

    //     setNhlEventData?.forEach((playr) => {          
    //         if (playr && playr?.eventData?.id === livePlayer?.matchId) {
    //           console.log("playr?.eventData?.id==>",playr?.eventData?.id);
    //           console.log("playr?.eventData?.id=livePlayer?.match?.id=>",livePlayer?.matchId);

    //           liveClockData.push({
    //             clock:playr?.eventData?.clock,
    //             period:playr?.period,
    //             strength:playr?.eventData?.strength,
    //            })
    //           }
    //         });
    //       // }
    //     })
    //   }

// console.log("setNhlEventData==>",setNhlEventData);

    let liveClockData = setNhlEventData.filter(x => x?.id  == id);
      // console.log("liveClockData=========>",liveClockData);
      
      if(liveClockData?.length > 0)
      {
        let a = liveClockData[liveClockData.length - 1];
        if(a?.eventData?.clock!==checkClockData)
          {
            calculateTimeLeft(a?.eventData?.clock);
            // console.log("aaaaaaaaaaaa=>",a);
          }
        return a;
      }
    return false
  };
  //Player Details
  const { match, OppGoalie = "0", team = {},teamId="" ,matchId=""} = player || {};
  const { home, away } = match || {};
  //TeamD Details
  const { name = "", teamB = {}, alias = "", match: teamDMatch = {} } = teamD || {};
  const {
    live_clock = "20:00",
    live_period = 0,
    live_strength = "even",
  } = useSelector((state) => state.nhl);

  return (
    <div>
      {isTeamD ? (
        <div className="footer_stats_row">
          <img src={HockeyIcon} alt="Hockey Icon" width={12} height={12} />
          <p className={alias == teamDMatch?.away?.alias ? "bold_text" : ""}>{teamDMatch?.away?.alias} {getTeamPoints(teamDMatch?.id, teamDMatch?.away?.id) !== false? getTeamPoints(teamDMatch?.id, teamDMatch?.away?.id):0}</p><p> vs</p>
          <p className={alias == teamDMatch?.home?.alias ? "bold_text" : ""}>{teamDMatch?.home?.alias} {getTeamPoints(teamDMatch?.id, teamDMatch?.home?.id) !== false ? getTeamPoints(teamDMatch?.id, teamDMatch?.home?.id):0}</p>
        </div>
      ) : (
        <div className="footer_stats_row">
          <img src={HockeyIcon} alt="Hockey Icon" width={12} height={12} />
          <>
            <p className={teamId == match?.away?.id ? "bold_text" : ""}>{match?.away?.alias} {getTeamPoints(matchId, match?.away?.id) !== false? getTeamPoints(matchId, match?.away?.id):0}</p><p> vs </p>
            <p className={teamId == match?.home?.id ? "bold_text" : ""}> {match?.home?.alias} {getTeamPoints(matchId, match?.home?.id) !== false ? getTeamPoints(matchId, match?.home?.id):0}</p>
          </>
          {/* {team?.id == match?.away?.id && 
            <><p>{match?.home?.alias} {getTeamPoints(match?.id) !== false? getTeamPoints(match?.id)?.home?.points:0} vs</p>
            <p className="bold_text"> {match?.away?.alias} {getTeamPoints(match?.id) !== false ? getTeamPoints(match?.id)?.away?.points:0}</p></>
          }
          {team?.id == match?.home?.id && 
            <><p>{match?.away?.alias} {getTeamPoints(match?.id) !== false? getTeamPoints(match?.id)?.away?.points:0} vs</p>
            <p className="bold_text"> {match?.home?.alias} {getTeamPoints(match?.id) !== false ? getTeamPoints(match?.id)?.home?.points:0}</p></>
          } */}
        </div>
      )}

      {/* <div className="footer_stats_row">
        <img src={SoccerIcon} alt="Hockey Icon" width={12} height={12} />
        <p>{away?.alias} G: {OppGoalie}</p>
      </div> */}
      <div className="footer_stats_row">
        <img src={ClockIcon} alt="Hockey Icon" width={12} height={12} />
      {cardType!=="nhl" ?(
         <p>
          P{getTeamPoints1(match?.id) !== false ? (getTeamPoints1(match?.id)?.period) : (live_period)} | {getTeamPoints1(match?.id) !== false ? (typeof getTeamPoints1(match?.id)?.eventData !== "undefined") ? getTeamPoints1(match?.id)?.eventData?.clock : live_clock : live_clock}
         </p> 
          ):(
            <>
             {!isTeamD? (
                <p>
                {/* P{ getTeamData(player?.matchId) !== false ? (getTeamData(player?.matchId)?.period) : (live_period)} | {getTeamData(player?.matchId) !== false ? (typeof getTeamData(player?.matchId)?.eventData?.clock !== "undefined") ? getTeamData(player?.matchId)?.eventData?.clock: live_clock : live_clock} */}
                P{ getTeamData(player?.matchId) !== false ? (getTeamData(player?.matchId)?.period) : (1)} | {getTeamData(player?.matchId) !== false ? (typeof getTeamData(player?.matchId)?.eventData?.clock !== "undefined") ? timerComponents: live_clock : "20:00"}
                {/* { timerComponents} */}
                {/* {timer} */}
                {/* getTeamData(player?.matchId)?.eventData?.clock  */}
              </p>
              ):(
              <p>
                {/* P{ getTeamData(player?.matchId) !== false ? (getTeamData(player?.matchId)?.period) : (live_period)} | {getTeamData(player?.matchId) !== false ? (typeof getTeamData(player?.matchId)?.eventData?.clock !== "undefined") ? getTeamData(player?.matchId)?.eventData?.clock: live_clock : live_clock} */}
                P{ getTeamData(teamDMatch?.id) !== false ? (getTeamData(teamDMatch?.id)?.period) : (1)} | {getTeamData(teamDMatch?.id) !== false ? (typeof getTeamData(teamDMatch?.id)?.eventData?.clock !== "undefined") ? timerComponents: live_clock : "20:00"}
              </p>
              
              )}
              {console.log("livvvvvvvvvvv--->",live_clock)}
           </>
      )}
      </div>
      <div className="footer_stats_row">
        <img src={SoccerJerseyIcon} alt="Hockey Icon" width={12} height={12} />
        {cardType!=="nhl" ?(
          <p>
            {live_strength !== "even" ? isTeamD ? teamB.alias + " - " : player?.team?.alias + " - " : ""}
            {live_strength === "even"
              ? "Even Strength"
              : _.startCase(_.toLower(live_strength))}{" "}
          </p>
        ):(
          <p>
            {/* <div> <button onClick={timer}>Start/Reset</button></div> */}
            {/* <div> {timerCount}</div> */}
            {/* {console.log("player?.home?.name==>",(getTeamData(player?.matchId)?.home?.name))} */}
            {/* {getTeamData(player?.matchId) !== false && (getTeamData(player?.matchId)?.eventData?.strength)!=="even" ? isTeamD ? teamB.alias + " - " : player?.team?.alias + " - " : ""} */}
            {getTeamData(player?.matchId) !== false && (getTeamData(player?.matchId)?.home?.strength)==="even" 
              ? "Even Strength"
              : (getTeamData(player?.matchId)?.home?.strength) ===undefined ? "Even Strength" : (getTeamData(player?.matchId)?.home?.alias ?getTeamData(player?.matchId)?.home?.alias:getTeamData(player?.matchId)?.home?.name +" "+ getTeamData(player?.matchId)?.home?.strength)
            }
          </p>
        )}
      </div>
    </div>
  );
}

NHLFooterStats.propTypes = {};

export default NHLFooterStats;
