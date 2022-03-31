import React from "react";
import PropTypes from "prop-types";

import classes from "./playerStat.module.scss";
import { CONSTANTS } from "../../utility/constants";

const DEFAULT_TITLES = ["YDS/G", "Rush TD", "Rec TD"];
const QB_TITLES = ["P YDS/G", "R YDS/G", "P TD", "R TD"];
const K_TITLES = ["FGA", "FGM", "PCT", "LNG"];

const { QB, K } = CONSTANTS.FILTERS.NFL;

function MLBPlayerStat(props) {
  const { active = false, playerStats = {}, position } = props || {};

  const {
    rushing_avg_yards = 0,
    rushing_yards = 0,
    rushing_touchdowns = 0,
    passing_yards = 0,
    passing_touchdowns = 0,
    receiving_avg_yards = 0,
    receiving_yards = 0,
    receiving_touchdowns = 0,
    field_goals_attempts = 0,
    field_goals_made = 0,
    field_goals_longest = 0,
    extra_points_made = 0,
  } = playerStats || {};

  const getTwoDecimal = (value) => {
    if (value) return parseFloat(value).toFixed(2);
    else return 0;
  };

  const RenderQB = () => (
    <>
      <div className={classes.card_state_title}>
        {QB_TITLES?.map((title, index) => (
          <span key={index.toString()} className={classes.state_step_1_title}>
            {title}
          </span>
        ))}
      </div>

      <div className={classes.card_state_values}>
        <RenderItem value={getTwoDecimal(passing_yards)} />
        <RenderItem value={rushing_yards ? rushing_yards : 0} />
        <RenderItem value={passing_touchdowns ? passing_touchdowns : 0} />
        <RenderItem value={rushing_touchdowns ? rushing_touchdowns : 0} />
      </div>
    </>
  );

  const RenderK = () => (
    <>
      <div className={classes.card_state_title}>
        {K_TITLES?.map((title, index) => (
          <span key={index.toString()} className={classes.state_step_1_title}>
            {title}
          </span>
        ))}
      </div>

      <div className={classes.card_state_values}>
        <RenderItem value={getTwoDecimal(field_goals_attempts)} />
        <RenderItem value={field_goals_made ? field_goals_made : 0} />
        <RenderItem
          value={
            field_goals_attempts && field_goals_made
              ? ((field_goals_attempts / field_goals_made) * 100).toPrecision(1)
              : 0
          }
        />
        <RenderItem value={field_goals_longest ? field_goals_longest : 0} />
      </div>
    </>
  );

  const RenderDefault = () => (
    <>
      <div className={classes.card_state_title}>
        {DEFAULT_TITLES?.map((title, index) => (
          <span key={index.toString()} className={classes.state_step_1_title}>
            {title}
          </span>
        ))}
      </div>

      <div className={classes.card_state_values}>
        <RenderItem value={getTwoDecimal(rushing_avg_yards)} />
        <RenderItem value={rushing_touchdowns ? rushing_touchdowns : 0} />
        <RenderItem value={receiving_touchdowns ? receiving_touchdowns : 0} />
      </div>
    </>
  );

  const RenderItem = ({ value }) => <span>{value}</span>;

  const RenderStats = () => {
    if (`${position}`?.toLocaleLowerCase() === QB) {
      return <RenderQB />;
    }

    if (`${position}`?.toLocaleLowerCase() === K) {
      return <RenderK />;
    }

    return <RenderDefault />;
  };

  return (
    <div className={`${classes.card_state} ${active && classes.active}`}>
      {RenderStats()}
    </div>
  );
}

MLBPlayerStat.propTypes = {
  playerStats: PropTypes.object,
  active: PropTypes.bool,
  position: PropTypes.string,
};

export default MLBPlayerStat;
