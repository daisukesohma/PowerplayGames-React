import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ResultCard from "./ResultCard";

function Accordian(props) {
  let [sub, setSub] = useState(0);
  const {
    title = "",
    visible = false,
    cash = "",
    cashTitle = "",
    Icon = "",
    isSvg = false,
    onClick = () => { },
    isMobile = false,
    transactions = [],
    iconWithTitle = "",
  } = props || {};

  useEffect(() => {
    let sum = 0;
    transactions.forEach((element) => {
      sum = sum + element.winning_amount;
    });
    setSub(cash - sum);
  }, [transactions]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.accoridan_bar} onClick={onClick}>
        <span className={classes.accoridan_bar_icon_with_title_span}>
          {iconWithTitle && (
            <span className={classes.accoridan_bar_icon}>
              <img src={iconWithTitle}  height="20" alt="" />
            </span>
          )}
        </span>
        <span className={classes.__accordian_cash_title}>
          {title}
          {isMobile ? (
            <>
              <br />
              <span>
                <span>{cashTitle}</span>
                <span className={classes.amount}>{cash - sub}</span>
              </span>
            </>
          ) : null}
        </span>
        <span className={classes.accoridan_bar_right}>
          {isMobile ? null : (
            <span>
              <span>{cashTitle}</span>
              <span className={classes.amount}>{cash - sub}</span>
            </span>
          )}
          {Icon && isSvg ? <Icon /> : Icon && <img src={Icon} alt="" />}
          <i
            className={`${classes.arrow} ${visible ? classes.up : classes.down
              }`}
          />
        </span>
      </div>

      {visible && (
        <ResultCard isMobile={isMobile} transactions={transactions} getLiveStandings={props.getLiveStandings} getNHLLiveStandings={props.getNHLLiveStandings}/>
      )}
    </div>
  );
}

Accordian.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  cash: PropTypes.any,
  cashTitle: PropTypes.string,
  Icon: PropTypes.any,
  isSvg: PropTypes.bool,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
  getLiveStandings: PropTypes.func
};

export default Accordian;
