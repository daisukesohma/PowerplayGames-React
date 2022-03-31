import React, { useState } from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./tab_style.scss";

const Tabs = ({ state, setState }) => {
  const [sticky, setSticky] = useState();

  window.onscroll = () => {
    if (window.scrollY > 400) {
      setSticky("stick");
    } else {
      setSticky("");
    }
  };

  return (
    <section className={`${sticky} board__wrapper`}>
      <Container fluid={true}>
        <Row className="details">
          <Col xs={6} className={`${state && state === 1 ? "active" : ""}`}>
            <h3
              className={`${state && state === 1 && "color"}`}
              onClick={() => setState(1)}
            >
              <Link
                to="#"
                style={
                  state && state === 1
                    ? {
                        color: "#fb6e00",
                        paddingBottom: "15px",
                        borderBottom: "1px solid  #fb6e00",
                      }
                    : null
                }
              >
                Manage My Team
              </Link>
            </h3>
          </Col>
          <Col
            xs={6}
            className={`${state && state === 2 ? "active" : ""} text-end`}
          >
            <h3>
              <Link
                to="#"
                onClick={() => setState(2)}
                style={
                  state && state === 2
                    ? {
                        color: "#fb6e00",
                        paddingBottom: "15px",
                        borderBottom: "1px solid  #fb6e00",
                      }
                    : null
                }
                className={`${state && state === 2 && "color"}`}
              >
                My Score Details
              </Link>
            </h3>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Tabs;
