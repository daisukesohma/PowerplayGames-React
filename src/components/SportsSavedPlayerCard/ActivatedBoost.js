import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import EditIcon from "../../icons/EditIcon";

function ActivatedBoost(props) {
  const { boost = {}, largeView = false } = props || {};

  return (
    <div
      className={`${classes.activated_boost} ${
        largeView && classes.large_view
      }`}
    >
      <p className={`${largeView && classes.large_view}`}>
        {boost?.boost} Booster Activated <EditIcon size={largeView && 16} />{" "}
      </p>
    </div>
  );
}

ActivatedBoost.propTypes = {
  boost: PropTypes.object,
  largeView: PropTypes.bool,
};

export default ActivatedBoost;
