import React from "react";
import "./banner.scss";
const StandingBanner = (props) => {
  return (
    <div className="bannerWrapper">
      <h2>Live Standings</h2>
      <p>{`${props?.getCurrentTime()} ET`}</p>
    </div>
  );
};

export default StandingBanner;
