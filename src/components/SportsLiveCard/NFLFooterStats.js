import React from "react";
import PropTypes from "prop-types";

import "./stats.scss";
import HelmetIcon from "../../assets/icons/nfl/helmet.svg";
import ClockIcon from "../../assets/icons/nfl/clock.svg";
import YardsIcon from "../../assets/icons/nfl/yards.svg";
import AmericanFootballIcon from "../../assets/icons/nfl/american-football.svg";

function NFLFooterStats(props) {
  const {
    onClickBack = () => {},
    onClickDetails = () => {},
    showSummary = false,
    largeView = false,
    title = "",
  } = props || {};

  return (
    <div>
      <div className="footer_stats_row">
        <img src={HelmetIcon} alt="Hockey Icon" width={12} height={12} />
        <p>
          Steelers 10 vs <span>Ravens 2</span>
        </p>
      </div>
      <div className="footer_stats_row">
        <img src={YardsIcon} alt="Hockey Icon" width={12} height={12} />
        <p>
          Yards to FD/EZ: <span>10/55</span>
        </p>
      </div>
      <div className="footer_stats_row">
        <img
          src={AmericanFootballIcon}
          alt="Hockey Icon"
          width={12}
          height={12}
        />
        <p>
          Downs: <span>1/4</span>
        </p>
      </div>
      <div className="footer_stats_row">
        <img src={ClockIcon} alt="Hockey Icon" width={12} height={12} />
        <p>P1 | 12:59</p>
      </div>
    </div>
  );
}

NFLFooterStats.propTypes = {};

export default NFLFooterStats;
