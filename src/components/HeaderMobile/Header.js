import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { getPSiGateMonthlyTransaction } from "../../actions/userActions";

import "./Header.scss";
import logo from "../../assets/new-logo.png";
import { resetAuth, updateUser } from "../../actions/authActions";
import {
  setUserBalance,
  payNowWithIpay,
  payWithZum,
  payWithMyUserPay,
  setZumToken,
  getCoinbaseLink,
  removeCoinbaseLink,
  payWithPSiGate
} from "../../actions/userActions";
import { showDepositForm, hideDepositForm } from "../../actions/uiActions";
import { getLocalStorage, removeLocalStorage, redirectTo } from "../../utility/shared";
import { removePersonaUserId } from "../../actions/personaActions";
import { CONSTANTS } from "../../utility/constants";
import MyAccountMenu from "../MyAccountMenu";
import FilledArrow from "../FilledArrow";
import DepositAmountPopUp from "../DepositAmountPopUp/DepositAmountPopUp";
import { getAllGames } from "../../actions/powerCenterActions";

const MY_ACCOUNT_MENU_OPTIONS = [
  {
    label: "Account Info",
    value: "/my-account",
  },
  {
    label: "How to Play",
    value: "/how-to-play",
  },
  {
    label: "Deposit",
    value: "/deposit",
  },
  {
    label: "Contact Us",
    value: "/contact-us",
  },
  {
    label: "FAQ",
    value: "/faqs",
  },
  {
    label: "Log Out",
    value: "/log-out",
  },
];

const Header = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });
  const {
    isStick = false,
    btnBorderStyle = false,
    hasMenu = true,
    headerLogo = null,
    style = {}
  } = props || {};

  const { user } = useSelector((state) => state?.auth);
  const zumToken = useSelector((state) => state?.user?.zumToken);
  const coinbaseUrl = useSelector((state) => state?.user.coinbaseRedirectUrl);
  const showDepositModal = useSelector((state) => state.ui.depositFormData);

  const dispatch = useDispatch();
  const history = useHistory();
  const myAccountMenuRef = useRef(null);

  const [myAccountMenu, setMyAccountMenu] = useState(false);
  const [UrlStatus, setUrlStatus] = useState("");

  const setHideDepositModal = () => {
    localStorage.removeItem('amount')
    localStorage.removeItem('currency')
    setUrlStatus("");
    history.push("power-center");
    dispatch(hideDepositForm())
};
  const setShowDepositModal = () => dispatch(showDepositForm());

  useEffect(() => {
    !zumToken && dispatch(setZumToken());
  }, [zumToken]);

  useEffect(() => {
    if (coinbaseUrl) {
      setTimeout(() => {
        dispatch(removeCoinbaseLink());
      }, 2000);
      window.open(coinbaseUrl, "_blank");
    }
  });

  useEffect(() => {
    dispatch(getPSiGateMonthlyTransaction());
    const params = new URLSearchParams(window.location.search);
    var statusval = params.get('status');
    setUrlStatus(statusval);
    if(statusval=='true' || statusval=='false')
    {
      setShowDepositModal();
    }  
  },[]);  

  const onLogout = () => {
    removeLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
    removePersonaUserId();
    dispatch(setUserBalance({}));
    let a = dispatch(resetAuth());
    history.push("/login");
  };

  const onMyAccountMenuItemClick = (menuItem) => {
    setMyAccountMenu(false);
    if (menuItem === "/log-out") {
      onLogout();
    } else if (menuItem === "/deposit") {
      setShowDepositModal();
    } else {
      history.push(menuItem);
    }
  };

  const onUpdateUserDetails = (details) => {
    if (
      !details.currency ||
      !details.city ||
      !details.address ||
      !details.zip ||
      !details.phone_number
    ) {
      alert("You can't pay until required fields are filled.");
    } else {
      let obj = { ...user, ...details };
      dispatch(updateUser(obj));

      payNowWithIpay(obj);

      setHideDepositModal();
    }
  };

  const onZumPayment = (data) => {
    if (data.amount < 1) {
      alert("Please add amount at least more than 1.");
    } else {
      const { amount, paymentMethod } = data;
      const obj = {
        amount,
        paymentMethod,
        email: user?.email,
        zumToken,
      };
      dispatch(payWithZum(obj, history));
      setHideDepositModal();
    }
  };

  const psiGateMonthlyAmount = useSelector((state) => state?.user.PSiGate_monthly_amount);

  const onMyUserPayment = (data) => {
    if (data.amount < 1) {
      alert("Please add amount at least more than 1.");
    } else if (data.amount + psiGateMonthlyAmount < 5000) {
      // const { amount, paymentMethod } = data;
      // const obj = {
      //   amount,
      //   paymentMethod,
      //   email: user?.email,
      // };

      // dispatch(payWithPSiGate(obj, history));
      // setHideDepositModal();
      return false;
    } else {
      if(data.isMyUser) {
        const { amount, paymentMethod } = data;
        const obj = {
          amount,
          paymentMethod,
          email: user?.email,
        };
        // setHideDepositModal();
        dispatch(payWithMyUserPay(obj));
      } else {
        return true;
      }
    }
  };

  const coinbaseSubmitHandler = (amount, currency) => {
    dispatch(getCoinbaseLink(amount, currency));
    setHideDepositModal();
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("click", function(evt) {
      
      var flyoutElement = document.getElementById('menuItem2'),
        targetElement = evt.target;  // clicked element
      var menuAccount = document.getElementById('menuAccount1');
      var menuAccount2 = document.getElementById('menuAccount2');
      var menuAccount3 = document.getElementById('menuAccount3');
      do {
          if (targetElement == flyoutElement || targetElement == menuAccount || targetElement == menuAccount2 || targetElement == menuAccount3) {
              // This is a click inside. Do nothing, just return.
              return;
          }
          // Go up the DOM
          targetElement = targetElement.parentNode;
      } while (targetElement);

      // This is a click outside.
      setMyAccountMenu(false);
    });
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };

    

  }, []);

  const handleClick = (e) => {
    // if (
    //   myAccountMenuRef.current &&
    //   !myAccountMenuRef.current.contains(e.target)
    // ) {
    //   setMyAccountMenu(false);
    // }
  };

  let [openMenu, setOpenMenu] = useState(false);
  let handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav
      className="__Header"
      style={{ position: isStick ? "sticky" : "fixed" }}
    >
      <div className="__container __flex __sb __f1 __light-bold" style={style}>
        <Link to="/" className="__brand-logo __flex">
          {headerLogo ? headerLogo : <img src={logo} alt="" />}
        </Link>
        {hasMenu ? (
          <>
            <button
              className={`__menu-icon __hide-only-on-large __pointer ${openMenu ? `__menu-icon_clicked` : ``
                }`}
              onClick={handleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className="__navlinks __flex">
              <li key="0">
                <NavLink to="/power-center">Power Center</NavLink>
              </li>
              {/* <li><NavLink to='/power-picks'>Powerpicks</NavLink></li> */}
              {user?.token ||
                getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER) ? (
                <>
                  <li key="1">
                    <NavLink to="/my-game-center">My Game Center</NavLink>
                  </li>
                  {isMobile ? (
                    MY_ACCOUNT_MENU_OPTIONS.map((item, index) => (
                      <li key={`li-${index}`}>
                        <NavLink
                          to={item.value}
                          onClick={(e) => {
                            e.preventDefault();
                            onMyAccountMenuItemClick(item.value);
                          }}
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))
                  ) : (
                    <li className="__my_account_li" ref={myAccountMenuRef} key="4" id="menuAccount1">
                      <NavLink
                        to="#"
                        onClick={(e) => { e.preventDefault(); setMyAccountMenu(!myAccountMenu) }}
                        id="menuAccount2"
                      >
                        My Account
                        {!myAccountMenu ? (
                          <FilledArrow down={true} id="menuAccount3"/>
                        ) : (
                          <FilledArrow up={true} id="menuAccount3"/>
                        )}
                      </NavLink>
                      {myAccountMenu && (
                        <MyAccountMenu
                          visible={myAccountMenu}
                          value={window.location.pathname}
                          options={MY_ACCOUNT_MENU_OPTIONS}
                          onClick={(menuItem) =>
                            onMyAccountMenuItemClick(menuItem)
                          }
                        />
                      )}
                    </li>
                  )}
                </>
              ) : (
                <>
                  {/* <li><NavLink to='/power-play-sponsors'>Sponsor a Contest</NavLink></li> */}
                  <li key="5">
                    <NavLink to="/login">Log In</NavLink>
                  </li>
                  <li key="6">
                    <NavLink
                      to="/power-up"
                      className={`__btn __header-btn ${btnBorderStyle ? "__style-2 __primary-color" : ""
                        }`}
                    >
                      Power up!
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {showDepositModal && (
              <DepositAmountPopUp
                onClose={() => setHideDepositModal()}
                user={user}
                ipayFormSubmitted={onUpdateUserDetails}
                zumFormSubmitted={onZumPayment}
                myUserPayFormSubmitted={onMyUserPayment}
                coinbaseFormSubmitted={coinbaseSubmitHandler}
                UrlStatus={UrlStatus}
                monthlyAmount={psiGateMonthlyAmount}
              />
            )}
          </>
        ) : (
          <div className="__landing-page_title __flex __f1">
            <strong>Coming Spring 2021</strong>
          </div>
        )}
      </div>
    </nav>
  );
};

Header.propTypes = {
  hasMenu: PropTypes.bool,
  isStick: PropTypes.bool,
  btnBorderStyle: PropTypes.bool,
  headerLogo: PropTypes.element,
};

export default Header;
