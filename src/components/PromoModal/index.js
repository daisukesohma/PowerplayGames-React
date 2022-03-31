import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";
import Modal from "../Modal";
import PrizeModal from "../PrizeModal";
import CloseIcon from "../../icons/Close";
import bg from "../../assets/group-31.png";
import { urlencoded } from "body-parser";
import { redirectTo, getLocalStorage } from "../../utility/shared";
import _ from "underscore";
import moment from "moment";
import moment1 from "moment-timezone";

import NFLbg from "../../assets/group-31.png";
import NHLbg from "../../assets/NHLPopupBg.png";
import NBAbg from "../../assets/NBAPopupBg.png";
import MLBbg from "../../assets/MLBPopupBg.png";

import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import Challenge from "../../icons/Challenge";
import RetroBoostIcon from "../../icons/RetroBoost";
import PowerUpIcon from "../../icons/PowerUp";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";
import SwapIcon from "../../icons/Swap";
import {getTeamsList, saveFreeEntry} from ".././../actions/MLBActions"
import RulesPopup from "../../components/Rules";

function PromoModal(props) {
  const [getPowers, setPowers] = useState([]);
  const [isFreeEntryMode, setIsFreeEntryMode] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [gameStartDate, setGameStartDate] = useState("");
  const [gameStartTime, setGameStartTime] = useState("");

  const [freeEntryData, setFreeEntryData] = useState({
    MLBTeam: "",
    NHLTeam: "",
    NFLTeam: "",
    NBATeam: ""
  });
  const { visible = false, onClose = () => { }, item = {} } =
    props || {};
    const { league = "MLB", Powers = [], PointsSystems = [], PrizePayouts = [] } = item || {};
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
  const [showPrizeModal, setPrizeModalState] = React.useState(false);
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

  const powersList = () => {
    let powersAvailable = item?.Powers;
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

  const redirectToUrl = () => {
    let item = props.item;
    let url = "/mlb-select-team";
    switch(item?.league) {
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
    return redirectTo(props.propss, {
      path: url,
      state: {
        game_id: item?.game_id,
        sport_id: item?.sports_id,
        start_date: getLocalDateTime(item?.start_date, item?.start_time)?.date,
        game_set_start: getLocalDateTime(item?.game_set_start, item?.start_time)?.date,
        start_time: getLocalDateTime(item?.game_set_start, item?.start_time)?.time,
        end_date: getLocalDateTime(item?.end_date, item?.end_time)?.date,
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
        game_type: item?.game_type,
        powerdfs_challenge_amount: item?.powerdfs_challenge_amount
      },
    });
  }

  const redirectToContestRules = () => {
    let item = props.item;
    return redirectTo(props.propss, {
      path: `/contest-rules`,
      state: {
        game_id: item?.game_id,
        game_type: item?.game_type,
        start_date: getLocalDateTime(item?.start_date, item?.start_time)?.date,
        game_set_start: getLocalDateTime(item?.game_set_start, item?.start_time)?.date,
        start_time: getLocalDateTime(item?.game_set_start, item?.start_time)?.time,
        end_date: getLocalDateTime(item?.end_date, item?.end_time)?.date,
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
        league: item?.league,
        powerdfs_challenge_amount: item?.powerdfs_challenge_amount
      },
    });
  }

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

  useEffect(async () => {
    let a = await getTeamsList();
    if(a.status == 200)
    {
      setTeamData(a.data);
    }
  }, []);

  useEffect(() => {
    powersList();
    setGameStartDate(getLocalDateTime(item?.start_date, item?.start_time)?.date)
    setGameStartTime(getLocalDateTime(item?.start_date, item?.start_time)?.time)
  }, [item]);

  return (<>
    <Modal visible={visible}>
      <div className={classes.wrapper} style={{ width: 780, backgroundImage: `url(${getBG()})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: 20, paddingBottom: 20 }}>
        <div className={classes.modal_body}>
          {!isFreeEntryMode ? (
            <>
              <div className={classes.topButtons}>
                <div className={classes.leftButtons}>
                  <button
                    type="button"
                    onClick={() => {
                      setPrizeModalState(true)
                    }}
                  ><span>Prize Grid</span></button>
                  <ContestRulesPopUp
                    points={_.groupBy(
                      PointsSystems,
                      "type"
                    )}
                    powers={Powers}
                    component={({ showPopUp }) => (
                      <button
                        type="button"
                        onClick={showPopUp}
                      ><span>Game Rules</span></button>
                    )}
                    title={props?.item?.league}
                  />
                  <RulesPopup
                  component={({ showPopUp }) => (
                    <button
                      type="button"
                      onClick={showPopUp}
                    ><span>Contest Rules</span></button>
                    )}
                    gameDetails={props?.item}
                  />
                </div>
                <div className={classes.closeButton}>
                  <CloseIcon onClick={onClose} />
                </div>
              </div>
              <div className={classes.title}>
                {league} <span>PowerdFS</span> {item.game_type == "PowerdFs_promo" ? "Promotional Contest" : item?.powerdfs_challenge_amount + " Point Challenge"}
              </div>
              <div className={classes.gamePrize}>
              <span className={classes.prize}>${item?.PrizePayouts?.length > 0 ? parseFloat(
                  _.reduce(
                    item?.PrizePayouts,
                    function (memo, num) {
                      return (
                        parseFloat(memo) +
                        parseFloat(num.amount == "" ? 0 : num.amount) *
                        parseInt(num.prize == "" || num.prize == null ? 1 : num.prize)
                      );
                    },
                    0
                  )
                ) : 0}</span>
                <span className={classes.giveaway}>Give Away</span>
              </div>
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
              </div>
              <div className={classes.extraDesc}>
                <p>No purchase necessary. Contest entry closes at <span>{gameStartDate + " " + gameStartTime} ET.</span></p>
                <p>Open to residents of Canada (excluding Quebec) and United States who are over the age of majority.</p>
              </div>
              <div className={classes.rules}>
                <ul style={{listStyle: "none"}}>
                  {item.game_type == "PowerdFs_promo" && 
                    <li><div className={classes.Oval}></div>Twenty (20) prizes to be won. See full rules for complete details of all prizes.</li>
                  }
                  {item.game_type == "PowerdFs_challenge" && 
                    <li><div className={classes.Oval}></div>One (1) prize to be won. If there are multiple winners, the prize will be evenly devided. See full contest rules for complete details.</li>
                  }
                  <li><div className={classes.Oval}></div>One entry per person.</li>
                  <li><div className={classes.Oval}></div>Odds of winning depend on the number of participants and use of Powers. </li>
                </ul>
              </div>
              <div className={classes.bottomButton}>
                <button onClick={redirectToUrl}>
                  ${props?.item?.entry_fee ? props?.item?.entry_fee : 0}  •  Enter & Unlock Powers!
                </button>
              </div>
              <span className={classes.freeEntry} onClick={() => {
                setFreeEntryData({
                  MLBTeam: "",
                  NHLTeam: "",
                  NFLTeam: "",
                  NBATeam: ""
                });
                setIsValidated(false);
                setIsFreeEntryMode(true);}}>Free Entry</span>
            </>
          ) : (
            <>
              <div className={classes.topButtonsFree}>
                  <div className={classes.closeButton}>
                      <CloseIcon onClick={() => setIsFreeEntryMode(false)} />
                  </div>
              </div>
              <div className={classes.modalHeading}>
                  <p>Please complete the free entry survey below:</p>
              </div>
              <div className={classes.modalForm}>
                  <div className={classes.formElem}>
                      <p>
                          What MLB team do you cheer for?
                      </p>
                      <select className="text-black" onChange={(e) => {
                        setFreeEntryData(prevState => {
                          return {
                          ...prevState,
                          MLBTeam: e.target.value
                          }
                        });
                      }}>
                          <option value="">Select your MLB team</option>
                          {teamData.mlb_teams && teamData.mlb_teams.map((item, index) => {
                            return  (
                              <option className="promo_options" value={`${item.team_id}`}>{item.name}</option>
                            )
                          })}
                      </select>
                  </div>

                  <div className={classes.formElem}>
                      <p>
                          What NFL team do you cheer for?
                      </p>
                      <select  className="text-black"  onChange={(e) => {
                        setFreeEntryData(prevState => {
                          return {
                          ...prevState,
                          NFLTeam: e.target.value
                          }
                        });
                      }}>
                          <option value="">Select your NFL team</option>
                          {teamData.nfl_teams && teamData.nfl_teams.map((item, index) => {
                            return  (
                              <option value={`${item.team_id}`}>{item.name}</option>
                            )
                          })}
                      </select>
                  </div>
                          {console.log("teamData==>",teamData)}
                  <div className={classes.formElem}>
                      <p>
                          What NBA team do you cheer for?
                      </p>
                      <select className="text-black"  onChange={(e) => {
                        setFreeEntryData(prevState => {
                          return {
                          ...prevState,
                          NBATeam: e.target.value
                          }
                        });
                      }}>
                          <option value="">Select your NBA team</option>
                          {teamData?.nba_teams && teamData?.nba_teams.map((item, index) => {
                            return  (
                              <option value={`${item.team_id}`}>{item.name}</option>
                            )
                          })}
                      </select>
                  </div>

                  <div className={classes.formElem}>
                      <p>
                          What NHL team do you cheer for?
                      </p>
                      <select  className="text-black"  onChange={(e) => {
                        setFreeEntryData(prevState => {
                          return {
                          ...prevState,
                          NHLTeam: e.target.value
                          }
                        });
                      }}>
                          <option value="">Select your NHL team</option>
                          {teamData.nhl_teams && teamData.nhl_teams.map((item, index) => {
                            return  (
                              <option value={`${item.team_id}`}>{item.name}</option>
                            )
                          })}
                      </select>
                  </div>
              
                  <div className={classes.bottomButtons}>
                      <button className={classes.backButton} onClick={() => setIsFreeEntryMode(false)}>
                          {"< Back"}
                      </button>
                      <button className={classes.entryButton} disabled={!isValidated} onClick={() => {
                        const user_id = getLocalStorage("PERSONA_USER_ID");
                        let payload = {
                          "user_id" : parseInt(user_id),
                          "mlb_team_id" : parseInt(freeEntryData.MLBTeam),
                          "nhl_team_id" : parseInt(freeEntryData.NHLTeam),
                          "nfl_team_id" : parseInt(freeEntryData.NFLTeam)
                        }
                        let res = saveFreeEntry(payload);
                        const { message = "", error = false } = res.data || {};
                        if (1) {
                          redirectToUrl();
                        }
                      }}>
                          {"Free Entry"}
                      </button>
                  </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
    <PrizeModal
      visible={showPrizeModal}
      sportsName={props?.item?.league}
      data={props?.item?.PrizePayouts}
      onClose={() => setPrizeModalState(false)}
    />
    {/* <FreeEntryModal
      visible={showFreeEntryModal}
      onClose={onCloseFreeEntryModal}
    /> */}
    </>
  );
}

PromoModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default PromoModal;
