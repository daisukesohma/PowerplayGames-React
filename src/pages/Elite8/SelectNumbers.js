import React from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import { Component } from "react";
import groupImage from "../../assets/elite8/group-34.png";

class SelectNumbers extends React.Component {
  constructor(props) {
    super(props);

    //state valiable 'selected'
    this.state = { selected: [] };
    this.myRef = React.createRef();
  }
  

  render() {
    return (
      <section>
        <div id = "btn-pick-div" className="PickNumbers-wrapper">
          <div className="PickNumbers-left">
            <div className="PickNumbers-header"> Pick Your Numbers </div>
            <div className="PickNumbers-header-sub">
              Select 8 numbers in total by clicking the the lottery balls below.
            </div>
            <div className="all-PickNumbers-box">{this.initBalls()}</div>
          </div>
          <div className="PickNumbers-right">
            <div className="PickNumbers-right-heading">
              You can use <span className="orange-text"> Powerplays </span> to
              edit your selections during the live draw!
            </div>
            <div className="PickNumbers-right-img">
              <img src={groupImage} />
            </div>
            <div className="PickNumbers-right-balls">
              <div className="PickNumbers-right-balls-div">
                {this.initSelectedBalls()}
              </div>
            </div>
            {this.SubmitMyPicksBtn()}
          </div>
        </div>
        <div className="elite8-about">
          <div className="elite8-about-wrapper">
            <div className="elite8-about-heading">Elite8</div>
            <div className="elite8-about-subheading">
              Our platform is designed for all PC and mobile devices, bringing
              you access at any time, in any place, without boundaries.
            </div>
            <div className="elite8-about-table">
              <div className="elite8-about-solo">
                <div className="elite8-about-table-heading col1">
                  Live Draw Starts At
                </div>
                <div className="elite8-about-table-text">
                  9:00 pm EST on Feb 27th, 2020
                </div>
              </div>
              <div className="elite8-about-solo">
                <div className="elite8-about-table-heading col2">
                  Deadline for choosing or modifying your picks
                </div>
                <div className="elite8-about-table-text">
                  One hour before the draw (8:00PM ET)
                </div>
              </div>
              <div className="elite8-about-solo">
                <div className="elite8-about-table-heading col3">
                  Contest closes at
                </div>
                <div className="elite8-about-table-text">
                  8:00pm ET on April 26, 2020.
                </div>
              </div>
            </div>
            <div className="elite8-about-orange-bar"> </div>
            <div className="elite8-about-list-wrapper">
              <div className="elite8-about-list">
                <div className="list-col1">
                  <div className="elite8-about-list-item">
                    <div className="elite8-about-list-oval" />
                    Thirty (30) prizes available to be won.
                  </div>
                  <div className="elite8-about-list-item">
                    <div className="elite8-about-list-oval" />
                    One entry per person.
                  </div>
                  <div className="elite8-about-list-item">
                    <div className="elite8-about-list-oval" />
                    Open to residents of Canada (excluding Quebec) &amp; United
                    States who are over the age of majority.
                  </div>
                </div>
                <div className="list-col2">
                  <div className="elite8-about-list-item">
                    <div className="elite8-about-list-oval" />
                    Skill-testing question must be correctly answered to win.
                  </div>
                  <div className="elite8-about-list-item">
                    <div className="elite8-about-list-oval" />
                    Odds of winning depend on participants use of Powerplays.{" "}
                  </div>
                  <div className="elite8-about-list-item">
                    <div className="elite8-about-list-oval" />
                    No purchase necessary.
                  </div>
                </div>
              </div>
              <ContestRules />
            </div>
          </div>
        </div>
      </section>
    );
  }

  onBallClicked(number) {
    // check if selected array has the number
    if (this.state.selected.includes(number)) {
      // if yes, remove the number from array
      this.removeFromSelectedNumbers(number);
    } else {
      if (this.state.selected.length > 7)
        return alert("Only 8 selections allowed");
      // if no, add the number in array
      this.addToSelectedNumbers(number);
    }
  }

  initBalls() {
    var mArray = [];
    // function for loop of Balls
    for (let i = 1; i <= 48; i++) {
      mArray.push(
        <div
          className="elite8-ball-wrapper"
          onClick={() => this.onBallClicked(i)}
        >
          <Ball number={i} isSelected={this.state.selected.includes(i)} />
        </div>
      );
    }
    return mArray;
  }

  initSelectedBalls() {
    var mArray = [];
    // function for loop of Balls isSelected={selected.includes(i)}
    for (let i = 0; i < this.state.selected.length; i++) {
      mArray.push(
        <div className="space-div">
          <Ball number={this.state.selected[i]} isSelected={true} />
        </div>
      );
    }

    return mArray;
  }

  addToSelectedNumbers(number) {
    // tempArray.push(number);
    //setSelected(selected.concat(number));
    var oldArray = [...this.state.selected];
    oldArray.push(number);
    this.setState({ selected: oldArray });
  }

  removeFromSelectedNumbers(number) {
    var oldArray = [...this.state.selected];
    const index = oldArray.indexOf(number);
    if (index > -1) {
      oldArray.splice(index, 1);
    }

    this.setState({ selected: oldArray });
  }

  SubmitMyPicksBtn(props) {
    return (
      <button
        className="c-pick-your-numbers-btn submit"
        onClick={(e) => {
          let path = "/elite8-draw";
          this.props.history.push({
            pathname: path,
            state: {
              picks: this.state.selected,
            },
          });
        }}
      >
        Submit My Picks
      </button>
    );
  }
} //react class ends

function Ball(props) {
  return (
    <div className={"elite8-ball " + (props.isSelected ? "selected" : "")}>
      {props.number}
    </div>
  );
  //  else return <div className="elite8-ball">{props.number}</div>;
}

function ContestRules(props) {
  return <button className="contest-rules-btn"> Contest Rules </button>;
}

//export default SelectNumbers;
export default withRouter(SelectNumbers);
