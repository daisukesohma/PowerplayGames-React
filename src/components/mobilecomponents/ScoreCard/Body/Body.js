import React from "react";
import { Col, Row } from "reactstrap";
import ScoringPlay from "./ScoringPlay";

import ScoringPoints from "./ScoringPoints";
import "./bodystyle.scss";
const Body = ({ show, totalPts, image, myScore, clr, bgClr, runs, rbi, plays, pts, hasPlay }) => {
  return (
    <>
      {show === true ? (
        hasPlay == true ? (
          <>
            <Col xs={4}>
              <ScoringPlay
                bg={true}
                heading="Plays"
                title="Scoring Plays"
                plays={plays}
                points={pts}
              />
            </Col>
            <Col xs={4}>
              <ScoringPlay heading="RBI" title="RBI" plays={runs.rs} points={runs.pts} />
            </Col>
            <Col xs={4}>
              <ScoringPlay heading="RS" title="Runs" plays={rbi.rbi} points={rbi.pts} />
            </Col>
          </>
        ) : (
          <>
          <Col xs={12}>
            <p className="swappedPlayer">Player Swapped</p>
          </Col>
        </>
        )
      ) : null}

      <div
        className="scorePoints"
        style={show === false ? { marginTop: 10 } : null}
      >
        <Row>
          <Col xs={4}>
            <ScoringPoints title="Total Pts" totalPts={totalPts} />
          </Col>
          <Col xs={4}>
            <ScoringPoints title="Powers" image={image} hasPlay={hasPlay}/>
          </Col>
          <Col xs={4}>
            <ScoringPoints
              title="My Score"
              bgClr={bgClr}
              myScore={myScore}
              clr={clr}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Body;
