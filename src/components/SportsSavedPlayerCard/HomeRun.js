import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import RetroBoost from "../../icons/RetroBoost";

function HomeRun(props) {
  const { largeView = false } = props || {};

  return (
    <div className={`${classes.home_run} ${largeView && classes.large_view}`}>
      <p className={`${classes.success} ${largeView && classes.large_view}`}>
        Home Run
      </p>
      <p className={`${classes.p2} ${largeView && classes.large_view}`}>
        0:30 <RetroBoost size={24} />
      </p>
    </div>
  );
}

HomeRun.propTypes = {
  largeView: PropTypes.bool,
};

export default HomeRun;
