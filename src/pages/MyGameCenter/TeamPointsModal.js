import React, { useEffect, useState } from "react";
import classes from "./teamPointsModal.module.scss";
import Modal from "../../components/Modal";
import CloseIcon from "../../assets/close-white-icon.png";
import Card from "../../components/PowerpickCard";
import { getMlbLivePlayPlayerTeamData } from "../../actions/MLBActions";
import { useDispatch } from "react-redux";
import _ from "lodash";
import SportsSavedPlayerCard from "../../components/SportsSavedPlayerCard";
import { getSavedTeamPlayers } from "../../actions/NHLActions";

const TeamPointsModal = (props) => {
  const dispatch = useDispatch();
  const { isVisible = false, onClose = () => {}, item = {} ,userId=""} = props || {};
  const [activeTab, setActiveTab] = useState(1);

  const [savedTeam, setSavedTeam] = useState([]);
  const [tempStorageData, setTempStorageData] = useState([]);

  useEffect(() => {
    async function getData() {
      let teamData;
      let tempStorage;
      if (item._id) {
        teamData = await dispatch(
          getSavedTeamPlayers({
            userID: item?._id?.userID,
            gameID: item?._id?.gameID,
            sportID: item?.power_dfs_games?.sports_id
              ? item?.power_dfs_games?.sports_id
              : item?.power_dfs_games?.league === "MLB"
              ? 1
              : 2,
          })
        );
         tempStorage = await teamData;
        if (_.isEmpty(tempStorageData)) {
          setTempStorageData(tempStorage);
        }
        if (!_.isEmpty(tempStorage)) {
          setSavedTeam(tempStorage);
        }
      } else {
        teamData = await dispatch(
          getMlbLivePlayPlayerTeamData({
            user_id: item?.user_id,
            game_id: item?.game_id,
            sport_id: item?.power_dfs_games?.sports_id
              ? item?.power_dfs_games?.sports_id
              : item?.power_dfs_games?.league === "MLB"
              ? 1
              : 2,
          })
        );
         tempStorage = await teamData;
        if (_.isEmpty(tempStorageData)) {
          setTempStorageData(tempStorage);
        }
        if (!_.isEmpty(tempStorage)) {
          setSavedTeam([tempStorage.players, tempStorage.teamD]);
        }
      }
     
    }
    getData();
  }, [item]);

  return (
    <Modal visible={isVisible}>
      <div className={`${classes.__team_points_modal} ${"main__teams__point"}`}>
        <div className={classes.__team_points_modal_main_content}>
          <div className={classes.__team_points_modal_close_icon}>
            <img
              src={CloseIcon}
              width="16"
              height="16"
              onClick={() => onClose()}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </div>
          <div className={classes.__team_points_modal_main_title}>
            Results of Display Name:{" "}
            <span>
              {item._id
                ? item?._id?.user_display_name
                : item?.users?.display_name}
            </span>
          </div>
          <hr />
          <div className={classes.__team_points_modal_nav_links}>
            <ul>
              <li>
                <a
                  href="javascript:0"
                  className={activeTab == 1 && classes.active}
                  onClick={() => setActiveTab(1)}
                >
                  Team Manager
                </a>
              </li>
              {/* <li>
                                <a
                                    href="javascript:0"
                                    className={activeTab == 2 && classes.active}
                                    onClick={() => setActiveTab(2)}
                                >
                                    Score Details
                                </a>
                            </li> */}
            </ul>
            <div className={classes.__team_points_modal_total_points_text}>
              Total Points: &nbsp;<span> {item?.totalValue}</span>
            </div>
          </div>
          <Card>
            <div className={classes.__team_points_modal_card_div}>
              <div className={classes.game__card__scroll}>
              <div className={`${classes.cardWrap} ${"row"}`}>
                {    !item?._id && savedTeam &&
                  savedTeam.length > 0 &&
                  savedTeam.map((items, index) => {
                    return (
                      <>
                        {items.team_d_mlb_team ? (
                          <></>
                        ) : (
                          <>
                              <SportsSavedPlayerCard
                              data={item}/>
                       {/* {item?.league?.name!=="NHL"? (
                        <SportsLiveCardTeamD
                        data={item}
                        // compressedView={compressedView}
                        // key={index + "" + item?.team_d_mlb_team?.type}
                        // dwall={dwallCounts}
                        // challenge={challengeCounts}
                        // useDwall={useDwall}
                        // useChallenge={useChallenge}
                        // dataMain={selectedTeam}
                        // setPowers={setPowers}
                        // />
                        
                        
                        //     <SportsSavedPlayerCard
                        //   data={items}
                        //   // compressedView={compressedView}
                        //   // key={index + ""}
                        //   // onChangeXp={onChangeXp}
                        //   // updateReduxState={updateReduxState}
                        //   // starPlayerCount={starPlayerCount}
                        //   // gameInfo={selectedTeam}
                        //   // useSwap={useSwap}
                        //   // swapCount={swapCounts}
                        //   // dataMain={selectedTeam}
                        //   // setPowers={setPowers}
                        //   // pointXpCount={{
                        //   //     xp1: pointBooster15x,
                        //   //     xp2: pointBooster2x,
                        //   //     xp3: pointBooster3x,
                        //   // }}
                        // />
                            /* //  <SportsSavedPlayerCard
                        //     item={item}
                        //     key={index + ""}
                        // />
                        ):(  
                        */}
                          </>
                        )}
                      </>
                    );
                  })}
                  { item?._id && savedTeam && savedTeam?.fantasyTeam?.players
                     && (
                       <>{
                      
                      savedTeam?.fantasyTeam?.players?.map((player,i)=>{return(
                      <div className="col-md-3">
                              <div className={classes.game__card}>
                                {console.log("savedTeam?.fantasyTeam?.posCenterPoints=>",savedTeam)}
                                <div className={classes.line__game__card}></div>
                               
                                <div className={classes.card__header}>
                                  <div className={classes.card__number}>{player?.fantasyPlayerPosition}:</div>
                                  <div className={classes.card__pts}>
                                   {(player?.fantasyPlayerPosition==="C" || player?.fantasyPlayerPosition==="c") && savedTeam?.fantasyTeam?.posCenterPoints}
                                   {(player?.fantasyPlayerPosition==="XW" || player?.fantasyPlayerPosition==="xw")&& player?.positionID===1 &&savedTeam?.fantasyTeam?.posXW1Points}
                                   {(player?.fantasyPlayerPosition==="XW" || player?.fantasyPlayerPosition==="xw")&& player?.positionID===2 && savedTeam?.fantasyTeam?.posXW2Points}
                                   {(player?.fantasyPlayerPosition==="XW" || player?.fantasyPlayerPosition==="xw")&& player?.positionID===3 && savedTeam?.fantasyTeam?.posXW3Points}
                                   {(player?.fantasyPlayerPosition==="D" || player?.fantasyPlayerPosition==="d")&& player?.positionID===1 && savedTeam?.fantasyTeam?.posD1Points}
                                   {(player?.fantasyPlayerPosition==="D" || player?.fantasyPlayerPosition==="d")&& player?.positionID===2 && savedTeam?.fantasyTeam?.posD2Points}
                                   {(player?.fantasyPlayerPosition==="G" || player?.fantasyPlayerPosition==="g") && savedTeam?.fantasyTeam?.posGoaliePoints}
                                    Pts
                                  </div>
                                </div>
                                <div className={classes.card__main__box}>
                                  <div className={classes.card__main__idea}>
                                    <div className={classes.main__table__box}>
                                      <div className={classes.card__left}>
                                        <h6>Player</h6>
                                      </div>
                                      <div className={classes.card__right}>
                                        <h6>Points</h6>
                                      </div>
                                    </div>
                                    <div
                                      className={classes.main__table__header}
                                    >
                                      <div className={classes.left__side}>
                                       {player?.full_name}
                                      </div>
                                      <div className={classes.right__side}>
                                      {(player?.fantasyPlayerPosition==="C" || player?.fantasyPlayerPosition==="c") && savedTeam?.fantasyTeam?.posCenterPoints}
                                      {(player?.fantasyPlayerPosition==="XW" || player?.fantasyPlayerPosition==="xw")&& player?.positionID===1 && savedTeam?.fantasyTeam?.posXW1Points}
                                      {(player?.fantasyPlayerPosition==="XW" || player?.fantasyPlayerPosition==="xw")&& player?.positionID===2 && savedTeam?.fantasyTeam?.posXW2Points}
                                      {(player?.fantasyPlayerPosition==="XW" || player?.fantasyPlayerPosition==="xw")&& player?.positionID===3 && savedTeam?.fantasyTeam?.posXW3Points}
                                      {(player?.fantasyPlayerPosition==="D" || player?.fantasyPlayerPosition==="d")&& player?.positionID===1 && savedTeam?.fantasyTeam?.posD1Points}
                                      {(player?.fantasyPlayerPosition==="D" || player?.fantasyPlayerPosition==="d")&& player?.positionID===2 && savedTeam?.fantasyTeam?.posD2Points}
                                      {(player?.fantasyPlayerPosition==="G" || player?.fantasyPlayerPosition==="g") && savedTeam?.fantasyTeam?.posGoaliePoints}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            )})
                            }
                            
                            <div className="col-md-3">
                              <div className={classes.game__card}>
                                <div className={classes.line__game__card}></div>
                               
                                <div className={classes.card__header}>
                                  <div className={classes.card__number}>Team D:</div>
                                  <div className={classes.card__pts}>
                                    {savedTeam?.fantasyTeam?.teamDPts} Pts
                                  </div>
                                </div>
                                <div className={classes.card__main__box}>
                                  <div className={classes.card__main__idea}>
                                    <div className={classes.main__table__box}>
                                      <div className={classes.card__left}>
                                        <h6>Player</h6>
                                      </div>
                                      <div className={classes.card__right}>
                                        <h6>Points</h6>
                                      </div>
                                    </div>
                                    <div
                                      className={classes.main__table__header}
                                    >
                                      <div className={classes.left__side}>
                                          {savedTeam?.fantasyTeam?.teamD?.name}
                                      </div>
                                      <div className={classes.right__side}>
                                          {savedTeam?.fantasyTeam?.teamDPts}
                                       </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>     
                            </>              
                       )
                    }
              </div>
              </div>
              {/* <Card>
                            {
                                dummyData.map((item, index) => {
                                    return (
                                        <>
                                            {console.log('data item ---> ', item)}
                                            <SportsTeamSelectionCard
                                                item={item}
                                                key={index + ""}
                                            />
                                        </>
                                    );
                                })
                            }
                        </Card> */}
            </div>
          </Card>
        </div>
      </div>
    </Modal>
  );
};

export default TeamPointsModal;
