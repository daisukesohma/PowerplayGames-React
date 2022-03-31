import { useState } from "react";
import { Row, Col } from "reactstrap";

import XPIcon from "../../icons/XPIcon";
import LockIcon from "../../icons/Lock";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import ReplaceAllIcon from "../../icons/Replace";
import ShieldIcon from "../../icons/ShieldIcon";
import ChallengeIcon from "../../icons/Challenge";
import RetroIcon from "../../icons/RetroBoost";
import PowerUpIcon from "../../icons/PowerUp";
import LearnMoreModal from "../PowerCenterCardDetails/LearnMoreModal";

import classes from "./index.module.scss";

export default function PowerSidebar(props) {
  let {
    pointMultiplierCounts = 0,
    swapCounts = 0,
    dwallCounts = 0,
    challengeCounts = 0,
    retroBoostCounts = 0,
    powerUpCounts = 0,
    game = {},
  } = props;

  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const onCloseModal = () => setLearnMoreModal(false);

  function isPowerAvailable(type) {
    let powerss = game?.Powers;
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
  }

  function isPowerLocked(type) {
    let powerss = game?.Powers;
    if (typeof powerss == "undefined") {
      return;
    }
    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
      return 1;
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

  const RenderPower = ({
    title = "",
    Icon = "",
    isSvgIcon = false,
    count = 0,
  }) => {
    const text = process.env.REACT_APP_POST_SHARING_TEXT;
    return (
      <Row style={{ padding: "20px 5px 20px 20px", width: "100%" }}>
        <Col xs="3" className={classes.sidebar_power_header}>
          {isSvgIcon ? (
            <Icon size={54} />
          ) : (
            <img src={Icon} width={54} height={54} />
          )}
          {isPowerAvailable(title) === 1 && isPowerLocked(title) === 1 && (
            <div className={classes.sidebar_lock_icon}>
              <LockIcon />
            </div>
          )}
        </Col>
        <Col xs="9" style={{ display: "flex", alignItems: "center" }}>
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
                        var left = window.screen.width / 2 - 600 / 2,
                          top = window.screen.height / 2 - 600 / 2;
                        window.open(
                          `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                          "targetWindow",
                          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                            left +
                            ",top=" +
                            top
                        );
                      }}
                    >
                      <FacebookIcon />
                    </button>

                    <button
                      onClick={() => {
                        var left = window.screen.width / 2 - 600 / 2,
                          top = window.screen.height / 2 - 600 / 2;
                        window.open(
                          `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                          "targetWindow",
                          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                            left +
                            ",top=" +
                            top
                        );
                      }}
                    >
                      <TwitterIcon />
                    </button>
                  </>
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
    <div className={classes.sidebar_content}>
      <p className={classes.power_header}>MY POWERS</p>
      <br />
      <div className={classes.sidebar_content_1}>
        <RenderPower
          title="Point Booster"
          isSvgIcon
          Icon={XPIcon}
          count={pointMultiplierCounts}
        />
        <RenderPower
          title="Swap Player"
          isSvgIcon
          Icon={ReplaceAllIcon}
          count={swapCounts}
        />
        <RenderPower
          title="D-Wall"
          isSvgIcon
          Icon={ShieldIcon}
          count={dwallCounts}
        />
        <RenderPower
          title="Challenge"
          isSvgIcon
          Icon={ChallengeIcon}
          count={challengeCounts}
        />
        <RenderPower
          title="Retro Boost"
          isSvgIcon
          Icon={RetroIcon}
          count={retroBoostCounts}
        />
        <RenderPower
          title="Power Up"
          isSvgIcon
          Icon={PowerUpIcon}
          count={powerUpCounts}
        />
      </div>
      <button onClick={() => setLearnMoreModal(true)}>Learn more</button>

      <LearnMoreModal
        title="Point Multipler"
        learnMoreModal={learnMoreModal}
        onCloseModal={onCloseModal}
      />
    </div>
  );
}
