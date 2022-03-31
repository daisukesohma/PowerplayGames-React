import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

import classes from "./index.module.scss";
import BackArrow from "../../icons/BackArrow";
import { CONSTANTS } from "../../utility/constants";
import { redirectTo } from "../../utility/shared";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function NHLLiveSportsHeader(props) {
  const {
    selectedView = "",
    btnTitle1 = "",
    btnTitle2 = "",
    btnTitle3 = "",
    buttonTitle = "",
    singleBtn = false,
    buttonIcon = "",
    activeTab = "",
    handleChangeTab = () => {},
    teamManagerLink = "",
    scoreDetailLink = "",
    onPress = () => {},
    onFullView = () => {},
    onCompressedView = () => {},
    onSingleView = () => {},
    className = {},
    onGoBack = () => {},
    state = {},
    checkGameInProgress,

  } = props || {};
  const renderActiveButton = () => (
    <div className={classes.right_menu}>
      <button
        className={`${classes.button} 
                ${selectedView === CONSTANTS.NHL_VIEW.FV && classes.active}`}
        onClick={onFullView}
      >
        {buttonIcon} {btnTitle1 || "Full View"}
      </button>

      <button
        className={`${classes.button} 
                    ${selectedView === CONSTANTS.NHL_VIEW.C && classes.active}`}
        onClick={onCompressedView}
      >
        {buttonIcon} {btnTitle2 || "Detailed Team View"}
      </button>

      <button
        className={`${classes.button} 
                    ${selectedView === CONSTANTS.NHL_VIEW.S && classes.active}`}
        onClick={onSingleView}
      >
        {buttonIcon} {btnTitle3 || "Full View"}
      </button>
    </div>
  );

  return (
    <div className={`${classes.container_header} ${className}`}>
      <button
        onClick={onGoBack}
        className={`${classes.button_back} ${classes.bg_transparent}`}
      >
        <BackArrow /> Go to My Game center
      </button>

      <div className={classes.container_nav}>
        <Tabs
          selectedIndex={activeTab}
          onSelect={handleChangeTab}
          style={{ display: "flex", width: "100%" }}
        >
          <TabList className={classes.tabs_header}>
            <Tab>
              <a
                className={`${activeTab === 0 && classes.active}`}
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                Manage My Team
              </a>
            </Tab>
            <Tab>
              <a
                className={`${activeTab === 1 && classes.active}`}
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                My Score Details
              </a>
            </Tab>
          </TabList>
        </Tabs>

        {!singleBtn ? (
          <>{activeTab === 0 ? renderActiveButton() : null}</>
        ) : (
          <button className={classes.btn_single} onClick={onPress}>
            {buttonIcon} {buttonTitle || "Detail View"}
          </button>
        )}
      </div>
    </div>
  );
}

NHLLiveSportsHeader.propTypes = {
  selectedView: PropTypes.string,
  btnTitle1: PropTypes.string,
  btnTitle2: PropTypes.string,
  btnTitle3: PropTypes.string,
  buttonTitle: PropTypes.string,
  singleBtn: PropTypes.bool,
  buttonIcon: PropTypes.any,
  className: PropTypes.object,
  teamManagerLink: PropTypes.string,
  scoreDetailLink: PropTypes.string,
  active: PropTypes.string,
  handleChangeTab: PropTypes.func,
  onPress: PropTypes.func,
  onFullView: PropTypes.func,
  onCompressedView: PropTypes.func,
  onSingleView: PropTypes.func,
  onGoBack: PropTypes.func,
  state: PropTypes.object,
};

export default NHLLiveSportsHeader;
