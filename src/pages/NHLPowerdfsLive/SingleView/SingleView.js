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
import SportsLiveCardTeamD from "../../../components/SportsLiveCard/TeamD";

const { TD } = CONSTANTS.FILTERS.NHL;
let currentCard = 0;
function SingleView(props) {
  const {
    data = [],
    onChangeXp = (xp, player) => {},
    updateReduxState = () => {},
    starPlayerCount = 0,
    gameInfo = {},
    pointXpCount = {},
  } = props || {};


  const [selectedCard, setSelectedCard] = useState(data[currentCard]);

  useEffect(() => {
  }, [selectedCard]);

  const { xp1 = 0, xp2 = 1, xp3 = 2 } = pointXpCount || {};

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
            <>
              {item.isTeamD ? (
                <SportsLiveCardTeamD
                  data={item}
                  active={selectedCard?.id === item?.id}
                  singleView
                  onSelectCard={onSelectCard}
                  dwall={props.dwallCounts}
                  challenge={props.challengeCounts}
                  useDwall={props.useDwall}
                  useChallenge={props.useChallenge}
                  dataMain={props.dataMain}
                  cardType="nhl"
                />
              ) : (
                <SportsLiveCard
                  key={ind + "-" + item?.player?.player_id}
                  data={item}
                  active={selectedCard?.id === item?.id}
                  onSelectCard={onSelectCard}
                  singleView
                  onChangeXp={onChangeXp}
                  updateReduxState={updateReduxState}
                  starPlayerCount={starPlayerCount}
                  gameInfo={gameInfo}
                  useSwap={props.useSwap}
                  swapCount={props.swapCounts}
                  dataMain={props.dataMain}
                  pointXpCount={{ xp1: xp1, xp2: xp2, xp3: xp3 }}
                  cardType="nhl"
                />
              )}
            </>
          ))}
      </div>

      <div className={classes.right_side}>
        <div onClick={onBack} className={`${classes.arrow} ${classes.left}`} />
        {selectedCard?.isTeamD ? (
          <SportsLiveCardTeamD
            data={selectedCard}
            onChangeXp={onChangeXp}
            updateReduxState={updateReduxState}
            starPlayerCount={starPlayerCount}
            dwall={props.dwallCounts}
            challenge={props.challengeCounts}
            useDwall={props.useDwall}
            useChallenge={props.useChallenge}
            dataMain={props.dataMain}
            cardType="nhl"
          />
        ) : (
          <SportsLiveCard
            data={selectedCard}
            onChangeXp={onChangeXp}
            updateReduxState={updateReduxState}
            starPlayerCount={starPlayerCount}
            gameInfo={gameInfo}
            useSwap={props.useSwap}
            swapCount={props.swapCounts}
            dataMain={props.dataMain}
            pointXpCount={{ xp1: xp1, xp2: xp2, xp3: xp3 }}
            cardType="nhl"
            rightSide={true}
          />
        )}
        <div onClick={onNext} className={`${classes.arrow} ${classes.right}`} />
      </div>
    </div>
  );
}

SingleView.propTypes = {
  showModal: PropTypes.bool,
  starPlayerCount: PropTypes.number,
  data: PropTypes.array,
  updateReduxState: PropTypes.func,
  gameInfo: PropTypes.object,
};

export default SingleView;
