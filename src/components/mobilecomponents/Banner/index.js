import React from "react";

import { Container, Row, Col } from "reactstrap";
import "./mobile_banner.scss";
import { getLocalStorage } from "../../../utility/shared";
import { CONSTANTS } from "../../../utility/constants";
import * as CryptoJS from "crypto-js";

function getTeamFromLocalStorage(cardType) {
  let key = CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME;
  if (cardType === "mlb") {
    key = CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME;
  } else if (cardType === "nhl") {
    key = CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME;
  } else if (cardType === "nfl") {
    key = CONSTANTS.LOCAL_STORAGE_KEYS.NFL_LIVE_GAME;
  }

  const encData = getLocalStorage(key);
  const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
  const decSelectedTeamData = JSON.parse(byteData.toString(CryptoJS.enc.Utf8));
  return decSelectedTeamData;
}

const Banner = (props) => {
  const { cardType = "mlb" } = props || {};
  const selectedTeam = getTeamFromLocalStorage(cardType);

  return (
    <div className={`mobile__banner_${cardType}`}>
      <Container fluid={true}>
        <Row>
          <Col className="text-center">
            <h1>
              {cardType.toUpperCase()} <span className="color">PowerdFS</span>{" "}
            </h1>
            <h2>
              Entries <span className="ten">{selectedTeam?.enrolled_users}</span>{" "}
              <span className="tens">/ {selectedTeam?.game?.target}</span>
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
