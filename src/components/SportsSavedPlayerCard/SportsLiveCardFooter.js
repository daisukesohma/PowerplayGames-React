import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function SportsLiveCardFooter(props) {
  const {
    onClickBack = () => {},
    onClickDetails = () => {},
    showSummary = false,
    largeView = false,
    title = "",
  } = props || {};

  return (
    <div className={classes.footer}>
      {showSummary ? (
        <>
          <button onClick={onClickBack} className={classes.margin_left_9}>
            <span
              className={`${largeView && classes.large_view} ${classes.arrow} ${
                classes.left
              }`}
            />{" "}
            Back
          </button>
        </>
      ) : (
        <>
          <span
            className={`${classes.mlb_text} ${largeView && classes.large_view}`}
          >
            {title}
          </span>
          <button
            className={`${classes.margin_right_9} ${
              largeView && classes.large_view
            }`}
            onClick={onClickDetails}
          >
            Details <span className={`${classes.arrow} ${classes.right}`} />
          </button>
        </>
      )}
    </div>
  );
}

SportsLiveCardFooter.propTypes = {
  onClickDetails: PropTypes.func,
  onClickBack: PropTypes.func,
  showSummary: PropTypes.bool,
  largeView: PropTypes.bool,
  title: PropTypes.string,
};

export default SportsLiveCardFooter;
