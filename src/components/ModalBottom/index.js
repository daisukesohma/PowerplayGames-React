import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function ModalBottom(props) {
  const { visible = false, scrollable = true } = props || {};
  if (!scrollable && visible) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
  return visible && <div className={classes.wrapper}>{props?.children}</div>;
}

ModalBottom.propTypes = {
  visible: PropTypes.bool,
  scrollable: PropTypes.bool,
};

export default ModalBottom;
