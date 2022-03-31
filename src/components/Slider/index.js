import React, { useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function Slider(props) {
  const {
    visible = false,
    value = 1,
    min = 1,
    max = 1,
    step = 0.5,
    onChange = () => {},
    axis = "x",
    style = {},
  } = props || {};

  useEffect(() => {
    if (!visible) return;

    document.getElementById("myinput").oninput = function () {
      var value = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.background =
        "linear-gradient(to right, #fa3800 0%, #fb6e00 " +
        value +
        "%, #f2f2f21a " +
        value +
        "%, #f2f2f21a 100%)";
    };
  }, [visible, value]);

  if (!visible) return <></>;

  return (
    <div className={`${classes.wrapper} ${axis !== "x" && classes.yAxis}`}>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className={`${classes.slider}`}
        id="myinput"
        style={style}
      />
    </div>
  );
}

Slider.propTypes = {
  visible: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  axis: PropTypes.string,
  style: PropTypes.any,
};

export default Slider;
