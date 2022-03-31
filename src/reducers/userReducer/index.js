import {
  USER_BALANCE,
  CURRENCY_EXCHANGE_RATES,
  SET_ZUM_TOKEN,
  REMOVE_ZUM_TOKEN,
  SET_ZUM_REDIRECT_URL,
  REMOVE_ZUM_REDIRECT_URL,
  SET_CONVERSION_MARKUP,
  SET_ACCOUNT_LIMITS,
  SET_COINBASE_REDIRECT_URL,
  REMOVE_COINBASE_REDIRECT_URL,
  SET_LOADING,
  SET_NOT_lOADING,
  USER_WINNIGS,
  COUNTRIES,
  ACCOUNT_LIMIT,
  PSIGATE_MONTHLY_TRANSACTION
} from "../../actions/userActions";

const INITIAL_STATE = {
  userBalance: {},
  rate: 1,
  zumToken: null,
  zumRedirectUrl: null,
  conversionMarkup: 0,
  markedUpRate: 0,
  accountLimits: {},
  coinbaseRedirectUrl: null,
  loading: false,
  USER_WINNIGS: [],
  COUNTRIES: [],
  ACCOUNT_LIMIT: {},
  PSIGATE_MONTHLY_TRANSACTION: 0
};

const userReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case USER_BALANCE:
      return {
        ...state,
        userBalance: actions.payload,
      };
    case CURRENCY_EXCHANGE_RATES:
      let rate = actions.payload;
      let markedUpRate = rate + (rate / 100) * state.conversionMarkup;
      return {
        ...state,
        rate: actions.payload,
        markedUpRate,
      };
    case SET_ZUM_TOKEN:
      return {
        ...state,
        zumToken: actions.payload,
      };
    case REMOVE_ZUM_TOKEN:
      return {
        ...state,
        zumToken: null,
      };
    case SET_ZUM_REDIRECT_URL:
      return {
        ...state,
        zumRedirectUrl: actions.payload,
      };
    case REMOVE_ZUM_REDIRECT_URL:
      return {
        ...state,
        zumRedirectUrl: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_NOT_lOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_CONVERSION_MARKUP:
      let markedRate = state.rate + (state.rate / 100) * actions.payload;
      return {
        ...state,
        conversionMarkup: actions.payload,
        markedUpRate: markedRate,
      };
    case SET_ACCOUNT_LIMITS:
      return {
        ...state,
        accountLimits: actions.payload,
      };
    case SET_COINBASE_REDIRECT_URL:
      return {
        ...state,
        coinbaseRedirectUrl: actions.payload,
      };
    case REMOVE_COINBASE_REDIRECT_URL:
      return {
        ...state,
        coinbaseRedirectUrl: null,
      };

    case USER_WINNIGS:
      return {
        ...state,
        userWinnigs: actions.payload
      }
    case COUNTRIES:
      return {
        ...state,
        countries: actions.payload
      }
    case ACCOUNT_LIMIT:
      return {
        ...state,
        account_limit: actions.payload
      }
    case PSIGATE_MONTHLY_TRANSACTION:
      return {
        ...state,
        PSiGate_monthly_amount: actions.payload
      }
    default:
      return state;
  }
};

export default userReducer;
