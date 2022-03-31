import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import { CONSTANTS } from "../../utility/constants";

function ButtonFloating(props) {
  const {
    title = "",
    icon = "",
    isRounded = false,
    styles = {},
    iconOnly = false,
    onClick = () => {},
    block = false,
    shadow = false,
    transparent = false,
    type = CONSTANTS.BUTTON_TYPE.SUBMIT,
    bordered = false,
  } = props || {};
  return (
    <div className={classes.__btn__floating} onClick={onClick} style={styles}>
      {!iconOnly ? (
        <div className="__btn__">
          {icon}
          {title}
        </div>
      ) : (
        { ...icon }
      )}
    </div>
  );
}

ButtonFloating.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  isRounded: PropTypes.bool,
  style: PropTypes.any,
  iconOnly: PropTypes.bool,
  onClick: PropTypes.func,
  block: PropTypes.bool,
  shadow: PropTypes.bool,
  transparent: PropTypes.bool,
  type: PropTypes.string,
  bordered: PropTypes.bool,
};

export default ButtonFloating;
