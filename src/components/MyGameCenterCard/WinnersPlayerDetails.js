import React, { useEffect, useState } from "react";
import classes from "./winnersPlayerDetails.module.scss";
import MLBPlayer from "../../assets/mlb-player.png";
import MLBPlayerOppsite from "../../assets/baseball-player-copy.png";
import NFLPlayer from "../../assets/nflCardBg.png";
import NBAPlayer from "../../assets/nbaCardBg.png";
import NHLPlayer from "../../assets/new-hockey-playerlogo.png";
import onenflbg from "../../assets/group-3-one-nfl.png";
import onenhlbg from "../../assets/group-3-one-nhl.png";
import Header from "../PowerCenterCardDetails/Header";
import Footer from "../PowerCenterCardDetails/Footer";
import { useDispatch, useSelector } from "react-redux";
import * as NHLActions from "../../actions/NHLActions";
import LiveStandings from "../../components/LiveStandings";
import TeamPointsModal from "../../pages/MyGameCenter/TeamPointsModal";

const WinnersPlayerDetails = (props) => {
  const {
    isWinner=false,
    gameId='',
    title="",
    onBackClick=() => {},
    prize="",
    game_type = "",
    end_time="",
    game_set_end="",
    completed=false,
  } = props || {};
  
  const dispatch = useDispatch();
  const [teamPointsModal, setTeamPointsModal] = useState(false);
  const [showModal, setModalState] = useState(false);
  const { liveStandings = [] } = useSelector((state) => state.nhl);

  // const [liveData, setLiveData] = useState(liveStandings)
  const { user_id } = useSelector((state) => state.auth.user);
  const [teamPointsModalId, setTeamPointsModalId] = useState("");

  

  useEffect(() => {
      async function getData() {
        await dispatch(NHLActions.getFinalStandings(gameId));
      };
     getData();
  }, [gameId])
const handleViewTeam = (id) => {
    setTeamPointsModal(true);
    setTeamPointsModalId(id)
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const getBackgroundImageWithStyle = () => {
    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
      height: "100%",
      width: "100%",
      position: "absolute",
      opacity: 0.5,
    };
    if (title === "MLB1") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayerOppsite})`;
      //backgroundImageStyle.backgroundPosition = "106px 60px";
    } else if (title === "MLB") {
      backgroundImageStyle.backgroundImage = `url(${MLBPlayerOppsite})`;
      backgroundImageStyle.backgroundPosition = "100px 0px";
    } else if (title === "NFL") {
      backgroundImageStyle.backgroundImage = `url(${NFLPlayer})`;
      //backgroundImageStyle.backgroundPosition = "65px 60px";
    } else if (title === "NBA") {
      backgroundImageStyle.backgroundImage = `url(${NBAPlayer})`;
      //backgroundImageStyle.backgroundPosition = "-75px 68px";
    } else if (title === "NHL" && game_type === "PowerdFs_One") {
      backgroundImageStyle.backgroundImage = `url(${onenhlbg})`;
    } else if (title === "NFL" && game_type === "PowerdFs_One") {
      backgroundImageStyle.backgroundImage = `url(${onenflbg})`;
    } else {
      backgroundImageStyle.backgroundImage = `url(${NHLPlayer})`;
      //backgroundImageStyle.backgroundPosition = "36px 106px";
    }
    return backgroundImageStyle;
  };

  return (
    <>
    {showModal===false &&
    <div className={classes.__power_center_card_details}>
      <div style={getBackgroundImageWithStyle()}></div>
      <div style={{ zIndex: 1 }}>
       
        <Header title={title} />
          <div className={classes.result__main}>
            Winners
          </div>
          <div className={classes.price__title}>
              <h6 className={classes.mainTitle}>Prize Payouts</h6>
            </div>
            { liveStandings?.map((item,i)=>{
              return(item?.prize &&
                <div className={user_id===item?._id?.userID?`${classes.prize__main} ${classes.active}`:`${classes.prize__main}`}>
                  <div className={classes.content__main__scroll}>
                
                  <div className={classes.price__content}>
                    <div className={classes.price__index}>
                      {item?.rank}
                    </div>
                    <div className={classes.price__name}>
                      <div>{item?._id?.user_display_name}</div>
                    </div>
                    <div className={classes.price__dollar}>
                      ${item?.prize}
                    </div>
                    <div className={classes.icon}  onClick={()=>handleViewTeam(item?._id?.userID)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-circle-right" class="svg-inline--fa fa-chevron-circle-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path></svg>
                    </div>
                    {
                      teamPointsModal &&teamPointsModalId===item?._id?.userID
                      &&
                      <TeamPointsModal
                        isVisible={teamPointsModal}
                        onClose={() => setTeamPointsModal(false)}
                        item={item}
                        gameId={item._id.gameID}
                        userId={item._id.userID}
                      />
                    }
                  </div>
                  
                
                  </div>
                </div>
            )})}
          <Footer
          onBack={() => {
              onBackClick();
          }}
          isCompleted={true}
          myGameCenter={false}
          game_type={game_type}
        />
      </div>
      
    </div>
    }
    <>
   
   </>
   </>
  );
};

export default WinnersPlayerDetails;