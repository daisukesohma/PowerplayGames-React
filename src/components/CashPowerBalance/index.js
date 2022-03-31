import React from "react";
import PropTypes from "prop-types";

import classes from "./cashPowerBalance.module.scss";
import PointsCollectedIcon from "../../assets/points-collected.png";
import PowerBalanceIcon from "../../assets/power_balance_icon.png";
import { setNumberComma } from "../../utility/shared";
import PowerCurrency from '../../assets/power-blue.png';
import BtcCurrency from '../../assets/btc-blue.png';
import EthCurrency from '../../assets/ethereum-blue.png';

const CashPowerBalance = (props) => {
  const {
    cashBalance = 0,
    powerBalance = 0,
    entryFee = 0,
    currency = '',
    showIcons = true,
    cashTitle = "",
    powerTitle = "",
    entryTitle = "",
    centered = false,
    styles = {},
    onDepositClick = () => { },
  } = props || {};

  const getCurrency = (currency) => {
    if (currency.toUpperCase() === 'PWRS') {
      return PowerCurrency;
    } else if (currency.toUpperCase() === 'USD') {
      return BtcCurrency;
    } else if (currency.toUpperCase() === 'ETH') {
      return EthCurrency;
    }
  }


  return (
    <div className={classes.__sidebar_cash_power_balance} style={styles}>
      <div>
        <div className={classes.__entry_fee_currency}>
          {currency === 'USD' ? (
            <p className={classes.__entry_fee_USD}>
              {`$`}
            </p>
          ) : (
            <img
              style={{ marginRight: 4 }}
              src={getCurrency(currency)}
              width="18"
              height="18"
              alt=""
            />
          )}
          <p className={classes.__entry_fee_amount}>{(props?.entryFee == undefined || props?.entryFee == "") ? 0 : entryFee}</p>
        </div>

        <div className={classes.__entry_fee_title}>
          {entryTitle}
        </div>
      </div>
      <div className={classes.__sidebar_cash_power_balance_wrapper}>
        <div className={classes.__sidebar_cash_balance_wrapper}>
          {showIcons && (
            <img src={PointsCollectedIcon} width="40" height="30" alt="" />
          )}
          <div
            className={`${classes.__sidebar_text_wrapper} ${centered && classes.__centered
              }`}
          >
            <div className={classes.__sidebar_cash_and_deposit_wrapper}>
              <div>
                <h1 className={classes.__sidebar_cash}>
                  ${setNumberComma(cashBalance)}
                </h1>
              </div>
            </div>
            <span className={classes.__sidebar_cash_balance_title}>
              {cashTitle || "Cash Balance"}
            </span>
          </div>
        </div>
      </div>
      <div className={classes.__sidebar_cash_power_balance_wrapper}>
        <div className={classes.__sidebar_cash_balance_wrapper}>
          {showIcons && <img src={PowerBalanceIcon} width="40" height="40" alt="" />}
          <div
            className={`${classes.__sidebar_text_wrapper} ${centered && classes.__centered
              }`}
          >
            <h1 className={classes.__sidebar_cash}>
              ${powerBalance && setNumberComma(powerBalance)}
            </h1>
            <span className={classes.__sidebar_cash_balance_title}>
              {powerTitle || "Power Balance"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

CashPowerBalance.propTypes = {
  cashBalance: PropTypes.number,
  powerBalance: PropTypes.number,
  showIcons: PropTypes.bool,
  styles: PropTypes.any,
  cashTitle: PropTypes.string,
  powerTitle: PropTypes.string,
  centered: PropTypes.bool,
};

export default CashPowerBalance;
