import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import classes from "./index.module.scss";
import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import RetroBoostIcon from "../../icons/RetroBoost";
import ChallengeIcon from "../../icons/Challenge";
import PowerUpIcon from "../../icons/PowerUp";
import LockIcon from "../../icons/Lock";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import LearnMoreModal from "../../components/PowerCenterCardDetails/LearnMoreModal";
import batteryIcon from "../../assets/batteryicon.png";
const getIcon = (powerName) => {
  if (powerName) {
    if (powerName.toLowerCase().match(/wall/g)) return ShieldIcon;
    else if (powerName.toLowerCase().match(/video|review/g)) return VideoIcon;
    else if (powerName.toLowerCase().match(/swap/g)) return ReplaceIcon;
    else if (powerName.toLowerCase().match(/multi|boost|1.5|2.5/g))
      return XpIcon;
    else if (powerName.toLowerCase().match(/retro/g)) return RetroBoostIcon;
    else if (powerName.toLowerCase().match(/challenge/g)) return ChallengeIcon;
    else if (powerName.toLowerCase().match(/power-up/g)) return PowerUpIcon;
  }
};
function PowerCollapesible(props) {
  let {
    swapCounts = 0,
    dwallCounts = 0,
    challengeCounts = 0,
    pointMultiplierCounts = 0,
    pointBooster15x = 0,
    pointBooster2x = 0,
    pointBooster3x = 0,
    retroBoostCounts = 0,
    powerUpCounts = 0,
    game = {}
  } = props || {};

  const { game_id = 0 } = game;

  const [collapsed, setCollapseState] = useState(true);
  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const history = useHistory();
  const onCloseModal = () => setLearnMoreModal(false);
  const { Power = [] } = history?.location?.state || {};
  const [swapCountss, setSwapCountss] = useState(0);
  const [dwallCountss, setDwallCountss] = useState(0);
  const [challengeCountss, setChallengeCountss] = useState(0);
  const [pointMultiplierCountss, setPointMultiplierCountss] = useState(0);
  const [pointBooster15xs, setPointBooster15xCountss] = useState(0);
  const [pointBooster2xs, setPointBooster2xCountss] = useState(0);
  const [pointBooster3xs, setPointBooster3xCountss] = useState(0);
  const [retroBoostCountss, setRetroBoostCountss] = useState(0);
  const [powerUpCountss, setPowerUpCountss] = useState(0);
  const text = process.env.REACT_APP_POST_SHARING_TEXT;
  const { styles = {}, powers = [], game_type = "" } = props || {};
  const setPowers = () => {
    let remainingPowers = Power;
    let challenge = 0;
    let swap = 0;
    let point_booster = 0;
    let p15 = 0;
    let p2 = 0;
    let p3 = 0;
    let dwall = 0;
    let retro_boost = 0;
    let power_up = 0;
    for (let i = 0; i < remainingPowers.length; i++) {
      let rec = remainingPowers[i];
      if (rec.powerName === "D-Wall") {
        dwall = remainingPowers[i].amount;
      } else if (rec.powerName === "Challenge") {
        challenge = remainingPowers[i].amount;
      } else if (rec.powerName === "1.5x Point Booster") {
        p15 = remainingPowers[i].amount;
        point_booster = point_booster + parseInt(remainingPowers[i].amount);
      } else if (rec.powerName === "2x Point Booster") {
        p2 = remainingPowers[i].amount;
        point_booster = point_booster + parseInt(remainingPowers[i].amount);
      } else if (rec.powerName === "3x Point Booster") {
        p3 = remainingPowers[i].amount;
        point_booster = point_booster + parseInt(remainingPowers[i].amount);
      } else if (rec.powerName === "Swap") {
        swap = remainingPowers[i].amount;
      } else if (rec.powerName === "Retro Boost") {
        retro_boost = remainingPowers[i].amount;
      } else if (rec.powerName === "Power-Up") {
        power_up = remainingPowers[i].amount;
      }
    }
    setChallengeCountss(challenge);
    setSwapCountss(swap);
    setDwallCountss(dwall);
    setPointMultiplierCountss(point_booster);
    setRetroBoostCountss(retro_boost);
    setPowerUpCountss(power_up);
    setPointBooster15xCountss(p15);
    setPointBooster2xCountss(p2);
    setPointBooster3xCountss(p3);
  };
  const isPowerAvailable = (type) => {
    let powerss = powers;
    // console.log("Game Powers: ", game);
    // if (game?.Powers) {
    //   if(game?.Powers.length > 0)
    //   powerss = game.Powers;
    // }
    
    let available = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    if (typeof powerss == "undefined") {
      return;
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          available = 1;
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          available = 1;
          break;
        }
      }
    }
    return available;
  };
  function isPowerLocked(type) {
    let powerss = powers;
    // console.log("Game Powers: ", game);
    if (game?.Powers) {
      powerss = game.Powers;
    }
    if (typeof powerss == "undefined") {
      return;
    }
    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          if (
            powerss[i].SocialMediaUnlock == true ||
            powerss[i].SocialMediaUnlock == "true"
          ) {
            locked = 1;
          }
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          if (
            powerss[i].SocialMediaUnlock == true ||
            powerss[i].SocialMediaUnlock == "true"
          ) {
            locked = 1;
          }
          break;
        }
      }
    }
    return locked;
  }
  React.useEffect(() => {
    setPowers();
    if (props.collapse === false) {
      setCollapseState(false);
    }
  }, []);
  const RenderPower = ({
    title = "",
    Icon = "",
    isSvgIcon = false,
    count = 0,
  }) => {
    const text = process.env.REACT_APP_POST_SHARING_TEXT;
    return (
      <Row style={{ padding: "15px 5px 15px 5px", width: "100%" }}>
        <Col xs="4" className={classes.sidebar_power_header}>
          {isSvgIcon ? (
            <Icon size={54} />
          ) : (
            <img alt="Power Icon" src={Icon} width={54} height={54} />
          )}
          {isPowerAvailable(title) === 1 && isPowerLocked(title) === 1 && (
            <div className={classes.sidebar_lock_icon}>
              <LockIcon />
            </div>
          )}
        </Col>
        <Col
          xs="8"
          style={{ display: "flex", alignItems: "center", paddingLeft: 0 }}
        >
          <div>
            <p className={classes.power_title}>{title}</p>
            {isPowerAvailable(title) === 0 ? (
              <div style={{ opacity: 0.6, fontSize: "0.9rem" }}>
                Not Available
              </div>
            ) : (
              <div className={classes.power_footer}>
                {isPowerLocked(title) === 1 ? (
                  <>
                    <p>Share to unlock:</p>

                    <button
                      onClick={() => {
                        if(history?.location?.pathname  === "/nhl-live-powerdfs") {
                        var left = window.screen.width / 2 - 600 / 2,
                          top = window.screen.height / 2 - 600 / 2;
                        window.open(
                          `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=https://test.powerplaysystems.com/&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=https://test.powerplaysystems.com?fb=1_power_${title}_game_${game_id}`,
                          "targetWindow",
                          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                            left +
                            ",top=" +
                            top
                        );
                      }
                      }}
                    >
                      <FacebookIcon />
                    </button>

                    <button
                      onClick={() => {
                        if(history?.location?.pathname  === "/nhl-live-powerdfs") {
                        var left = window.screen.width / 2 - 600 / 2,
                          top = window.screen.height / 2 - 600 / 2;
                        window.open(
                          `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}&fb=1_power_${title}_game_${game_id}`,
                          "targetWindow",
                          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                            left +
                            ",top=" +
                            top
                        );
                      }
                      }}
                    >
                      <TwitterIcon />
                    </button>
                  </>
                ) : game_type == "PowerdFs_Recharge" ? (
                  <img src={batteryIcon} />
                ) : (
                  <p className={classes.power_footer_count}>
                    {count} <span>left</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <div className={classes.wrapper} styles={styles}>
      <div
        className={classes.header}
        onClick={() => setCollapseState(!collapsed)}
      >
        <p className={classes.power_header}>MY POWERS</p>
        <span className={`${classes.arrow} ${!collapsed && classes.up}`} />
      </div>

      <div className={`${classes.body} ${collapsed && classes.collapse}`}>
        <RenderPower
          title="Swap Player"
          isSvgIcon
          Icon={ReplaceIcon}
          count={swapCountss || swapCounts}
        />
        <RenderPower
          title="Point Booster"
          isSvgIcon
          Icon={XpIcon}
          count={pointMultiplierCountss || pointMultiplierCounts}
        />
        <RenderPower
          title="Retro Boost"
          isSvgIcon
          Icon={RetroBoostIcon}
          count={retroBoostCountss || retroBoostCounts}
        />
        <RenderPower
          title="D-Wall"
          isSvgIcon
          Icon={ShieldIcon}
          count={dwallCountss || dwallCounts}
        />
        <RenderPower
          title="Challenge"
          isSvgIcon
          Icon={ChallengeIcon}
          count={challengeCountss || challengeCounts}
        />

        <button onClick={() => setLearnMoreModal(true)}>Learn more</button>
      </div>
      <LearnMoreModal
        title="Point Multipler"
        learnMoreModal={learnMoreModal}
        onCloseModal={onCloseModal}
      />
    </div>
  );
}
PowerCollapesible.propTypes = {
  styles: PropTypes.any,
};
export default PowerCollapesible;
