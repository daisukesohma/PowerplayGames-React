import { CONSTANTS } from "../utility/constants";
import { setLocalStorage, redirectTo } from "../utility/shared";
import { URLS } from "../config/urls";
import { createAlert } from "./notificationActions";

import axios from "axios";
import http from "../config/http";
import { showToast } from "./uiActions";

export const USER_BALANCE = "USER_BALANCE";
export const CURRENCY_EXCHANGE_RATES = "CURRENCY_EXCHANGE_RATES";
export const SET_ZUM_TOKEN = "SET_ZUM_TOKEN";
export const REMOVE_ZUM_TOKEN = "REMOVE_ZUM_TOKEN";

export const SET_LOADING = "SET_LOADING";
export const SET_NOT_lOADING = "SET_NOT_lOADING";
export const SET_ZUM_REDIRECT_URL = "ZUM_REDIRECT_URL";
export const REMOVE_ZUM_REDIRECT_URL = "REMOVE_ZUM_REDIRECT_URL";

export const SEND_ZUM_TRANSACTION = "SEND_ZUM_TRANSACTION";
export const SET_CONVERSION_MARKUP = "SET_CONVERSION_MARKUP";

export const SET_ACCOUNT_LIMITS = "SET_ACCOUNT_LIMITS";
export const SET_COINBASE_REDIRECT_URL = "SET_COINBASE_REDIRECT_URL";
export const REMOVE_COINBASE_REDIRECT_URL = "REMOVE_COINBASE_REDIRECT_URL";
export const USER_WINNIGS = "USER_WINNIGS";
export const COUNTRIES = "COUNTRIES";
export const ACCOUNT_LIMIT = "ACCOUNT_LIMIT";
export const PSIGATE_MONTHLY_TRANSACTION = "PSIGATE_MONTHLY_TRANSACTION";

export function setUserBalance(payload) {
  setLocalStorage(
    CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE,
    payload.cashBalance
  );
  setLocalStorage(
    CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE,
    payload.tokenBalance
  );
  setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.BTC_BALANCE, payload.btcBalance);
  setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.ETH_BALANCE, payload.ethBalance);
  return {
    type: USER_BALANCE,
    payload,
  };
}

export function setAccountLimit(accountLimits) {
  const request = http.put(URLS.USER.ACCOUNT_LIMITS, accountLimits);

  return (dispatch) => {
    return request.then((response) => {
      if (response.status === 200) {
        dispatch(createAlert(response?.data?.message, "success"));
        dispatch({ type: SET_ACCOUNT_LIMITS, payload: accountLimits });
        return response.data;
      } else {
        dispatch(createAlert(response?.data?.message, "error"));
        return response.data;
      }
    });
  };
}

export function fetchUserBalance() {
  const request = http.get(URLS.USER.BALANCE);

  return (dispatch) =>
    request
      .then((response) => dispatch(setUserBalance(response.data)))
      .catch((err) => console.log(err?.response));
}

// PHP - In-Process this module.
export async function payNowWithIpay(data) {
  http.post(URLS.USER.SMALL_TOKEN).then((res) => {
    let token = res.data;

    const {
      first_name,
      last_name,
      address,
      zip,
      phone_number,
      amount,
      currency,
      city,
      // country,
      // state_or_province,
      email,
    } = data;

    // console.log("--->--- country ---<---", country);

    const obj = {
      api_key: process.env.REACT_APP_IPAY_API_KEY,
      method: "visa-mc",
      response_url: "?paid=true",
      first_name,
      last_name,
      address,
      city,
      // state: state_or_province,
      // country: country.substring(0, 2)?.toUpperCase(),
      zip,
      phone_no: phone_number,
      email,
      currency,
      amount,
      ip_address: "192.168.10.1",
      sulte_apt_no: token,
      webhook_url: `${process.env.REACT_APP_IPAY_WEBHOOK_URL}/api/v1/users/account/balance`,
    };

    axios.post("https://ipaytotal.solutions/api/hosted-pay/payment-request", obj).then((res) => {
      window.open(res.data.payment_redirect_url, "_blank");
    }).catch((er) => console.log(er));
  });
}

export const PAYMENT_METHODS = {
  EFT: "EFT",
  INTERAC: "INTERAC",
  CREDIT_CARD: "CREDIT",
  VISA_DIRECT: "VISA",
};

export function payWithZum(data, history) {
  const { amount, email, zumToken, paymentMethod } = data;
  let walletId = null;
  switch (paymentMethod) {
    case PAYMENT_METHODS.EFT:
      walletId = process.env.REACT_APP_BANK_EFT_WALLET;
      break;
    case PAYMENT_METHODS.INTERAC:
      walletId = process.env.REACT_APP_BANK_EFT_WALLET;
      break;
    case PAYMENT_METHODS.VISA_DIRECT:
      walletId = process.env.REACT_APP_VISA_DIRECT_WALLET;
      break;
    case PAYMENT_METHODS.CREDIT_CARD:
      walletId = process.env.REACT_APP_CREDIT_CARD_WALLET;
      break;
    default:
  }

  const obj = {
    Type: "Request",
    Amount: amount,
    WalletId: walletId,
    AmountType: "Fixed",
    AllowMoreThanOneTransaction: false,
    IsRecurrent: false,
    DisplayRecurrencyQuantityInConnect: true,
    Email: email,
    SendEmailNotification: true,
  };

  return (dispatch) => {
    dispatch({ type: SET_LOADING });
    axios
      .post(`${process.env.REACT_APP_ZUM_API}/api/requestfunds`, obj, {
        headers: { Authorization: `Bearer ${zumToken}` },
      })
      .then((res) => {
        dispatch({
          type: SET_ZUM_REDIRECT_URL,
          payload: res.data.result.ConnectUrl,
        });
        redirectTo(
          { history },
          {
            path: "zum-payment",
            state: { previousPath: history?.location?.pathname },
          }
        );
        // push("/paymentFrame");
      })
      .catch((er) => console.log(er))
      .finally(() => {
        dispatch({ type: SET_NOT_lOADING });
      });
  };
}


export function payWithMyUserPay(data) {
  const { amount, email, paymentMethod } = data;

  return (dispatch) => {
    dispatch({ type: SET_LOADING , payload:data});

  };
}

export function payWithPSiGate(data, history) {
  const { amount, email, paymentMethod } = data;

  return (dispatch) => {
    dispatch({ type: SET_LOADING });

    redirectTo(
      { history },
      {
        path: "psi-gateway",
        state: {
          previousPath: history?.location?.pathname,
          amount,
          email
        },
      }
    );
  };
}

export function setRates() {
  return (dispatch) => {
    axios
      .get(
        `${process.env.REACT_APP_FIXER_API_URL}/api/latest?access_key=${process.env.REACT_APP_FIXER_KEY}`
      )
      .then((res) => {
        let rates = res.data.rates;
        let rate = rates["CAD"] / rates["USD"];
        return dispatch({
          type: CURRENCY_EXCHANGE_RATES,
          payload: rate,
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };
}

export function setZumToken() {
  const obj = {
    Username: process.env.REACT_APP_ZUM_USERNAME,
    Password: process.env.REACT_APP_ZUM_PASSWORD,
  };
  return (dispatch) => {
    // dispatch(setConversionMarkup());
    axios
      .post(`${process.env.REACT_APP_ZUM_API}/api/authorize`, obj)
      .then((res) => {
        // it will remove the token from state after one hour as it gets expired.
        setTimeout(() => {
          dispatch({ type: REMOVE_ZUM_TOKEN });
        }, 3600 * 1000);

        return dispatch({
          type: SET_ZUM_TOKEN,
          payload: res.data.result.Token,
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };
}

export function sendZumTransaction(transactionId, markupRate) {
  const request = http.post(URLS.USER.ZUM_BALANCE_TRANSACTION, {
    transactionId,
    markupRate,
  });
  return (dispatch) => {
    return request.then((response) => {
      dispatch({ type: SEND_ZUM_TRANSACTION });
      dispatch({ type: REMOVE_ZUM_REDIRECT_URL });
      dispatch(fetchUserBalance());
      dispatch(
        showToast(
          "Payment succesfull. Your balance will be updated soon.",
          "success"
        )
      );
    });
  };
}

// export function setConversionMarkup() {
//   const request = http.get(URLS.USER.CONVERSION_MARKUP_VALUE);

//   return (dispatch) => {
//     return request.then((response) => {
//       if (response.data.status === true) {
//         dispatch({
//           type: SET_CONVERSION_MARKUP,
//           payload: parseFloat(response?.data?.data?.data_value),
//         });
//       }
//     });
//   };
// }

export function getCoinbaseLink(amount, currency) {
  currency = currency.toUpperCase();
  const request = http.post(URLS.USER.COINBASE_LINK_GENERATE, {
    amount,
    currency,
  });

  return (dispatch) => {
    return request.then((response) => {
      dispatch({
        type: SET_COINBASE_REDIRECT_URL,
        payload: response.data?.hostedUrl,
      });
    });
  };
}

export function removeCoinbaseLink() {
  return (dispatch) => {
    dispatch({ type: REMOVE_COINBASE_REDIRECT_URL });
  };
}

export function requestBalanceWithdraw(data, changeModalState) {

  return async (dispatch) => {
    try {
      const response = await http.post(
        `${process.env.REACT_APP_API_URL}/api/v1/${URLS.USER.WITHDRAW_REQUEST}`,
        data
      );

      changeModalState();

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
}

export function submitContactUsForm(data) {

  return async (dispatch) => {
    try {
      const response = await http.post(
        `${process.env.REACT_APP_API_URL}/api/v1/${URLS.USER.CONTACT_US}`,
        data
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserWinnigs(user_id) {
  return async (dispatch) => {
    try {
      // const response = await http.get(
      //   `${process.env.REACT_APP_API_URL}/api/v1/${URLS.USER.GET_USER_WINNINGS}/${user_id}`,
      // );
      const response = await http.get(
        `https://nhl.powerplaysystems.com/api/v1/services/fantasy/getUserWinnings?userID=${user_id}`,
      );

      dispatch({
        type: USER_WINNIGS,
        payload: response.data?.userWinnings,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getDBCountries() {
  return async (dispatch) => {
    try {
      const response = await http.get(
        `${process.env.REACT_APP_API_URL}/api/v1/${URLS.USER.GET_COUNTRIES}`,
      )

      dispatch({
        type: COUNTRIES,
        payload: response.data?.data,
      })

    } catch (err) {
      console.log('Error in GET_COUNTRIES -> ', err);
    }
  }
}

export function checkAccountLimit(user_id, currency) {
  return async (dispatch) => {
    try {
      const response = await http.post(
        `${process.env.REACT_APP_API_URL}/api/v1/${URLS.USER.CHECK_LIMIT}`,
        {
          user_id, currency
        }
      )
      dispatch({
        type: ACCOUNT_LIMIT,
        payload: response.data,
      })
      return response.data
    } catch (err) {
      console.log('Error in checkAccountLimit -> ', err)
    }
  }
}

export function getPSiGateMonthlyTransaction() {
  return async (dispatch) => {
    try {
      const response = await http.get(`${process.env.REACT_APP_API_URL}/${URLS.PAYMENT.GET_PSIGATE_MONTHLY_TRANSACTION}`)
      console.log('response monthly --> ', response);
      dispatch({
        type: PSIGATE_MONTHLY_TRANSACTION,
        payload: response.data,
      })

    } catch (err) {
      console.log('catch err', err);
    }
  }
}