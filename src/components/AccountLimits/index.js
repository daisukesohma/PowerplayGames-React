import React, { useState, useEffect } from "react";
import classes from "./index.module.scss";
import { setAccountLimit } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import CloseIconGrey from "../../assets/close-icon-grey.png";
import InfoIconOrange from "../../assets/icons/info-icon.png";

const CURRENCIES = [
  'USD',
  'BTC',
  'ETH',
]

const AccountLimits = (props) => {
  const { isMobile = false } = props || {};
  const dispatch = useDispatch();
  let { accountLimit = {} } = props || {};
  const [DailyAmountAlert, setDailyAmountAlert] = React.useState(0);
  const [WeeklyAmountAlert, setWeeklyAmountAlert] = React.useState(0);
  const [MonthlyAmountAlert, setMonthlyAmountAlert] = React.useState(0);
  const [DailyAmountLimit, setDailyAmountLimit] = React.useState(0);
  const [WeeklyAmountLimit, setWeeklyAmountLimit] = React.useState(0);
  const [MonthlyAmountLimit, setMonthlyAmountLimit] = React.useState(0);
  const [EntryFeeLimit, setEntryFeeLimit] = React.useState(0);
  const [CurrentCurrency, setCurrentCurrency] = React.useState(0);
  
  useEffect(()=> {
    handleLimitChanges("");
  },[])

  useEffect(()=> {
    handleLimitChanges("");
  },[accountLimit])

  let handleLimitChanges = (e) => {
    if (e == '') {
      var CurrentVal = 'USD';
    } else {
      var CurrentVal = e.target.value;
    }

    setCurrentCurrency(CurrentVal);

    if(CurrentVal !== "" && CurrentVal != undefined) {
      var emptyVal = 0;
      accountLimit.length > 0 && accountLimit.forEach(element => {
         
        if(CurrentVal === element.currency) {
          emptyVal++;
          setDailyAmountAlert(element.dailyAlert);
          setWeeklyAmountAlert(element.weeklyAlert);
          setMonthlyAmountAlert(element.monthlyAlert);
          
          setDailyAmountLimit(element.dailyLimit);
          setWeeklyAmountLimit(element.weeklyLimit);
          setMonthlyAmountLimit(element.monthlyLimit);

          setEntryFeeLimit(element.entryFeeLimit);
        }
      });
    }
    if(emptyVal==0)
    {
      setDailyAmountAlert(0);
      setWeeklyAmountAlert(0);
      setMonthlyAmountAlert(0);
      
      setDailyAmountLimit(0);
      setWeeklyAmountLimit(0);
      setMonthlyAmountLimit(0);

      setEntryFeeLimit(0);
    }
  };

  let handleApplyLimitChanges = async () => {
    let data = {
      currency: CurrentCurrency,
      dailyAlert: DailyAmountAlert,
      dailyLimit: DailyAmountLimit,
      monthlyAlert: MonthlyAmountAlert,
      monthlyLimit: MonthlyAmountLimit,
      weeklyAlert: WeeklyAmountAlert,
      weeklyLimit: WeeklyAmountLimit,
      entryFeeLimit: EntryFeeLimit
    };
    var responseData = await dispatch(setAccountLimit(data));
    props.SetAccountList(responseData.data);
  };

  const renderLimitsAndAlerts = (
    key,
    info,
    alertFieldLabel,
    limitFieldLabel,
    fieldType,
    alert,
    limit,
    SetAlertValue,
    SetLimitValue
  ) => {
    return (
      <>
        <div className={classes.__deposit_limits_and_alerts_content} key={key}>
          {isMobile ? null : <div className={classes.__info}>{info}</div>}
          <div className={classes.__input_field}>
            <div>
              <div>{alertFieldLabel}</div>
              <input
                defaultValue={accountLimit?.[`${fieldType}Alert`]}
                name={`${fieldType}Alert`}
                type="text"
                className={classes.__input}
                placeholder="No Limit"
                // onChange={handleLimitChanges}
                onChange={(e) => SetAlertValue(e.target.value) }
                value={ alert == 0 ? '-' : alert }
              />

              {alert < 0 &&
                  <p style={{color:"red"}}>Minimum of 1 .</p>
              }
            </div>
          </div>
          <div className={classes.__input_field}>
            <div className="">
              <div>{limitFieldLabel}</div>
              <input
                defaultValue={accountLimit?.[`${fieldType}Limit`]}
                name={`${fieldType}Limit`}
                type="text"
                className={classes.__input}
                placeholder="No Limit"
                onChange={ (e) => SetLimitValue(e.target.value) }
                value={limit == 0 ? '-' : limit}
              />
              {limit < 0 &&
                  <p style={{color:"red"}}>Minimum of 1 .</p>
              }
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderMobileInputs = (key, fieldLabel, fieldType) => {
    return (
      <div className={classes.__input_field} key={key}>
        <div>
          <div>{fieldLabel}</div>
          <input
            defaultValue={accountLimit?.[`${fieldType}`]}
            name={`${fieldType}`}
            type="number"
            className={`${classes.__input} w-100`}
            placeholder="No Limit"
            onChange={handleLimitChanges}
          />
        </div>
      </div>
    );
  };

  let [infoType, setInfoType] = useState("DepostAlert");
  const [showInfoModal, setInfoModal] = useState(false);
  const infoModal = () => {
    let info = [];
    if (infoType === "DepositAlert") {
      info = [
        <span>Deposit Alerts</span>,
        <br />,
        "Deposit Alerts will trigger an email if the set threshold is exceeded. Alerts will not restrict future deposits that exceed the threshold.",
        <br />,
        <br />,
        "Limitations will take effect at 12:01 AM on the following day.",
      ];
    } else if (infoType === "DepositLimit") {
      info = [
        <span>Deposit Limits</span>,
        <br />,
        "Deposit Limits will restrict the amount available for deposit over a given time period. Once a limit has been set, it cannot be changed for 90 calendar days.",
        <br />,
        <br />,
        "Limitations will take effect at 12:01 AM on the following day.",
      ];
    } else if (infoType === "EntryFeeLimit") {
      info = [
        <span>Entry Fee Limit</span>,
        <br />,
        "Setting an entry fee limit prevents you from joining a contest that has an entry fee exceeding the limit you establish. Once you have set an limit you will be restricted from increasing your limit for 90 calendar days.",
        <br />,
      ];
    }

    return (
      <>
        {showInfoModal && (
          <div className={classes.wrapper}>
            <div className={classes.__info_modal}>
              <div className={classes.__close_icon}>
                <img
                  src={CloseIconGrey}
                  width="20px"
                  height="20px"
                  onClick={() => setInfoModal(false)}
                  alt=""
                />
              </div>
              <br />
              <div className={classes.__info}>{info}</div>
              <br />
              <br />
              <div className={classes.__apply_btn_div}>
                <button onClick={() => setInfoModal(false)}>Got it!</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className={classes.__account_limits}>
        {isMobile ? null : (
          <>
            <div className={classes.__main_description}>
              <p>
                Setting a personal user limit is a tool that can assist in
                managing your play in a healthy and responsible way. You can
                change your limits at any time but there'll be a 90 day
                restriction before you can increase your limit afterwards.
              </p>
              <p>
                Below you have the option to limit yourself in a variety of ways
                to make sure that you are spending your time on PowerPlay
                appropriately.
              </p>
            </div>

            <div className={classes.__currency__main}>
               {CURRENCIES.map((item, index) => {
                return (
                  <input type="button" onClick={handleLimitChanges} name={item} className={`${classes.__currency__button} ${" btn mx-2"} ${item === CurrentCurrency && classes.__currency__button__active}`} value={item} />
                )
              })}
            </div>

            <div className={classes.__main_title}>
             {CurrentCurrency} Deposit Limits and Alerts{" "}
              {isMobile ? (
                <img
                  style={{ alignSelf: "center" }}
                  src={InfoIconOrange}
                  width="20px"
                  height="20px"
                  onClick={() => {
                    setInfoModal(true);
                    setInfoType("DepositAlert");
                  }}
                  alt=""
                />
              ) : null}
            </div>
            {renderLimitsAndAlerts(
              1,
              [
                <span>Deposit alerts</span>,
                " will trigger an email if the set threshold is exceeded. Alerts will not restrict future deposits that exceed the threshold.",
              ],
              "Set Daily Alert",
              "Set Daily Limit",
              "daily",
              DailyAmountAlert,
              DailyAmountLimit,
              setDailyAmountAlert,
              setDailyAmountLimit
            )}
            {renderLimitsAndAlerts(
              2,
              [
                <span>Deposit limits</span>,
                " will restrict the amount available for deposit over a given time period. Once a limit has been set, it cannot be changed for 90 calendar days.",
              ],
              "Set Weekly Alert",
              "Set Weekly Limit",
              "weekly",
              WeeklyAmountAlert,
              WeeklyAmountLimit,
              setWeeklyAmountAlert,
              setWeeklyAmountLimit
            )}
            {renderLimitsAndAlerts(
              3,
              "Limitations will take effect at 12:01 AM on the following day.",
              "Set Monthly Alert",
              "Set Monthly Limit",
              "monthly",
              MonthlyAmountAlert,
              MonthlyAmountLimit,
              setMonthlyAmountAlert,
              setMonthlyAmountLimit
            )}
          </>
        )}
        {isMobile ? (
          
          <div className="container-fluid">
            <div className={classes.__currency__main}>
               {CURRENCIES.map((item, index) => {
                return (
                  <input type="button" onClick={handleLimitChanges} name={item} className={`${classes.__currency__button} ${" btn mx-2"} ${item === CurrentCurrency && classes.__currency__button__active}`} value={item} />
                )
              })}
            </div>
            <div className={classes.__main_title}>
              Deposit Alerts{" "}
              <img
                style={{ alignSelf: "center" }}
                src={InfoIconOrange}
                width="20px"
                height="20px"
                onClick={() => {
                  setInfoModal(true);
                  setInfoType("DepositAlert");
                }}
                alt=""
              />
            </div>

            <div className={`${classes.__input_field_div} row`}>
              <div className="col my-1">
                {renderMobileInputs(1, "Set Daily Alert", "dailyAlert")}
              </div>
              <div className="col my-1">
                {renderMobileInputs(1, "Set Weekly Alert", "weeklyAlert")}
              </div>
              <div className="col-auto my-1">
                {renderMobileInputs(1, "Set Monthly Alert", "monthlyAlert")}
              </div>
            </div>

            <div className={classes.__main_title}>
              Deposit Limits{" "}
              <img
                style={{ alignSelf: "center" }}
                src={InfoIconOrange}
                width="20px"
                height="20px"
                onClick={() => {
                  setInfoModal(true);
                  setInfoType("DepositLimit");
                }}
                alt=""
              />
            </div>

            <div className={`${classes.__input_field_div} row`}>
              <div className="col my-1">
                {renderMobileInputs(1, "Set Daily Limit", "dailyLimit")}
              </div>
              <div className="col my-1">
                {renderMobileInputs(1, "Set Weekly Limit", "weeklyLimit")}
              </div>
              <div className="col-auto my-1">
                {renderMobileInputs(1, "Set Monthly Limit", "monthlyLimit")}
              </div>
            </div>
            <br />
          </div>
        ) : null}
        <div className={classes.__apply_btn_div}>
          <button onClick={handleApplyLimitChanges}
                 disabled={DailyAmountAlert < 0  || WeeklyAmountAlert < 0 ||  MonthlyAmountAlert < 0 || MonthlyAmountLimit < 0 || WeeklyAmountLimit < 0 || DailyAmountLimit < 0 ? true : false}     
          >Apply</button>
        </div>
        <div className={`${classes.__main_title} container-fluid`}>
        {CurrentCurrency} Entry Fee Limit{" "}
          {isMobile ? (
            <img
              style={{ alignSelf: "center" }}
              src={InfoIconOrange}
              width="20px"
              height="20px"
              onClick={() => {
                setInfoModal(true);
                setInfoType("EntryFeeLimit");
              }}
              alt=""
            />
          ) : null}
        </div>
        <div className={`${classes.__entry_fee_limit}`}>
          {isMobile ? null : (
            <div className={classes.__info}>
              Setting an entry fee limit prevents you from joining a contest
              that has an entry fee exceeding the limit you establish. Once you
              have set an limit you will be restricted from increasing your
              limit for 90 calendar days.
            </div>
          )}
          <div className={`${classes.__input_field} container-fluid`}>
            <div>
              <div>Entry Fee Limit </div>
              <input
                defaultValue={accountLimit?.entryFeeLimit}
                name="entryFeeLimit"
                type="text"
                className={`${classes.__input} w-100`}
                placeholder="No Limit"
                onChange={ (e) => setEntryFeeLimit(e.target.value) }
                value={EntryFeeLimit == 0 ? '-' : EntryFeeLimit }
              />
              {EntryFeeLimit < 0 &&
                <p style={{color:"red"}}>Minimum of 1 .</p>
              }
            </div>
          </div>
        </div>
        <div className={classes.__apply_btn_div}>
          <button onClick={handleApplyLimitChanges}
             disabled = {EntryFeeLimit < 0 ? true : false}
          >Apply</button>
        </div>
        {isMobile ? (
          <div className={classes.__main_description}>
            <p>
              Setting a personal user limit is a tool that can assist in
              managing your play in a healthy and responsible way. You can
              change your limits at any time but there'll be a 90 day
              restriction before you can increase your limit afterwards.
            </p>
            <p>
              Below you have the option to limit yourself in a variety of ways
              to make sure that you are spending your time on PowerPlay
              appropriately.
            </p>
          </div>
        ) : null}
      </div>
      {showInfoModal && infoModal()}
    </>
  );
};

export default AccountLimits;
