//import modules
import React, { useState, useEffect } from "react";
import _ from "lodash";
//import components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProgressBar from "../../components/Progress";
import PageHeaderCard from "../../components/PageHeaderCard";
import LottoBall from "../../components/LottoBall";

//styling
import "./Elite8draw.scss";
import { printLog } from "../../utility/shared";

//constants
const TOTAL_NUMBERS_TO_DRAW = 8;
const MY_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
const MAX_TIME = 12;
const TOTAL_NUMBERS_DRAWN = 0;
const ACTIVE_NUMBER = 0;

function Elte8Game(props) {
  const [drawnNumbersArray, setDrawnNumbersArray] = useState([]);
  const [myPickedNumbers, setMyPickedNumbers] = useState(MY_NUMBERS);
  const [counter, setCounter] = useState(12);
  const [latestDrawnNumber, setLatestDrawnNumber] = useState(0);
  const [activeLottoBall, setActiveLottoBall] = useState(0);
  const [totalMatchedNumbers, setTotalMatchedNumbers] = useState(0);
  const [powerplays, setPowerplays] = useState({
    reset: 1,
    power_match: 1,
    increase: 1,
    decrease: 1,
    reset_all: 1,
  });
  //componet mount and unmount
  useEffect(() => {
    var picks = props.location.state.picks;
    printLog(picks);
    picks ? setMyPickedNumbers(picks) : setMyPickedNumbers(MY_NUMBERS);
    return () => {
      //when the component will unmount
    };
  }, []);

  ///runs when User Picked Numbers Array changed or New Number added to Draw
  useEffect(() => {
    getTotalMatched();
    //ascending order
  }, [myPickedNumbers, drawnNumbersArray]);

  //runs when a new number drawn
  useEffect(() => {
    if (latestDrawnNumber == 0) {
      //initial state, don't start timer
      //return
    }

    let timeOut = null;
    if (drawnNumbersArray.length < TOTAL_NUMBERS_TO_DRAW) {
      //start the timer from MAX_TIME
      let time = counter;
      timeOut = setInterval(() => {
        if (time !== 0) {
          time--;
          setCounter(time);
        } else {
          //if timer reaches zero
          resetCounter();
          clearInterval(timeOut);
          getNewNumber();
        }
      }, 1000);
    } else {
      clearInterval(timeOut);
    }

    return () => clearInterval(timeOut);
  }, [latestDrawnNumber]);

  function startGame() {
    //get New number
    getNewNumber();
  }
  function getNewNumber() {
    //building connection with the APIs and sockets.
    //request for a new number

    //adding a random number to array
    const newNumber = Math.floor(Math.random() * 48) + 1;
    setDrawnNumbersArray((drawnNumbersArray) => [
      ...drawnNumbersArray,
      newNumber,
    ]);
    setLatestDrawnNumber(newNumber);
  }
  function resetCounter() {
    //set counter value back to MAX_TIME
    setCounter(MAX_TIME);
  }
  function handleLottoBallClick(lottoBallNumber) {
    activeLottoBall == lottoBallNumber
      ? setActiveLottoBall(0)
      : setActiveLottoBall(lottoBallNumber);
  }
  function handlePowerplayClick(powerplay, lottoBallNumber) {
    switch (powerplay) {
      case "reset":
        handleResetClicked(lottoBallNumber);
        break;
      case "power-match":
        handleForceMatchClicked(lottoBallNumber);
        break;
      case "increase":
        handleIncreaseClicked(lottoBallNumber);
        break;
      case "decrease":
        handleDecreaseClicked(lottoBallNumber);
        break;

      default:
      // code block
    }
    setActiveLottoBall(0);
  }
  function handleIncreaseClicked(lottoBallNumber) {
    if (powerplays.increase < 1) {
      return;
    }
    const newNumber = lottoBallNumber + 1;
    if (myPickedNumbers.includes(newNumber)) {
      return;
    }
    if (newNumber > 48 || newNumber < 1) {
      return;
    }
    var newPickedNumbers = [...myPickedNumbers];
    newPickedNumbers[newPickedNumbers.indexOf(lottoBallNumber)] = newNumber;

    setMyPickedNumbers(newPickedNumbers);
    //reduce amount
    setPowerplays({
      reset: powerplays.reset,
      increase: powerplays.increase - 1,
      decrease: powerplays.decrease,
      power_match: powerplays.power_match,
    });
  }
  function handleDecreaseClicked(lottoBallNumber) {
    if (powerplays.decrease < 1) {
      return;
    }
    const newNumber = lottoBallNumber - 1;
    if (myPickedNumbers.includes(newNumber)) {
      return;
    }
    if (newNumber > 48 || newNumber < 1) {
      return;
    }
    var newPickedNumbers = [...myPickedNumbers];
    newPickedNumbers[newPickedNumbers.indexOf(lottoBallNumber)] = newNumber;
    setMyPickedNumbers(newPickedNumbers);
    //reduce amount
    setPowerplays({
      reset: powerplays.reset,
      increase: powerplays.increase,
      decrease: powerplays.decrease - 1,
      power_match: powerplays.power_match,
    });
  }
  function handleForceMatchClicked(lottoBallNumber) {
    if (powerplays.power_match < 1) {
      return;
    }
    const newNumber = latestDrawnNumber;
    if (myPickedNumbers.includes(newNumber)) {
      return;
    }
    if (newNumber > 48 || newNumber < 1) {
      return;
    }
    var newPickedNumbers = [...myPickedNumbers];
    newPickedNumbers[newPickedNumbers.indexOf(lottoBallNumber)] = newNumber;
    setMyPickedNumbers(newPickedNumbers);
    //reduce amount
    setPowerplays({
      reset: powerplays.reset,
      increase: powerplays.increase,
      decrease: powerplays.decrease,
      power_match: powerplays.power_match - 1,
    });
  }
  function handleResetClicked(lottoBallNumber) {
    //check amount left
    if (powerplays.reset < 1) {
      return;
    }
    //update the number

    var flag = true;
    while (flag) {
      var newNumber = Math.floor(Math.random() * 48) + 1;
      if (!myPickedNumbers.includes(newNumber)) {
        //update number
        var newPickedNumbers = [...myPickedNumbers];
        newPickedNumbers[newPickedNumbers.indexOf(lottoBallNumber)] = newNumber;
        setMyPickedNumbers(newPickedNumbers);
        flag = false;
      }
    }
    //reduce amount
    setPowerplays({
      reset: powerplays.reset - 1,
      increase: powerplays.increase,
      decrease: powerplays.decrease,
      power_match: powerplays.power_match,
    });
  }
  function isLottoBallActive(lottoBallNumber) {
    return lottoBallNumber == activeLottoBall ? true : false;
  }
  function isLottoBallMatched(lottoBallNumber) {
    return drawnNumbersArray.includes(lottoBallNumber);
  }
  function getTotalMatched() {
    var num = 0;
    drawnNumbersArray.forEach((number) => {
      if (myPickedNumbers.includes(number)) {
        num++;
        setTotalMatchedNumbers(num);
      }
    });
  }
  return (
    <>
      <div className="__Elite8Draw">
        <Header />
        <div className="__content __flex">
          <div className="__game-box __flex">
            {/* gamebox */}
            {/* gamebox left. Contains heading and in play */}
            <div className="__game-box-left">
              {/* elite 8 heading */}
              <div className="__description __flex __column __flex-center">
                <div className="__heading">Elite 8</div>
                <div className="__heading-description __flex">
                  Win <span className="__text-color-primary "> {"$2000"} </span>{" "}
                  CAD
                </div>
                <div className="__btn-rules __uppercase __flex __flex-center">
                  SEE CONTEST RULES
                </div>
              </div>
              <div className="__in_play __flex __column __flex-start">
                <div className="__title __flex __column __flex-start">
                  <div className="text">In Play</div>
                  <div className="underline"></div>
                </div>
                <div className="__draw_box __flex __column">
                  <div className="counter_text">
                    Number&nbsp;<span>{drawnNumbersArray.length}&nbsp;</span> of{" "}
                    {TOTAL_NUMBERS_TO_DRAW}
                  </div>
                  <div className="t2">Next number drawn in</div>
                  <ProgressBar
                    progress={counter}
                    maxProgress={MAX_TIME}
                    size={62}
                    strokeWidth={4}
                    circleOneStroke="grey"
                    circleTwoStroke="#fff"
                  />
                  <div className="__background __drawn_number __flex __flex-center">
                    {latestDrawnNumber > 0 ? latestDrawnNumber : "-"}
                  </div>
                </div>
              </div>
            </div>
            {/* gamebox left ends here*/}
            <div className="__game-box-right">
              <PageHeaderCard />
              <div className="__winning_numbers">
                <div className="__title __flex __column __flex-start">
                  <div className="text">Winning Numbers</div>
                  <div className="underline"></div>
                </div>
                <div className="__numbers_row __flex __flex-center">
                  {_.times(TOTAL_NUMBERS_TO_DRAW, (index) => (
                    <div className="__number_ball __flex __flex-center __background">
                      {drawnNumbersArray[index]
                        ? drawnNumbersArray[index]
                        : "?"}
                    </div>
                  ))}
                </div>
              </div>
              <div className="__my_numbers">
                <div className="__title __flex __column __flex-start">
                  <div className="text">My Numbers</div>
                  <div className="underline"></div>
                </div>
                <div className="t2">
                  Click a number to edit using your powerplays
                </div>
                <div className="__numbers_row __flex __flex-center">
                  {_.times(TOTAL_NUMBERS_TO_DRAW, (index) => (
                    <LottoBall
                      number={myPickedNumbers[index]}
                      matched={isLottoBallMatched(myPickedNumbers[index])}
                      isActive={isLottoBallActive(myPickedNumbers[index])}
                      onClick={handleLottoBallClick}
                      handlePowerplayClick={handlePowerplayClick}
                    />
                  ))}
                </div>
              </div>
              <div className="__matched_numbers_info __flex __flex-center">
                <div className="__info_tick __background"></div>
                <div className="__matched_text">
                  Matched &nbsp;<span>{totalMatchedNumbers}&nbsp;</span>of 8
                  numbers
                </div>
              </div>
            </div>
          </div>
          {/* gamebox ends here  */}
          <div className="__my-powerplays __flex __column __flex-center">
            <div className="powerplays-header">
              <div className="__heading-text">My Powerplays</div>
              <div className="__balance __flex">
                <div className="__my_balance">My Balance</div>
                <div className="__balance_dollars">$0.00</div>
              </div>
            </div>
            <div className="__powerplays-detail __flex __column __flex-center ">
              <div className="__powerplay_item">
                <div className="__powerplay_amount">
                  {powerplays.reset} left
                </div>
                <div className="__powerplay_img img_replace __background"></div>
                <div className="__powerplay_name">Replace</div>
              </div>
              <div className="__powerplay_item">
                <div className="__powerplay_amount">
                  {powerplays.reset_all} left
                </div>
                <div className="__powerplay_img img_replace_all __background"></div>
                <div className="__powerplay_name">Replace All</div>
              </div>
              <div className="__powerplay_item">
                <div className="__powerplay_amount">
                  {powerplays.power_match} left
                </div>
                <div className="__powerplay_img img_power __background"></div>
                <div className="__powerplay_name">Power Match</div>
              </div>
              <div className="__powerplay_item">
                <div className="__powerplay_amount">
                  {powerplays.increase} left
                </div>
                <div className="__powerplay_img img_increase __background"></div>
                <div className="__powerplay_name">Increase</div>
              </div>
              <div className="__powerplay_item">
                <div className="__powerplay_amount">
                  {powerplays.decrease} left
                </div>
                <div className="__powerplay_img img_decrease __background"></div>
                <div className="__powerplay_name">Decrease</div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Elte8Game;
