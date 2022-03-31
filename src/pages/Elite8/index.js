import React from "react";

import "./index.css";

//importing images
import orig from "../../assets/elite8/lottery-orig-copy.png";
import rectange from "../../assets/elite8/rectangle-2.png";
import seven from "../../assets/elite8/7.png";
import upImage from "../../assets/elite8/up-active.png";
import downImage from "../../assets/elite8/down-active.png";
import swapImage from "../../assets/elite8/swap.png";
import refreshImage from "../../assets/elite8/refresh.png";

//importing required components
import SelectNumbers from "./SelectNumbers.js";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { printLog } from "../../utility/shared";

function ComponentPickNumbersBtn(props) {
  return (
    <button
      className="c-pick-your-numbers-btn"
      onClick={(e) => {
        executeScroll();
      }}
    >
      Pick Your Numbers
    </button>
  );
  function executeScroll() {
    printLog("Executing scoroll");
    if (document.getElementById("btn-pick-div")) {
      document
        .getElementById("btn-pick-div")
        .scrollIntoView({ behavior: "smooth" });
    }
  }
}
//functional conponents,
// can be defined in the same file or a seperate file.
// as in SelectNumbers.js
function StaticContent(props) {
  return (
    <div className="elite8-content">
      <section className="hero-section">
        <div className="hero-image">
          <div className="hero-content-wrapper">
            <div className="hero-heading"> ELITE 8 </div>
            <div className="hero-text1">
              Starts on Feb 23rd, 2020 @ 9:00PM EST
            </div>
            <div className="hero-text2">
              <span className="hero-bars" />
              &ensp; win up to &ensp;
              <span className="hero-bars" />
            </div>
            <div className="hero-text3">
              $2000
              <span className="CAD"> CAD </span>
            </div>
            <ComponentPickNumbersBtn />
            <div className="hero-text4">*No Purchase Necessary</div>
          </div>
        </div>
      </section>
      <div className="fun-play-wrapper">
        <div className="fun-play-left">
          <div className="fun-play-heading"> A Fun New Way to Play! </div>
          <div className="fun-play-phone mobile-only"> </div>
          <div className="fun-play-text1">
            Have you ever played a pick-and-wait game like Super 7, 6/49, or
            Powerball?
          </div>
          <div className="fun-play-text2a">
            At PowerPlay Systems,
            <div className="fun-play-text2b">
              We think the current pick-and-wait format is kind of boring. So we
              invented a fun new way to play!
            </div>
          </div>
          <div className="fun-play-try mobile-only">
            {" "}
            Give it a try to see if you feel the same way.
          </div>
          <ComponentPickNumbersBtn />
        </div>
        <div className="fun-play-right">
          <img className="fun-play-right-img" src={rectange} />
        </div>
      </div>
      <div className="edit-selections-wrapper">
        <div className="edit-selections-heading">
          Edit your selections during the live draw!
        </div>
        <div className="edit-selections-subheading">
          To make it more exciting, you can make use of Powerplays during the
          live draw to edit your selections and improve your chances of winning.
        </div>
        <div className="edit-selections-box-container">
          <div className="edit-selections-box">
            <img className="edit-selections-box1-img" src={seven} />
            <div className="edit-selections-box-heading"> Power Match </div>
            <div className="edit-selections-box-text">
              Use Power Match to match the in-play number.
            </div>
          </div>
          <div className="edit-selections-box">
            <img className="edit-selections-box2-img" src={upImage} />
            <img className="edit-selections-box2-img" src={downImage} />
            <div className="edit-selections-box-heading">
              Increase/ Decrease
            </div>
            <div className="edit-selections-box-text">
              You can increase or decrease your pick during live draw.
            </div>
          </div>
          <div className="edit-selections-box">
            <img className="edit-selections-box3-box4-img" src={swapImage} />
            <div className="edit-selections-box-heading"> Replace </div>
            <div className="edit-selections-box-text">
              Used to replace one number with a random new Number.
            </div>
          </div>
          <div className="edit-selections-box">
            <img className="edit-selections-box3-box4-img" src={refreshImage} />
            <div className="edit-selections-box-heading"> Replace All </div>
            <div className="edit-selections-box-text">
              Used to replace one number with a random new Number.
            </div>
          </div>
        </div>
        <div className="edit-selections-bottom-text">
          We will give you three free Powerplays to start!
        </div>
        <ComponentPickNumbersBtn />
      </div>

      <div className="match8-wrapper">
        <div className="match8-left">
          <div className="match8-heading">
            Match 8 of 8 numbers &amp; Win
            <span className="orange-text"> $2,000 </span> CAD
          </div>
          <div className="match8-right-mobile mobile-only">
            <img className="match8-right-mob-img" src={orig} />
          </div>
          <div className="match8-subheading"> Smaller prizes available </div>
          <div className="match8-box-container">
            <div className="match8-greybox">7/8</div>
            <div className="match8-brownbox bx1">$500</div>
            <div className="match8-greybox">6/8</div>
            <div className="match8-brownbox bx2">$100</div>
          </div>
        </div>

        <div className="match8-right">
          <img src={orig} />
        </div>
      </div>
    </div>
  );
}
class Elite8 extends React.Component {
  constructor(props) {
    super(props);
  }
  executeScroll() { }

  render() {
    return (
      <div>
        <Header />
        {/* Static content section on top */}
        <StaticContent />
        {/* Bottom select numbers section */}
        <SelectNumbers />
        <Footer />
      </div>
    );
  }
}

export default Elite8;
