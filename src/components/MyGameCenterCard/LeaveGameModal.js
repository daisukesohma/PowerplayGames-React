import React from "react";
import classes from "./leaveGameModal.module.scss";
import OutlineButton from "../OutlineButton";

const LeaveGameModal = (props) => {
  const {
    title = "",
    onCancel = () => { },
    onLeave = () => { },
    isMobile = false
  } = props || {};

  return (
    <div className={classes.__leave_game_modal}>
      <div className={classes.__info}>You are about to leave this game:</div>
      <div className={classes.__game_title}>
        <span>{title}</span>PowerdFS
      </div>
      <div className={classes.__confirmation_text}>Are you sure?</div>
      {isMobile ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={classes.__leave_game_btn}>
            <OutlineButton title="Cancel" onClick={onCancel} />
          </div>
          <div className={classes.__leave_game_btn}>
            <OutlineButton title="Leave Game" onClick={onLeave} />
          </div>
        </div>
      ) : (
        <>
          <div className={classes.__leave_game_btn}>
            <OutlineButton title="Leave Game" onClick={onLeave} />
          </div>
          <div className={classes.__cancel} onClick={onCancel}>
            Cancel
          </div>
        </>
      )}
    </div>
  );
};

export default LeaveGameModal;
