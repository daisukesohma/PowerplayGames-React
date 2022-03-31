import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./poweredBy.scss";
const PoweredBy = () => {
  return (
    <section className="poweredBy">
      <Container fluid={true}>
        <Row>
          <Col>
            <img src="/images/bitmap.png" alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PoweredBy;
