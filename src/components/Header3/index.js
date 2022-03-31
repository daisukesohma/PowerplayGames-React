import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import DocIcon from "../../icons/Doc";
import Trophy from "../../icons/Trophy";
import ContestRulesPopUp from "../ContestRulesPopUp";

function Header3(props) {
  const {
    onClickContest = () => { },
    onClickPrize = () => { },
    titleMain1 = "",
    titleMain2 = "",
    subHeader1 = "",
    subHeader2 = "",
    contestBtnTitle = "",
    prizeBtnTitle = "",
    bgImageUri,
    isLive = false,
    points = [],
    powers = []
  } = props || {};
  const RenderLiveProgress = () => (
    <div className={classes.live_progress_container}>
      <p className={classes.live_text}>Live Game</p>
      <div className={classes.in_progress}>
        <span /> <p>IN PROGRESS</p>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={classes.header_container}
        style={{ backgroundImage: "url(" + bgImageUri + ")" }}
      >
        {titleMain1 && (
          <div className={classes.header_title}>
            <span className={classes.line} />
            <h2>
              {titleMain1} <span>{titleMain2}</span>
            </h2>
            <span className={classes.line} />
          </div>
        )}
        {subHeader1 && <p>{subHeader1}</p>}
        {subHeader2 && <p className={classes.p2}>{subHeader2}</p>}

        <div className={classes.header_buttons}>
          <ContestRulesPopUp
            component={({ showPopUp }) => (
              <button onClick={showPopUp}>
                <DocIcon /> Gameplay Rules
              </button>
            )}
            points={points}
            powers={powers}
          />
          {prizeBtnTitle && (
            <button onClick={onClickPrize}>
              <Trophy /> Prize Grid
            </button>
          )}
        </div>

        {isLive && <RenderLiveProgress />}
      </div>
    </>
  );
}

Header3.propTypes = {
  onClickContest: PropTypes.func,
  onClickPrize: PropTypes.func,
  titleMain1: PropTypes.string,
  titleMain2: PropTypes.string,
  subHeader1: PropTypes.string,
  subHeader2: PropTypes.string,
  contestBtnTitle: PropTypes.string,
  prizeBtnTitle: PropTypes.string,
  bgImageUri: PropTypes.string,
  isLive: PropTypes.bool,
};

export default Header3;
