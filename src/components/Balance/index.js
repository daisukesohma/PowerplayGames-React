import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./index.module.scss";
import { CONSTANTS } from "../../utility/constants";
import { getLocalStorage, setLocalStorage } from "../../utility/shared";
import PowerBalanceGrey from "../../assets/power-balance-grey.png";
import CashBalanceGrey from "../../assets/cash-balance-grey.png";
import BitcoinGrey from "../../assets/bitcoin-grey.png";
import EthereumGrey from "../../assets/ethereum-grey.png";
import { redirectTo } from "../../utility/shared";

const CURRENCY_DATA = [
  {
    label: "Cash Balance",
    value: "cash",
  },
  {
    label: "Bitcoin Balance",
    value: "bitcoin",
  },
  {
    label: "Ethereum Balance",
    value: "ethereum",
  },
];

const Balance = (props) => {
  const {
    isMobile = false,
    entries = "",
    totalEntries = "",
    livePage = false,
    style = {},
    selectedTeam = {},
    depositClicked=()=>{},
  } = props || {};
  const { auth: { user: { userBalance = {} } } = {} } = useSelector(
    (state) => state
  );
  const currencyMenuRef = useRef(null);
  const history = useHistory();
  const [currencyMenu, setCurrencyMenu] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState([
    "cash",
    "bitcoin",
    "ethereum",
  ]);

  useEffect(() => {
    const displayBalance = JSON.parse(
      getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.DISPLAY_BALANCE)
    );
    if (displayBalance) {
      setDisplayCurrency(displayBalance);
    }
  }, []);

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (
      currencyMenuRef.current &&
      !currencyMenuRef.current.contains(e.target)
    ) {
      setCurrencyMenu(false);
    }
  };

  function duration(t0, t1){
    let d = (t1) - (t0);
    let weekdays     = Math.floor(d/1000/60/60/24/7);
    let days         = Math.floor(d/1000/60/60/24 - weekdays*7);
    let hours        = Math.floor(d/1000/60/60    - weekdays*7*24            - days*24);
    let minutes      = Math.floor(d/1000/60       - weekdays*7*24*60         - days*24*60         - hours*60);
    let seconds      = Math.floor(d/1000          - weekdays*7*24*60*60      - days*24*60*60      - hours*60*60      - minutes*60);
    let milliseconds = Math.floor(d               - weekdays*7*24*60*60*1000 - days*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000 - seconds*1000);
    let t = {};
    ['weekdays', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach(q=>{ if (eval(q)>0) { t[q] = eval(q); } });
    return t;
  }
  const getDateStringValue = () => {
    let  date1 = new Date(selectedTeam?.startDate + " " + selectedTeam?.startTime);
    let  date3 = new Date(selectedTeam?.endDate + " 00:00:00");
    
    let timeOffsetInMS = date1.getTimezoneOffset() * 60000;
    date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset())
    let  date2 = new Date();
    if(date1 < date2 && date2 < date3)
    {
      return {
        "status": 1,
        "message": "Live Game in Progress"
      }
    }
    let diffInSeconds = Math.abs(date1 - date2) / 1000;
    let days = Math.floor(diffInSeconds / 60 / 60 / 24);
    let hours = Math.floor(diffInSeconds / 60 / 60 % 24);
    let minutes = Math.floor(diffInSeconds / 60 % 60);
    let seconds = Math.floor(diffInSeconds % 60);
    let milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
    let txt = (days?(days + "d "):"")+(hours?(hours + "h "):"") + minutes + "min";
    return {
      "status": 0,
      "message": txt
    }
  }

  return (
    <>
      {isMobile ? (
        <div>
          <div className={classes.__balance}>
            {(entries || totalEntries) && (
              <div className={classes.__entries}>
                Entries {entries} <span> / {totalEntries}</span>
              </div>
            )}
            <div
              className={`${classes.__balance_cash_and_balance_outer} ${
                displayCurrency.length > 0 && classes.__border_right
              }`}
            >
              <div className={classes.__balance_cash_and_balance_icon}>
                <img src={PowerBalanceGrey} alt="" />
              </div>
              <div className={classes.__balance_cash_and_balance_inner}>
                <div className={classes.__balance_power_and_cash_balance}>
                  {userBalance.tokenBalance ||
                    getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE)}
                </div>
                <div className={classes.__balance_power_and_cash_balance_title}>
                  Powers
                </div>
              </div>
            </div>
            {displayCurrency.includes("cash") && (
              <div
                className={`${classes.__balance_cash_and_balance_outer} ${
                  (displayCurrency.includes("bitcoin") ||
                    displayCurrency.includes("ethereum")) &&
                  classes.__border_right
                }`}
              >
                <div className={classes.__balance_cash_and_balance_icon}>
                  <img src={CashBalanceGrey} />
                </div>
                <div className={classes.__balance_cash_and_balance_inner}>
                  <div className={classes.__balance_power_and_cash_balance}>
                    $
                    {userBalance.cashBalance?.toFixed(2) ||
                      parseFloat(
                        getLocalStorage(
                          CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE
                        )
                      ).toFixed(2)}
                  </div>
                  <div
                    className={classes.__balance_power_and_cash_balance_title}
                  >
                    USD
                  </div>
                </div>
              </div>
            )}
            <div
              className={classes.__balance_deposit}
              onClick={() => depositClicked()}
            >
              Deposit
            </div>
          </div>
          <div className={classes.__balance}>
            {displayCurrency.includes("bitcoin") && (
              <div
                className={`${classes.__balance_cash_and_balance_outer} ${
                  (displayCurrency.includes("cash") ||
                    displayCurrency.includes("ethereum")) &&
                  classes.__border_right
                }`}
              >
                <div className={classes.__balance_cash_and_balance_icon}>
                  <img src={BitcoinGrey} />
                </div>
                <div className={classes.__balance_cash_and_balance_inner}>
                  <div className={classes.__balance_power_and_cash_balance}>
                    {userBalance.btcBalance ||
                      parseFloat(
                        getLocalStorage(
                          CONSTANTS.LOCAL_STORAGE_KEYS.BTC_BALANCE
                        )
                      ).toFixed(4)}
                  </div>
                  <div
                    className={classes.__balance_power_and_cash_balance_title}
                  >
                    BTC
                  </div>
                </div>
              </div>
            )}
            {displayCurrency.includes("ethereum") && (
              <div className={classes.__balance_cash_and_balance_outer}>
                <div className={classes.__balance_cash_and_balance_icon}>
                  <img src={EthereumGrey} />
                </div>
                <div className={classes.__balance_cash_and_balance_inner}>
                  <div className={classes.__balance_power_and_cash_balance}>
                    {userBalance.ethBalance ||
                      parseFloat(
                        getLocalStorage(
                          CONSTANTS.LOCAL_STORAGE_KEYS.ETH_BALANCE
                        )
                      ).toFixed(4)}
                  </div>
                  <div
                    className={classes.__balance_power_and_cash_balance_title}
                  >
                    ETH
                  </div>
                </div>
              </div>
            )}
            <div
              className={classes.__balance_deposit1}
              onClick={() => depositClicked()}
            >
              Deposit
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.__balance} style={style}>
          {(entries || totalEntries) && (
            <div className={classes.__left_div}>
              <div className={classes.__entries}>
                Entries {entries} <span> / {totalEntries}</span>
              </div>
              {livePage ? (
                <div className={classes.__time_to_live}>
                  <div>
                    {getDateStringValue().status == 0 && 
                      <>
                        <p className={classes.__text}>Live Game Starts in</p>
                        <p className={classes.__time}>{getDateStringValue().message}</p>
                      </>
                    }
                    {getDateStringValue().status == 1 && 
                      <div style={{
                        color: "#3f9946",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <div style={{
                          width: 10,
                          height: 10,
                          borderRadius: 100,
                          backgroundColor: "#3f9946",
                          marginRight: 7
                        }}></div>
                        <div>{getDateStringValue().message}</div>
                      </div>
                    }
                  </div>
                </div>
              ) : null}
            </div>
          )}
          <div
            className={classes.__balance_deposit}
            onClick={() => {
              depositClicked();
            }}
          >
            Deposit
          </div>
          <div
            className={`${classes.__balance_cash_and_balance_outer} ${
              displayCurrency.length > 0 && classes.__border_right
            }`}
          >
            <div className={classes.__balance_cash_and_balance_icon}>
              <img src={PowerBalanceGrey} />
            </div>
            <div className={classes.__balance_cash_and_balance_inner}>
              <div className={classes.__balance_power_and_cash_balance}>
                {userBalance.tokenBalance ||
                  getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE)}
              </div>
              <div className={classes.__balance_power_and_cash_balance_title}>
                Power Balance
              </div>
            </div>
          </div>
          {displayCurrency.includes("cash") && (
            <div
              className={`${classes.__balance_cash_and_balance_outer} ${
                (displayCurrency.includes("bitcoin") ||
                  displayCurrency.includes("ethereum")) &&
                classes.__border_right
              }`}
            >
              <div className={classes.__balance_cash_and_balance_icon}>
                <img src={CashBalanceGrey} />
              </div>
              <div className={classes.__balance_cash_and_balance_inner}>
                <div className={classes.__balance_power_and_cash_balance}>
                  $
                  {userBalance.cashBalance?.toFixed(2) ||
                    parseFloat(
                      getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE)
                    ).toFixed(2)}
                </div>
                <div className={classes.__balance_power_and_cash_balance_title}>
                  Cash Balance
                </div>
              </div>
            </div>
          )}
          {displayCurrency.includes("bitcoin") && (
            <div
              className={`${classes.__balance_cash_and_balance_outer} ${
                (displayCurrency.includes("cash") ||
                  displayCurrency.includes("ethereum")) &&
                classes.__border_right
              }`}
            >
              <div className={classes.__balance_cash_and_balance_icon}>
                <img src={BitcoinGrey} />
              </div>
              <div className={classes.__balance_cash_and_balance_inner}>
                <div className={classes.__balance_power_and_cash_balance}>
                  {userBalance.btcBalance ||
                    parseFloat(
                      getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.BTC_BALANCE)
                    ).toFixed(4)}
                </div>
                <div className={classes.__balance_power_and_cash_balance_title}>
                  Bitcoin
                </div>
              </div>
            </div>
          )}
          {displayCurrency.includes("ethereum") && (
            <div className={classes.__balance_cash_and_balance_outer}>
              <div className={classes.__balance_cash_and_balance_icon}>
                <img src={EthereumGrey} />
              </div>
              <div className={classes.__balance_cash_and_balance_inner}>
                <div className={classes.__balance_power_and_cash_balance}>
                  {userBalance.ethBalance ||
                    parseFloat(
                      getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.ETH_BALANCE)
                    ).toFixed(4)}
                </div>
                <div className={classes.__balance_power_and_cash_balance_title}>
                  Ethereum
                </div>
              </div>
            </div>
          )}
          {currencyMenu && (
            <div className={classes.__currency_menu} ref={currencyMenuRef}>
              <div>Display:</div>
              {CURRENCY_DATA.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${classes.__currency_menu_item} 
                                    ${
                                      displayCurrency.includes(item.value) &&
                                      classes.__currency_menu_selected
                                    }`}
                    onClick={() => {
                      const newDisplayCurreny = [...displayCurrency];
                      // Check if currency exist in array
                      const i = newDisplayCurreny.indexOf(item.value);
                      if (i > -1) {
                        newDisplayCurreny.splice(i, 1);
                      } else {
                        newDisplayCurreny.push(item.value);
                      }
                      setDisplayCurrency(newDisplayCurreny);
                      setLocalStorage(
                        CONSTANTS.LOCAL_STORAGE_KEYS.DISPLAY_BALANCE,
                        JSON.stringify(newDisplayCurreny)
                      );
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          )}
          <div className={classes.__three_dots_div}>
            <button
              className={classes.__three_dots}
              onClick={() => setCurrencyMenu(!currencyMenu)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Balance;
