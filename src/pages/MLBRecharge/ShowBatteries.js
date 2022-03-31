import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import Battery5x from "../../icons/Batteries/Battery5x";
import Battery4_5x from "../../icons/Batteries/Battery4_5x";
import Battery4x from "../../icons/Batteries/Battery4x";
import Battery3_5x from "../../icons/Batteries/Battery3_5x";
import Battery3x from "../../icons/Batteries/Battery3x";
import Battery2_5x from "../../icons/Batteries/Battery2_5x";
import Battery2x from "../../icons/Batteries/Battery2x";
import Battery1_5x from "../../icons/Batteries/Battery1_5x";
import FlashIcon from "../../icons/FlashIcon";
import BatteryG5x from "../../icons/BatteriesGreen/5x";
import BatteryG4_5x from "../../icons/BatteriesGreen/4.5x";
import BatteryG4x from "../../icons/BatteriesGreen/4x";
import BatteryG3_5x from "../../icons/BatteriesGreen/3.5x";
import BatteryG3x from "../../icons/BatteriesGreen/3x";
import BatteryG2_5x from "../../icons/BatteriesGreen/2.5x";
import BatteryG2x from "../../icons/BatteriesGreen/2x";
import BatteryG1_5x from "../../icons/BatteriesGreen/1.5x";

function ShowBatteries(props) {
  const RenderBetterFlash = ({ CellIcon }) => (
    <div className={classes.batteryWrapper}>
      <CellIcon />
      <div className={classes.flash}>
        <FlashIcon />
      </div>
    </div>
  );

  const RenderCells = () => {
    switch (props?.value) {
      case "5" || 5:
        return (
          <div className={classes.batteryWrapper}>
            <Battery5x />
          </div>
        );

      case "4.5" || 4.5:
        return <RenderBetterFlash CellIcon={Battery4_5x} />;

      case "4" || 4:
        return <RenderBetterFlash CellIcon={Battery4x} />;

      case "3.5" || 3.5:
        return <RenderBetterFlash CellIcon={Battery3_5x} />;

      case "3" || 3:
        return <RenderBetterFlash CellIcon={Battery3x} />;

      case "2.5" || 2.5:
        return <RenderBetterFlash CellIcon={Battery2_5x} />;

      case "2" || 2:
        return <RenderBetterFlash CellIcon={Battery2x} />;

      case "1.5" || 1.5:
        return <RenderBetterFlash CellIcon={Battery1_5x} />;

      default:
        return <RenderBetterFlash CellIcon={Battery4_5x} />;
    }
  };

  const RenderGCells = () => {
    switch (props?.value) {
      case "5" || 5:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG5x />
          </div>
        );

      case "4.5" || 4.5:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG4_5x />
          </div>
        );

      case "4" || 4:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG4x />
          </div>
        );

      case "3.5" || 3.5:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG3_5x />
          </div>
        );

      case "3" || 3:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG3x />
          </div>
        );

      case "2.5" || 2.5:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG2_5x />
          </div>
        );

      case "2" || 2:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG2x />
          </div>
        );

      case "1.5" || 1.5:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG1_5x />
          </div>
        );

      default:
        return (
          <div className={classes.batteryWrapper}>
            <BatteryG5x />
          </div>
        );
    }
  };

  return props?.greenOnly ? <RenderGCells /> : <RenderCells />;
}

ShowBatteries.propTypes = {
  value: PropTypes.string,
  greenOnly: PropTypes.bool,
};

export default ShowBatteries;
