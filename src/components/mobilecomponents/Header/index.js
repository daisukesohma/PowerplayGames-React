import React from "react";
import "./mobileHeader.scss";
import { Container, Row, Col } from "reactstrap";
import Logo from "./Logo";
import Menu from "./Menu";

const Header = () => {
  return (
    <div className="mobile_header">
      <Container fluid={true}>
        <Row>
          <Col>
            <Logo />
          </Col>
          <Col className="text-end">
            <Menu />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
