import React from "react";
import "./easy_play.scss";
import { Row, Col } from "reactstrap";
const LetsPlayBanner = ({
  image,
  number,
  description,
  background,
  offset,
  width,
  height,
  float,
  valueAlign,
  rowReverse,
  space,
  newClass,
}) => {
  return (
    <Row className={`imagebox flex-column-reverse ${rowReverse}`}>
      <Col md={6}>
        <div className="numberBox" style={{marginTop: number == 1 ? 0 : 20}}>
          <span className="number" style={{ top: offset[0], left: offset[1] }}>
            {number}
          </span>
          <span
            style={{ top: valueAlign }}
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Col>
      <Col md={6}>
        <img
          className={`${newClass} ${space}`}
          src={image}
          width={width}
          height={height}
          alt=""
          style={
            newClass
              ? null
              : rowReverse === "flex-md-row-reverse"
              ? { float: "left" }
              : { float: float }
          }
        />
      </Col>
    </Row>
  );
};

export default LetsPlayBanner;
