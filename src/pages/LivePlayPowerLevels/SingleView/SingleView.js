import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ReplaceIcon from "../../../icons/Replace";
import ClockIcon from "../../../icons/Clock3";
import XP1_5 from "../../../icons/XP1_5";
import XP2Icon from "../../../icons/XP2";
import XP3 from "../../../icons/XP3";
import PowerPlayIcon from "../../../assets/token.png";
import { hasText } from "../../../utility/shared";
import SportsLiveCardSelection from "../../../components/SportsLiveCardSelection";
import { CONSTANTS } from "../../../utility/constants";
import SportsLiveCard from "../../../components/SportsLiveCard";

let currentCard = 0;

function SingleView(props) {
  const {
    data = [],
    playerList = [],
    onChangeXp = (xp, player) => {},
    updateReduxState = () => {},
    starPlayerCount = 0,
  } = props || {};

  const [selectedCard, setSelectedCard] = useState(data[currentCard]);

  useEffect(() => {
    setSelectedCard(data[currentCard]);
  }, [data]);

  const onSelectCard = (player) => {
    let index = data?.length && data?.indexOf(player);
    currentCard = index;

    setSelectedCard(player);
  };

  const onNext = () => {
    if (currentCard < data?.length - 1) currentCard++;
    else currentCard = 0;

    setSelectedCard(data[currentCard]);
  };

  const onBack = () => {
    if (currentCard > 0) currentCard--;
    else currentCard = data?.length - 1;

    setSelectedCard(data[currentCard]);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.left_side}>
        {data &&
          data?.length &&
          data?.map((item, ind) => (
            <SportsLiveCard
              key={ind + "-"}
              player={item}
              active={selectedCard?.playerId === item?.playerId}
              onSelectCard={onSelectCard}
              singleView
              onChangeXp={onChangeXp}
              playerList={playerList}
              updateReduxState={updateReduxState}
              starPlayerCount={starPlayerCount}
            />
          ))}
      </div>

      <div className={classes.right_side}>
        <div onClick={onBack} className={`${classes.arrow} ${classes.left}`} />
        <SportsLiveCard
          largeView
          player={selectedCard}
          onChangeXp={onChangeXp}
          playerList={playerList}
          updateReduxState={updateReduxState}
          starPlayerCount={starPlayerCount}
        />
        <div onClick={onNext} className={`${classes.arrow} ${classes.right}`} />
      </div>
    </div>
  );
}

SingleView.propTypes = {
  showModal: PropTypes.bool,
  starPlayerCount: PropTypes.number,
  data: PropTypes.array,
  playerList: PropTypes.array,
  updateReduxState: PropTypes.func,
};

export default SingleView;
