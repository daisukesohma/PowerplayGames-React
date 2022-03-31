import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
const SingleBox = ({
  image,
  heading,
  subHeading,
  customClass,
  priceModal,
  link,
  setModal,
  showTime,
  linkURL,
  onButtonClick
}) => {
  return (
    <Col xs={4} className={`p-0 ${customClass}`}>
      {link === true ? (
        <Link
          to={linkURL}
          style={{ textDecoration: "none" }}
          onClick={
            setModal
              ? () => {
                  setModal(false);
                }
              : null
          }
        >
          <div
            className="services"
            onClick={onButtonClick}
          >
            <img src={image} alt="" className="services__image" />
            <h4>
              {subHeading}
              <br /> {heading}
            </h4>
          </div>
        </Link>
      ) : (
        <div
          className="services"
          onClick={onButtonClick}
        >
          <img src={image} alt="" />
          <h4>
            {subHeading}
            <br /> {heading}
          </h4>
        </div>
      )}
    </Col>
  );
};

export default SingleBox;
