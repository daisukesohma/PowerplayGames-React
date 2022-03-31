import React from "react";
import { Col, Row } from "reactstrap";
import classes from "./index.module.scss";

const TagLines = ({ title, points, firstTeam, secondTeam }) => {
  return (
    <Row className="taglines">
      <Col xs={12}>
        <div className="border-line"></div>
        <h2>
          {title}: <span className={classes.points}>{points} Pts</span>
        </h2>
      </Col>
      {/* <Col xs={6} className="text-end">
        <h4>
          <span style={{ color: "#8cc2ff", fontWeight: "bold" }}>
            {firstTeam}
          </span>
          <br />
          vs <span>{secondTeam}</span>
        </h4>
      </Col> */}
    </Row>
  );
};

export default TagLines;
