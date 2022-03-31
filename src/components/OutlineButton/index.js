import React from "react";
import classes from "./outlineButton.module.scss";

const OutlineButton = (props) => {
  const {
    title = "",
    onClick = () => { },
    styles = {},
    icon = "",
    title0 = "",
    currency = "",
  } = props || {};

  return (
    <button
      className={classes.__outline_button}
      onClick={onClick}
      style={styles}
    >
      {icon && <span className={classes.__outline_button_icon}>{icon}</span>}
      {
        title0 && (
          title0
        )
      }
      {
        currency && (
          <img
            src={currency}
            alt=""
            height="18"
          />
        )
      }
      {title}
    </button >
  );
};

export default OutlineButton;
