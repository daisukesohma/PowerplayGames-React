import React from "react";
import "./easyplay.scss";
import LetsPlayBanner from "../../components/mobilecomponents/EasyPlay/LetsPlayBanner";
import StepOne from "../../assets/group-3.png";
import StepTwo from "../../assets/images/stepTwo.png";
import StepThree from "../../assets/group-12@2x.png";
import StepFour from "../../assets/group-7@2x.png";
import StepFive from "../../assets/group-13@2x.png";
import Star from "../../assets/images/gradientStar.svg";
import rechargeImage from "../../assets/rechargeiconbottomobile.png";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import rechargeIcon from '../../assets/rechargehowtoplaymobile@2x.png';
import image1 from '../../assets/1509@2x.png';
import image2 from '../../assets/15091@2x.png';
import image3 from '../../assets/15095@2x.png';
import image4 from '../../assets/15093@2x.png';
import image5 from '../../assets/15094@2x.png';
import image6 from '../../assets/recharge@2x.png';

const RechargeEasyPlay = () => {
  return (
    <section className="easyplayrecharge">
      <div className="play__heading">
        <img src={rechargeIcon} />
        <p>How to play</p>
      </div>
      <Container>
        <Row>
            <Col xs={12}>
                <div className="paragraphSection">
                    Recharge contest entry, player selection, and managing your team all work the same as our PowerdFS games (click <Link to="/how-to-play" style={{color: "#688fbd"}}>here</Link> to read about playing PowerdFS). 
                    <br />The difference between PowerdFS and Recharge is in the Powers Section and how Powers are obtained and used.
                </div>
            </Col>

            <Col xs={12} style={{paddingRight: 0}}>
                <div className="section1">
                    <p>On the Recharge Team Manager page, instead of a fixed inventory for Powers, you have power levels ranging from fully charged to no power.
                    <br /><br />
                    When you click a power to use, you will be presented with a slider that can be adjusted based on the amount of power you have.</p>
                    <img src={image1} />
                </div>
            </Col>

            <Col xs={12} style={{padding: 0}}>
                <div className="section2">
                    <div className="topSection">
                        <img src={image2} />
                        <h2>Point and Retro Boosters</h2>
                    </div>
                    <p>For Point and Retro Boosters, if you have full power, you are able to boost points by 5x, as your power level goes down the amount you can boost also decreases.</p>
                </div>
            </Col>

            <Col xs={12} style={{padding: 0}}>
                <div className="section3">
                    <div className="topSection">
                        <h2>Coaches Challenge</h2>
                        <img src={image3} />
                    </div>
                    <p>For Coaches Challenge, you choose the success rate. With a full charge, you can obtain a 80% success rate to overturn points against your Team D!</p>
                </div>
            </Col>

            <Col xs={12} style={{padding: 0, marginTop: 60}}>
                <div className="section2">
                    <div className="topSection">
                        <img src={image4} style={{marginLeft: 40}}/>
                        <h2 style={{marginTop: 111}}>D-Wall</h2>
                    </div>
                    <p>For D-Wall, you choose the effectiveness of your D-Wall. At 50%, half of points scored against your Team-D will count towards your score.</p>
                </div>
            </Col>

            <Col xs={12} style={{padding: 0}}>
                <div className="section3">
                    <div className="topSection">
                        <h2 style={{marginTop: 175}}>Swaps</h2>
                        <img src={image5} />
                    </div>
                    <p>For Swaps, a players season performance determines the amount of power needed to swap him in. If a Player is having a monster season, it will require full power to add him to your line-up.</p>
                </div>
            </Col>

            <Col xs={12} style={{padding: 0, marginTop: 118, marginBottom: 100}}>
                <div className="section3" style={{marginTop: 0}}>
                    <div className="topSection">
                        <h2 style={{width: 151, marginTop: 20, marginRight: 30}}>I’ve used all my Power, now what? </h2>
                        <img src={image6} style={{width: 140, marginRight: 30, height: 140}}/>
                    </div>
                    <p>Your power levels will recharge at ~2 bars per minute. To go from no power to full power will take ~ 10 minutes. You will also have options to speed up the recharge time during the game.</p>
                </div>
            </Col>

          <Col xs={12} style={{padding: 0}}>
              <div className="rechargeSection">
                <img src={rechargeImage} />
                <p>
                  Explore games on the Power Center page and enter to experience PowerdFS. You have the Powers to win!
                </p>
                <Link to="/power-center">Explore ReCharge games</Link>
              </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RechargeEasyPlay;
