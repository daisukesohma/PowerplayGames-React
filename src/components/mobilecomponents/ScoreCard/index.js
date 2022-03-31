import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import Header from "./header/header";
import Body from "./Body/Body";
import Footer from "./Body/Footer";

import "./score_card.scss";
const ScoreCard = ({
  sideTitle,
  title,
  subtitle,
  totalPts,
  image,
  myScore,
  clr,
  bgClr,
  collapseId,
  background,
  showFull,
  runnungTotal,
  runs,
  rbi,
  plays,
  pts,
  hasPlay
}) => {
  const [show, setShow] = useState(showFull);
  const [id, setId] = useState(collapseId);
  const toggle = (value, collId) => {
    if (collId === id) {
      setShow(value);
      setId(collId);
    }
  };
  return (
    <section className="scoreCard__wrapper">
      <Container fluid={true}>
        <Header
          background={background}
          toggle={toggle}
          show={show}
          sideTitle={sideTitle}
          title={title}
          id={id}
          subtitle={subtitle}
        />

        <div
          className="scoreCard__wrapper__cardBody"
          style={
            background
              ? { backgroundColor: "rgba(251, 110, 0, 0.06)" }
              : { backgroundColor: "#202124" }
          }
        >
          <Row>
            <Body
              show={show}
              totalPts={totalPts}
              image={image}
              myScore={myScore}
              clr={clr}
              bgClr={bgClr}
              runs={runs}
              rbi={rbi}
              plays={plays}
              pts={pts}
              hasPlay={hasPlay}
            />
          </Row>
        </div>

        <div
          className="scoreCard__wrapper__cardFooter "
          style={
            background
              ? { backgroundColor: "rgba(251, 110, 0, 0.06)" }
              : { backgroundColor: "#202124" }
          }
        >
          <Footer runnungTotal={runnungTotal} />
        </div>
      </Container>
    </section>
  );
};

export default ScoreCard;
