import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.scss";
import img1 from "../../assets/group-3-img.png";
import img2 from "../../assets/howtoplayimage2.png";
import img3 from "../../assets/group-3-copy-2.png";
import { Link } from "react-router-dom";
import StarIcon from "../../icons/Star";
import ForwardIcon from "../../icons/ForwardIcon";
import img4 from "../../assets/group-3-copy-3@2x.png";
import img5 from "../../assets/group-10@2x1.png";
import img6 from '../../assets/rechargeiconbottomsection.png'
import backgroundImage from "../../assets/rectangle@2x.png";
import Animate from "../../ui/Animation/Animate";
import EasyPlay from "../Mobile/EasyPlay";
import starIcon from '../../assets/group-4.png';
const HowToPlayPage = () => {
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
            <h1 className={styles.title}>It's Easy to Play!</h1>

            <section className={styles.section1}>
              <div className={styles.leftText}>
                <div>
                  <span>1</span>
                  <p>Go to the <Link to="/">Power Center</Link> and browse available games, click ‘Enter’.</p>
                </div>
              </div>
              <div className={styles.rightImage}>
                <img src={img1} />
              </div>
            </section>

            <section className={styles.section2}>
              <div className={styles.leftImage}>
                <img src={img2} />
              </div>
              <div className={styles.rightText}>
                <div>
                  <span>2</span>
                  <p>Select your team. You will pick seven (7) players and one (1) Team defence. You can have a maximum of three (3) <img src={starIcon} /> selections.</p>
                </div>
              </div>
            </section>

            <section className={styles.section1}>
              <div className={styles.leftText}>
                <div>
                  <span>3</span>
                  <p style={{width: 327}}>From <Link to="/">My Game Center</Link> you can see when games are due to start or are in progress.
                  <br />Click <Link to="/">Team Manager</Link> to launch the live Team Manager page.</p>
                </div>
              </div>
              <div className={styles.rightImage} style={{width:796}}>
                <img src={img3} style={{width: "100%"}}/>
              </div>
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
            </section>

            <section className={styles.contectSection5}>
              <Animate>
                <img alt="" src={img5} />
              </Animate>
              <p>
                <span style={{fontWeight: 600, color: "#fb6e00"}}>Individual Player Cards</span> – these cards show the current stats for your selected player as well as the live game stats.
                <br />The live game section will contain relevant information depending on the sport.
              </p>
            </section>

            {/* <section className={styles.contectSection}>
              <div>
                <p className={styles.blogSection1}>
                  Go to the <Link to="/">Power Center</Link> and browse
                  available games, click ‘Enter’.
                </p>
              </div>
              <div>
                <img alt="" src={img1} />
              </div>
            </section>
            <section className={styles.contectSection}>
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
            </section>
            <section className={styles.contectSection5}>
              <Animate>
                <img alt="" src={img5} />
              </Animate>
              <p>
                Individual player card overview – this card shows the current
                stats related to each individual player on your team.
              </p>
            </section> */}
            
            <section>
                <div className={styles.contectSection6}>
                  <img src={img6} />
                  <Link to="/recharge-how-to-play"><button>How to Play Recharge</button></Link>
                  <p>
                    Visit the <Link to="power-center">Power Center</Link> to enter games. You have the Powers to win!
                  </p>
                </div>
            </section>
            
          </main>
        </div>
      ) : (
        <EasyPlay />
      )}

      <Footer />
    </>
  );
};

export default HowToPlayPage;
