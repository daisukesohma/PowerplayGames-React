import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import classes from "./index.module.scss";
import DocIcon from "../../icons/Doc";
import Trophy from "../../icons/Trophy";
import PowerBW from "../../assets/power_bw.png";
import { getLocalStorage, setNumberComma } from "../../utility/shared";
import Points from "../../icons/Points";
import ContestRulesPopUp from "../ContestRulesPopUp";
import Balance from "../Balance";
import { CONSTANTS } from "../../utility/constants";
import _ from "underscore";
import group2 from '../../assets/group-2.png';
import { showDepositForm } from "../../actions/uiActions";

function Header4(props) {
  const {
    outof = "",
    enrolledUsers = "",
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
    isMobile = false,
    points = [],
    powers = [],
    livePage = false,
    selectedTeam = {},
    // depositClicked,
  } = props || {};
  console.log("PROPS IN HEADER4 => ", props)
  const { game = {}, challenge_amount = 0 , gameType = "" } = selectedTeam;
  let { prizePool = 0, game_type = "", powerdfs_challenge_amount=0 } = game;
  game_type = game_type || gameType;

// const depositClicked=()=>{
  // eslint-disable-next-line no-undef
  const dispatch = useDispatch();
  const setShowDepositModal = () => dispatch(showDepositForm());
// }
  const FooterSection = ({ Icon, isSvg, title, footerText }) => (
    <div className={classes.footer_section}>
      {Icon && !isSvg ? <img src={Icon} /> : Icon && <Icon />}
      <div className={classes.footer_section_r}>
        <p className={footerText && classes.margin}>{title}</p>
        {footerText && <span>{footerText}</span>}
      </div>
    </div>
  );

  const numberWithCommas = (x) => {
    if (x >= 10000) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return x;
  };

  const getGameTypeText = (game_type) => {
    if (game_type === "PowerdFS") {
      return "";
    }
    else if (game_type === "PowerdFs_Recharge") {
      return "";
    }
    else if (game_type === "PowerdFs_open") {
      return "";
    }
    else if (game_type === "PowerdFs_promo") {
      if (props.isTeamSelectionPage) {
        return <><br /> Manager Challenge </>;
      }
      else {
        return "Manager Challenge";
      }
    }
    else if (game_type === "PowerdFs_challenge") {
      if (props.isTeamSelectionPage) {
        return <><br /> {powerdfs_challenge_amount?powerdfs_challenge_amount:challenge_amount} Point Challenge </>;
      }
      else {
        return `${powerdfs_challenge_amount?powerdfs_challenge_amount:challenge_amount} Point Challenge`;
      }
    }
    else if (game_type === "PowerdFs_Progressive") {
      if (props.isTeamSelectionPage) {
        return <><br /> Progressive Jackpot </>;
      }
      else {
        return "Progressive Jackpot";
      }
    }
    else if (game_type === "PowerdFs_One") {
      return "One";
    }
  }

  const RenderHeader = () => (
    <div
      className={`${classes.header_container} ${compressedView && classes.compressedView
        }`}
      style={{ backgroundImage: "url(" + bgImageUri + ")" }}
    >
      {isMobile ? (
          <div className={classes.header_top}>
            <div className={classes.header_title}>Select your team</div>
            <div>
              <span className={classes.horizontal_line}></span>
              <span className={classes.header_sub_title}>
                7 starters + 1 team D
              </span>
              <span className={classes.horizontal_line}></span>
            </div>
          </div>
      ) : (
          <div className={classes.header_top}>
            {titleMain1 && (
              <div className={classes.header_title}>
                <h2 className={compressedView && classes.compressedView} style={{ textAlign: "center", lineHeight: "50px" }}>
                  {titleMain1} {(game_type === "PowerdFs_Recharge") ? (<img src={group2} />) : (<><span>{titleMain2}</span> {getGameTypeText(game_type)}</>)}
                </h2>
              </div>
            )}

            {(game_type === "PowerdFs_promo" || game_type === "PowerdFs_Recharge") && <p>Power your team to victory and win big!</p>}
            {(game_type === "PowerdFs_Progressive") && <p>Jackpot starts from $1,000 and will grow with each entry!</p>}
            {(game_type === "PowerdFs_One" && (titleMain1 == "NFL" || titleMain1 == "NBA")) && <p>One-Quarter Fantasy Football</p>}
            {(game_type === "PowerdFs_One" && (titleMain1 == "NHL")) && <p>One-Period Fantasy Hockey</p>}
            {(game_type === "PowerdFs_One" && (titleMain1 == "MLB")) && <p>One-Inning Fantasy Football</p>}
            
            {props?.isTeamSelectionPage && game_type !== "PowerdFS" && game_type !== "NHL_Fantasy" && <p>{props.teamSelectionPageText}</p>}
            {!compressedView && subHeader1 && (game_type == "PowerdFS" || game_type =="NHL_Fantasy") && <p>{subHeader1}</p>}
            {!compressedView && subHeader2 && (game_type == "PowerdFS" || game_type =="NHL_Fantasy") && (
              <p className={classes.p2}>{subHeader2}</p>
            )}
            {compressedView && game_type =="NHL_Fantasy" && <p>Pick Today & Win Today!</p>}

            {props?.isTeamSelectionPage && game_type == "PowerdFs_challenge" && <div style={{
              fontFamily: "Teko",
              fontSize: 60,
              fontWeight: "bold",
              textAlign: "center",
              color: "#f2f2f2"
            }}>${numberWithCommas(prizePool)}</div>}


            <div
              className={`${classes.header_buttons} ${compressedView && classes.compressedView
                }`}
            >
              {contestBtnTitle && (
                <ContestRulesPopUp
                  game_type={game_type}
                  point={
                    typeof props?.selectedTeam?.pointSystem!== "undefined"
                      ? 
                        props?.selectedTeam?.pointSystem
                      : points
                  }
                  livePage={props?.livePage}
                  isSelectedPage={props?.isTeamSelectionPage}
                  isEditPicks={props?.isEditPicks}
                  powers={
                    typeof props?.selectedTeam?.powersAvailable !== "undefined"
                      ? props?.selectedTeam?.powersAvailable
                      : powers
                  }
                  component={({ showPopUp }) => (
                    <button onClick={showPopUp}>
                      <DocIcon /> {contestBtnTitle}
                    </button>
                  )}
                  title={titleMain1.split(" ")[0]}
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
      )}

      {/* {(token || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER)) &&
        !isMobile && ( */}
      {!isMobile &&
        <Balance
          entries={enrolledUsers}
          totalEntries={outof}
          livePage={livePage}
          depositClicked={setShowDepositModal}
          selectedTeam={selectedTeam}
        />
      }
      {/* )} */}
    </div>
  );

  return <RenderHeader />;
}

Header4.propTypes = {
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

export default Header4;
