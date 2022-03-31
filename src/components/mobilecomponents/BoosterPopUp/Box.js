import React from "react";
import { CONSTANTS } from "../../../utility/constants";
import { useSelector } from "react-redux";
import "./boxBooster.scss";
const Box = ({counts, onChangeXp = (xp, player) => {}, data, selectedPlayer, boostModal}) => {
  const [activeBooster, setActiveBooster] = React.useState("");
  const addXP = (type, elem) => {
    if (counts[type] !== 0)
    {
      setActiveBooster(type);
      if(type === "pointBooster15x")
        onChangeXp(CONSTANTS.XP.xp1_5, selectedPlayer);
      else if(type === "pointBooster2x")
        onChangeXp(CONSTANTS.XP.xp2, selectedPlayer);
      else if(type === "pointBooster3x")
        onChangeXp(CONSTANTS.XP.xp3, selectedPlayer);

      boostModal(false,selectedPlayer,type, true);
    }
  }
  return (
    <div style={{ display: "flex", marginTop: "20px" }}>
      <div className={`boxBooster ${counts?.pointBooster15x === 0 ? 'disabled' : ''} ${activeBooster === 'pointBooster15x' ? 'activeBooster' : ''}`} onClick={(e) => addXP("pointBooster15x", e)}>
        <img src="/images/oneX.svg" alt="boost" />
      </div>
      <div className={`boxBooster ${counts?.pointBooster2x === 0 ? 'disabled' : ''} ${activeBooster === 'pointBooster2x' ? 'activeBooster' : ''}`} onClick={(e) => addXP("pointBooster2x", e)}>
        <img src="/images/2xBoost.svg" alt="boost" />
      </div>
      <div className={`boxBooster ${counts?.pointBooster3x === 0 ? 'disabled' : ''} ${activeBooster === 'pointBooster3x' ? 'activeBooster' : ''}`} onClick={(e) => addXP("pointBooster3x", e)}>
        <img src="/images/3xSpeed.svg" alt="boost" />
      </div>
    </div>
  );
};

export default Box;
