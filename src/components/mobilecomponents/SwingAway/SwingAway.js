import React from "react";
import "./swing_away.scss";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
const SwingAway = () => {
  return (
    <section className="image__wrapper">
      <Container>
        <Link to="#">
          <img
            src="/images/swing.png"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      </Container>
    </section>
  );
};

export default SwingAway;
