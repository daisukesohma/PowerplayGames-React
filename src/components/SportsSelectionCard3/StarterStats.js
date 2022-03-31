import React from "react";
import PropTypes from "prop-types";

import classes from "./playerStat.module.scss";
import { addTrailingZerons } from "../../utility/shared";

const defaultTitles = ["HOME STARTER", "AWAY STARTER"];
const titlesP = ["ERA", "W-L"];

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
    ops = 0.0,
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
        <RenderItem value={"N. Eovaldi"} />

        <RenderItem value={"N. Eovaldi"} />
      </div>
      <div className={classes.card_state_title}>
        <span className={classes.state_step_1_title}>{`(1-2, 3.00 ERA)`}</span>
        <span className={classes.state_step_1_title}>{`(3-1, 2.89 ERA)`}</span>
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
        <RenderItem value={"N. Eovaldi"} />

        <RenderItem value={"N. Eovaldi"} />
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
    <div
      className={`${classes.card_state} ${active && classes.active}`}
      style={{ marginTop: "10px" }}
    >
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
