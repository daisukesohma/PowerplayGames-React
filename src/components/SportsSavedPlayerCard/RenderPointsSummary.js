import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function RenderPointsSummary(props) {
  const { titleList = [], tableList = [], totalPoints = 0, largeView = false } =
    props || {};

  return (
    <div className={classes.points_summary_container}>
      <p className={classes.container_title}>Points Summary</p>
      <div className={classes.summary_header}>
        {titleList?.map((title, ind) => (
          <span key={ind + "--"} className={classes.summary_title}>
            {title}
          </span>
        ))}
      </div>
      <div className={classes.summary_body}>
        <div className={classes.summary_body_1}>
          {tableList?.map((item, ind) => (
            <div className={classes.row} key={ind + "--" + item.status}>
              <span className={largeView && classes.large_view}>
                {item.status}
              </span>
              <span className={largeView && classes.large_view}>
                {item.type}
              </span>
              <span className={largeView && classes.large_view}>
                {item.power}
              </span>
              <span className={largeView && classes.large_view}>
                {item.pts}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${classes.summary_total_pts} ${
          largeView && classes.large_view
        }`}
      >
        <p className={largeView && classes.large_view}>
          Total Points: {totalPoints}
        </p>
      </div>
    </div>
  );
}

RenderPointsSummary.propTypes = {
  titleList: PropTypes.array.isRequired,
  tableList: PropTypes.array.isRequired,
  totalPoints: PropTypes.number,
  largeView: PropTypes.bool,
};

export default RenderPointsSummary;
