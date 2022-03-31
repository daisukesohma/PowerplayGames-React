import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import classes from "./index.module.scss";
import * as MLBActions from "../../actions/MLBActions";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/mlb_compress_header.jpg";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import XPIcon from "../../icons/XPIcon";
import ReplaceAllIcon from "../../icons/Replace";
import ShieldIcon from "../../icons/ShieldIcon";
import ChallengeIcon from "../../icons/Challenge";
import RetroBoost from "../../icons/RetroBoost";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import FooterImage from "../../assets/NHL-live-footer.png";
import RankCard from "../../components/RankCard";
import { CONSTANTS } from "../../utility/constants";
import SingleView from "./SingleView/SingleView";
import LearnMoreModal from "../../components/PowerCenterCardDetails/LearnMoreModal";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";

import SportsLiveCard from "../../components/SportsLiveCard";
import { redirectTo } from "../../utility/shared";
import { socket } from "../../config/server_connection";
import SportsLiveCardTeamD from "../../components/SportsLiveCard/TeamD";
import RechargeAll from "../../icons/RechargeAll";
import SliderModal from "./SliderModal";
import { dummyData } from "./dummyData";
import ShowBatteries from "./ShowBatteries";
import { CardType } from "../../components/SportsLiveCard/CardType";

const { D, SP, DH, IF, OF, RP } = CONSTANTS.FILTERS.MLB_R;

let _socket = null;
function MLBRecharge(props) {
  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);
  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const [playerIds, setPlayerIds] = useState([]);
  const [data, setData] = useState(dummyData);
  const [slider, setSliderModal] = useState({
    visible: false,
    player: {},
  });

  const {
    live_data: selectedData = [],
    data: mlbData = [],
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.mlb);
  const { user = {} } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onCloseModal = () => setLearnMoreModal(false);

  // useEffect(() => {
  //   // if (!selectedData?.length) {
  //   //   redirectTo(props, { path: "/power-center" });
  //   // }
  //   _socket = socket();

  //   return function cleanUP() {
  //     if (_socket) _socket.disconnect();

  //     _socket = null;
  //   };
  // }, [data]);

  // useEffect(() => {
  //   const playerTeamdata = {};
  //   const playerIds = [];
  //   if (selectedData?.length) {
  //     for (let i = 0; i < selectedData?.length - 1; i++) {
  //       const { player = {} } = selectedData[i];
  //       playerIds.push({
  //         playerId: player?.playerId,
  //         matchId: player?.match_id,
  //       });
  //     }

  //     const [teamD] = selectedData?.filter((d) => d?.type === D);

  //     playerTeamdata.players = playerIds;
  //     playerTeamdata.teamId = teamD?.team?.team_id;
  //     playerTeamdata.user = 92; //TODO: use actual user id

  //     setPlayerIds(playerIds);
  //     _socket?.emit(
  //       CONSTANTS.SOCKET_EVENTS.MLB.LIVE.ON_ROOM_SUB,
  //       playerTeamdata
  //     );
  //   }

  //   getPlayers();
  // }, [selectedData]);

  // useEffect(() => {
  //   if (_socket && data?.length) {
  //     const _players = [];
  //     console.log("Data =========== ", data);
  //     _socket?.on(CONSTANTS.SOCKET_EVENTS.MLB.LIVE.EMIT_ROOM, (res) => {
  //       console.log(`Response: `, res);
  //       const _player = res?.data || {};
  //       const playerInd = _players?.findIndex(_players);
  //       console.log(playerInd);
  //     });
  //   }
  // }, [_socket, data]);

  // const getPlayers = async () => {
  //   const dataResponse = await dispatch(
  //     MLBActions.getMlbLivePlayPlayerTeamData({
  //       game_id,
  //       sport_id,
  //       user_id: user.user_id,
  //     })
  //   );

  //   const playersArr = new Array(8);
  //   const { players = [], teamD = {} } = dataResponse || {};
  //   console.log(players);
  //   const [playerP] = players?.filter(
  //     (plr) => `${plr?.type}`?.toLocaleLowerCase() === SP
  //   );
  //   const playerIF = players?.filter(
  //     (plr) => `${plr?.type}`?.toLocaleLowerCase() === IF
  //   );
  //   const playerOF = players?.filter(
  //     (plr) => `${plr?.type}`?.toLocaleLowerCase() === OF
  //   );
  //   const [playerDH] = players?.filter(
  //     (plr) => `${plr?.type}`?.toLocaleLowerCase() === DH
  //   );
  //   const [playerRP] = players?.filter(
  //     (plr) => `${plr?.type}`?.toLocaleLowerCase() === RP
  //   );

  //   playersArr[0] = playerP;
  //   playersArr[5] = playerDH;
  //   playersArr[6] = playerRP;

  //   if (playerOF?.length) {
  //     playersArr[1] = playerOF[0];
  //     playersArr[1].type = "OF1";
  //     playersArr[2] = playerOF[1];
  //     playersArr[2].type = "OF2";
  //   }

  //   if (playerIF?.length) {
  //     playersArr[3] = playerIF[0];
  //     playersArr[3].type = "IF1";
  //     playersArr[4] = playerIF[1];
  //     playersArr[4].type = "IF2";
  //   }
  //   playersArr[7] = teamD;
  //   playersArr[7].type = D;

  //   setData(playersArr);
  // };

  const toggleSlider = (player = {}) => {
    setSliderModal({
      visible: !slider.visible,
      player: player,
    });
  };

  const onChangeXp = (xp, player) => {
    toggleSlider(player);
    // const _selectedXp = {
    //   xp,
    // };
    // if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    // else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    // else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";

    // const indexOfPlayer = selectedData?.indexOf(player);

    // if (indexOfPlayer) {
    //   player.xp = _selectedXp;
    //   selectedData[indexOfPlayer] = player;
    //   return dispatch(MLBActions.mlbLiveData(selectedData));
    // }
  };

  const RenderPower = ({
    title = "",
    Icon = "",
    isSvgIcon = false,
    time = "",
    CellIcon = "",
    showSocial = false,
  }) => (
    <div className={classes.sidebar_content_p}>
      <div className={classes.sidebar_power_header}>
        {isSvgIcon ? (
          <Icon size={54} />
        ) : (
          <img src={Icon} width={54} height={54} />
        )}
      </div>
      <p className={classes.power_title}>{title}</p>
      {!showSocial ? (
        <>
          {CellIcon && CellIcon}
          {time !== "" && <p className={classes.time_p}>{time}</p>}
        </>
      ) : (
        <div className={classes.power_footer}>
          <p>Share to unlock:</p>
          <div>
            <button onClick={() => {
              var left = (window.screen.width / 2) - (600 / 2),
                top = (window.screen.height / 2) - (600 / 2);
              window.open(`https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=' + left + ',top=' + top);
            }}>
              <FacebookIcon />
            </button>


            <button onClick={() => {
              var left = (window.screen.width / 2) - (600 / 2),
                top = (window.screen.height / 2) - (600 / 2);
              window.open(`https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=' + left + ',top=' + top);
            }}>
              <TwitterIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const setView = (viewType = CONSTANTS.NHL_VIEW.FV) => {
    switch (viewType) {
      case CONSTANTS.NHL_VIEW.FV:
        setCompressedView(false);
        break;

      case CONSTANTS.NHL_VIEW.C:
        setCompressedView(true);
        break;

      case CONSTANTS.NHL_VIEW.S:
        break;
    }
    setSelectedView(viewType);
  };

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;
    const _data = [...selectedData];
    const indexOfPlayer = _data && _data?.indexOf(currentPlayer);
    let _starPlayerCount = starPlayerCount;

    if (starPlayerCount >= 3 && !newPlayer?.isStarPlayer) {
      return;
    } else if (
      starPlayerCount >= 3 &&
      newPlayer?.isStarPlayer &&
      currentPlayer?.isStarPlayer
    ) {
      _data[indexOfPlayer] = newPlayer;
    } else if (
      starPlayerCount < 3 &&
      newPlayer?.isStarPlayer &&
      !currentPlayer?.isStarPlayer
    ) {
      _data[indexOfPlayer] = newPlayer;
      _starPlayerCount++;
    } else if (
      currentPlayer?.isStarPlayer &&
      !newPlayer?.isStarPlayer &&
      starPlayerCount > 0
    ) {
      _data[indexOfPlayer] = newPlayer;
      _starPlayerCount--;
    } else if (!newPlayer?.isStarPlayer && !currentPlayer?.isStarPlayer) {
      _data[indexOfPlayer] = newPlayer;
    }

    dispatch(MLBActions.setStarPlayerCount(_starPlayerCount));
    dispatch(MLBActions.mlbLiveData(_data));
  };

  const RenderView = () => {
    if (selectedView === CONSTANTS.NHL_VIEW.S) {
      return (
        <SingleView
          data={data}
          playerList={mlbData?.[0]?.players}
          onChangeXp={onChangeXp}
          updateReduxState={updateReduxState}
          starPlayerCount={starPlayerCount}
        />
      );
    } else if (data && data?.length) {
      return data?.map((item, index) => (
        <>
          {item?.type === D ? (
            <SportsLiveCardTeamD
              team={item}
              compressedView={compressedView}
              key={index + ""}
              cardType={CardType.MLBR}
            />
          ) : (
            <SportsLiveCard
              player={item}
              compressedView={compressedView}
              key={index + ""}
              onChangeXp={onChangeXp}
              playerList={mlbData?.[0]?.players}
              updateReduxState={updateReduxState}
              starPlayerCount={starPlayerCount}
              cardType={CardType.MLBR}
              isHomeRun={item?.isHomeRun}
            />
          )}
        </>
      ));
    }
  };

  const RenderLiveState = ({ isLive = false }) =>
    isLive ? (
      <p className={classes.currentState}>
        <span className={classes.orb} /> Live Game In Progress
      </p>
    ) : (
      <p className={`${classes.currentState} ${classes.column}`}>
        5d 4h 15min
        <span className={classes.span_text}>Live Game Stars in</span>
      </p>
    );

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header4
          titleMain1="MLB"
          titleMain2="PowerdFS"
          subHeader1="Introducing Live-Play Fantasy Baseball"
          subHeader2={
            <>
              Use your <span>Powers</span> during the live game to drive your
              team up the standings
            </>
          }
          contestBtnTitle="Gameplay Rules"
          prizeBtnTitle="Prize Grid"
          bgImageUri={BaseballImage}
          compressedView
          currentState={<RenderLiveState />}
        />

        <div className={classes.container}>
          <div className={classes.container_left_side}>
            <NHLLiveSportsHeader
              btnTitle1="Full View"
              btnTitle2="Compressed"
              btnTitle3="Single"
              selectedView={selectedView}
              onFullView={() => setView(CONSTANTS.NHL_VIEW.FV)}
              onCompressedView={() => setView(CONSTANTS.NHL_VIEW.C)}
              onSingleView={() => setView(CONSTANTS.NHL_VIEW.S)}
              teamManagerLink="/mlb-recharge"
              scoreDetailLink="/mlb-recharge/my-score-details"
              onGoBack={() => {
                redirectTo(props, { path: "/my-game-center" })
              }}
            />
            <Card>{RenderView()}</Card>
            <div className={classes.left_side_footer}>
              <img src={FooterImage} alt="" />
            </div>
          </div>

          <div className={classes.sidebar_container}>
            <Sidebar>
              <CashPowerBalance
                powerBalance={50000}
                cashBalance={200000}
                styles={{
                  width: "100%",
                  marginTop: "-40px",
                }}
                cashTitle="Prize Pool"
                powerTitle="Top Prize"
                centered
                showIcons={false}
              />
              <RankCard currentWin={100000} {...props} />

              <div className={classes.sidebar_content}>
                <SliderModal
                  visible={slider.visible}
                  player={slider.player}
                  onClose={toggleSlider}
                />
                <p>
                  <span>My</span> Powers
                </p>
                <div className={classes.sidebar_content_1}>
                  <RenderPower
                    title="Point Boost"
                    isSvgIcon
                    Icon={XPIcon}
                    CellIcon={<ShowBatteries value={"5"} />}
                  />
                  <RenderPower
                    title="Swap Player"
                    isSvgIcon
                    Icon={ReplaceAllIcon}
                    CellIcon={<ShowBatteries value={"4"} />}
                    time="~ 1 mint"
                  />
                  <RenderPower
                    title="D-Wall"
                    isSvgIcon
                    Icon={ShieldIcon}
                    CellIcon={<ShowBatteries value={"3"} />}
                  />
                  <RenderPower
                    title="Challenge"
                    isSvgIcon
                    Icon={ChallengeIcon}
                    CellIcon={<ShowBatteries value={"2.5"} />}
                  />
                  <RenderPower
                    title="Retro Boost"
                    isSvgIcon
                    Icon={RetroBoost}
                    CellIcon={<ShowBatteries value={"2"} />}
                  />
                  <RenderPower
                    title="Recharge All"
                    isSvgIcon
                    Icon={RechargeAll}
                    showSocial
                  />
                </div>
                <button onClick={() => setLearnMoreModal(true)}>
                  Learn more
                </button>
              </div>
            </Sidebar>
          </div>
        </div>
      </div>
      <Footer isBlack={true} />
      <LearnMoreModal
        title="Point Multipler"
        learnMoreModal={learnMoreModal}
        onCloseModal={onCloseModal}
      />
    </>
  );
}

MLBRecharge.propTypes = {};

export default MLBRecharge;
