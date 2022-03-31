import React from "react";
import PropTypes from "prop-types";

import classes from "./card.module.scss";

function Card(props) {
  const { styles = {} } = props || {};
  return (
    <div className={classes.__card} style={styles}>
      {props.children}
    </div>
  );
}

Card.propTypes = {
  styles: PropTypes.any,
};

export default Card;
