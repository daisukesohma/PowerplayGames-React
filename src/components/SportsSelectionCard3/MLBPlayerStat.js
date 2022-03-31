import React from "react";
import PropTypes from "prop-types";

import classes from "./playerStat.module.scss";
import {
  addTrailingZerons,
  removeZeroBeforeDecimalPoint,
} from "../../utility/shared";

const defaultTitles = ["AVG", "HR", "RBI", "OPS"];
const titlesP = ["ERA", "W-L", "K", "WHIP"];

function MLBPlayerStat(props) {
  const { active = false, playerStats = {}, position = "" } = props || {};

  const {
    hits = 0,
    doubles = 0,
    triples = 0,
    home_runs = 0,
    stolen_bases = 0,
    runs_batted_in = 0,
    batting_average = 0,
    wins = 0,
    losses = 0,
    innings_pitched = 0,
    strike_outs = 0,
    earned_runs_average = 0,
    base_on_balls = 0,
    walks_hits_per_innings_pitched = 0,
    ops = 0,
  } = playerStats || {};

  const getTwoDecimal = (value) => {
    if (value !== 0) return parseFloat(value).toFixed(2);

    return value;
  };

  const RenderItem = ({ value }) => <span>{value}</span>;

  const RenderDefault = () => (
    <>
      <div className={classes.card_state_title}>
        {defaultTitles?.map((title, index) => (
          <span key={index.toString()} className={classes.state_step_1_title}>
            {title}
          </span>
        ))}
      </div>

      <div className={classes.card_state_values}>
        <RenderItem
          value={
            batting_average !== 0
              ? `.${
                  addTrailingZerons(batting_average)?.toString()?.split(".")[1]
                }`
              : batting_average
          }
        />
        <RenderItem value={home_runs} />
        <RenderItem value={runs_batted_in} />
        <RenderItem value={removeZeroBeforeDecimalPoint(ops)} />
        {/* <RenderItem value={0} /> */}
      </div>
    </>
  );

  const RenderP = () => (
    <>
      <div className={classes.card_state_title}>
        {titlesP?.map((title, index) => (
          <span key={index.toString()} className={classes.state_step_1_title}>
            {title}
          </span>
        ))}
      </div>

      <div className={classes.card_state_values}>
        <RenderItem value={getTwoDecimal(earned_runs_average)} />
        <RenderItem value={`${wins}-${losses}`} />
        <RenderItem value={strike_outs} />
        <RenderItem value={getTwoDecimal(walks_hits_per_innings_pitched)} />
        {/* <RenderItem value={0} /> */}
      </div>
    </>
  );

  const RenderData = () => {
    switch (position) {
      case "p" || "P":
        return <RenderP />;

      default:
        return <RenderDefault />;
    }
  };

  return (
    <div className={`${classes.card_state} ${active && classes.active}`}>
      {RenderData()}
    </div>
  );
}

MLBPlayerStat.propTypes = {
  playerStats: PropTypes.object,
  active: PropTypes.bool,
  position: PropTypes.string,
};

export default MLBPlayerStat;
