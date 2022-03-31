import React from "react";
import { Container } from "reactstrap";
import Slider from "./Slider";
import "./score_board.scss";
import TagLines from "./TagLines";
import { CardType } from "./CardType";
import { CONSTANTS } from "../../../utility/constants";

const { CENTER, XW, D, G, TD } = CONSTANTS.FILTERS.NHL;

const ScoreBoard = (props) => {
  const {
    data = {},
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    starPlayerCount = 0,
    onSelectCard = () => {},
    onChangeXp = (xp, player) => {},
    updateReduxState = (currentPlayer, newPlayer) => {},
    cardType = CardType.MLB,
    isHomeRun = false,
    gameInfo = {},
    pointXpCount = {},
    currentPlayerList = [],
    counts,
    key = "",
  } = props || {};


  const { game: { game_id: gameId } = {} } = gameInfo || {};

  const {
    player = {},
    match = {},
    xp = {},
    score = 0,
    team_d_mlb_team,
    team_d_nhl_team,
    team_d_nfl_team,
  } = data || {};
  const { xp1 = 0, xp2 = 1, xp3 = 2 } = pointXpCount || {};

  const {
    name = "",
    type = "",
    type1 = "",
    primary_position: type2 = "",
    positionID = "",
  } = player || {};

  // const {
  //   match_id = 0,
  //   pitch_count = 0,
  //   walks = 0,
  //   hits = 0,
  //   runs = 0,
  //   runs_batted_in = 0,
  //   innings_pitched = 0,
  //   strike_outs = 0,
  //   plate_appearances = 0,
  // } = match_stats?.[0] || {};

  return (
    <section className="transparent board__wrapper" key={key}>
      <Container fluid={true}>
        <TagLines
          title={type1 ? type1 + positionID : type2 + positionID}
          points={score}
        />
        <Slider
          counts={counts}
          cardType={cardType}
          data={data}

          // swapModal={swapModal}
          // boostModal={boostModal}
          // double={double}
          // featured={featured}
          // icons={icons}
          // baseBall={baseBall}
          // title={title}
          // subTitle={subTitle}
          // fieldText={fieldText}
          // fieldColor={fieldColor}
          // points={points}
          // hitter={hitter}
          // pitcher={pitcher}
          // strikes={strikes}
          // footerText={footerText}
          // balls={balls}
          // secondShow={secondShow}
          // imageTochanged={imageTochanged}
          // otherIcons={otherIcons}
          // notShow={notShow}
          // type={tagLine}
          // index={index}
          // ranks={ranks}
          // counts={counts}
          // player={player}
          // active_power_id={active_power_id}
        />
      </Container>
    </section>
  );
};

export default ScoreBoard;
