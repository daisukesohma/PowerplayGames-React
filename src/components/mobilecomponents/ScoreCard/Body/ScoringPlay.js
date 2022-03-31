import React from "react";
import { Row, Col } from "reactstrap";
import "./bodystyle.scss";
const ScoringPlay = ({ heading, title, plays, points, bg }) => {
  return (
    <div className="scoreplay" bg={bg}>
      <Row>
        <Col xs={12}>
          <h2>{title}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={6} style={{ paddingRight: 0 }}>
          <p>{heading}</p>

          <span
            className="colorFul"
            style={
              bg
                ? { backgroundColor: "rgba(251, 110, 0, 0.1)" }
                : { backgroundColor: "rgba(242, 242, 242, 0.1)" }
            }
          >
            {plays}
          </span>
        </Col>
        <Col xs={6} style={{ padding: 0 }}>
          <p>Pts</p>
          <span style={{ backgroundColor: "rgba(242, 242, 242, 0.1)" }}>
            {points}
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default ScoringPlay;
