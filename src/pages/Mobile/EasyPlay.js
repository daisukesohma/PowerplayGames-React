import React from "react";
import "./easyplay.scss";
// import Header from "../../components/Header/Header";
import LetsPlayBanner from "../../components/mobilecomponents/EasyPlay/LetsPlayBanner";
import StepOne from "../../assets/group-3.png";
import StepTwo from "../../assets/images/stepTwo.png";
import StepThree from "../../assets/group-12@2x.png";
import StepFour from "../../assets/group-7@2x.png";
import StepFive from "../../assets/group-13@2x.png";
import Star from "../../assets/images/gradientStar.svg";
import rechargeImage from "../../assets/rechargeiconbottomobile.png";
import { Link } from "react-router-dom";
// import EasyPlayFooter from "../../components/mobilecomponents/EasyPlay/EasyPlayFooter";
// import Footer from "../../components/Footer/Footer";
import { Container, Row, Col } from "reactstrap";
const EasyPlay = () => {
  return (
    <section className="easyplay">
      <div className="play__heading">
        <h2>It's Easy to play!</h2>
      </div>
      <Container>
        <Row>
          <Col xs={12}>
            <LetsPlayBanner
              rowReverse="flex-md-row"
              width="100%"
              height="100%"
              float="none"
              valueAlign={-25}
              offset={[-42, 0]}
              image={StepOne}
              description={`Go to the <span class="color">Power Center</span>
              <br /> and browse<br class="d-block d-md-none" /> available
              <br /> games, click ‘Enter’.`}
              number={1}
            />
          </Col>
          <Col xs={12}>
            <LetsPlayBanner
              newClass="float"
              rowReverse="flex-row  flex-lg-row-reverse"
              width="180px"
              float="right"
              height="100%"
              valueAlign={-41}
              offset={[-55, 0]}
              image={StepTwo}
              description={`Select your team. You will pick seven (7)<br  class="d-block d-md-none"/> players and one (1) Team defence, you can have a maximum of <br  class="d-none d-sm-block d-md-none"/>three (3) <span class="gradient-text"><img src=${Star} />STAR POWER </span> selections.`}
              number={2}
            />
          </Col>
          <Col xs={12}>
            <LetsPlayBanner
              newClass="float"
              rowReverse="flex-md-row"
              width="300px"
              float="right"
              height="100%"
              valueAlign={-47}
              offset={[-60, 0]}
              image={StepThree}
              description={`From <span class="color">My Game Center</span> you can see when <br  class="d-none d-sm-block d-md-none"/>  games are due to start or are in progress.<br  class="d-none d-sm-block d-md-none"/>
              Click <span class="color">Manage My Team</span> to launch the live Team<br  class="d-none d-sm-block d-md-none"/> Manager page.`}
              number={3}
            />
          </Col>
          <Col xs={12}>
            <LetsPlayBanner
              rowReverse="flex-md-row-reverse"
              width="350px"
              float="right"
              height="100%"
              valueAlign={-51}
              offset={[-65, 0]}
              image={StepFour}
              description={`<span class="color">Manage My Team</span> page overview – this is where <br  class="d-none d-sm-block d-md-none"/> you can see your entire team in one view, see<br  class="d-none d-sm-block d-md-none"/> you current standings, and see how many<br class="d-none d-sm-block d-md-none"/> powers you have remaining.`}
              number={4}
            />
          </Col>

          <Col xs={12}>
            <LetsPlayBanner
              space="imageSpace"
              rowReverse="flex-md-row-reverse"
              width="100%"
              float="left"
              height="100%"
              valueAlign={-120}
              offset={[-130, 0]}
              image={StepFive}
              description={`<span class="color">Individual Player Cards</span> – these cards show the current stats for your selected player as well as the live game stats.
              <br />The live game section will contain relevant information depending on the sport.`}
              number={5}
            />
          </Col>

          <Col xs={12} style={{padding: 0}}>
              <div className="rechargeSection">
                <img src={rechargeImage} />
                <p>
                  Explore games on the Power Center page and enter to experience PowerdFS. You have the Powers to win!
                </p>
                <Link to="/power-center">Explore ReCharge games</Link>
                <br />
                <Link to="/recharge-how-to-play" className="learnMoreLink">Learn more</Link>
              </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EasyPlay;
