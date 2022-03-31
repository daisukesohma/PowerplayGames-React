import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.scss";
import img1 from "../../assets/group-3@2x.png";
import img2 from "../../assets/group-3-copy@2x.png";
import img3 from "../../assets/group-3-copy-2@2x.png";
import { Link } from "react-router-dom";
import StarIcon from "../../icons/Star";
import ForwardIcon from "../../icons/ForwardIcon";
import img4 from "../../assets/group-3-copy-3@2x.png";
import img5 from "../../assets/group-10@2x.png";
import img6 from '../../assets/rechargeiconbottomsection.png'
import backgroundImage from "../../assets/rectangle@2x.png";
import Animate from "../../ui/Animation/Animate";
import RechargeEasyPlay from "../Mobile/RechargeEasyPlay";
import RechargeBlock from '../../assets/recharge-block.png';
import section2Bg from '../../assets/group-12-recharge.png';
import image1Booster from '../../assets/image1Booster.png';
import image2Booster from '../../assets/image2Booster.png';
import image3Booster from '../../assets/image3Booster.png';
import swapImage from '../../assets/swap.png';
import recharge from '../../assets/recharge.png';
import rechargeIcon from '../../assets/group-18@3x.png'

const RenderBoosterBlock = ({title = "", desc = "", rightImage}) => {
    return (
        <div className={styles.boosterBlock}>
            <div className={styles.leftSide}>
                <h2>{title}</h2>
                <p>{desc}</p>
            </div>
            <div className={styles.rightSide}>
                <img src={rightImage} />
            </div>
        </div>
    );
};


const RechargeHowToPlayPage = () => {
  const [screenSize, setScreenSize] = useState(window.screen.width);

  window.onresize = () => {
    setScreenSize(window.screen.width);
  };

  return (
    <>
      <Header isStick={true} />
      {screenSize > 550 ? (
        <div className={styles.root}>
          <div className={styles.backgroundWrapper}>
            <img alt="" src={backgroundImage} />
          </div>
          <main className="__relative __how-to-play-page">
            <h1 className={styles.titleRecharge}><img src={rechargeIcon} /></h1>
            <p className={styles.subtitle}>How to play</p>

            <section className={styles.leftImageRightText}>
                <div className={styles.leftImage}>
                    <img src={RechargeBlock} />
                </div>
                <span className={styles.rightText}>
                        Recharge contest entry, player selection, and managing your team all work the same as our PowerdFS games (click <Link to="/how-to-play" style={{color: "#688fbd"}}>here</Link> to read about playing PowerdFS).
                        <br />The difference between PowerdFS and Recharge is in the Powers Section and how Powers are obtained and used.
                        <br /><br />
                        On the Recharge Team Manager page, instead of a fixed inventory for Powers, you have power levels ranging from fully charged to no power.
                        <br /><br />
                        When you click a power to use, you will be presented with a slider that can be adjusted based on the amount of power you have.
                </span>
            </section>

            <section className={styles.section2details}>
                <RenderBoosterBlock 
                title={"Point and Retro Boosters"}
                desc={"For Point and Retro Boosters, if you have full power, you are able to boost points by 5x, as your power level goes down the amount you can boost also decreases."}
                rightImage={image1Booster}
                />
                <RenderBoosterBlock 
                title={"Coaches Challenge"}
                desc={"For Coaches Challenge, you choose the success rate. With a full charge, you can obtain a 80% success rate to overturn points against your Team D!"}
                rightImage={image2Booster}
                />
                <RenderBoosterBlock 
                title={"D-Wall"}
                desc={"For D-Wall, you choose the effectiveness of your D-Wall. At 50%, half of points scored against your Team-D will count towards your score."}
                rightImage={image3Booster}
                />
            </section>

            <section className={styles.contectSection} style={{paddingLeft: 138, marginBottom: 86}}>
              <Animate>
                {" "}
                <img alt="" src={swapImage} style={{width: 593, marginBottom: 0}}/>{" "}
              </Animate>
              <div>
                <h2 className={styles.headings}>Swaps</h2>
                <p className={styles.descs}>
                    For Swaps, a players live performance determines the amount of power needed to swap him in. If a Player is having a monster game, it will require full power to add him to your line-up.
                </p>
              </div>
            </section>

            <section className={styles.contectSection} style={{display: "flex", paddingLeft: 210, marginBottom: 142}}>
              <div>
                <h2 className={styles.headings} style={{width: 420, fontSize: 30, marginTop: 34}}>I’ve used all my Power, now what? </h2>
                <p className={styles.descs}>
                    Your power levels will recharge at ~2 bars per minute. To go from no power to full power will take ~ 10 minutes. You will also have options to speed up the recharge time during the game.
                </p>
              </div>
              <Animate className={styles.animate}>
                <img alt="" src={recharge} style={{width: 240, marginBottom: 0}}/>
              </Animate>
            </section>

            <section>
                <div className={styles.contectSection6}>
                  <h1>PowerdFS</h1>
                  <p style={{
                    margin: "0 auto",
                    width: 448,
                    height: 46,
                    marginTop: 24
                  }}>
                  Explore games on the Power Center page and enter to experience PowerdFS. You have the Powers to win!
                  </p>
                  <Link to="/power-center"><button>Explore games</button></Link>
                </div>
            </section>

            {/* <section className={styles.bottomButtons}>
                <h2 className={styles.header}>See Also:</h2>
                <div className={styles.linksBlock}>
                    <div className={styles.leftSideLinks}>
                        <Link to="/">
                            How to Play
                        </Link>
                        <Link to="/">
                            Contest Rules
                        </Link>
                        <Link to="/">
                            Powers
                        </Link>
                    </div>
                    <div className={styles.rightSideLinks}>
                        <Link to="/">
                            Responsible Gaming
                        </Link>
                        <Link to="/">
                            Terms of Use
                        </Link>
                        <Link to="/">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </section> */}


            {/* <section className={styles.contectSection}>
              <div>
                <p className={styles.blogSection1}>
                  Go to the <Link to="/">Power Center</Link> and browse
                  available games, click ‘Enter’.
                </p>
              </div>
              <Animate className={styles.animate}>
                <img alt="" src={img1} />
              </Animate>
            </section> */}
            {/* <section className={styles.contectSection}>
              <Animate>
                {" "}
                <img alt="" src={img2} />{" "}
              </Animate>
              <div>
                <p className={styles.blogSection2}>
                  Select your team. You will pick eight (8) players and you can
                  have a maximum of three (3){" "}
                  <span className={styles.starPowerBlog}>
                    <StarIcon /> STAR POWER
                  </span>{" "}
                  Players. <br /> Click{" "}
                  <Link to="/">
                    <ForwardIcon />
                  </Link>{" "}
                  for more player stats. When done, click Submit
                </p>
              </div>
            </section>
            <section className={styles.contectSection}>
              <div>
                <p className={styles.blogSection3}>
                  From <Link to="/">My Game Center</Link> you can see when games
                  are due to start or are in progress. <br /> Click{" "}
                  <Link to="/">Manage My Team</Link> to launch the live Team
                  Manager page.
                </p>
              </div>
              <Animate>
                {" "}
                <img alt="" src={img3} />{" "}
              </Animate>
            </section>
            <section className={styles.contectSection4}>
              <p>
                {" "}
                <Link to="/">Manage My Team</Link> page overview – this is where
                you can see your entire team in one view, see your current
                standings, and see how many powers you have remaining.
              </p>
              <Animate>
                <img alt="" src={img4} />
              </Animate>
            </section> */}
            {/* <section className={styles.contectSection5}>
              <Animate>
                <img alt="" src={RechargeBlock} />
              </Animate>
              <p>
                Individual player card overview – this card shows the current
                stats related to each individual player on your team.
              </p>
            </section> */}
            
            {/* <section>
              <Link to="/">
                <div className={styles.contectSection6}>
                  <img src={img6} />
                  <p>
                    Also see how to play our exciting new game
                  </p>
                </div>
              </Link>
            </section> */}
            
          </main>
        </div>
      ) : (
        <RechargeEasyPlay />
      )}

      <Footer />
    </>
  );
};

export default RechargeHowToPlayPage;
