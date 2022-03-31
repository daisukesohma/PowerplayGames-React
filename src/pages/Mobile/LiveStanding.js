import React from "react";
import StandingBanner from "../../components/mobilecomponents/LiveStandingBanner";
import PrizePool from "../../components/mobilecomponents/PrizePool/PrizePool";
import Header from "../../components/mobilecomponents/Header";
import LiveMatch from "../../components/mobilecomponents/LiveMatch/LiveMatch";
import * as CryptoJS from "crypto-js";
import { getLocalStorage } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import moment from "moment-timezone";

import "./mainStyle.scss";
const LiveStanding = () => {
  const getCurrentTime = () => {

    const offset = moment?.tz("America/New_York")?.format("Z");

    return moment(moment().format("YYYY-MM-DD HH:mm:ss") + offset).format("MMM DD, YYYY | HH:mm");

    const dd = new Date();
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      month[dd.getUTCMonth()] +
      " " +
      ("0" + dd.getUTCDate()).slice(-2) +
      ", " +
      dd.getUTCFullYear() +
      " | " +
      ("0" + dd.getUTCHours()).slice(-2) +
      ":" +
      ("0" + dd.getUTCMinutes()).slice(-2) +
      " ET"
    );
  };
  const [liveStandingData, setLiveStandingData] = React.useState([]);
  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );
    return decSelectedTeamData;
  }
  return (
    <section className="main">
      <Header />

      <div className="standingWrapper">
        <StandingBanner getCurrentTime={getCurrentTime} />
        <PrizePool />
      </div>

      <LiveMatch />
    </section>
  );
};

export default LiveStanding;
