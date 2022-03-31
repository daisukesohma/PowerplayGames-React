import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getIndexOfArrayElement,
  isPowerRoyalCard,
  royalFlush,
  //   redirectTo,
} from "../../utility/shared";
import Card from "../../components/Card";
import GameCard from "../../components/GameCard";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader";
import ProgressBar from "../../components/Progress";
import Footer from "../../components/Footer/Footer";
import Alert from "../../components/Alert";
import Reload from "../../icons/Reload";
import BoltIcon from "../../assets/bolt.png";
import CardsSvg from "../../icons/Cards";
import Sidebar from "../../components/Sidebar";
import SidebarButton from "../../components/SidebarButton";
import Replace from "../../icons/Replace";
import PlusMinus from "../../icons/PlusAndMinus";
import { CONSTANTS } from "../../utility/constants";
import { getRandomCard } from "../../utility/shared";
import {
  setPowerCardState,
  resetPowerRoyalsCardState,
  powerRoyalsGameInventory,
} from "../../actions/powerRoyalsActions";
import { isEmpty, isEqual } from "lodash";
import classes from "./cardGamePage.module.scss";

const INITIAL_STATE = {
  collectedCards: [{}, {}, {}, {}, {}],
  activeCard: {},
};
const TOTAL_ROUNDS = 2;
const TOTAL_CARDS = 5;
const MAX_ROUND_TIME = 5;
const MAX_RESET_BTN_COUNT_DOWN = 0;
const REPLACE_ALL_SPEED_TIME = 1;
let _round = 1;
let _currentCard = 0;
const cardsArr = [{}, {}, {}, {}, {}];
let time = MAX_ROUND_TIME;
let resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN;

function PowerRoyalsGame(props) {
  const [cardsState, setCardsState] = useState(INITIAL_STATE);
  const [count, setCount] = useState(MAX_ROUND_TIME);
  const [currentRound, setCurrentRound] = useState(_round);
  const [currentCard, setCurrentCard] = useState(_currentCard);
  const [resetBtnCountDown, setResetBtnCountDown] = useState(
    MAX_RESET_BTN_COUNT_DOWN
  );
  const [showResetTimer, setResetTimerState] = useState(false);
  const [isReplaceAll, setIsReplaceAllState] = useState(false);
  const [selectedRoundCard, setSelectedRoundCard] = useState();
  const [isDroppable, setIsDroppable] = useState(false);
  const [isRoundCompleted, setIsRounCompleted] = useState(false);
  const [isGameCompleted, setGameCompleted] = useState(false);

  const dispatch = useDispatch();
  const { inventory = {} } = useSelector((state) => state.powerRoyals);

  const {
    replace = 0,
    // replaceAll = 0,
    newHands = 0,
    powerMatch = 0,
    increaseOrDecrease = 0,
  } = inventory || {};

  useEffect(() => {
    dispatch(resetPowerRoyalsCardState());
    resetGameState();

    return () => resetGameState();
  }, [dispatch]);

  useEffect(() => {
    let timeOut = gameStart();

    return function clearnup() {
      return clearInterval(timeOut);
    };
  }, [currentCard, currentRound, selectedRoundCard, isRoundCompleted]);

  const gameStart = () => {
    let timeOut = null;
    if (_currentCard < TOTAL_CARDS) {
      if (!isReplaceAll) time = MAX_ROUND_TIME;
      else time = REPLACE_ALL_SPEED_TIME;
      setResetTimerState(false);
      hasRoundCompleted();
      timeOut = setInterval(() => {
        if (time !== 0) {
          time--;
          setCount(time);
        } else {
          if (!isReplaceAll) time = MAX_ROUND_TIME;
          else time = REPLACE_ALL_SPEED_TIME;
          setCount(time);

          _currentCard += 1;
          setCurrentCard(_currentCard);
          updateCardState();

          if (!isDroppable && _currentCard >= 4) {
            setIsDroppable(true);
          }
          if (currentCard >= TOTAL_CARDS) setIsReplaceAllState(false);
        }
      }, 1000);
    } else if (isRoundCompleted) {
      resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN;
      timeOut = setInterval(() => {
        setIsReplaceAllState(false);
        if (time !== 0) {
          time--;
          setCount(time);
        } else {
          if (currentRound < TOTAL_ROUNDS) {
            setResetTimerState(true);
            if (resetAllBtnTime !== 0) {
              resetAllBtnTime--;
              setResetBtnCountDown(resetAllBtnTime);
            } else {
              _round += 1;
              setCurrentRound(_round);
              setCurrentCard(0);
              resetGameState();
              resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN;
              setResetBtnCountDown(resetAllBtnTime);
              setResetTimerState(false);
            }
          } else {
            setResetTimerState(false);
            setIsReplaceAllState(false);
            clearInterval(timeOut);
          }
        }
      }, 1000);
    }

    return timeOut;
  };

  const resetGameState = () => {
    for (let i = 0; i < 5; i++) {
      cardsArr[i] = {};
    }

    resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN;
    _currentCard = 0;
    setCardsState(INITIAL_STATE);
    setCurrentCard(_currentCard);
    setIsDroppable(false);
    setCount(MAX_ROUND_TIME);
    setResetBtnCountDown(MAX_RESET_BTN_COUNT_DOWN);
    setResetTimerState(false);
    setIsReplaceAllState(false);
    setSelectedRoundCard(null);
    dispatch(setPowerCardState([]));
  };

  const updateCardState = () => {
    let card = getRandomCard();

    if (isEmpty(selectedRoundCard) && _currentCard === 1) {
      setSelectedRoundCard(card);
    }

    if (hasCardAlreadyExistInArray(card)) {
      return updateCardState();
    }
    // cardsArr.push(card)

    if (!isEmpty(cardsArr[currentCard])) {
      //find and empty index and place the card at that index
      let emptyIndex = cardsArr?.findIndex((c) => Object.keys(c)?.length === 0);
      cardsArr[emptyIndex] = card;
    } else {
      cardsArr[currentCard] = card;
    }

    onCardCompleted(card);

    setCardsState({
      ...cardsState,
      collectedCards: cardsArr,
      activeCard: card,
    });
  };

  //   const _redirectTo = (path = "/") => {
  //     redirectTo(props, { path });
  //   };

  const updateInventory = (inventoryValue, actionType) => {
    const _inventory = inventory;

    switch (actionType) {
      case CONSTANTS.CARD_POP_ACTIONS.INCREASE:
        _inventory.increaseOrDecrease = inventoryValue;
        break;

      case CONSTANTS.CARD_POP_ACTIONS.POWER_MATCH:
        _inventory.powerMatch = inventoryValue;
        break;

      case CONSTANTS.CARD_POP_ACTIONS.REPLACE:
        _inventory.replace = inventoryValue;
        break;

      case CONSTANTS.CARD_POP_ACTIONS.NEW_HAND:
        _inventory.newHands = inventoryValue;
        break;

      default:
        break;
    }

    dispatch(powerRoyalsGameInventory(_inventory));
  };

  //   const onReplaceAll = () => {
  //     let _newHands = newHands;
  //     if (_newHands <= 0) return;

  //     _newHands -= 1;
  //     updateInventory(_newHands, CONSTANTS.CARD_POP_ACTIONS.NEW_HAND);
  //     resetGameState();
  //     setIsReplaceAllState(true);
  //     setCount(REPLACE_ALL_SPEED_TIME);
  //     time = REPLACE_ALL_SPEED_TIME;
  //   };

  const onIncrease = (card, cardIndex) => {
    const { rank = 0, suit = 0 } = card || {};
    let _increaseOrDecrease = increaseOrDecrease;

    if (increaseOrDecrease <= 0) {
      return;
    }

    _increaseOrDecrease -= 1;

    let _rank = rank;
    if (CONSTANTS.CARD_RANKS[_rank] !== "A") {
      _rank += 1;
    }

    const newCard = {
      suit: suit,
      rank: _rank,
    };
    if (
      hasCardAlreadyExistInArray(newCard) &&
      CONSTANTS.CARD_RANKS[_rank] !== "A"
    ) {
      newCard.rank = newCard?.rank + 1;
    }
    cardsArr[cardIndex] = newCard;
    // otherPowerCardMatch(newCard, cardIndex)
    setCardsState({
      ...cardsState,
      collectedCards: cardsArr,
      activeCard: newCard,
    });
    updateInventory(_increaseOrDecrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE);
    hasRoundCompleted();
  };

  const onDecrease = (card, cardIndex) => {
    const { rank = 0, suit = 0 } = card || {};
    let _increaseOrDecrease = increaseOrDecrease;

    if (increaseOrDecrease <= 0) {
      return;
    }

    _increaseOrDecrease -= 1;

    let _rank = rank;
    if (CONSTANTS.CARD_RANKS[_rank] !== "2") {
      _rank -= 1;
    }

    const newCard = {
      suit: suit,
      rank: _rank,
    };
    if (
      hasCardAlreadyExistInArray(newCard) &&
      CONSTANTS.CARD_RANKS[_rank] !== "2"
    ) {
      newCard.rank = newCard?.rank - 1;
    }
    cardsArr[cardIndex] = newCard;
    // otherPowerCardMatch(newCard, cardIndex)

    setCardsState({
      ...cardsState,
      collectedCards: cardsArr,
      activeCard: newCard,
    });
    updateInventory(_increaseOrDecrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE);
    hasRoundCompleted();
  };

  const onPowerMatch = (card, cardIndex) => {
    let _powerMatch = powerMatch;
    if (powerMatch <= 0) {
      return;
    }

    _powerMatch -= 1;

    const powerRyalCards = royalFlush(selectedRoundCard?.suit);

    cardsArr[cardIndex] = powerRyalCards[cardIndex];

    setCardsState({
      ...cardsState,
      collectedCards: cardsArr,
      activeCard: powerRyalCards[cardIndex],
    });
    updateInventory(_powerMatch, CONSTANTS.CARD_POP_ACTIONS.POWER_MATCH);
    hasRoundCompleted();
  };

  const onReplace = (card, cardIndex) => {
    let _replace = replace;
    if (replace <= 0) {
      return;
    }

    _replace -= 1;

    let newCard = getRandomCard();
    if (isEqual(newCard, card) || hasCardAlreadyExistInArray(newCard)) {
      newCard = getRandomCard();
    }

    if (currentCard === 1 && card === cardsState?.activeCard) {
      setSelectedRoundCard(newCard);
    }
    otherPowerCardMatch(newCard, cardIndex);

    setCardsState({
      ...cardsState,
      collectedCards: cardsArr,
      activeCard: newCard,
    });
    updateInventory(_replace, CONSTANTS.CARD_POP_ACTIONS.REPLACE);
    hasRoundCompleted();
  };

  const onCardCompleted = (card) => {
    const { rank = 0, suit = 0 } = card || {};
    const powerCardsList = royalFlush(
      selectedRoundCard ? selectedRoundCard?.suit : suit
    );

    const [foundCard] = isPowerRoyalCard(suit, rank, powerCardsList);

    if (!foundCard) return;

    setMatchCard(foundCard, currentCard, powerCardsList);
  };

  const otherPowerCardMatch = (card, cardIndex) => {
    const powerCardsList = royalFlush(
      selectedRoundCard ? selectedRoundCard?.suit : card?.suit
    );
    const [foundCard] = isPowerRoyalCard(
      card?.suit,
      card?.rank,
      powerCardsList
    );

    if (foundCard) {
      setMatchCard(foundCard, cardIndex, powerCardsList);
    } else {
      cardsArr[cardIndex] = card;
    }
  };

  const setMatchCard = (card, index, list) => {
    let indexOfCard = getIndexOfArrayElement(card, list);
    cardsArr[index] = cardsArr[indexOfCard];
    cardsArr[indexOfCard] = card;
  };

  const hasCardAlreadyExistInArray = (card) => {
    const [alreadyExistsCard] = cardsArr?.filter(
      (c) => c?.rank === card?.rank && c?.suit === card?.suit
    );
    return alreadyExistsCard;
  };

  const isCompleted = (index) =>
    isEqual(
      royalFlush(selectedRoundCard?.suit)[index],
      cardsState?.collectedCards?.[index]
    );

  const getTargetSuit = () => {
    switch (selectedRoundCard?.suit) {
      case CONSTANTS.CARD_SUITS.CLUB:
        return "CLUBS";

      case CONSTANTS.CARD_SUITS.DIAMOND:
        return "DIAMONDS";

      case CONSTANTS.CARD_SUITS.HEART:
        return "HEARTS";

      case CONSTANTS.CARD_SUITS.SPADE:
        return "SPADES";

      default:
        break;
    }
  };

  const hasRoundCompleted = () => {
    if (
      currentRound === 1 &&
      isEqual(cardsArr, royalFlush(selectedRoundCard?.suit))
    ) {
      setTimeout(() => {
        resetGameState();
        setCurrentRound(2);
      }, 3000);

      return setIsRounCompleted(true);
    } else if (
      currentRound === 2 &&
      isEqual(cardsArr, royalFlush(selectedRoundCard?.suit))
    ) {
      return setGameCompleted(true);
    }

    setGameCompleted(false);
    return setIsRounCompleted(false);
  };

  const text = (value) => `Try for a ${value} card here`;

  const renderCardText = (index) => {
    switch (index) {
      case 0:
        return text(10);

      case 1:
        return text("Jack");

      case 2:
        return text("Queen");

      case 3:
        return text("King");

      case 4:
        return "Try for an Ace card here";

      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <div className={classes.__card_game_content}>
        <div className={classes.__card_game_content_left}>
          <PageHeader title="Power Royals" seconds={6} />
          <div className={classes._card_game_content_top}>
            <div className={classes._card_game_content_header_text}>
              <p>
                Welcome to <span>Power Royals!</span> If you can get a red card
                royal flush followed by a black card royal flush, you win!
              </p>
            </div>
            <CardsSvg style={{ display: "flex", height: "auto" }} />
            <p className={classes.__card_game_card_counter}>
              Card <span>{currentCard}</span> of {TOTAL_CARDS}
            </p>
            <p className={classes.__card_game_round_counter}>
              Hand <span>{currentRound}</span> of {TOTAL_ROUNDS}
            </p>
            <span className={classes.__card_divider} />
            <p className={classes.__card_game_Next_card_drawn_in}>
              Next card drawn in
            </p>
            <ProgressBar
              progress={count}
              maxProgress={5}
              size={62}
              strokeWidth={4}
              circleOneStroke="grey"
              circleTwoStroke="#fff"
            />
          </div>

          <div className={classes.__card_game_content_body}>
            <Card>
              <div className={`${classes.__card_game_content_cards}`}>
                {cardsState?.collectedCards?.map((c, index) =>
                  isEmpty(c) ? (
                    <GameCard
                      key={index + ""}
                      isCompleted={false}
                      showCardPopu={false}
                      isSelected={false}
                      activeCard={null}
                      showCardPopup={false}
                      time={0}
                      text={renderCardText(index)}
                      showIncrementOrDecrementPower={false}
                      showPowerMatchPower={false}
                      showReplacePower={false}
                      onDecrease={() => {}}
                      onReplace={() => {}}
                      onPowerMatch={() => {}}
                      onIncrease={() => {}}
                    />
                  ) : (
                    <GameCard
                      key={index + ""}
                      showCardPopup={!isReplaceAll && true}
                      isCompleted={isCompleted(index)}
                      card={cardsState?.collectedCards?.[index]}
                      isSelected={cardsState?.collectedCards?.[index] && true}
                      activeCard={cardsState?.activeCard}
                      time={time}
                      inventory={inventory}
                      showIncrementOrDecrementPower={increaseOrDecrease > 0}
                      showPowerMatchPower={powerMatch > 0}
                      showReplacePower={replace > 0}
                      onDecrease={() =>
                        onDecrease(cardsState?.collectedCards?.[index], index)
                      }
                      onReplace={() =>
                        onReplace(cardsState?.collectedCards?.[index], index)
                      }
                      onPowerMatch={() =>
                        onPowerMatch(cardsState?.collectedCards?.[index], index)
                      }
                      onIncrease={() =>
                        onIncrease(cardsState?.collectedCards?.[index], index)
                      }
                    />
                  )
                )}
              </div>
            </Card>
            {currentRound === 1 && currentCard === 0 && time > 0 && (
              <>
                <br />
                <Alert
                  renderMsg={() => <p>Get Ready! Your game is about start.</p>}
                  primary
                />
              </>
            )}

            {selectedRoundCard && !isRoundCompleted && (
              <>
                <br />
                <Alert
                  renderMsg={() => (
                    <p>
                      Your target suit is <strong>{getTargetSuit()}</strong>
                    </p>
                  )}
                  primary
                />
              </>
            )}

            {isRoundCompleted && (
              <>
                <br />
                <Alert
                  renderMsg={() => <p>Royal Flush! moving on to Round 2.</p>}
                  success
                />
              </>
            )}

            {isGameCompleted && (
              <>
                <br />
                <Alert renderMsg={() => <p>You won the game!</p>} success />
              </>
            )}
          </div>
        </div>

        <Sidebar>
          <div className={classes.__sidebar_header}>
            <span className={classes.__sidebar_header_title}>My Powers</span>
          </div>

          <div className={classes.__sidebar_button_wrapper}>
            <SidebarButton
              success={replace > 0 ? true : false}
              primary={replace <= 0 ? true : false}
              title="Power Card"
              toolText={`${replace} left`}
              icon={<Replace style={{ height: "auto" }} />}
            />

            <SidebarButton
              success={newHands > 0 ? true : false}
              primary={newHands <= 0 ? true : false}
              title="Power Hand"
              toolText={`${newHands} left`}
              icon={
                <div className={classes.__sidebar_reload_btn}>
                  <Reload bgColor={"#0ff"} style={{ height: "auto" }} />
                </div>
              }
            />

            <SidebarButton
              success={powerMatch > 0 ? true : false}
              primary={powerMatch <= 0 ? true : false}
              title="Power Match"
              toolText={`${powerMatch} left`}
              icon={<img src={BoltIcon} width={53} height={53} alt={""} />}
            />

            <SidebarButton
              success={increaseOrDecrease > 0 ? true : false}
              primary={increaseOrDecrease <= 0 ? true : false}
              title="Power Up/Down"
              toolText={`${increaseOrDecrease} left`}
              icon={<PlusMinus style={{ height: "auto" }} />}
            />
          </div>
        </Sidebar>
      </div>
      <Footer isBlack />
    </>
  );
}

export default withRouter(PowerRoyalsGame);
