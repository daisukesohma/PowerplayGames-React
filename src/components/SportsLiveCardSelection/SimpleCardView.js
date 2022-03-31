import React from "react";
import PropTypes from "prop-types";

import classes from "./SimpleCard.module.scss";
import ReplaceIcon from "../../icons/Replace";
import ClockIcon from "../../icons/Clock3";
import XP1_5_1 from "../../icons/XP1_5_1";
import XP2Icon_1 from "../../icons/XP2_1";
import XP3_1 from "../../icons/XP3_1";
import PowerPlayIcon from "../../assets/token.png";
import { hasText } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";

function SimpleCardView(props) {
  const {
    item = {},
    selected = false,
    onClickReplace = () => { },
    onSelectCard = (item) => { },
  } = props || {};

  const {
    category = "",
    title = "",
    time = "",
    id = "",
    live_data_steps = [],
    xp = "",
    xpPoints = 0,
    xpTimes = "",
    isStarPlayer = false,
  } = item || {};

  const renderXp = (xp) => {
    if (xp === CONSTANTS.XP.xp1_5) return <XP1_5_1 size={20} />;
    else if (xp === CONSTANTS.XP.xp2) return <XP2Icon_1 size={20} />;
    else if (xp === CONSTANTS.XP.xp3) return <XP3_1 size={20} />;
  };

  return (
    <div
      onClick={() => onSelectCard(item)}
      className={`${classes.card} ${selected && classes.active}`}
      key={id + ""}
    >
      <div className={classes.card_header}>
        <div>
          {isStarPlayer && <img src={PowerPlayIcon} />}
          <p className={`${isStarPlayer && classes.active}`}>{title}</p>
        </div>
        <ReplaceIcon size={22} onClick={onClickReplace} />
      </div>

      <div className={classes.card_body}>
        <div className={classes.card_cat}>{category}</div>
        <div className={classes.card_xp_points}>
          Points: {live_data_steps[1]?.totalPoints}
          {renderXp(xp)}
        </div>
        <div className={classes.card_clock}>
          <ClockIcon color="#688fbd" />
          <span> P1 | {time.replace("PM", "")}</span>
        </div>
      </div>

      <div
        className={`${classes.card_type} 
                    ${hasText(live_data_steps[0]?.type, "ice")
            ? classes.success
            : hasText(live_data_steps[0]?.type, "bench") &&
            classes.danger
          }`}
      >
        {live_data_steps[0]?.type}
      </div>
    </div>
  );
}

SimpleCardView.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  onSelectCard: PropTypes.func,
  onClickReplace: PropTypes.func,
};

export default SimpleCardView;
