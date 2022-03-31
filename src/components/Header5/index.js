import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import DocIcon from "../../icons/Doc";
import Trophy from "../../icons/Trophy";
import PowerBW from "../../assets/power_bw.png";
import { getLocalStorage, setNumberComma } from "../../utility/shared";
import Points from "../../icons/Points";
import ContestRulesPopUp from "../ContestRulesPopUp";
import Balance from "../Balance";
import { CONSTANTS } from "../../utility/constants";
function Header5(props) {
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
    compressedView = false,
    currentState = <></>,
    token = "",
  } = props || {};

  const FooterSection = ({ Icon, isSvg, title, footerText }) => (
    <div className={classes.footer_section}>
      {Icon && !isSvg ? <img src={Icon} /> : Icon && <Icon />}
      <div className={classes.footer_section_r}>
        <p className={footerText && classes.margin}>{title}</p>
        {footerText && <span>{footerText}</span>}
      </div>
    </div>
  );

  const RenderHeader = () => (
    <div
      className={`${classes.header_container} ${compressedView && classes.compressedView
        }`}
      style={{ backgroundImage: "url(" + bgImageUri + ")" }}
    >
      <div className={classes.header_top}>
        {titleMain1 && (
          <div className={classes.header_title}>
            <h2 className={compressedView && classes.compressedView}>
              {titleMain1} <span>{titleMain2}</span>
            </h2>
          </div>
        )}
        {!compressedView && subHeader1 && <p>{subHeader1}</p>}
        {!compressedView && subHeader2 && (
          <p className={classes.p2}>{subHeader2}</p>
        )}

        <div
          className={`${classes.header_buttons} ${compressedView && classes.compressedView
            }`}
        >
          {contestBtnTitle && (
            <ContestRulesPopUp
              component={({ showPopUp }) => (
                <button onClick={showPopUp}>
                  <DocIcon /> {contestBtnTitle}
                </button>
              )}
            />
          )}
          {prizeBtnTitle && (
            <button
              className={compressedView && classes.compressedView}
              onClick={onClickPrize}
            >
              <Trophy /> Prize Grid
            </button>
          )}
        </div>
      </div>
      {
        (token || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER))
        &&
        <Balance entries="10,000" totalEntries="100,000" />
      }
    </div>
  );

  return <RenderHeader />;
}

Header5.propTypes = {
  onClickContest: PropTypes.func,
  onClickPrize: PropTypes.func,
  titleMain1: PropTypes.string,
  titleMain2: PropTypes.string,
  subHeader1: PropTypes.string,
  subHeader2: PropTypes.any,
  contestBtnTitle: PropTypes.string,
  prizeBtnTitle: PropTypes.string,
  bgImageUri: PropTypes.string,
  compressedView: PropTypes.bool,
  currentState: PropTypes.element,
};

export default Header5;
