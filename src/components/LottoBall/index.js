import React from "react";

import "./lottoBall.scss";

function LottoBall(props) {
  if (props.matched) {
    return (
      <div className="__flex __column __flex-center __ball_wrapper">
        <div className="__my_number_ball __flex __flex-center __ball_matched">
          {props.number}
        </div>
        <div className="__text_matched">Matched</div>
      </div>
    );
  } else {
    return (
      <div className="__flex __column __flex-center __ball_wrapper">
        <div
          className={
            "__my_number_ball __flex __flex-center " +
            (props.isActive ? "__focused" : "")
          }
          onClick={() => props.onClick(props.number)}
        >
          {props.number}
        </div>
        {props.isActive && (
          <div className="__powerplay_tools">
            <div className="__tools">
              {/* Reset */}
              <div
                className="_tool tool_1 __background"
                onClick={() =>
                  props.handlePowerplayClick("reset", props.number)
                }
              ></div>
              {/* power match */}
              <div
                className="_tool tool_2 __background"
                onClick={() =>
                  props.handlePowerplayClick("power-match", props.number)
                }
              ></div>
              {/* Increase */}
              <div
                className="_tool tool_3 __background"
                onClick={() =>
                  props.handlePowerplayClick("increase", props.number)
                }
              ></div>
              {/* Decrease */}
              <div
                className="_tool tool_4 __background"
                onClick={() =>
                  props.handlePowerplayClick("decrease", props.number)
                }
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LottoBall;
