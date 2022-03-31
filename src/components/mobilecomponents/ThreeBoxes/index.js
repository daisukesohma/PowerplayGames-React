import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import SingleBox from "./singleBox/SingleBox";
import GameCountDown from "./GameCountDown";
import PrizeModal from "../../PrizeModal";
import { CONSTANTS } from "../../../utility/constants";
import LiveStandings from "../../LiveStandings";
import * as CryptoJS from "crypto-js";
import { getLocalStorage, printLog, redirectTo } from "../../../utility/shared";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import * as MLBActions from '../../../actions/MLBActions'
import * as NHLActions from "../../../actions/NHLActions";
import _ from "underscore";

const ThreeBoxes = ({ state, showTime, priceModal, setModal, data, gameID }) => {
  // function getTeamFromLocalStorage() {
  //   const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME);
  //   const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
  //   const decSelectedTeamData = JSON.parse(
  //     byteData.toString(CryptoJS.enc.Utf8)
  //   );

  //   return decSelectedTeamData;
  // }
  const selectedTema = {}; //getTeamFromLocalStorage();
  const [showPrizeModal, setPrizeModalState] = React.useState(false);
  const dispatch = useDispatch();
  const [liveStandingData, setLiveStandingData] = React.useState([]);
  const [currentWinnings, setCurrentWinnings] = React.useState(0);
  const [leader, setLeader] = React.useState(0);
  const [currentRank, setCurrentRank] = React.useState(0);
  const [sportsName, setSportsName] = React.useState("MLB")
  const [showModal, setModalState] = React.useState(false);
  const closeModal = () => {
    setModalState(false);
  }
  const { liveStandings = [] } = useSelector((state) => state.nhl);

  let prizePool = _.reduce(
    selectedTema?.game?.PrizePayouts,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );

  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );
    return decSelectedTeamData;
  }

  const selectedTeam = getTeamFromLocalStorage();
  
  React.useEffect(async () => {

    if (selectedTema.game_id) {
      setSportsName("MLB")
      let liveStandingsData = await dispatch(MLBActions.getLiveStandings(selectedTema.game_id));
      if (typeof liveStandingsData !== "undefined") {
        if (liveStandingsData.payload.error == false) {
          if (
            JSON.stringify(liveStandingsData.payload.data) !== JSON.stringify(liveStandingData)
          ) {
            var finalArr = [];
            var res = liveStandingsData.payload.data.powerDFSRanking;

            var user_id = parseInt(localStorage.PERSONA_USER_ID);
            var userRec = "";
            var leaderScore = 0;
            for (var i = 0; i < res.length; i++) {
              if (res[i].ranking == 1) {
                setLeader(res[i].score);
              }

              if (res[i].team.user.user_id == user_id) {

                userRec = res[i];
                setCurrentRank(userRec.ranking);
                setCurrentWinnings(userRec?.winnings?.amount);
              }
              else {
                finalArr.push(res[i]);
              }
            }
            if (userRec !== "") {
              finalArr.unshift(userRec);
            }
            if (JSON.stringify(liveStandingData) !== JSON.stringify(finalArr))
              setLiveStandingData(finalArr);
          }
          //setModalState(!showModal);
        }
        else {
          // alert("We are experiencing technical issues with the Power functionality. Please try again shortly.");
        }
      }
    }
    else{
      setSportsName("NHL")
      dispatch(NHLActions.getFinalStandings(gameID))
    }
  }, []);

  useEffect(() => {
    setLiveStandingData(liveStandings)
  },[liveStandings])

  return (
    <div
      className="box__wrapper"
      style={
        showTime
          ? { backgroundColor: "#17181a", marginTop: "-1px" }
          : { backgroundColor: "transparent", marginTop: "30px" }
      }
    >
      <Container fluid={true}>
        <Row>
          <SingleBox
            link={false}
            customClass="first"
            image="/images/live-standing.svg"
            heading="Standings"
            subHeading="Live"
            setModal={setModal}
            showTime={showTime}
            onButtonClick={() => {
              setModalState(true)
            }}
          />
          <SingleBox
            customClass=""
            image="/images/price-grid.svg"
            heading="Grid"
            subHeading="Prize"
            priceModal={priceModal}
            showTime={showTime}
            onButtonClick={() => {
              setPrizeModalState(true)
            }}
          />
          <SingleBox
            customClass="third"
            image="/images/gaming.svg"
            heading="Center"
            subHeading="My Game"
            showTime={showTime}
            link={true}
            linkURL={'/my-game-center'}
          />
          {showTime === true && <GameCountDown state={state} selectedTeam={selectedTema} />}
        </Row>
      </Container>
      <PrizeModal
        visible={showPrizeModal}
        sportsName={sportsName}
        data={sportsName === "MLB" ? selectedTema?.game?.PrizePayouts : selectedTeam?.reward}
        onClose={() => setPrizeModalState(false)}
      />
      <LiveStandings visible={showModal} onClose={closeModal} liveStandingData={liveStandingData} prizePool={prizePool} isMobile={true} />
    </div>
  );
};

export default ThreeBoxes;
