import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeShownAlert } from "../../actions/notificationActions";
import classes from "./index.module.scss";
import SuccessIcon from "../../assets/success-icon.png";
import ErrorIcon from "../../assets/error-icon.png";
import InfoIcon from "../../assets/info-icon.png";
import CloseIconWhite from "../../assets/close-white-icon.png";

const Alert = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state) => state.notifications);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alerts?.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        let a = alerts.filter((item, index) => index !== alerts.length - 1);
        dispatch(removeShownAlert(a));
      }, 5000);
    }
  }, [alerts]);

  const onClose = () => {
    setShow(false);
  };

  // const color = alert.type === "success" ? "teal" : "darkred";
  const iconUrl =
    alert.type === "success"
      ? SuccessIcon
      : alert.type === "info"
        ? InfoIcon
        : ErrorIcon;
  return show ? (
    <div className={`${classes.__wrapper} ${classes[alert.type]}`}>
      <div className={classes.content_div}>
        <img
          src={iconUrl}
          width="28px"
          height="28px"
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
        <div className={classes.message}>
          {" "}
          <b>{alert.type.toUpperCase()}.</b> {alert.message || ""}
        </div>
      </div>
      {/* <Icon
        icon={closeIcon}
        color={color}
        size="24px"
        onClick={onClose}
        style={{ cursor: "pointer" }}
      /> */}
      <img
        src={CloseIconWhite}
        width="20px"
        height="20px"
        style={{ cursor: "pointer" }}
        onClick={onClose}
        alt=""
      />
    </div>
  ) : null;
};

export default Alert;
