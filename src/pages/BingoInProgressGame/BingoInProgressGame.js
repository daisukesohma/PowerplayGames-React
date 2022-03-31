import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./BingoInProgressGame.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import clockimage from "../../assets/StopWatchIcon@2x.png";
import lotteryImage from "../../assets/lotteryImg@2x.png";
import BingoGame2 from "../../components/BingoGame2/BingoGame2";
import BingoGame from "../../components/BingoGame/BingoGame";
import PowerPlays from "../../components/PowerPlays/PowerPlays";
import ProgressBar from "../../components/Progress";
import {
  checkRange,
  getEmptyStringArray,
  getRandomNumberBetween,
  printLog,
} from "../../utility/shared";
import * as Actions from "../../actions/bingoActions";

const BINGO = [
  getEmptyStringArray(12),
  getEmptyStringArray(12),
  getEmptyStringArray(12),
  getEmptyStringArray(12),
  getEmptyStringArray(12),
];
const BINGO_INDEXES = { b: 0, i: 0, n: 0, g: 0, o: 0 };
const MAX_PROGRESS = 5;
const MAX_LEVELS = 25;

const BingoInProgressGame = (props) => {
  // const [bingo, setBingo] = useState(INITIAL_STATE);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [progressCount, setProgressCount] = useState(5);
  const [currentBingoText, setBingoText] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const dispatch = useDispatch();
  const { inventory: bingoInventory = {}, target_numbers = [] } = useSelector(
    (state) => state.bingoGame
  );

  const resetGameLocalStates = () => {
    setCurrentNumber(0);
    setProgressCount(5);
    setBingoText("");
    setIsGameOver(false);

    for (let i = 0; i < BINGO.length; i++) {
      BINGO[i] = getEmptyStringArray(12);
    }

    BINGO_INDEXES.b = BINGO_INDEXES.i = BINGO_INDEXES.n = BINGO_INDEXES.g = BINGO_INDEXES.o = 0;

    gameStart();
  };

  useEffect(() => {
    // dispatch(Actions.resetBingo());
    // resetGameLocalStates();
    let progress = null;

    progress = gameStart();

    return function cleanup() {
      if (progress) clearInterval(progress);
    };
  }, []);

  const gameStart = () => {
    let progress = MAX_PROGRESS; //progress bar max value
    let timeInterval = null;
    let _levelCount = 1; //initial level will be 1
    if (timeInterval === null) {
      timeInterval = setInterval(() => {
        if (progress > 0) {
          progress--;
          setProgressCount(progress);
        } else {
          //generate random number
          let number = generateAndSetNumber();

          let B = checkRange(number, 1, 15);
          let I = checkRange(number, 16, 30);
          let N = checkRange(number, 31, 45);
          let G = checkRange(number, 46, 60);
          let O = checkRange(number, 61, 75);

          if (B !== 0) {
            BINGO[0][BINGO_INDEXES.b] = number;
            BINGO_INDEXES.b++;
            setBingoText("B");
          }

          if (I !== 0) {
            BINGO[1][BINGO_INDEXES.i] = number;
            BINGO_INDEXES.i++;
            setBingoText("I");
          }

          if (N !== 0) {
            BINGO[2][BINGO_INDEXES.n] = number;
            BINGO_INDEXES.n++;
            setBingoText("N");
          }

          if (G !== 0) {
            BINGO[3][BINGO_INDEXES.g] = number;
            BINGO_INDEXES.g++;
            setBingoText("G");
          }

          if (O !== 0) {
            BINGO[4][BINGO_INDEXES.o] = number;
            BINGO_INDEXES.o++;
            setBingoText("O");
          }
          _levelCount++;

          //reset progress bar
          progress = 5;
          setProgressCount(progress);
          dispatch(Actions.bingoInProgress(BINGO));

          if (_levelCount > MAX_LEVELS) {
            clearInterval(timeInterval);
            printLog("game over");
            setIsGameOver(true);
          }
        }
      }, 1000);
    }

    return timeInterval;
  };

  const generateAndSetNumber = () => {
    let number = getRandomNumberBetween(1, 75);

    for (let i = 0; i < BINGO.length; i++) {
      if (BINGO[i].includes(number)) return generateAndSetNumber();
    }

    setCurrentNumber(number);

    return number;
  };

  return (
    <div className="__BingoInProgressGame __BingoGame">
      <Header isStick={true} />
      <div className="__flex-stretch __main __container">
        <div className="__main-left __mt-5 __ml-5">
          <div className="__title __bold __h2">Bingo</div>
          <div className="__hide-on-large">
            <div className="__mt-1">
              <span className="__h3">
                Win <span className="__primary-color">$2000 </span>
              </span>
              <span className="__h6">CAD</span>
            </div>
            <Link
              to="/"
              className="__uppercase __primary-color __see-contesy-rules __inline-block __mt-1 __mb-6 __light-bold"
            >
              SEE CONTEST RULES
            </Link>
            <div className="__h4">In Play</div>
            <div
              className="__primary __progress-bar __mb-2"
              style={{ width: "26%" }}
            ></div>
          </div>
          <div className="__timer-section __relative __center">
            <div className="__absolute __center">
              <div className="__mt-2">Next number drawn in</div>
              {/* <ReverseTimer className='__ml-a __mr-a __mt-1' /> */}
              <ProgressBar
                progress={progressCount}
                maxProgress={MAX_PROGRESS}
                size={62}
                strokeWidth={4}
                circleOneStroke="grey"
                circleTwoStroke="#fff"
              />
              <div className="__ball __h3 __primary-color __column __ai __flex-center __m-a __mb-1 __mt-1">
                {currentNumber !== 0 ? (
                  <>
                    <div>{currentBingoText}</div>
                    <div>{currentNumber}</div>
                  </>
                ) : (
                  <div>-</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="__main-center __mt-6 __ml-a __mr-a">
          <div className="__header __flex-stretch __relative">
            <div className="__mb-1 __hide-on-large">
              <div className="__light-bold">Jackpot</div>
              <div>
                <span className="__h2 __bolder __primary-color">$2000</span>{" "}
                <span>CAD</span>
              </div>
              <div className="__smaller">
                Odds of winning depend on
                <div className="__light-bold">Powerplay usage</div>
              </div>
            </div>
            <div className="__border __hide-on-large"></div>
            <div className="__live-draw-in-progress-section">
              <div className="__h6 __live-draw __light-bold __inline-block __mt-1 __smaller-on-mediam">
                Live Draw in Progress
              </div>
              <div className="__flex __mt-1 __live-draw-blog">
                <img
                  src={clockimage}
                  alt=""
                  className="__in-progress-clock-image __mr-1 __hide-on-large"
                />
                <div className="__smaller">
                  Pay attention, you will have 12 seconds{" "}
                  <br className="__hide-on-large" /> to match each ball.
                </div>
              </div>
            </div>
            <img
              alt=""
              src={lotteryImage}
              className="__absolute __lottery-image __hide-on-large"
            />
          </div>
          <BingoGame
            targetNumbers={target_numbers}
            currentNumber={currentNumber}
            isGameOver={isGameOver}
            resetGameLocalStates={resetGameLocalStates}
          />
        </div>
        <PowerPlays inventory={bingoInventory} />
      </div>
      <div className="__container">
        <BingoGame2 />
      </div>
      <Footer isBlack={true} />
    </div>
  );
};

export default BingoInProgressGame;
