import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import classes from "./index.module.scss";
import CheckIcon from "../../icons/Check";
import Circle from "../../icons/CircleEmpty";
let selected = 0;
function StarPlayersCheck(props) {
  const [starPlayers, setStarPlayers] = useState([]);
  const { totalStarPlayers = 0, selectedCount = 0 } = props || {};
  useEffect(() => {
    console.log("selectedCount", selectedCount);
    selected = selectedCount;
    if(selectedCount > totalStarPlayers)
    {
      selected = totalStarPlayers;
    }
    const _starPlayers = [];
    let falseCount = totalStarPlayers - selected;
    let trueCount = selected;
    for(let i = 0; i < trueCount; i++)
    {
      _starPlayers.push(true);
    }
    for(let i = 0; i < falseCount; i++)
    {
      _starPlayers.push(false);
    }
    setStarPlayers(_starPlayers);
  }, [totalStarPlayers, selectedCount]);

  return (
      <div className={classes.wrapper}>
        {starPlayers?.map((isSelected, index) =>
          isSelected ? <CheckIcon /> : <Circle key={index.toString()} />
        )}
      </div>
  );
}

StarPlayersCheck.propTypes = {
  totalStarPlayers: PropTypes.number,
  selectedCount: PropTypes.number,
};

export default StarPlayersCheck;
