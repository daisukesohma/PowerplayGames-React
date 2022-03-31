import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function MLBDetailStats(props) {
  const { position = "", stats = {} } = props || {};
  const {
    last_game = {},
    last_10_games = {},
    last_2020_2021 = {},
  } = stats || {};

  const RenderItem = (...stat) => (
    <div className={classes.stats_detail_right_b_item}>
      {stat &&
        stat?.length &&
        stat?.map((val, ind) => <span key={ind?.toString()}>{val}</span>)}
    </div>
  );

  const RenderDefaultStats = ({}) => (
    <div className={classes.stats_detail_container}>
      <div className={classes.stats_detail_left}>
        <span>Last Game</span>
        <span>Last 10 Games</span>
        <span>2020-2021</span>
      </div>
      <div className={classes.stats_detail_right}>
        <div className={classes.stats_detail_right_h}>
          <span>H</span>
          <span>2B</span>
          <span>HR</span>
          <span>RBI</span>
          <span>AVG</span>
          <span>FPPG</span>
        </div>
        <div className={classes.stats_detail_right_b}>
          {RenderItem(0, 0, 0, 0, 0, 0)}
          {RenderItem(0, 0, 0, 0, 0, 0)}
          {RenderItem(0, 0, 0, 0, 0, 0)}
        </div>
      </div>
    </div>
  );

  const RenderIFStats = ({}) => (
    <div className={classes.stats_container}>
      <div>
        <span>Last Game</span>
        <span>Last 10 Games</span>
        <span>2020-2021</span>
      </div>
      <div>
        <div>
          <span>ERA</span>
          <span>W-L</span>
          <span>K</span>
          <span>WHIP</span>
          <span>FPPG</span>
        </div>
        <div>
          {RenderItem(0, 0, 0, 0, 0)}
          {RenderItem(0, 0, 0, 0, 0)}
          {RenderItem(0, 0, 0, 0, 0)}
        </div>
      </div>
    </div>
  );

  const RenderPStats = ({}) => (
    <div className={classes.stats_container}>
      <div>
        <span>Last Game</span>
        <span>Last 10 Games</span>
        <span>2020-2021</span>
      </div>
      <div>
        <div>
          <span>W</span>
          <span>L</span>
          <span>IP</span>
          <span>K</span>
          <span>ERA</span>
          <span>FPPG</span>
        </div>
        <div>
          {RenderItem(0, 0, 0, 0, 0, 0)}
          {RenderItem(0, 0, 0, 0, 0, 0)}
          {RenderItem(0, 0, 0, 0, 0, 0)}
        </div>
      </div>
    </div>
  );

  const RenderStats = ({}) => {
    switch (position) {
      case "p" || "P":
        return <RenderPStats />;

      case "if" || "IF":
        return <RenderIFStats />;

      default:
        return <RenderDefaultStats />;
    }
  };

  return <RenderStats />;
}

MLBDetailStats.propTypes = {
  position: PropTypes.string,
  stats: PropTypes.array,
};

export default MLBDetailStats;
