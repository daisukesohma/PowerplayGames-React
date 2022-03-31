import React from "react";
import PropTypes from "prop-types";

import classes from "./playerStat.module.scss";

const DEFAULT_TITLES = ["GP", "W", "L", "AGA", "ASA"];

function NHLPlayerStat(props) {
  const { active = false, teamStats = {}, position } = props || {};

  const { own_record = {}, goaltending = {} } = teamStats || {};
  const { total = {} } = own_record || {};
  const { games_played = 0 } = total || {};
  const {
    total: { wins = 0, losses = 0 },
    average: { goals_against = 0, shots_against = 0 },
  } = goaltending || {};

  const getTwoDecimal = (value) => {
    if (value) return parseFloat(value).toFixed(2);
    else return 0;
  };

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
        <RenderItem value={games_played ? games_played : 0} />
        <RenderItem value={wins ? wins : 0} />
        <RenderItem value={losses ? losses : 0} />
        <RenderItem value={goals_against ? goals_against : 0} />
        <RenderItem value={shots_against ? shots_against : 0} />
      </div>
    </>
  );

  const RenderItem = ({ value }) => <span>{value}</span>;

  const RenderStats = () => {
    // if (`${position}`?.toLocaleLowerCase() === QB) {
    //   return <RenderQB />;
    // }

    // if (`${position}`?.toLocaleLowerCase() === K) {
    //   return <RenderK />;
    // }

    return <RenderDefault />;
  };

  return (
    <div className={`${classes.card_state} ${active && classes.active}`}>
      {RenderStats()}
    </div>
  );
}

NHLPlayerStat.propTypes = {
  playerStats: PropTypes.object,
  active: PropTypes.bool,
  position: PropTypes.string,
};

export default NHLPlayerStat;
