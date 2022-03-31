import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function SportsLiveCardOverlay(props) {
  const { text = "", visible = false, onGotIt = () => {}, largeView = false } =
    props || {};

  if (!visible) return null;
  return (
    <div className={classes.overlay_container}>
      <p
        className={`${classes.overlay_text} ${largeView && classes.large_view}`}
      >
        {text}
      </p>
      <button
        className={`${classes.overlay_btn} ${largeView && classes.large_view}`}
        onClick={onGotIt}
      >
        Got it!
      </button>
    </div>
  );
}

SportsLiveCardOverlay.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  onGotIt: PropTypes.func,
  largeView: PropTypes.bool,
};

export default SportsLiveCardOverlay;
