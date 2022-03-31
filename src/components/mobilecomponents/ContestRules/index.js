import React from "react";
import "./contestRules.scss";
import ContestRulesPopUp from '../../ContestRulesPopUp/index'
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import _ from 'underscore';
import { setNumberComma } from "../../../utility/shared";
const ContestRules = ({prizePool = 0, gameInfo = {}}) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
  const d = new Date(gameInfo?.game?.start_date);
  const groupedPoints = _.groupBy(gameInfo?.game?.PointsSystems, 'type');
  return (
    <div className="rulesWrapper">
      <Container fluid={true}>
        <Row>
          <Col>
            <h1>Gameplay Rules</h1>
            <div className="border-line"></div>

            <div className="list">
              <Row className="pb-3">
                <Col xs={1}>
                  <img src="/images/correct.svg" alt="" />
                </Col>
                <Col xs={11}>
                  <h3>
                    <span> ${setNumberComma(prizePool)}</span> Prize Pool
                  </h3>
                </Col>
              </Row>
              <Row className=" pb-3">
                <Col xs={1}>
                  <img src="/images/correct.svg" alt="" />
                </Col>
                <Col xs={11}>
                  <h3>
                    {" "}
                    Live-play <span>Powers</span> included with
                    <br /> entry fee
                  </h3>
                </Col>
              </Row>
              <Row className=" pb-3">
                <Col xs={1}>
                  <img src="/images/correct.svg" alt="" />
                </Col>
                <Col xs={11}>
                  <h3>
                    {" "}
                    Pick players from any teams
                    <br /> scheduled to play on <span>{monthNames[d.getUTCMonth()]} {("0" + d.getUTCDate()).slice(-2)}, {d.getUTCFullYear()}</span>
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="full">
                    <ContestRulesPopUp
                        points={groupedPoints}
                        powers={gameInfo?.game?.Powers}
                        component={({ showPopUp }) => (
                          <Link
                            onClick={showPopUp}
                            //className={classes.footer_full_rules}
                            href="#"
                          >
                            See Full Rules <img src="/images/left-arrow.svg" alt="" />
                          </Link>
                        )}
                      />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContestRules;
