import React, { useCallback, useState } from "react";
import Header from "../../components/HeaderMobile/Header";
import ThreeBoxes from '../../components/mobilecomponents/ThreeBoxes';
import Tabs from "../../components/mobilecomponents/Tabs/Tabs";
import TeamManagerMobileCard from './teamManagerMobileCard';
import styles from './styles.module.scss';
import footerLogo from '../../assets/images/bitmap.png';
import { useDispatch, useSelector } from "react-redux";
import MyScoreDetailsMobileCard from './myScoreDetailsMobileCard';
import MyScore from "../../components/mobilecomponents/LiveMatch/MyScore";
import LiveMatch from "../../components/mobilecomponents/LiveMatch/LiveMatch";
import "../../components/mobilecomponents/LiveMatch/live_match.scss";
import * as MLBActions from "../../actions/MLBActions";
import * as NHLActions from "../../actions/NHLActions";
import { CardType } from "../../components/SportsLiveCard/CardType";
import moment from "moment";
import { truncate, isEmpty } from "lodash";
import BoosterPopUp from "../../components/mobilecomponents/BoosterPopUp/BoosterPopUp";

const NHLLiveMobile = (props) => {
    const [state, setState] = useState(1);
    const gameID = localStorage.getItem("nhl_live_game_id");
    const userID = localStorage.getItem("PERSONA_USER_ID");
    
    const {
      data: nhlData = [],
      selectedTeam = {},
      match_status = [],
      swappedPlayers = [],
      live_players = [],
      is_loading = false,
      live_teamD = {},
      live_team_logs = {},
      starPlayerCount = 0,
    } = useSelector((state) => state.nhl);

    const {
        teamLogs = []
    } = live_team_logs;
    const {
        data = [],
        ranks = {},
        onChangeXp = (xp, player) => {},
        gameInfo = {},
        prizePool = 0,
        loading = true,
        swapCounts = 0,
        dwallCounts = 0,
        challengeCounts = 0,
        pointMultiplierCounts = 0,
        pointBooster15x = 0,
        pointBooster2x = 0,
        pointBooster3x = 0,
        retroBoostCounts = 0,
        powerUpCounts = 0,
        setPlayerToSwap = () => {},
        onPowerApplied = () => {},
        POWER_IDs = {},
        setPowers = () => {},
        cardType = "mlb",
        gameStatus,
        getFantasyTeam = () => {},
        gameType
      } = props || {};
      const [swap, setSwap] = useState(false);
      const [secondModal, setSecondModal] = useState(false);
      const [rankss, setRanks] = useState({});
      const [liveStandingData, setLiveStandingData] = useState([]);
      const [currentWinnings, setCurrentWinnings] = useState(0);
      const [leader, setLeader] = useState(0);
      const [currentRank, setCurrentRank] = useState(0);
      const [selectedPlayer, setSelectedPlayer] = useState({});
      const [loadingPlayerList, setLoadingPlayerList] = useState(false);
      const [swapPlayerList, setPlayerList] = useState({});
      const [filteredPlayerList, setFilteredPlayerList] = useState({});
      const [showReplaceModal, setReplaceModalState] = useState(false);

      const dispatch = useDispatch();
      const { data: mlbData = [] } = useSelector((state) => state.mlb);
      // const { data: nhlData = [] } = useSelector((state) => state.nhl);
      
      const { data: nflData = [] } = useSelector((state) => state.nfl);
      const { liveStandings = [] } = useSelector((state) => state.nhl);
      const { user_id } = useSelector((state) => state.auth.user);
      const { match = {} } = data || {};
      const { date_time = "", scheduled = "" } = match || {};
      
      React.useEffect(async () => {
        if (JSON.stringify(rankss) !== JSON.stringify(props?.ranks)) {
          if (
            props?.ranks?.ranking !== 0 &&
            props?.ranks?.game_id !== 0 &&
            props?.score?.ranking !== 0 &&
            props?.team_id?.ranking !== 0
          )
            setRanks(props.ranks);
          if (props?.ranks?.game_id !== 0) {
            let liveStandingsData = await dispatch(
              MLBActions.getLiveStandings(props?.ranks?.game_id)
            );
            if (typeof liveStandingsData !== "undefined") {
              if (liveStandingsData.payload.error == false) {
                if (
                  JSON.stringify(liveStandingsData.payload.data) !==
                  JSON.stringify(liveStandingData)
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
                    } else {
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
              } else {
                // alert("We are experiencing technical issues with the Power functionality. Please try again shortly.");
              }
            }
          }
          else{
            dispatch(NHLActions.getFinalStandings(gameID))
          }
        }
      }, [ranks]);

      React.useEffect(() => {
        let leaderScore=0;
        if(liveStandings.length > 0) {
          liveStandings.forEach((element,index) => {
            if(element?._id?.userID == user_id) {
              setCurrentRank(element?.rank);
              setCurrentWinnings(element?.prize);
            }
             leaderScore = Math.max(...liveStandings.map(o=>o.totalValue));   
            setLeader(leaderScore);
          });
        }
      }, [liveStandings]);

      const boostModal = (value, player = {}, type, close) => {
        if (value) {
          setSelectedPlayer(player);
        } else {
          setSelectedPlayer({});
        }
        setSecondModal(close);
      };
      const toggleReplaceModal = useCallback(
        async (player) => {
          if (cardType === CardType.MLB) {
            setLoadingPlayerList(true);
            setSwap(true);
            const response = await dispatch(
              MLBActions.mlbData(props?.gameInfo?.game_id)
            );
            if (response?.filterdList && response?.filterdList?.length) {
              const _mlbData = [...response?.filterdList];
              const [swapablePlayerData] = _mlbData?.filter(
                (data) =>
                  data?.type === `${player?.player?.type}`?.toLocaleLowerCase()
              );
              if (
                swapablePlayerData &&
                swapablePlayerData?.listData &&
                swapablePlayerData?.listData?.length
              ) {
                const _time = moment(player?.match?.date_time)
                  .clone()
                  .format("h:mm A");
                const newListData = swapablePlayerData?.listData?.filter(
                  (data, index) =>
                    `${data?.time}` === _time &&
                    data?.playerId !== player?.player_id &&
                    data[index]?.player_id !== player?.player_id
                );
                const _dataToRender = {
                  type: swapablePlayerData.type,
                  listData: newListData,
                };
                setPlayerList(_dataToRender);
                setFilteredPlayerList(_dataToRender);
                //setSwap(true)
              }
            }
            setLoadingPlayerList(false);
          }

          if (cardType === CardType.NHL) {
            setLoadingPlayerList(true);
            setReplaceModalState(true);
            const response = await dispatch(NHLActions.getFantasyPlayers(gameID));
            if (response?.filterdList && response?.filterdList?.length) {
              const _nhlData = [...response?.filterdList];
              console.log("_nhlData in toggle funcn => ",_nhlData)
              console.log("player?.fantasyPlayerPosition? ==>", player)
              const [swapablePlayerData] = _nhlData?.filter(
                (data) => data?.type === player?.fantasyPlayerPosition?.toLocaleLowerCase()
              );
              console.log("swappablePlayer => ", swapablePlayerData)
              if (
                swapablePlayerData &&
                swapablePlayerData?.listData &&
                swapablePlayerData?.listData?.length
              ) {
                console.log("scheduled in mobile view index",scheduled)
                const _time = moment(player?.match?.scheduled).clone().format("h:mm A");
      
                const newListData = swapablePlayerData?.listData?.filter(
                  (data, index) => {
                    return (
                      moment(data?.match?.scheduled).clone().format("h:mm A") == _time
                    );
                  }
                );
                const _dataToRender = {
                  type: swapablePlayerData.type,
                  listData: newListData,
                };
                console.log("newListData ===>", newListData)
                console.log("data To Render ===>", _dataToRender)
                setPlayerList(_dataToRender);
              }
            }
            setLoadingPlayerList(false);
          }
        },
        [mlbData,nhlData]
      );
      const onSwap = (playerId, match_id) => {
        if (swapCounts === 0) {
          alert("You cannot swap the players.");
          return;
        }
        const [swapablePlayer] =
          !isEmpty(data) &&
          swapPlayerList?.listData?.length &&
          swapPlayerList?.listData?.filter(
            (player) =>
              player?.playerId === playerId && player?.match_id === match_id
          );
        if (swapablePlayer) {
          props.updateReduxState(data, swapablePlayer);
          toggleReplaceModal();
          setSwap(false);
          props.useSwap(true);
        }
      };
      const swapModal = (value, player = {}) => {
        if (value) {
          setSelectedPlayer(player);
        } else {
          setSelectedPlayer({});
        }
        toggleReplaceModal(player);
        //setSwap(!swap);
      };
      const searchPlayerList = (searchTerm) => {
        let searchText = searchTerm;
        if (searchText == "") {
          setFilteredPlayerList(swapPlayerList);
          return;
        }
        let listData = filteredPlayerList?.listData;
        let filteredSearch = listData.filter((x) => {
          let splittedName = x.playerName.split(" ");
          let found = 0;
          if (splittedName.length > 0) {
            for (let i = 0; i < splittedName.length; i++) {
              if (splittedName[i].startsWith(searchText)) {
                found = 1;
              }
            }
          }
          if (x.homeTeam.startsWith(searchText)) {
            found = 1;
          }
          if (found) {
            return x;
          }
        });
        let oldFilteredList = {
          type: swapPlayerList.type,
          listData: filteredSearch,
        };
        if (JSON.stringify(oldFilteredList) !== JSON.stringify(filteredPlayerList))
          setFilteredPlayerList(oldFilteredList);
      };

      const updateReduxState = (currentPlayer, newPlayer) => {
        if (!currentPlayer || !newPlayer) return;
        const { userID, gameID } = selectedTeam || {};
        setPlayerToSwap(currentPlayer);
        onPowerApplied({
          fantasyTeamId: currentPlayer?.team?.id,
          matchId: currentPlayer.match?.id,
          playerId: currentPlayer.id,
          playerId2: newPlayer.id,
          matchIdP2: newPlayer?.match?.i,
          powerId: POWER_IDs.SWAP_POWER,
          userId: userID,
          gameId: gameID,
        });
      };
     
    return (
        <div className={styles.NHLLivemobile + " " + "nhlmobilelive"}>
            <Header cardType={'nhl'} />
            <section className={styles.topSection}>
                <div className={styles.topTitle}>
                    NHL <span>{gameType === "NHL_Fantasy" ? 'Fantasy' : 'PowerdFS'}</span>
                </div>
                <div className={styles.entries}>
                    Entries 10,000 <span>/ 100,000</span> 
                </div>
            </section>
            <ThreeBoxes showTime={true} gameID={gameID}/>
            <Tabs state={state} setState={setState}/>
            {state === 1 && <section className='cardsSection'>
                {live_players && live_players.map((item, index) => {
                    return <TeamManagerMobileCard
                            getFantasyTeam={getFantasyTeam}
                            updateReduxState={updateReduxState}
                            showReplaceModal= {showReplaceModal}
                            setReplaceModalState={setReplaceModalState}
                            toggleReplaceModal={toggleReplaceModal}
                            loadingPlayerList={loadingPlayerList}
                            selectedTeam={selectedTeam}
                            starPlayerCount={starPlayerCount}
                            playerList={swapPlayerList}
                            setSecondModal={setSecondModal} 
                            playerData={item} 
                            playerIndex={index}
                            type=''
                            />;
                })}
                {Object.keys(live_teamD).length !== 0 && live_teamD.constructor === Object && 
                    <TeamManagerMobileCard 
                        getFantasyTeam={getFantasyTeam}
                        updateReduxState={updateReduxState}
                        showReplaceModal= {showReplaceModal}
                        setReplaceModalState={setReplaceModalState}
                        toggleReplaceModal={toggleReplaceModal}
                        loadingPlayerList={loadingPlayerList}
                        selectedTeam={selectedTeam}
                        starPlayerCount={starPlayerCount}
                        playerList={swapPlayerList}
                        setSecondModal={setSecondModal}
                        playerData={live_teamD} 
                        playerIndex={0}
                        type='TD'
                    />
                }
            </section>}
            {state === 2 && <section className='scoreBoardSection'>
                {teamLogs && teamLogs.map((item, index) => {
                    if(!(item?.fantasyPosition == "TeamD" && item?.fantasyLog?.type == "shotagainst"))
                    {
                        if (index === 0) teamLogs[index].runningTotal = (item.fantasyPosition == "Team D") ? item?.fantasyLog?.homeTeamD : item?.fantasyLog?.playerPts;
                        else {
                            teamLogs[index].runningTotal =
                            (teamLogs[index-1]?.runningTotal) + ((item.fantasyPosition == "Team D") ? item?.fantasyLog?.homeTeamD : item?.fantasyLog?.playerPts);
                        }
                        return <MyScoreDetailsMobileCard 
                                data={item}
                                index={index}
                                runningTotal = {
                                    teamLogs[index].runningTotal
                                }
                                />
                    }
                })}
            </section>}
            <section className={styles.footer}>
                <img src={footerLogo} />
            </section>
            <section className='matchWrapper'>
            
            <LiveMatch
            gameType={gameType}
            gameStatus={gameStatus}
            gameID={gameID}
            swap={swap}
            setSwap={setSwap}
            secondModal={secondModal}
            setSecondModal={setSecondModal}
            boostModal={boostModal}
            swapModal={swapModal}
            ranks={rankss}
            currentWinnings={currentWinnings}
            currentRank={currentRank}
            leader={leader}
            counts={props.counts}
            onChangeXp={onChangeXp}
            data={data}
            selectedPlayer={selectedPlayer}
            gameInfo={props?.gameInfo}
        />
            </section>
            <BoosterPopUp secondModal={secondModal} boostModal={boostModal} counts={props.counts} onChangeXp={onChangeXp} data={data} selectedPlayer={selectedPlayer}/>
        </div>
    );
};
export default NHLLiveMobile;