import React from "react";
import classes from "./powerLearnMoreModal.module.scss";
import OutlineButton from "../OutlineButton";

const PowerLearnMoreModal = (props) => {
  const { title = "", onCancel = () => {}, isMobile = false } = props || {};

  return (
    <div className={classes.__learn_more_modal}>
      <div className={classes.__info}>
        Do you are about to learn more about <span>Powers?</span>
      </div>

      {isMobile ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={classes.__leave_game_btn}>
            <OutlineButton title="Cancel" onClick={onCancel} />
          </div>
          <div className={classes.__leave_game_btn}>
            <OutlineButton title="Leave More" onClick={() => alert("hi")} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PowerLearnMoreModal;
