import React, {useState, useEffect} from "react";
import classes from "./challengepage.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router-dom";
import PrizeModal from "../../components/PrizeModal";

import bg from "../../assets/baseball-player-bg.png";
import { redirectTo } from "../../utility/shared";
import _ from "underscore";
import moment from "moment";
import moment1 from "moment-timezone";
import RulesPopup from "../../components/Rules";

import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import Challenge from "../../icons/Challenge";
import RetroBoostIcon from "../../icons/RetroBoost";
import PowerUpIcon from "../../icons/PowerUp";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";
import NFLbg from "../../assets/promomodalnflbg.png";
import NHLbg from "../../assets/promomodalnhlbg.png";
import NBAbg from "../../assets/promomodalnbabg.png";
import MLBbg from "../../assets/baseball-player-bg.png";

const ChallengePage = (props) => {
  const history = useHistory();
  const [showPrizeModal, setPrizeModalState] = React.useState(false);
  const [showContestRulesModal, setContestRulesModalState] = React.useState(false);
  const [getPowers, setPowers] = useState([]);
  const {
    state = []
  } = props.location || {}
  const [isFreeEntryMode, setIsFreeEntryMode] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [freeEntryData, setFreeEntryData] = useState({
    MLBTeam: "",
    NHLTeam: "",
    NFLTeam: "",
    NBATeam: ""
  });

  const {game_type, Power, league = "MLB", powerdfs_challenge_amount = 0, PointsSystem = [], topPrize = 0, game_set_start, start_time} = state || [];

  const checkValidation = () => {
    if(freeEntryData.MLBTeam === "")
    {
      setIsValidated(false);
    }
    else if(freeEntryData.NBATeam === "")
    {
      setIsValidated(false);
    }
    else if(freeEntryData.NHLTeam === "")
    {
      setIsValidated(false);
    }
    else if(freeEntryData.NFLTeam === "")
    {
      setIsValidated(false);
    }
    else {
      setIsValidated(true);
    }
  }; 

  useEffect(() => {
    checkValidation();
  },[freeEntryData]);

  useEffect(() => {
    powersList();
  }, [state]);
  
  const getLocalDateTime = (date, time) => {

    const offset = moment1?.tz("America/New_York")?.format("Z");
    const localDateTime = moment.utc(date + " " + time, 'YYYY-MM-DD hh:mm A').utcOffset(offset).format('YYYY-MM-DD=hh:mm A')

    const splitted = localDateTime.split("=");

    return {
      date: splitted[0],
      time: splitted[1]
    }

    // const localDateTime = moment(moment.utc(date + ' ' + time, 'YYYY-MM-DD hh:mm A').toDate()).format('YYYY-MM-DD=hh:mm A')
    // const splitted = localDateTime.split("=");
    // return {
    //   date: splitted[0],
    //   time: splitted[1]
    // }
  }

  const redirectToUrl = () => {
    let item = props.location.state;
    console.log("itemitem", item);
    let url = "/mlb-select-team";
    switch(league) {
      case "MLB": 
        url = "/mlb-select-team";
        break;
      case "NFL": 
        url = "/nfl-select-team";
        break
      case "NHL": 
        url = "/nhl-select-team";
        break
      case "NBA": 
        url = "/nba-select-team";
        break
      case "default":
        url = "/mlb-select-team";
        break
    }
    return redirectTo(props, {
      path: url,
      state: {
        game_id: item?.game_id,
        sport_id: item?.sports_id,
        start_date: getLocalDateTime(item?.start_date, item?.start_time)?.date,
        game_set_start: getLocalDateTime(item?.game_set_start, item?.start_time)?.date,
        start_time: getLocalDateTime(item?.game_set_start, item?.start_time)?.time,
        end_date: getLocalDateTime(item?.game_set_end, item?.end_time)?.date,
        outOf: item?.target,
        enrolledUsers: item?.enrolled_users,
        prizePool: _.reduce(
          item?.PrizePayouts,
          function (memo, num) {
            return memo + parseInt(num.amount) * parseInt(num.prize);
          },
          0
        ),
        topPrize: parseFloat(
          _.max(item?.PrizePayouts, function (ele) {
            return ele.amount;
          }).amount
        ),
        PointsSystem: item?.PointsSystems,
        Power: item?.Powers,
        prizes: item?.PrizePayouts,
        paid_game: item?.is_game_paid,
        entry_fee: item?.entry_fee,
        currency: item?.currency,
        game_type: item?.game_type
      },
    });
  }

  const onBack = () => {
    history.push("/power-center");
  }

  const showPopUp = () => {
    setContestRulesModalState(true);
  }

  const powersList = () => {
    let powersAvailable = Power;
    if(powersAvailable == undefined)
      return;
    
    let finalList = [];
    if(powersAvailable.findIndex(x => x.powerId == 4) >= 0)
    {
      finalList.push({
        powerName: "Player Swap",
        amount: powersAvailable.find(x => x.powerId == 4).amount,
        icon: (<ReplaceIcon />)
      });
    }
    if(powersAvailable.findIndex(x => x.powerId == 1) >= 0)
    {
      let amount = 0;
      if(finalList.findIndex(x => x.powerName == "Point Booster") >= 0)
      {
        amount = parseInt(finalList.find(x => x.powerName == "Point Booster").amount) + parseInt(powersAvailable.find(x => x.powerId == 1).amount);
        finalList[finalList.findIndex(x => x.powerName == "Point Booster")].amount = amount;
      }
      else {
        amount = powersAvailable.find(x => x.powerId == 1).amount;
        finalList.push({
          powerName: "Point Booster",
          amount: powersAvailable.find(x => x.powerId == 1).amount,
          icon: (<XpIcon />)
        });
      }
    }
    if(powersAvailable.findIndex(x => x.powerId == 2) >= 0)
    {
      let amount = 0;
      if(finalList.findIndex(x => x.powerName == "Point Booster") >= 0)
      {
        amount = parseInt(finalList.find(x => x.powerName == "Point Booster").amount) + parseInt(powersAvailable.find(x => x.powerId == 2).amount);
        finalList[finalList.findIndex(x => x.powerName == "Point Booster")].amount = amount;
      }
      else {
        amount = powersAvailable.find(x => x.powerId == 2).amount;
        finalList.push({
          powerName: "Point Booster",
          amount: powersAvailable.find(x => x.powerId == 2).amount,
          icon: (<XpIcon />)
        });
      }
    }
    if(powersAvailable.findIndex(x => x.powerId == 3) >= 0)
    {
      let amount = 0;
      if(finalList.findIndex(x => x.powerName == "Point Booster") >= 0)
      {
        amount = parseInt(finalList.find(x => x.powerName == "Point Booster").amount) + parseInt(powersAvailable.find(x => x.powerId == 3).amount);
        finalList[finalList.findIndex(x => x.powerName == "Point Booster")].amount = amount;
      }
      else {
        amount = powersAvailable.find(x => x.powerId == 3).amount;
        finalList.push({
          powerName: "Point Booster",
          amount: powersAvailable.find(x => x.powerId == 3).amount,
          icon: (<XpIcon />)
        });
      }
    }
    if(powersAvailable.findIndex(x => x.powerId == 6) >= 0)
    {
      finalList.push({
        powerName: "Challenge",
        amount: powersAvailable.find(x => x.powerId == 6).amount,
        icon: (<Challenge />)
      });
    }
    if(powersAvailable.findIndex(x => x.powerId == 5) >= 0)
    {
      finalList.push({
        powerName: "D-Wall",
        amount: powersAvailable.find(x => x.powerId == 5).amount,
        icon: (<ShieldIcon />)
      });
    }
    if(powersAvailable.findIndex(x => x.powerId == 10) >= 0)
    {
      finalList.push({
        powerName: "2x Retro Boost",
        amount: powersAvailable.find(x => x.powerId == 10).amount,
        icon: (<RetroBoostIcon />)
      });
    }
    if(powersAvailable.findIndex(x => x.powerId == 8) >= 0)
    {
      finalList.push({
        powerName: "Power-Up",
        amount: powersAvailable.find(x => x.powerId == 8).amount,
        icon: (<PowerUpIcon />)
      });
    }
    setPowers(finalList);
  };


  const getBG = () => {
    switch(league) {
      case "MLB": 
        return MLBbg;
      case "NFL": 
        return NFLbg;
      case "NHL": 
        return NHLbg;
      case "NBA": 
        return NBAbg;
      case "default":
        return MLBbg;
    }
  }

  return (
    <div>
      <Header />
      {!isFreeEntryMode ? (
        <>
          
          <div className={classes.mainContent} style={{
            backgroundImage: `url(${getBG()})`,
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat'
          }}>
            <div className={classes.backButton} onClick={onBack}>
              <span>
                {"< Back"}
              </span>
            </div>
            <>
                
                {game_type == "PowerdFs_promo" && 
                  <>
                    <div className={classes.title}>
                    {league} <span>PowerdFS</span> {game_type == "PowerdFs_promo" ? ("Promotional Contest") : (<><br /> {powerdfs_challenge_amount} Point Challenge</>)}
                    </div>
                    <div className={classes.gamePrize}>
                      <span className={classes.prize}>${topPrize}</span>
                      <span className={classes.giveaway}>Give Away</span>
                    </div>
                  </>
                }
                {game_type == "PowerdFs_challenge" && 
                  <>
                    <div className={classes.title}>
                    {league} <span>PowerdFS</span> <br />{powerdfs_challenge_amount} Point Challenge!
                      <br />
                      <span className={classes.dateTime}>
                        {/* {state?.start_date} */}
                        {game_set_start + " | " + start_time + " ET"}
                      </span>
                      <br />
                      <span className={classes.teamMessage}>
                        Manage your team to <br /> {powerdfs_challenge_amount} points and win
                      </span>
                      <span className={classes.prizeSpan}>
                        ${topPrize}!
                      </span>
                    </div>
                  </>
                }
              </>
            
            <div className={classes.rectangle}>
              <span className={classes.youHaveThePower}>
                You have the Powers to win!
              </span>
              <div className={classes.powers}> 
                  {typeof getPowers[0] !== "undefined" && 
                    <div className={classes.power}>
                      {getPowers[0].icon}
                      <span>{getPowers[0].powerName}</span>
                      <span className={classes.orange}> x{getPowers[0].amount}</span>
                    </div>
                  }
                  {typeof getPowers[1] !== "undefined" && 
                    <div className={classes.power}>
                      {getPowers[1].icon}
                      <span>{getPowers[1].powerName}</span>
                      <span className={classes.orange}> x{getPowers[1].amount}</span>
                    </div>
                  }
                </div>
                <div className={`${classes.powers} ${classes.margin}`}>
                  {typeof getPowers[2] !== "undefined" && 
                      <div className={classes.power}>
                        {getPowers[2].icon}
                        <span>{getPowers[2].powerName}</span>
                        <span className={classes.orange}> x{getPowers[2].amount}</span>
                      </div>
                    }
                    {typeof getPowers[3] !== "undefined" && 
                      <div className={classes.power}>
                        {getPowers[3].icon}
                        <span>{getPowers[3].powerName}</span>
                        <span className={classes.orange}> x{getPowers[3].amount}</span>
                      </div>
                    }
                </div>
                <div className={`${classes.powers} ${classes.margin}`}>
                  
                  {typeof getPowers[4] !== "undefined" && 
                      <div className={classes.power}>
                        {getPowers[4].icon}
                        <span>{getPowers[4].powerName}</span>
                        <span className={classes.orange}> x{getPowers[4].amount}</span>
                      </div>
                    }
                    {typeof getPowers[5] !== "undefined" && 
                      <div className={classes.power}>
                        {getPowers[5].icon}
                        <span>{getPowers[5].powerName}</span>
                        <span className={classes.orange}> x{getPowers[5].amount}</span>
                      </div>
                    }
                </div>
              <div className={classes.topButtons}>
                <div className={classes.leftButtons}>
                  <button
                    type="button"
                    onClick={() => setPrizeModalState(true)}
                  ><span>Prize Grid</span></button>
                  <ContestRulesPopUp
                    points={[state?.PrizePayout]}
                    powers={state?.Power}
                    component={({ showPopUp }) => (
                      <button
                        type="button"
                        onClick={showPopUp}
                      ><span>Game Rules</span></button>
                    )}
                    title={league}
                  />
                  <RulesPopup
                  component={({ showPopUp }) => (
                    <button
                      type="button"
                      onClick={showPopUp}
                    ><span>Constest Rules</span></button>
                    )}
                    gameDetails={state}
                  />
                </div>
              </div>
            </div>
            <div className={classes.extraDesc}>
              <p>No purchase necessary. Contest entry closes at <span>{game_set_start + " " + start_time}.</span></p>
              <p>Open to residents of Canada (excluding Quebec) and United States who are over the age of majority.</p>
            </div>
            <div className={classes.bottomButton}>
              <button onClick={redirectToUrl}>
                ${props?.location?.state?.entry_fee ? (props?.location?.state?.entry_fee) : 0}  •  Enter Now!
              </button>
            </div>
            <div className={classes.freeEntry}  onClick={() => setIsFreeEntryMode(true)} style={{cursor: "pointer"}}>Free Entry</div>
            <div className={classes.rules}>
              <ul>
                {game_type == "PowerdFs_promo" && 
                  <li><div className={classes.Oval}></div>Twenty (20) prizes to be won. See full rules for complete details of all prizes.</li>
                }
                {game_type == "PowerdFs_challenge" && 
                  <li><div className={classes.Oval}></div>One (1) prize to be won. If there are multiple winners, the prize will be evenly devided. See full contest rules for complete details.</li>
                }
                <li><div className={classes.Oval}></div><div className={classes.litext}>One entry per person.</div></li>
                <li><div className={classes.Oval}></div><div className={classes.litext}>Odds of winning depend on the number of participants and use of Powers.</div> </li>
              </ul>
            </div>
          </div>
          
        </>
      ) : (
        <>
            <div className={classes.modalHeading}>
              <button className={classes.backButton} onClick={() => setIsFreeEntryMode(false)}>
                  {"< Back"}
              </button>
              <p>Please complete the free entry survey below:</p>
            </div>
            <div className={classes.modalForm}>
                <div className={classes.formElem}>
                    <p>
                        What MLB team do you cheer for?
                    </p>
                    <select onChange={(e) => {
                      setFreeEntryData(prevState => {
                        return {
                        ...prevState,
                        MLBTeam: e.target.value
                        }
                      });
                    }}>
                        <option value="">Select your MLB team</option>
                        <option value="one">One</option>
                        <option value="two">Two</option>
                        <option value="three">Three</option>
                        <option value="four">Four</option>
                        <option value="five">Five</option>
                    </select>
                </div>

                <div className={classes.formElem}>
                    <p>
                        What NFL team do you cheer for?
                    </p>
                    <select onChange={(e) => {
                      setFreeEntryData(prevState => {
                        return {
                        ...prevState,
                        NFLTeam: e.target.value
                        }
                      });
                    }}>
                        <option value="">Select your NFL team</option>
                        <option value="one">One</option>
                        <option value="two">Two</option>
                        <option value="three">Three</option>
                        <option value="four">Four</option>
                        <option value="five">Five</option>
                    </select>
                </div>

                <div className={classes.formElem}>
                    <p>
                        What NBA team do you cheer for?
                    </p>
                    <select onChange={(e) => {
                      setFreeEntryData(prevState => {
                        return {
                        ...prevState,
                        NBATeam: e.target.value
                        }
                      });
                    }}>
                        <option value="">Select your NBA team</option>
                        <option value="one">One</option>
                        <option value="two">Two</option>
                        <option value="three">Three</option>
                        <option value="four">Four</option>
                        <option value="five">Five</option>
                    </select>
                </div>

                <div className={classes.formElem}>
                    <p>
                        What NHL team do you cheer for?
                    </p>
                    <select onChange={(e) => {
                      setFreeEntryData(prevState => {
                        return {
                        ...prevState,
                        NHLTeam: e.target.value
                        }
                      });
                    }}>
                        <option value="">Select your NHL team</option>
                        <option value="one">One</option>
                        <option value="two">Two</option>
                        <option value="three">Three</option>
                        <option value="four">Four</option>
                        <option value="five">Five</option>
                    </select>
                </div>
            
                <div className={classes.bottomButtons}>
                    <button className={classes.entryButton} disabled={!isValidated} onClick={() => {
                      alert("test");
                      //submitFreeEntry();
                    }}>
                        {"Free Entry"}
                    </button>
                    <button className={classes.backButton} onClick={() => setIsFreeEntryMode(false)}>
                        {"< Back"}
                    </button>
                </div>
            </div>
        </>
      )}
      <Footer />
      <PrizeModal
        visible={showPrizeModal}
        sportsName={league}
        data={state?.prizes}
        onClose={() => setPrizeModalState(false)}
      />
    </div>
  );
};

export default ChallengePage;
