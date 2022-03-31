import React from "react";
import { Modal } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import "./price_grid.scss";
//********************************************************************************
//********************************************************************************
// ** I HAVE TO OVERWRITE MODAL COMPONENT CSS AND IT CAN BE FOUND IN STYLE.SCSS FILE.
//********************************************************************************
//********************************************************************

const PrizeGrid = ({ priceGrid, priceModal }) => {
  return (
    <Modal
      isOpen={priceGrid}
      toggle={() => priceModal(false)}
      className="popUpModal price__grid"
    >
      <section className="price_Grid_Wrapper">
        <h1>
          PoweredFS - <span>MLB</span>
        </h1>
        <p className="heading_space">PRIZE GRID</p>

        <Container className="list_card" style={{ paddingLeft: 60 }}>
          <Row>
            <Col xs={6}>
              <h1>Place</h1>

              <p className="list_text">1st</p>
              <p className="list_text">2st</p>
              <p className="list_text">3rd</p>
              <p className="list_text">4th</p>
              <p className="list_text">5th</p>
              <p className="list_text"> 6th - 7th</p>
              <p className="list_text">8th - 10th</p>
              <p className="list_text">11th - 15th</p>
              <p className="list_text">16th - 20th</p>
              <p className="list_text"> 21st - 30th</p>
              <p className="list_text">1th - 15th</p>
              <p className="list_text">16th - 20th</p>
              <p className="list_text">21st - 30th</p>
            </Col>
            <Col xs={6}>
              <h1>Payout</h1>

              <h3>$2,000.00</h3>
              <h3>$750.00</h3>
              <h3>$350.00</h3>
              <h3>$200.00</h3>
              <h3>$150.00</h3>
              <h3>$100.00</h3>
              <h3>$80.00</h3>
              <h3>$60.00</h3>
              <h3>$50.00</h3>
              <h3>$40.00</h3>
              <h3>$50.00</h3>
              <h3>$40.00</h3>
              <h3>$80.00</h3>
            </Col>
          </Row>
        </Container>

        <div className="close__box" onClick={() => priceModal(false)}>
          X
        </div>
      </section>
    </Modal>
  );
};

export default PrizeGrid;
