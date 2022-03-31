import React, { useState, useMemo, useEffect } from 'react';
import styles from './styles.module.scss';
import DWallIcon from '../../assets/d-wall-main.png';
import XPIcon from '../../assets/point-multipliers-main.png';
import SwapIcon from '../../assets/player-swaps-main.png';
import VideoReviewIcon from '../../assets/video-review-main.png';
import RetroBoostIcon from "../../assets/retro-boost-icon.png";
import ChallengeIcon from "../../assets/challenge.svg"
import CreatePopUpPortal from '../../utility/CreatePopUpPortal';
import PowerUpIcon from '../../assets/power-up-icon.svg';
import { capitalize } from 'lodash';



const ContestRulesPopUp = props => {
    const {
        points =[],
        point=[],
        powers = [],
        title = "MLB",
        isMyGameCenter=false,
        livePage=false,
        isSelectedPage=false,
        isEditPicks=false,
        game_type=''
    } = props;
    const getIconAndDesc = (powerName, title) => {
        if (powerName) {
            if (powerName.toLowerCase().match(/wall/g))
                return {
                    icon: DWallIcon,
                    desc: '<p>Any points scored against your Team Defense will not count while the D-Wall Power is active.</p>'
                };
    
            else if (powerName.toLowerCase().match(/video|review/g))
                return {
                    icon: VideoReviewIcon,
                    desc: 'Seeing Runs scored against the Team Defence result in negative points for the Contest Participants fantasy team, they can use a video review for a 50/50 chance to negate any runs scored against. If the Team Defense just allowed a Grand Slam, use Video Review for a chance to have it reversed.'
                }
    
            else if (powerName.toLowerCase().match(/swap/g))
                return {
                    icon: SwapIcon,
                    desc: '<p>Provides ability to swap any roster player with another player of the same position whose team had the same time as your original selection. For example, if Player A and Player B both had their games start at 8:00PM, they are eligible to be swapped for one another. If Player A’s gamestarted at 8:00pm but Player B’s game started at 9:00PM, the two players cannot be swapped for one another, even though there will be an overlap in playing time.</p>'
                }
    
            else if (powerName.toLowerCase().match(/multi|point|1.5|2.5/g)){
                if(title == "NHL") {
                    return {
                        icon: XPIcon,
                        desc: '<p>Point Boosters can be activated for any player at any time. Contest Participants will be able to boost points by the multiplier indicated in the My Powers section. For example, a Goal is normally 5 fantasy points, but with a 3x booster, a Goal is worth 15</p>'
                    }
                }
                else if(title == "NFL")
                {
                    return {
                        icon: XPIcon,
                        desc: '<p>Point Boosters can be activated for any player at any time. Contest Participants will be able to boost points by the multiplier indicated in the My Powers section. For example, a Touchdown is normally 6 fantasy points, but with a 3x booster, a Goal is worth 18.</p>'
                    }
                    
                }
                else if(title == "NBA")
                {
                    return {
                        icon: XPIcon,
                        desc: '<p>Point Boosters can be activated for any player at any time. Contest Participants will be able to boost points by the multiplier indicated in the My Powers section. For example, a 3-point basket is normally 3 fantasy points, but with a 3x booster, a Goal is worth 9.</p>'
                    }
                    
                }
                else {
                    return {
                        icon: XPIcon,
                        desc: '<p>Point Boosters can be activated for any player at any time. Contest Participants will be able to boost points by the multiplier indicated in the My Powers section. For example, a Home Run is normally 10 fantasy points, but with a 3x booster, a Home Run is worth 30.</p>'
                    }
                }
            }
            
            else if (powerName.toLowerCase().match(/retro/g))
                return {
                    icon: RetroBoostIcon,
                    desc: '<p>Retro Boosters allow you to boost points for the preceding scoring play. A Retro Boost will be available for 30 seconds after a scoring play, if you choose to use it, the points for the scoring play will be boosted by 2x.</p>'
                }
    
            else if (powerName.toLowerCase().match(/challenge/g))
                return {
                    icon: ChallengeIcon,
                    desc: '<p>A Coaches Challenge can be used to challenge the last point generating play scored against your Team-D. Activate it and our random result generator will determine if the points scored against your Team-D will be reversed.</p>'
                }
            else if (powerName.toLowerCase().match(/power-up/g))
                return {
                    icon: PowerUpIcon,
                    desc: '<p>Power-ups allow you to trade your Power Tokens in exchange for additional Powers. This Power can only be used if all your allocated Powers have been used.</p>'
                }
        }
    }
    
    const powerSection = (powerName, altName, title) => {
        return (
            <section className={styles.powersSubSection}>
                <img src={getIconAndDesc(powerName, title).icon} alt='' />
                <h4>{altName}</h4>
                <p dangerouslySetInnerHTML={{__html: getIconAndDesc(powerName, title).desc}}/>
            </section>
        );
    }
    
    const data = [
        {
          type: "MLB",
          heading: "The 8 roster positions:",
          teamRoster: [
            {
              count: 1,
              title: "P",
              value: "(Pitcher)",
            },
            {
              count: 1,
              title: "C",
              value: "(Catcher)",
            },
            {
              count: 1,
              title: "SS",
              value: "(Shortstop)",
            },
            {
              count: 2,
              title: "xB",
              value: "(1B, 2B or 3B)",
            },
            {
              count: 2,
              title: "OF",
              value: "(Outfielders)",
            },
            {
              count: 1,
              title: "Team Defense",
              value: "",
            }
          ]
        },
        {
          type: "NFL",
          heading: "The 8 roster positions:",
          teamRoster: [
            {
              count: 1,
              title: "QB",
              value: "(Quarterback)",
            },
            {
              count: 2,
              title: "RB",
              value: "(Running Backs)",
            },
            {
              count: 2,
              title: "WR",
              value: "(Wide Receivers)",
            },
            {
              count: 1,
              title: "TE",
              value: "(Tight End)",
            },
            {
              count: 1,
              title: "K",
              value: "(Kicker)",
            },
            {
              count: 1,
              title: "Team Defense",
              value: "",
            }
          ]
        },
        {
          type: "NHL",
          heading: "The 8 roster positions:",
          teamRoster: [
            {
              count: 1,
              title: "C",
              value: "(Center)",
            },
            {
              count: 3,
              title: "XW",
              value: "(Wingers)",
            },
            {
              count: 2,
              title: "D",
              value: "(Defensemen)",
            },
            {
              count: 1,
              title: "G",
              value: "(Goalie)",
            },
            {
              count: 1,
              title: "Team Defense",
              value: "",
            }
          ]
        },
        {
          type: "NBA",
          heading: "The 8 roster positions:",
          teamRoster: [
            {
              count: 1,
              title: "C",
              value: "(Center)",
            },
            {
              count: 2,
              title: "PG",
              value: "(Point Guard)",
            },
            {
              count: 2,
              title: "SG",
              value: "(Shooting Guard)",
            },
            {
              count: 2,
              title: "F",
              value: "(Small/Power Forward)",
            },
            {
              count: 1,
              title: "Team Defense",
              value: "",
            }
          ]
        },
      ];
    
    const renderPowerData = (powerArray) => {
        let finalContent = "";
        if(powerArray.findIndex(x => (x.powerName == "Swap" || x.powerId == 4)) >= 0)
        {
            return (
                <section className={styles.powersSubSection}>
                    <img src={getIconAndDesc("Swap").icon} alt='' />
                    <h4>Player Swap</h4>
                    <p dangerouslySetInnerHTML={{__html: getIconAndDesc("Swap").desc}}/>
                </section>
            )
        }
        return finalContent;
    }
    
    const h3Class = 'title-2 __primary-text __bold __m-0  __font-family-teko __line-height-1'
    let finalData = data[data.findIndex(x => x.type == title)];
    const [showPopUp, setShowPopUp] = useState(false);
    const [titled, setTitled] = useState("");
    useEffect(() => {
        setTitled(title);
    }, [title]);
    return (
        <>
            {useMemo(() => props.component && props.component({ showPopUp: () => {setShowPopUp(true) } }), [props])}
            {showPopUp && <CreatePopUpPortal>
                <div className={styles.popupWrapper}>
                    <div className={styles.blur} onClick={() => setShowPopUp(false)}></div>
                    <div className={`__title-6 modal-animation ${styles.popup}`}>
                        <div className={styles.crossicon} onClick={() => setShowPopUp(false)}><span></span></div>
                        <h1 className={`__m-0 main-title __center ${styles.title}`}>PowerdFS - <span className='__primary-text'>{title}</span></h1>
                        <h6 className={`__center __title-6 __m-0 __letter-spacing __bold ${styles.subtitle}`}>GAMEPLAY RULES</h6>
                        <section className='__mt-4 __mb-3'>
                            <h1 className='__title-1 __primary-text __bold __m-0 __font-family-teko'>PowerdFS - {title}</h1>
                            <p className='m-0'>In Powered DFS {title} contests, Contest Participants will create a lineup by selecting players listed on the Player Selection Page. Star players have a Star identifier and participants may select a maximum of three star players on their fantasy team. Only one star player may be selected for each position.</p>
                            <p className='__mt-1 __mb-1'>Contest results will be determined by the total points accumulated by each Contest Participant (scoring rules summarized below).</p>
                            <p>Participation in each contest must be made only as specified in the Terms of Use. Failure to comply with these Terms of Use will result in disqualification and, if applicable, prize forfeiture.</p>
                        </section>
                        {points && 
                            <section className='__mb-3 __mt-3'>
                                <h3 className='title-2 __primary-text __bold __m-0  __font-family-teko' style={{marginBottom: 10}}>Scoring</h3>
                                <div className={styles.cardWrapper}>
                                    {title!=="NHL" && Object.keys(points).map((data, index) => {
                                        return (
                                            <div className={styles.card}>
                                                <h5 className='__title-5 __mt-0 __mb-s'>{data}</h5>
                                                <ul>
                                                    {points[data]?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{item.plays}</li>
                                                                <li>{item?.action} {item.points} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                    {title==="NHL" && !isMyGameCenter&& Object.keys(points).map((data, index) => {
                                        return (data==='Skater'&& 
                                            <div className={styles.card}>
                                                <h5 className='__title-5 __mt-0 __mb-s'>{data}</h5>
                                                <ul>
                                                    {points['Skater']?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{item.plays}</li>
                                                                <li>{item?.action} {item.points} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                    {title==="NHL" && !isMyGameCenter&& Object.keys(points).map((data, index) => {
                                        return (data==='Team-D'&&
                                            <div className={styles.card}>
                                                <h5 className='__title-5 __mt-0 __mb-s'>{data}</h5>
                                                <ul>
                                                    { points['Team-D']?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{item.plays}</li>
                                                                <li>{item?.action} {item.points} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                    {title==="NHL" && !isMyGameCenter&& Object.keys(points).map((data, index) => {
                                        return (data==='Goalie'&&
                                            <div className={styles.card}>
                                                <h5 className='__title-5 __mt-0 __mb-s'>{data}</h5>
                                                <ul>
                                                    { points['Goalie']?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{item.plays}</li>
                                                                <li>{item?.action} {item.points} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                    
                                     {title==="NHL" && isSelectedPage&& Object.keys(point).map((data, index) => {
                                        return (data==='Skater'&& 
                                            <div className={styles.card}>
                                                <h5 className='__title-5 __mt-0 __mb-s'>{data}</h5>
                                                <ul>
                                                    {point['Skater']?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{item.plays}</li>
                                                                <li>{item?.action} {item.points} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                    {title==="NHL" && isSelectedPage&& Object.keys(point).map((data, index) => {
                                        return (data==='Team-D'&&
                                            <div className={styles.card}>
                                                <h5 className='__title-5 __mt-0 __mb-s'>{data}</h5>
                                                <ul>
                                                    { point['Team-D']?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{item.plays}</li>
                                                                <li>{item?.action} {item.points} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                    {title==="NHL" && isSelectedPage&& Object.keys(point).map((data, index) => {
                                        return (data==='Goalie'&&
                                            <div className={styles.card}>
                                                <h5 className='__title-5 __mt-0 __mb-s'>{data}</h5>
                                                <ul>
                                                    { point['Goalie']?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{item.plays}</li>
                                                                <li>{item?.action} {item.points} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}

                                    {title==="NHL" && (isMyGameCenter|| livePage || isEditPicks) && point?.skater &&
                                            <div className={styles.card}>
                                                 <h5 className='__title-5 __mt-0 __mb-s'>Sketer</h5>
                                                   <ul>
                                                       {  Object.keys(point?.skater).map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{capitalize(item)}</li>
                                                                <li>{point?.skater[item]} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        }
                                      {title==="NHL" &&  (isMyGameCenter|| livePage || isEditPicks) && point?.teamD &&
                                            <div className={styles.card}>
                                                 <h5 className='__title-5 __mt-0 __mb-s'>Team-D</h5>
                                                   <ul>
                                                       {  Object.keys(point?.teamD).map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{capitalize(item)}</li>
                                                                <li>{point?.teamD[item]} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        }
                                       {title==="NHL" &&  (isMyGameCenter|| livePage || isEditPicks) && point?.goalie &&
                                            <div className={styles.card}>
                                                 <h5 className='__title-5 __mt-0 __mb-s'>Goalie</h5>
                                                   <ul>
                                                       {  Object.keys(point?.goalie).map((item, i) => {
                                                        return (
                                                            <>
                                                                <li>{capitalize(item)}</li>
                                                                <li>{point?.goalie[item]} Pts</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        }
                                   
                                    
                                </div>
                            </section>
                        }
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Powers</h3>
                            {game_type === "NHL_Fantasy" ? <p>Powers will not be available for this contest.</p> : <>
                            <p>Powers are available to be used in this Contest and are included with the Contest Participants entry fee. Powers enable Contest Participants to enhance their fantasy team’s performance. The following powers will be made available for this contest:</p>
                            <div className={styles.powersSubSectionsWrapper}>
                                {powers && powers.length > 0 ? (
                                    (powers.findIndex(x => (x.powerName == "Swap" || x.powerId == 4)) >= 0) ? (
                                        powerSection("Swap", "Player Swap", titled == undefined ? "MLB" : titled)
                                    ) : ""
                                ) : ""}
                                {powers && powers.length > 0 ? (
                                    (powers.findIndex(x => (x.powerId == 1 || x.powerId == 2 || x.powerId == 3)) >= 0) ? (
                                        powerSection("1.5x Point Booster", "Point Booster", titled == undefined ? "NHL" : titled)
                                    ) : ""
                                ) : "" }
                                {powers && powers.length > 0 ? (
                                    (powers.findIndex(x => x.powerId == 10) >= 0) ? (
                                        powerSection("Retro Boost", "2x Retro Boost", titled == undefined ? "MLB" : titled)
                                    ) : ""
                                ) : "" }
                                {powers && powers.length > 0 ? (
                                    (powers.findIndex(x => x.powerId == 6) >= 0) ? (
                                        powerSection("Challenge", "Challenge", titled == undefined ? "MLB" : titled)
                                    ) : ""
                                ) : "" }
                                {powers && powers.length > 0 ? (
                                    (powers.findIndex(x => x.powerId == 5) >= 0) ? (
                                        powerSection("D-Wall", "D-Wall", titled == undefined ? "MLB" : titled)
                                    ) : ""
                                ) : "" }
                                {powers && powers.length > 0 ? (
                                    (powers.findIndex(x => x.powerId == 8) >= 0) ? (
                                        powerSection("Power-Up", "Power-Up", titled == undefined ? "MLB" : titled)
                                    ) : ""
                                ) : "" }
                            </div>
                            </>
                            }
                        </section>
                            {(title == "NHL" || title === "NBA" )&&
                                <section className='__mb-3 __mt-3'>
                                    <h3 className={h3Class}>Scoring Notes</h3>
                                    <p>Points for a goal include the shot-on-goal (SOG) points. There will not be an additional 3 pts for the SOG when a Goal is scored.</p>
                                    <p>Scoring statistics for Goalies will not be counted.</p>
                                </section>
                            }
                            {title === "MLB" &&
                                <section className='__mt-3 __mb-3'>
                                    <h3 className={h3Class}>Scoring Notes</h3>
                                    <p>Hitting statistics for Pitchers will not be counted and pitching statistics for Hitters will not be counted.</p>
                                </section>
                            }
                        <section>
                            <h3 className={h3Class}>Lineup Requirements</h3>
                            <p>Lineups will consist of 8 players.</p>
                            <p className='__mt-2'>The 8 roster positions are:</p>
                            <ul className={styles.linupRequrementsList}>
                                {finalData?.teamRoster.map((item) => {
                                    if(item.title !== "Team Defense")
                                        return(<li><span>{item.count}</span><b>{item.title}</b>  {item.value}</li>)
                                })}
                                <li><span>1</span><b>Team Defense</b>  (Runs against are deducted from the contest participants point total)</li>
                            </ul>
                        </section>
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Players available for Selection</h3>
                            <p className='__mb-2'>The Players available for selection will consist of all {title} players expected to be on the active roster for the teams scheduled to play. Occasionally a player may be missing from the list of available players due to trades or other unforeseen circumstances.</p>
                            <p>In most cases, once the Player selection list is established, the Player List will not be adjusted. A "Game Set" is a set of games used for contests; each contest is linked to one Game Set.</p>
                        </section>
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Position Eligibility</h3>
                            <p>Player positions are determined at the sole discretion of PowerPlay Games.</p>
                        </section>
                        <section className='__mt-3 __mb-3'>
                            <h3 className={h3Class}>Cancelled, Postponed, and Rescheduled Games</h3>
                            <p>If a game is canceled, postponed, or rescheduled to a time outside of the original Scoring Period, the game will be disabled from the Game Set and players listed to play in that game will not be eligible to accrue points. Contest participants are free to swap out inactive players for other active players if they have Swaps available.</p>
                            <p className='__mt-2 __mb-2'>The Scoring Period for each contest participant’s fantasy team is defined as the time of the scheduled start of the first game within the Game Set wherein the contest participant has a player selected and the official end of all games where the contest participant has a player selected.</p>
                            <p className='__mt-2 __mb-2'>Any games that are disabled will be indicated as such on the Power Center page. Emails and other notifications may also be used to notify users of disabled games.</p>
                            <p>Games are "known" to be canceled or postponed once their status is updated as such by PowerPlay Games {title} stats-provider, Sportradar.</p>
                        </section>
                        <section className='mt-3'>
                            <h3 className={h3Class}>Suspended or Shortened Games</h3>
                            <p>PowerPlay Games uses official {title} statistics and only includes statistics from games {title} deems to be official. If the {title} declares a game "suspended" then the statistics generated before the game is suspended will count in Game Sets containing said game. Any statistics generated on a later date when the game resumes will not be included.</p>
                        </section>
                    </div>
                </div>
            </CreatePopUpPortal>}
        </>
    )
}



export default ContestRulesPopUp;