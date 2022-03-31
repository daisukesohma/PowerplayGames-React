import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./index.module.scss";
import Button from "../Button";
import Ticket from "../../icons/Ticket";
import CashBalance from "../../assets/points-collected.png";
import Token from "../../assets/token.png";
import Bitcoin from "../../assets/bitcoin.png";
import Ethereum from "../../assets/ethereum-grey.svg";
import Money from "../../icons/Money";
import ListItem from "./ListItem";
import Modal from "../Modal";
import Input from "../Input";
import Checkbox from "../Checkbox";
import Select from "../Select";
import { getCountries, getStates, getProvinces, getLocalStorage } from "../../utility/shared";
import tick from '../../assets/tick.png'

import {
  getDays,
  getMonths,
  getMonthDays,
  getYearsList,
  printLog,
} from "../../utility/shared";
import {
  getPersonaUserId,
} from "../../actions/personaActions";
import { CONSTANTS } from "../../utility/constants";
import DepositAmountPopUp from "../DepositAmountPopUp/DepositAmountPopUp";
import { requestBalanceWithdraw } from "../../actions/userActions";

const ListTitle = (Icon, isSvg, title) => {
  let width = 34,
    height = 34;

  if (title === "My Cash Balance") {
    width = 35;
    height = 26;
  } else if (title === "Power Token Balance") {
    width = 34;
    height = 34;
  } else if (title === "BTC Balance") {
    width = 26;
    height = 26;
  } else if (title === "ETH Balance") {
    width = 23;
    height = 36;
  }

  return (
    <>
      <span className={classes.list_left_side_2}>
        {Icon && isSvg ? (
          <Icon />
        ) : (
          Icon && !isSvg && <img src={Icon} width={width} height={height} alt="" />
        )}
      </span>
      <span className={classes.list_left_side_1}>{title}</span>
    </>
  );
};

const ListHeader = (
  title,
  balance,
  firstBtnTitle,
  firstBtnOnClick,
  btnTitle,
  onClick,
  Icon,
  isSvg,
  balanceType,
  minAmount
) => {
  return (
    <div className={`${classes.list_container} mx-0`}>
      <div className={`${classes.list_left_side} d-flex align-items-center justify-content-between`}>
        {ListTitle(Icon, isSvg, title)}
        <span className={classes.span}>
          {balanceType == "cash" ? "$" : ""}
          {balance}
        </span>
      </div>
      
      <div className={classes.list_right_side}> 
      {title.toLowerCase() !== "power token balance" &&
          <><div className={`d-flex align-items-center justify-content-around w-100`}>
            <Button title={firstBtnTitle} onClick={firstBtnOnClick} className="mx-1 h-100" />
            <Button
              className="mx-1 h-100"
              title={btnTitle}
              onClick={balance != 0 &&onClick}
              styles={{ opacity: balance == 0 ? 0.5 : 1.0 }}
            />
          </div>
          <div className={`${classes.list_right_side_text} w-100 my-2`}>
            <span>{minAmount}</span>
          </div></>
        }
      </div>
      
    </div >
  );
};

function BalanceInfoComponent(props) {
  const [form, setForm] = useState({
    balance_amount:'',
    send_to: '',
    addr1: '',
    addr2: '',
    country: '',
    region: '',
    postCode: '',
    fname: '',
    lname: '',
    day: "select",
    month: "select",
    year: "select",
  });
  const [isTerms, setIsTerms] = useState(false);
  const refTerms = React.createRef();
  const dispatch = useDispatch();

  const [showModal, setModalState] = useState(false);
  const [baltype, setBaltype] = useState("")
  const [activeForm, setActiveForm] = useState(0);
  const [isInvalid, setInvalid] = useState(false);
  const [minBalance, setMinBalance] = useState(null)

  const { isMobile = false } = props || {};
  const { balance = {} } = props || {};

  useEffect(() => {
    printLog(balance);
    //setActiveForm(0);
  }, []);

  useEffect(() => {
    console.log("activeForm",activeForm);
  }, [activeForm]);

  const changeInputHandler = (e) => {
    const { target: { value = "", name = "", min, max } = {} } = e || {};

    if (name === 'balance_amount') {
      if (parseInt(value) >= parseInt(min) && parseInt(value) <= parseInt(max)) {
        setForm({ ...form, [name]: value })
        setInvalid(false);
      } else {
        setForm({ ...form, [name]: value })
        setInvalid(false);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCheckBox = (e) => {
    const { target: { checked = false, name = "" } = {} } = e || {};
    setForm({ ...form, [name]: checked });
  };

  const handleCountryRegion = (e) => {
    const { name = "", value } = e || {};
    setForm({ ...form, [name]: value });
  };

  const changeModalState = (type) => {
    setForm({
      balance_amount:'',
      send_to: '',
      addr1: '',
      addr2: '',
      country: '',
      region: '',
      postCode: '',
      fname: '',
      lname: '',
      day: "select",
      month: "select",
      year: "select",
    });
    setModalState(!showModal);
    setBaltype(type)
    if(type==='casebalance')
      setMinBalance(25)
    else if(type==='btc')
      setMinBalance(0.0005)
    else if(type==='eth')
      setMinBalance(0.015)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isMobile && activeForm !== 2) {
      let _active = activeForm;
      setActiveForm(_active + 1);
      return;
    } else if (!isMobile || (isMobile && activeForm === 2)) {
      const user_id = getPersonaUserId()
      dispatch(requestBalanceWithdraw({ ...form, user_id }, changeModalState));
    }
  };

  const handleBack = () => {
    if (activeForm > 0) {
      let _active = activeForm;
      setActiveForm(_active - 1);
    }
  };

  const getStatesOrProvinces = () => {
    if (form?.country === "USA") {
      return getStates();
    } else if (form?.country === "Canada") {
      return getProvinces();
    } else {
      return [];
    }
  };

  const checkValid = () => {
    if(isMobile)
    {
      if(activeForm == 2)
      {
        if (form?.addr1 && form?.balance_amount >= minBalance && form?.country &&
          form?.day!=='select'&&form?.day && form?.fname && form?.lname &&
          form?.month!=='select' &&form?.month && form?.postCode && form?.region &&
          form?.region && form?.send_to && form?.termsAndConditions && form?.year&& form?.year!=='select') {

          return true;
        } else {
          return false;
        }
      }
      return true;
    }
    else {
      if (form?.addr1.length > 0 && form?.balance_amount >= minBalance && form?.country.length > 0 &&
        form?.day!="select" && form?.day.length > 0 && form?.fname.length > 0 && form?.lname.length > 0 &&
        form?.month!="select" && form?.month.length > 0 && form?.postCode.length > 0 && form?.region.length > 0 &&
        form?.region.length > 0 && form?.send_to.length > 0 && form?.termsAndConditions && form?.year && form?.year!="select") {
        return true;
      } else {
        return false;
      }
    }
    
  }

  return (
    <>
      {/* {props.openDepositModal && (
        <DepositAmountPopUp onClose={() => props.setOpenDepositModal(false)} />
      )} */}
      <div className={`${classes.list_header_wrapper}`}>
        {ListHeader(
          "My Cash Balance",
          balance.cashBalance?.toFixed(2),
          "Deposit",
          () => props.openDepositModal(),
          "Withdraw",
          ()=>{changeModalState("casebalance")},
          CashBalance,
          false,
          "cash",
          "Min. Amount: $25"
        )}
        {ListHeader(
          "Power Token Balance",
          balance.tokenBalance,
          "Deposit",
          () => { },
          "Transfer",
          () => { },
          Token,
          false,
          "token",
          ""
        )}
        {ListHeader(
          "BTC Balance",
          balance.btcBalance?.toFixed(4),
          "Deposit",
          () => props.openDepositModal("BTC"),
          "Withdraw",
          ()=>{changeModalState('btc') },
          Bitcoin,
          false,
          "token",
          ""
        )}
        {ListHeader(
          "ETH Balance",
          balance.ethBalance?.toFixed(4),
          "Deposit",
          () => props.openDepositModal("ETH"),
          "Withdraw",
          ()=>{changeModalState('eth') },
          Ethereum,
          false,
          "token",
          ""
        )}
      </div>
      {/* <div className={classes.list_body}>
        {ListTitle(Ticket, true, "My non-cash prizes")}
        <ListItem title="3 nights stay at Fairmont Banff Springs" />
        <ListItem title="10 free meals at Macdonald’s" claimed={false} />
        <ListItem title="3 nights stay at Fairmont Banff Springs" />
      </div> */}


      <Modal visible={showModal} iconStyle={{ display: "none" }}>
        <div className={classes.modal_container}>
          <div className={classes.modal_header}>
            <p>Withdrawal Request</p>
            <i
              className={classes.modal_close_icon}
              onClick={changeModalState}
            ></i>
          </div>

          <div className={classes.modal_body}>
            <form onSubmit={handleFormSubmit}>
              <div
                className={`${isMobile && activeForm === 0 ? "" : classes.hidden
                  }`}
              >
                <p className={`${classes.body_header} ${classes.margin_t_10}`}>
                  Withdrawal Info
                </p>
               {baltype==='casebalance'&& <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div className={classes.form_amountInput}>
                    <label>
                      Withdrawal amount <span>(min $25)</span>
                    </label>
                    <Input
                      type="number"
                      value={form?.balance_amount?form?.balance_amount:25}
                      name="balance_amount"
                      onChange={changeInputHandler}
                      icon="$"
                      white
                      bordered
                      required
                      min={25}
                      max={500}
                    />
                    {form?.balance_amount&& form?.balance_amount < 25 &&
                      <p  style={{color: "red"}}>Minimum withdrawal amount is $25.00</p>
                    }
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <label>Send funds to</label>
                    <Input
                      type="email"
                      placeholder="Enter your paypal email here"
                      value={form?.send_to}
                      name="send_to"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>
                </div>}
                {baltype==='btc'&&
                 <div
                 className={`${classes.form_control} ${classes.margin_t_10}`}
               >
                 <div className={classes.form_amountInput}>
                   <label>
                     Withdrawal amount <span>(min 0.0005)</span>
                   </label>
                   <Input
                     type="number"
                     value={form?.balance_amount?form?.balance_amount:0.0005}
                     name="balance_amount"
                     onChange={changeInputHandler}
                     icon={<img src={Bitcoin} alt=''/>}
                     white
                     bordered
                     required
                     min={0.0005}
                     max={500}
                   />
                   {form?.balance_amount &&form?.balance_amount < 0.0005 &&
                     <p  style={{color: "red"}}>Minimum withdrawal amount is 0.0005 BTC</p>
                   }
                 </div>

                 <div
                   className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                 >
                   <label>Transfer funds to</label>
                   <Input
                     type="email"
                     placeholder="Enter your wallet address here"
                     value={form?.send_to}
                     name="send_to"
                     onChange={changeInputHandler}
                     rounded
                     white
                     block
                     bordered
                     required
                   />
                 </div>
               </div>
                }
                 {baltype==='eth'&&
                 <div
                 className={`${classes.form_control} ${classes.margin_t_10}`}
               >
                 <div className={classes.form_amountInput}>
                   <label>
                     Withdrawal amount <span>(min 0.0005)</span>
                   </label>
                   <Input
                     type="number"
                     value={form?.balance_amount?form?.balance_amount:0.015}
                     name="balance_amount"
                     onChange={changeInputHandler}
                     icon={<img src={Ethereum} alt=''/>}
                     white
                     bordered
                     required
                     min={0.015}
                     max={500}
                   />
                   {form?.balance_amount &&form?.balance_amount < 0.015 &&
                     <p  style={{color: "red"}}>Minimum withdrawal amount is 0.015 ETH</p>
                   }
                 </div>

                 <div
                   className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                 >
                   <label>Transfer funds to</label>
                   <Input
                     type="email"
                     placeholder="Enter your wallet address here"
                     value={form?.send_to}
                     name="send_to"
                     onChange={changeInputHandler}
                     rounded
                     white
                     block
                     bordered
                     required
                   />
                 </div>
               </div>
                }
              </div>

              <div
                className={`${isMobile && activeForm === 1 ? "" : classes.hidden
                  }`}
              >
                <p className={`${classes.body_header} ${classes.margin_t_10}`}>
                  Billing Info
                </p>
                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div className={classes.form_Input_50}>
                    <label>Address line 1</label>
                    <Input
                      type="text"
                      placeholder="Enter address here"
                      value={form?.addr1}
                      name="addr1"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <label>Address line 2</label>
                    <Input
                      type="text"
                      placeholder="Enter address here"
                      value={form?.addr2?form?.addr2:""}
                      name="addr2"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                    />
                  </div>
                </div>

                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div>
                    <label>Country</label>
                    <select
                      id="country"
                      name="country"
                      className={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      title="Country"
                      value={form?.country}
                      onChange={(e) =>
                        handleCountryRegion({ name: "country", value: e.target.value })
                      }
                    >
                      <option hidden disabled value="">
                        Country
                      </option>
                      {getCountries().map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* <CountryDropdown
                      classes={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      value={form?.country}
                      onChange={(val) =>
                        handleCountryRegion({ name: "country", value: val })
                      }
                      required
                      name="country"
                      valueType="short"
                    /> */}
                  </div>

                  <div className={`${classes.margin_l_40}`}>
                    <label>Province/State</label>
                    <select
                      className={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      id="region"
                      name="region"
                      title="State/Province"
                      value={form?.region}
                      onChange={(e) =>
                        handleCountryRegion({ name: "region", value: e.target.value })
                      }
                    >
                      <option hidden disabled value="">
                        Province/State
                      </option>
                      {getStatesOrProvinces().map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {/* <RegionDropdown
                      classes={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      country={form?.country}
                      value={form?.region}
                      onChange={(val) =>
                        handleCountryRegion({ name: "region", value: val })
                      }
                      required
                      name="region"
                    /> */}
                  </div>

                  <div className={`${classes.margin_l_40}`}>
                    <label>Postal Code</label>
                    <Input
                      type="text"
                      placeholder="Postal Code"
                      value={form?.postCode}
                      name="postCode"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>
                </div>
              </div>

              <div
                className={isMobile && activeForm === 2 ? "" : classes.hidden}
              >
                <p
                  className={`${classes.body_header} ${classes.margin_t_10} ${classes.body_header_primary}`}
                >
                  Personal Info
                </p>
                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div className={classes.form_Input_50}>
                    <label>First Name</label>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={form?.fname}
                      name="fname"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <label>Last Name</label>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={form?.lname}
                      name="lname"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>
                </div>

                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div
                     className={`${classes.custom_dropdown}`}
                  >
                    <Select
                      data={getYearsList()}
                      value={form?.year}
                      name="year"
                      onChange={changeInputHandler}
                      label="Year"
                      white
                      className={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      required
                    />
                  </div>

                  <div
                     className={`${classes.custom_dropdown}`}
                  >
                    <Select
                      data={getMonths()}
                      value={form?.month}
                      name="month"
                      onChange={changeInputHandler}
                      label="Month"
                      white
                      className={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      required
                    />
                  </div>
                  <div
                     className={`${classes.custom_dropdown}`}
                  >
                    <Select
                      data={getMonthDays(`${form?.year}-${form?.month}`)}
                      value={form?.day}
                      name="day"
                      onChange={changeInputHandler}
                      label="Day"
                      white
                      required
                    />
                  </div>


                </div>
                <div className={`${classes.form_control} ${classes.margin_t_10}`}>
                  <Checkbox
                    checked={form?.termsAndConditions}
                    onChange={handleCheckBox}
                    name="termsAndConditions"
                    styles={{ color: 'black' }}
                    label={
                      <>
                        I agree to PowerPlay Systems{" "}
                        <Link to="#">Terms and Conditions</Link>
                      </>
                    }
                    required
                  />
                </div>
              </div>
              
              {/* <div className={classes.terms}>
                  <div className={classes.checkboxalt} onClick={() => {
                    let currentStatus = !refTerms.current.checked;
                    refTerms.current.checked = currentStatus;
                    setIsTerms(currentStatus);
                  }}>
                    {isTerms && 
                      <img src={tick}/>
                    }
                  </div>
                  <input 
                    type="checkbox"
                    ref={refTerms}
                    style={{display: "none"}}
                  />
                  I agree to PowerPlay Systems Terms and Conditions
              </div> */}

              <div
                className={`${classes.form_control} ${classes.margin_t_10} ${classes.form_control_center}`}
              >
                {isMobile && activeForm !== 0 && (
                  <Button title="Back" block onClick={handleBack} bordered />
                )}
                <div className={classes.button}>
                  <Button
                    title={
                      isMobile && activeForm !== 2 ? "Next" : "Submit"
                    }
                    //styles={{ opacity: checkValid() ? 1 : 0.5 }}
                    styles={{ background : checkValid() ? "#FB6E00" : "#FDB780", border: checkValid() ? "1px solid #FB6E00":"1px solid #FDB780"} }
                    block
                    type={CONSTANTS.BUTTON_TYPE.SUBMIT}
                    onClick={checkValid() && handleFormSubmit}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

BalanceInfoComponent.propTypes = {
  isMobile: PropTypes.bool,
};

export default BalanceInfoComponent;
