import React, {useState } from "react";
import { Container, Row, Col } from "reactstrap";
import WinningCash from "./WinningCash";
import Chart from "./Chart";
import MyScore from "./MyScore";
import MyPowersMenu from "../MyPowersMenu/MyPowersMenu";
import BoosterPopUp from "../BoosterPopUp/BoosterPopUp";
import PrizeGrid from "../PrizeGrid/PrizeGrid";
import SwapStarter from "../SwapStarter/SwapStarter";
import "./live_match.scss";
import RankIcon from "../../../icons/Ranks/RankIcon";
import { setNumberComma } from "../../../utility/shared";
import * as mlbActions from "../../../actions/MLBActions";
import { useDispatch, useSelector } from "react-redux";

const LiveMatch = ({ swap, secondModal, boostModal, swapModal, ranks, currentWinnings, leader, currentRank, counts, onChangeXp = (xp, player) => {}, data, selectedPlayer, gameInfo, gameID, gameStatus, gameType }) => {
  const [modal, setModal] = useState(false);
  
  const [priceGrid, setPriceGrid] = useState(false);
  
  const { ranking = 0, score = 0, game_id = 0, team_id = 0 } = ranks || {};
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);
  const priceModal = (value) => {
    setModal(value);
    setPriceGrid(!priceGrid);
  };
  
  

  

  return (
    <>
      <section className="matchWrapper">
        <div className="live">
          <Container>
            <Row>
              <Col xs={2}></Col>
              <Col xs={4}>
                <MyScore score={score} leader={leader}/>
              </Col>
              <Col xs={6} style={{display: "flex",flexDirection: "column",alignItems: "flex-start",justifyContent: "flex-end"}}>
                <WinningCash currentWinnings={gameStatus!=="Activated"?(setNumberComma(currentWinnings ? (currentWinnings).toFixed(2) : 0)):0}/>
              </Col>
              
              {/* <Col xs={4}>
                <RankIcon rank={currentRank} />
              </Col> */}
              
            </Row>
          </Container>
          <div className="matchWrapper__rank">
            <div className="box">
              <span className="cricle"></span>
              <p>
                Live Rank <span>|</span>
              </p>

              <h2>{currentRank}</h2>
            </div>
            <div className="menuButton" onClick={toggle}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>

      <MyPowersMenu
        gameType={gameType}
        gameID={gameID}
        modal={modal}
        toggle={toggle}
        boostModal={boostModal}
        priceModal={priceModal}
        swapModal={swapModal}
        setModal={setModal}
        counts={counts}
      />
      <BoosterPopUp secondModal={secondModal} boostModal={boostModal} counts={counts} onChangeXp={onChangeXp} data={data} selectedPlayer={selectedPlayer}/>
      <PrizeGrid priceGrid={priceGrid} priceModal={priceModal} />
      <SwapStarter swap={swap} swapModal={swapModal} selectedPlayer={selectedPlayer}/>
    </>
  );
};

export default LiveMatch;
