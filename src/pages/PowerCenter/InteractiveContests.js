import React, { useState, useEffect, useRef } from "react";
import classes from "./interactiveContests.module.scss";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import moment1 from "moment-timezone";
import axios from 'axios';
import { getLocalStorage } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";

import Ball from "../../icons/Ball";
import BasketBall from "../../icons/BasketBall";
import Hockeys from "../../icons/Hockeys";
import SuperBall from "../../icons/SuperBall";
import PowerCenterCard from "../../components/PowerCenterCard";
import PowerCenterUpcomingGameCard from "../../components/PowerCenterUpcomingGameCard"
import { getDaysFromToday, redirectTo } from "../../utility/shared";
import CustomDropDown from "../../components/CustomDropDown";
import FilledArrow from "../../components/FilledArrow";
import PowerCenterMobileCard from "../../components/PowerCenterMobileCard";
import { getAllGames } from "../../actions/powerCenterActions";
import { hideDepositForm, showDepositForm } from "../../actions/uiActions";
import { fetchUserBalance, enterIntoGame } from "../../actions/userActions";
import DepositAmountPopUp from "../../components/DepositAmountPopUp/DepositAmountPopUp";
import Header from "../../components/Header/Header";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { socket } from "../../config/server_connection";
import OffSeasonComponent from "../../components/OffSeasonComponent";
import ComingSoonComponent from "../../components/ComingSoonComponent";
import PromoModal from "../../components/PromoModal";

const filters = [
  {
    id: 1,
    title: "SHOW ALL",
    icon: "",
  },
  {
    id: 2,
    title: "NFL",
    icon: <SuperBall />,
  },
  {
    id: 3,
    title: "NBA",
    icon: <BasketBall />,
  },
  {
    id: 4,
    title: "MLB",
    icon: <Ball />,
  },
  {
    id: 5,
    title: "NHL",
    icon: <Hockeys />,
  },
];

const ALL_CURRENCIES = [
  {
    label: "US Dollar",
    value: "usd",
  },
  {
    label: "Bitcoin",
    value: "bitcoin",
  },
  {
    label: "Ethereum",
    value: "ethereum",
  },
  {
    label: "PWRS",
    value: "pwrs",
  },
];

let mlbData = [];
let nflData = [];
let nbaData = [];
let nhlData = [];

const InteractiveContests = (props) => {
  let _socket = null;

  let isAuthenticated = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
  const history = useHistory();
  const dispatch = useDispatch();
  const powerCenterCardData = useSelector(
    (state) => state.powerCenter.allGames
  );
  const [powerCenterDataEntered, setEnteredData] = useState([]);
  const { user } = useSelector((state) => state?.auth);
  const [isMobileDevice, setMobileDevice] = useState(false);
  const responsiveHandler = (maxWidth) => setMobileDevice(maxWidth.matches);
  const currencyMenuRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isBigScreenTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const [isAgeRestricted, setIsAgeRestricted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getDaysFromToday()[0].label);
  const [showCardDetails, setShowCardDetails] = useState(-1);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [currencyMenu, setCurrencyMenu] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "usd",
    "bitcoin",
    "ethereum",
    "usd",
    "btc",
    "eth",
    "pwrs",
  ]);
  const [days, setDays] = useState([{}]);
  const [cashBalance, setCashBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [haveBalance, setHaveBalance] = useState(true);

  const [sortedBy, setSortedBy] = useState("Most Popular");
  const [sortedByMPAction, setsortedByMPAction] = useState("des");
  const [sortedByTPAction, setsortedByTPAction] = useState("des");
  const [sortedByMEAction, setsortedByMEAction] = useState("des");
  const [sortedByPPAction, setsortedByPPAction] = useState("des");
  const [subFilter, setSubFilter] = useState("");

  const setShowDepositModal = () => dispatch(showDepositForm());
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [challengeGame, setChallengeGame] = useState({});
  const [propsGame, setPropsGame] = useState({});
  const [showEntered, setShowEntered] = useState(true);
  const [newGame, setNewGame] = useState({});
  const [inProgressGame, setInProgressGame] = useState([]);
  const [cancelledsGame, setCancelledGame] = useState([]);
  const [enteredGames, setGamesEntered] = useState([]);
  // const params = new URLSearchParams(window.location.search);
  //   console.log('params ---> ', params)
  //   var statusval = params.get('status');
  //   console.log('statusval --> ', statusval)

  const onClosePromoModal = () => {
    setShowPromoModal(false);
    setChallengeGame({});
    setPropsGame({});
  };

  useEffect(async () => {
    let res = await axios.get(`https://nhl.powerplaysystems.com/api/v1/services/fantasy/getPowerCenterGames?userID=${localStorage.PERSONA_USER_ID}`);
    console.log("ress", res);
    if (res.data.code == 200) {
      if (JSON.stringify(enteredGames) !== JSON.stringify(res.data.Games))
        setGamesEntered(res.data.Games);
    }
  }, []);

  useEffect(() => {
    if (powerCenterCardData === "Age Restriction") {
      setIsAgeRestricted(true);
    }
  }, [powerCenterCardData]);

  const onOpenPromoModal = (items, propss) => {
    setShowPromoModal(true);
    if (JSON.stringify(items) !== JSON.stringify(challengeGame))
      setChallengeGame(items);
    if (JSON.stringify(propss) !== JSON.stringify(propsGame))
      setPropsGame(propss);
  };

  useEffect(() => {
    _socket = socket();
    return function cleanUp() {
      _socket = null;
    };
  }, []);

  useEffect(() => {
    _socket?.on(CONSTANTS.SOCKET_EVENTS.GAMES.NEWLY_ADDED, (response) => {
      setNewGame(response);
    });
    _socket?.on(CONSTANTS.SOCKET_EVENTS.GAMES.IN_PROGRESS, (response) => {
      setInProgressGame(response);
    });
    _socket?.on(CONSTANTS.SOCKET_EVENTS.GAMES.CANCELLED, (response) => {
      setCancelledGame(response);
    });
  }, [_socket]);

  useEffect(() => {
    if (filteredData.length > 0) {
      const obj = [...filteredData];
      obj.push(newGame);
      setFilteredData(obj);
    }
  }, [newGame]);

  useEffect(() => {
    let obj = [];
    if (filteredData.length > 0) {
      obj = [...filteredData];
    }
    if (inProgressGame.length > 0) {
      inProgressGame.map((item, index) => {
        obj.map((o, i) => {
          if (o.game_id === item) {
            obj.splice(i, 1);
          }
        });
      });
      setFilteredData(obj);
    }
  }, [inProgressGame]);

  useEffect(() => {
    let obj = [];
    if (filteredData.length > 0) {
      obj = [...filteredData];
    }
    if (cancelledsGame.length > 0) {
      cancelledsGame.map((item, index) => {
        obj.map((o, i) => {
          if (o.game_id === item) {
            obj.splice(i, 1);
          }
        });
      });
      setFilteredData(obj);
    }
  }, [cancelledsGame]);

  // useEffect(() => {
  //   const maxWidth = window.matchMedia("(max-width: 1200px)");
  //   if(maxWidth) {
  //     responsiveHandler(maxWidth);
  //     maxWidth.addEventListener("change", responsiveHandler);
  //     return () => maxWidth.removeEventListener("change", responsiveHandler);
  //   }
  // }, []);

  useEffect(() => {
    // get user balance
    dispatch(fetchUserBalance());
    setCashBalance(
      parseFloat(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE))
    );
    setTokenBalance(
      getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE)
    );
    setBtcBalance(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.BTC_BALANCE));
    setEthBalance(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.ETH_BALANCE));
  }, [dispatch]);

  useEffect(() => {
    setDays(getDaysFromToday());
  }, [powerCenterCardData]);

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      filteredData &&
        filteredData.map((item, index) => {
          if (item?.league === "MLB") {
            mlbData.push(item);
          } else if (item?.league === "NFL") {
            nflData.push(item);
          } else if (item?.league === "NBA") {
            nbaData.push(item);
          } else {
            nhlData.push(item);
          }
        });
    }
  }, []);

  useEffect(() => {
    const user_id = getLocalStorage("PERSONA_USER_ID");
    setLoading(true);
    async function getData() {
      let b = await dispatch(getAllGames(user_id));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return b;
    }
    getData();
  }, []);

  useEffect(() => {
    async function getFilteredData() {
      setFilteredData(powerCenterCardData);
    }
    getFilteredData();
  }, [powerCenterCardData]);

  const handleClick = (e) => {
    if (
      currencyMenuRef.current &&
      !currencyMenuRef.current.contains(e.target)
    ) {
      setCurrencyMenu(false);
    }
  };

  const checkBalace = (item, entry_fee) => {
    if (item?.is_game_free) return true;
    switch (item?.currency) {
      case "USD":
        if (cashBalance >= entry_fee) return true;
        else return false;

      case "BTC":
        if (btcBalance >= entry_fee) return true;
        else return false;

      case "ETH":
        if (ethBalance >= entry_fee) return true;
        else return false;

      case "PWRS":
        if (tokenBalance >= entry_fee) return true;
        else return false;

      case "NFL":
        return redirectTo(props, {
          path: `/nfl-powerdfs`,
          state: {
            game_id: item?.game_id,
            sport_id: item?.sports_id,
            start_date: item?.start_date,
            end_date: item?.end_date,
          },
        });

      case "NFL":
        return redirectTo(props, {
          path: `/nfl-powerdfs`,
          state: {
            game_id: item?.game_id,
            sport_id: item?.sports_id,
            start_date: item?.start_date,
            end_date: item?.end_date,
          },
        });

      default:
        return redirectTo(props, { path: "/" });
    }
  };

  const onEnter = async (item) => {
    if (!isAuthenticated) {
      history.push("/login");
      return;
    }
    const enoughBalance = await checkBalace(item, parseFloat(item?.entry_fee));

    if (enoughBalance) {
      switch (item?.league) {
        case "MLB":
          if (item.game_type == "PowerdFs_challenge") {
            if (isMobile) {
              return redirectTo(props, {
                path: `/challenge-page`,
                state: {
                  game_id: item?.game_id,
                  sport_id: item?.sports_id,
                  start_date: getLocalDateTime(
                    item?.start_date,
                    item?.start_time
                  )?.date,
                  game_set_start: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.date,
                  start_time: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.time,
                  end_date: getLocalDateTime(item?.end_date, item?.end_time)
                    ?.date,
                  outOf: item?.target,
                  enrolledUsers: item?.enrolled_users,
                  prizePool: _.reduce(
                    item?.PrizePayouts,
                    function (memo, num) {
                      return (
                        memo + parseFloat(num.amount) * parseInt(num.prize)
                      );
                    },
                    0
                  ),
                  topPrize: parseFloat(
                    _.max(item?.PrizePayouts, function (ele) {
                      return ele.amount;
                    }).amount
                  ),
                  PointsSystem: item?.PointsSystems,
                  Power: item?.Powers,
                  prizes: item?.PrizePayouts,
                  paid_game: item?.is_game_paid,
                  entry_fee: item?.entry_fee,
                  currency: item?.currency,
                  isPromoPage: false,
                  game_type: item?.game_type,
                  league: item?.league,
                  powerdfs_challenge_amount: item?.powerdfs_challenge_amount,
                },
              });
            } else {
              onOpenPromoModal(item, props);
              return;
            }
          }
          if (item.game_type == "PowerdFs_promo") {
            if (isMobile) {
              return redirectTo(props, {
                path: `/challenge-page`,
                state: {
                  game_id: item?.game_id,
                  sport_id: item?.sports_id,
                  start_date: getLocalDateTime(
                    item?.start_date,
                    item?.start_time
                  )?.date,
                  game_set_start: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.date,
                  start_time: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.time,
                  end_date: getLocalDateTime(item?.end_date, item?.end_time)
                    ?.date,
                  outOf: item?.target,
                  enrolledUsers: item?.enrolled_users,
                  prizePool: _.reduce(
                    item?.PrizePayouts,
                    function (memo, num) {
                      return (
                        memo + parseFloat(num.amount) * parseInt(num.prize)
                      );
                    },
                    0
                  ),
                  topPrize: parseFloat(
                    _.max(item?.PrizePayouts, function (ele) {
                      return ele.amount;
                    }).amount
                  ),
                  PointsSystem: item?.PointsSystems,
                  Power: item?.Powers,
                  prizes: item?.PrizePayouts,
                  paid_game: item?.is_game_paid,
                  entry_fee: item?.entry_fee,
                  currency: item?.currency,
                  isPromoPage: true,
                  game_type: item?.game_type,
                  league: item?.league,
                  powerdfs_challenge_amount: item?.powerdfs_challenge_amount,
                },
              });
            } else {
              onOpenPromoModal(item, props);
              return;
            }
          }
          return redirectTo(props, {
            path: `/mlb-select-team`,
            state: {
              game_id: item?.game_id,
              sport_id: item?.sports_id,
              start_date: getLocalDateTime(item?.start_date, item?.start_time)
                ?.date,
              game_set_start: getLocalDateTime(
                item?.game_set_start,
                item?.start_time
              )?.date,
              start_time: getLocalDateTime(
                item?.game_set_start,
                item?.start_time
              )?.time,
              end_date: getLocalDateTime(item?.end_date, item?.end_time)?.date,
              outOf: item?.target,
              enrolledUsers: item?.enrolled_users,
              prizePool: _.reduce(
                item?.PrizePayouts,
                function (memo, num) {
                  return memo + parseFloat(num.amount) * parseInt(num.prize);
                },
                0
              ),
              topPrize: parseFloat(
                _.max(item?.PrizePayouts, function (ele) {
                  return ele.amount;
                }).amount
              ),
              PointsSystem: item?.PointsSystems,
              Power: item?.Powers,
              prizes: item?.PrizePayouts,
              paid_game: item?.is_game_paid,
              entry_fee: item?.entry_fee,
              currency: item?.currency,
              game_type: item?.game_type,
              league: item?.league,
            },
          });

        case "NFL":
          if (item.game_type == "PowerdFs_challenge") {
            if (isMobile) {
              return redirectTo(props, {
                path: `/challenge-page`,
                state: {
                  game_id: item?.game_id,
                  sport_id: item?.sports_id,
                  start_date: getLocalDateTime(
                    item?.start_date,
                    item?.start_time
                  )?.date,
                  game_set_start: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.date,
                  start_time: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.time,
                  end_date: getLocalDateTime(item?.end_date, item?.end_time)
                    ?.date,
                  outOf: item?.target,
                  enrolledUsers: item?.enrolled_users,
                  prizePool: _.reduce(
                    item?.PrizePayouts,
                    function (memo, num) {
                      return (
                        memo + parseFloat(num.amount) * parseInt(num.prize)
                      );
                    },
                    0
                  ),
                  topPrize: parseFloat(
                    _.max(item?.PrizePayouts, function (ele) {
                      return ele.amount;
                    }).amount
                  ),
                  PointsSystem: item?.PointsSystems,
                  Power: item?.Powers,
                  prizes: item?.PrizePayouts,
                  paid_game: item?.is_game_paid,
                  entry_fee: item?.entry_fee,
                  currency: item?.currency,
                  game_type: item?.game_type,
                  isPromoPage: false,
                  league: item?.league,
                  powerdfs_challenge_amount: item?.powerdfs_challenge_amount,
                },
              });
            } else {
              onOpenPromoModal(item, props);
              return;
            }
          }
          if (item.game_type == "PowerdFs_promo") {
            if (isMobile) {
              return redirectTo(props, {
                path: `/challenge-page`,
                state: {
                  game_id: item?.game_id,
                  sport_id: item?.sports_id,
                  start_date: getLocalDateTime(
                    item?.start_date,
                    item?.start_time
                  )?.date,
                  game_set_start: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.date,
                  start_time: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.time,
                  end_date: getLocalDateTime(item?.end_date, item?.end_time)
                    ?.date,
                  outOf: item?.target,
                  enrolledUsers: item?.enrolled_users,
                  prizePool: _.reduce(
                    item?.PrizePayouts,
                    function (memo, num) {
                      return (
                        memo + parseFloat(num.amount) * parseInt(num.prize)
                      );
                    },
                    0
                  ),
                  topPrize: parseFloat(
                    _.max(item?.PrizePayouts, function (ele) {
                      return ele.amount;
                    }).amount
                  ),
                  PointsSystem: item?.PointsSystems,
                  Power: item?.Powers,
                  prizes: item?.PrizePayouts,
                  paid_game: item?.is_game_paid,
                  entry_fee: item?.entry_fee,
                  currency: item?.currency,
                  game_type: item?.game_type,
                  isPromoPage: true,
                  league: item?.league,
                  powerdfs_challenge_amount: item?.powerdfs_challenge_amount,
                },
              });
            } else {
              onOpenPromoModal(item, props);
              return;
            }
          }
          return redirectTo(props, {
            path: `/nfl-select-team`,
            state: {
              game_id: item?.game_id,
              sport_id: item?.sports_id,
              start_date: getLocalDateTime(item?.start_date, item?.start_time)
                ?.date,
              game_set_start: getLocalDateTime(
                item?.game_set_start,
                item?.start_time
              )?.date,
              start_time: getLocalDateTime(
                item?.game_set_start,
                item?.start_time
              )?.time,
              end_date: item?.end_date,
              outOf: item?.target,
              enrolledUsers: item?.enrolled_users,
              prizePool: _.reduce(
                item?.PrizePayouts,
                function (memo, num) {
                  return memo + parseFloat(num.amount) * parseInt(num.prize);
                },
                0
              ),
              topPrize: parseFloat(
                _.max(item?.PrizePayouts, function (ele) {
                  return ele.amount;
                }).amount
              ),

              PointsSystem: item?.PointsSystems,
              Power: item?.Powers,
              prizes: item?.PrizePayouts,
              paid_game: item?.is_game_paid,
              entry_fee: item?.entry_fee,
              currency: item?.currency,
              game_type: item?.game_type,
            },
          });
        case "NHL":
          if (item.game_type == "PowerdFs_challenge") {
            if (isMobile) {
              return redirectTo(props, {
                path: `/challenge-page`,
                state: {
                  game_id: item?.game_id,
                  sport_id: item?.sports_id,
                  start_date: getLocalDateTime(
                    item?.start_date,
                    item?.start_time
                  )?.date,
                  game_set_start: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.date,
                  start_time: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.time,
                  end_date: getLocalDateTime(item?.end_date, item?.end_time)
                    ?.date,
                  outOf: item?.target,
                  enrolledUsers: item?.enrolled_users,
                  prizePool: _.reduce(
                    item?.PrizePayouts,
                    function (memo, num) {
                      return (
                        memo + parseFloat(num.amount) * parseInt(num.prize)
                      );
                    },
                    0
                  ),
                  topPrize: parseFloat(
                    _.max(item?.PrizePayouts, function (ele) {
                      return ele.amount;
                    }).amount
                  ),
                  PointsSystem: item?.PointsSystems,
                  Power: item?.Powers,
                  prizes: item?.PrizePayouts,
                  paid_game: item?.is_game_paid,
                  entry_fee: item?.entry_fee,
                  currency: item?.currency,
                  game_type: item?.game_type,
                  isPromoPage: false,
                  league: item?.league,
                  powerdfs_challenge_amount: item?.powerdfs_challenge_amount,
                },
              });
            } else {
              onOpenPromoModal(item, props);
              return;
            }
          }
          if (item.game_type == "PowerdFs_promo") {
            if (isMobile) {
              return redirectTo(props, {
                path: `/challenge-page`,
                state: {
                  game_id: item?.game_id,
                  sport_id: item?.sports_id,
                  start_date: getLocalDateTime(
                    item?.start_date,
                    item?.start_time
                  )?.date,
                  game_set_start: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.date,
                  start_time: getLocalDateTime(
                    item?.game_set_start,
                    item?.start_time
                  )?.time,
                  end_date: getLocalDateTime(item?.end_date, item?.end_time)
                    ?.date,
                  outOf: item?.target,
                  enrolledUsers: item?.enrolled_users,
                  prizePool: _.reduce(
                    item?.PrizePayouts,
                    function (memo, num) {
                      return (
                        memo + parseFloat(num.amount) * parseInt(num.prize)
                      );
                    },
                    0
                  ),
                  topPrize: parseFloat(
                    _.max(item?.PrizePayouts, function (ele) {
                      return ele.amount;
                    }).amount
                  ),
                  PointsSystem: item?.PointsSystems,
                  Power: item?.Powers,
                  prizes: item?.PrizePayouts,
                  paid_game: item?.is_game_paid,
                  entry_fee: item?.entry_fee,
                  currency: item?.currency,
                  game_type: item?.game_type,
                  isPromoPage: true,
                  league: item?.league,
                  powerdfs_challenge_amount: item?.powerdfs_challenge_amount,
                },
              });
            } else {
              onOpenPromoModal(item, props);
              return;
            }
          }
          return redirectTo(props, {
            path: `/nhl-select-team`,
            state: {
              game_id: item?.game_id,
              sport_id: item?.sports_id,
              start_date: getLocalDateTime(item?.start_date, item?.start_time)
                ?.date,
              game_set_start: getLocalDateTime(
                item?.game_set_start,
                item?.start_time
              )?.date,
              start_time: getLocalDateTime(
                item?.game_set_start,
                item?.start_time
              )?.time,
              end_date: item?.end_date,
              outOf: item?.target,
              enrolledUsers: item?.enrolled_users,
              prizePool: _.reduce(
                item?.PrizePayouts,
                function (memo, num) {
                  return (
                    memo +
                    parseFloat(num.amount == "" ? 0 : num.amount) *
                    parseInt(num.prize == "" ? 1 : num.prize)
                  );
                },
                0
              ),
              topPrize: parseFloat(
                _.max(item?.PrizePayouts, function (ele) {
                  return ele.amount;
                }).amount
              ),

              PointsSystem: item?.PointsSystems,
              Power: item?.Powers,
              prizes: item?.PrizePayouts,
              paid_game: item?.is_game_paid,
              entry_fee: item?.entry_fee,
              currency: item?.currency,
              game_type: item?.game_type,
            },
          });
        default:
          return redirectTo(props, { path: "/" });
      }
    } else {
      setHaveBalance(false);
      setShowDepositModal();
    }
  };
  const Sorter = (type) => {
    setSortedBy(type);
    if (type === "Most Popular") {
      if (sortedByMPAction == "asc") {
        setsortedByMPAction("des");
      }
      if (sortedByMPAction == "des") {
        setsortedByMPAction("asc");
      }
    }
    if (type === "Prize Total") {
      if (sortedByPPAction == "asc") {
        setsortedByPPAction("des");
      }
      if (sortedByPPAction == "des") {
        setsortedByPPAction("asc");
      }
    }
    if (type === "Top Prize") {
      if (sortedByTPAction == "asc") {
        setsortedByTPAction("des");
      }
      if (sortedByTPAction == "des") {
        setsortedByTPAction("asc");
      }
    }
    if (type === "Min Entry") {
      if (sortedByMEAction == "asc") {
        setsortedByMEAction("des");
      }
      if (sortedByMEAction == "des") {
        setsortedByMEAction("asc");
      }
    }
  };
  function getPriceTotal(rec) {
    var prize = 0;
    if (rec.PrizePayouts.length > 0) {
      for (var i = 0; i < rec.PrizePayouts.length; i++) {
        prize = prize + parseFloat(rec.PrizePayouts[i].amount);
      }
    }
    return prize;
  }
  function getTopPrize(rec) {
    var topPrize = 0;
    if (rec.PrizePayouts.length > 0) {
      for (var i = 0; i < rec.PrizePayouts.length; i++) {
        if (topPrize < parseFloat(rec.PrizePayouts[i].amount)) {
          topPrize = parseFloat(rec.PrizePayouts[i].amount);
        }
      }
    }
    return topPrize;
  }
  function sortArray(arr) {
    var type = sortedBy;
    if (type === "Most Popular") {
      if (sortedByMPAction === "des") {
        return arr.sort((a, b) =>
          parseFloat(a.enrolled_users) > parseFloat(b.enrolled_users)
            ? -1
            : parseFloat(b.enrolled_users) > parseFloat(a.enrolled_users)
              ? 1
              : 0
        );
      } else {
        return arr.sort((a, b) =>
          parseFloat(a.enrolled_users) > parseFloat(b.enrolled_users)
            ? 1
            : parseFloat(b.enrolled_users) > parseFloat(a.enrolled_users)
              ? -1
              : 0
        );
      }
    }

    if (type === "Min Entry") {
      var isFreeGames = arr.filter((x) => x.is_game_free);
      var isPaidGames = arr.filter((x) => !x.is_game_free);
      if (sortedByMEAction === "des") {
        isPaidGames = isPaidGames.sort((a, b) =>
          parseFloat(a.entry_fee) > parseFloat(b.entry_fee)
            ? -1
            : parseFloat(b.entry_fee) > parseFloat(a.entry_fee)
              ? 1
              : 0
        );
        return isPaidGames.concat(isFreeGames);
      } else {
        isPaidGames = isPaidGames.sort((a, b) =>
          parseFloat(a.entry_fee) > parseFloat(b.entry_fee)
            ? 1
            : parseFloat(b.entry_fee) > parseFloat(a.entry_fee)
              ? -1
              : 0
        );
        return isFreeGames.concat(isPaidGames);
      }
    }

    if (type === "Prize Total") {
      if (sortedByPPAction === "des") {
        return arr.sort((a, b) =>
          parseFloat(getPriceTotal(a)) > parseFloat(getPriceTotal(b))
            ? -1
            : parseFloat(getPriceTotal(b)) > parseFloat(getPriceTotal(a))
              ? 1
              : 0
        );
      } else {
        return arr.sort((a, b) =>
          parseFloat(getPriceTotal(a)) > parseFloat(getPriceTotal(b))
            ? 1
            : parseFloat(getPriceTotal(b)) > parseFloat(getPriceTotal(a))
              ? -1
              : 0
        );
      }
    }

    if (type === "Top Prize") {
      if (sortedByTPAction === "des") {
        return arr.sort((a, b) =>
          parseFloat(getTopPrize(a)) > parseFloat(getTopPrize(b))
            ? -1
            : parseFloat(getTopPrize(b)) > parseFloat(getTopPrize(a))
              ? 1
              : 0
        );
      } else {
        return arr.sort((a, b) =>
          parseFloat(getTopPrize(a)) > parseFloat(getTopPrize(b))
            ? 1
            : parseFloat(getTopPrize(b)) > parseFloat(getTopPrize(a))
              ? -1
              : 0
        );
      }
    }
  }
  const isGameCompleted = (gameEndDateTime) => {
    return gameEndDateTime < moment();
  };
  function filterCurrency(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      var power = arr[i];
      let isCompleted = isGameCompleted(moment(power?.end_date + " 23:59"));
      if (isCompleted) continue;
      if (selectedDate === "Today") {
        var m = moment().format("YYYY-MM-DD");
      } else {
        var m = moment
          .utc(selectedDate + " " + moment().format("YYYY"))
          .format("YYYY-MM-DD");
      }
      var sDate = m + " 00:00";
      var eDate = m + " 23:59";
      var s = power?.start_time;
      s = "0" + s;
      s = s.slice(-8);
      s = s.split(/(?=[A-Z]{2})/).join(" ");
      var startDate = moment(power?.start_date + " " + s).format(
        "YYYY-MM-DD hh:mm A"
      );
      var endDate = moment(power?.end_date + " 11:59 PM").format(
        "YYYY-MM-DD hh:mm A"
      );
      var isBetween1 = moment(startDate).isBetween(sDate, eDate);

      if (selectedDate === "All") {
        isBetween1 = 1;
      }

      if (selectedCurrencies.indexOf(arr[i]?.currency?.toLowerCase()) > -1 && isBetween1) {
        newArr.push(arr[i]);
      } else {
        newArr.push(arr[i]);
      }

    }
    if (!showEntered) {
      console.log("newArr------", newArr)
      newArr = newArr.filter((x) => {
        if (enteredGames?.find(x1 => x1.gameID == x?.game_id)?.userHasEntered !== true) {
          return x;
        }
      });
    }
    return newArr;
  }

  const getLocalDateTime = (date, time) => {
    const localDateTime = moment.utc(date + " " + time, "YYYY-MM-DD hh:mm A").local().format("YYYY-MM-DD=hh:mm A");
    const splitted = localDateTime.split("=");

    return {
      date: splitted[0],
      time: splitted[1],
    };
  };

  const powerCenterCard = (item, redirectUri) => {
    return (
      <>
        {
          moment.utc(item.start_date_without_timezone).format("X") >=
            moment.utc().format("X") ? (
            <div className={classes.__interactive_contests_power_center_card}>
              <PowerCenterCard
                id={item?.game_id}
                title={item?.league}
                prize={_.reduce(
                  item?.PrizePayouts,
                  function (memo, num) {
                    return (
                      parseFloat(memo) +
                      parseFloat(num.amount == "" ? 0 : num.amount) *
                      parseInt(
                        num.prize == "" || num.prize == null ? 1 : num.prize
                      )
                    );
                  },
                  0
                )}
                currency={item?.currency}
                prize_currency={item?.prize_currency}
                outOf={item?.enrolled_users}
                total={item?.target}
                percent={item?.percent}
                game_type={item?.game_type}
                game_set_start={
                  getLocalDateTime(item?.game_set_start, item?.start_time)?.date
                }
                start_time={
                  getLocalDateTime(item?.game_set_start, item?.start_time)?.time
                }
                paid_game={item?.is_game_paid}
                targeted_game={item?.is_game_targeted}
                entry_fee={item?.entry_fee}
                PointsSystem={item?.PointsSystems}
                Power={item?.Powers}
                PrizePayout={item?.PrizePayouts.sort(function (a, b) {
                  return parseInt(a.from) - parseInt(b.from);
                })}
                userHasEntered={(enteredGames.findIndex(x => x.gameID == item?.game_id) > -1) ? enteredGames.find(x => x.gameID == item?.game_id).userHasEntered : false}
                showDetails={showCardDetails === item?.game_id}
                totalPoints={item?.powerdfs_challenge_amount}
                onEnter={() => {
                  onEnter(item);
                }}
                onDetailsClick={(cardId) => setShowCardDetails(cardId)}
                onBackClick={() => setShowCardDetails(-1)}
                onNextClick={() => setShowCardDetails(-1)}
                totalEntries={(enteredGames.findIndex(x => x.gameID == item?.game_id) > -1) ? enteredGames.find(x => x.gameID == item?.game_id).totalEntries : 0}
              />
            </div>
          ) : (
            ""
          )}
      </>
    );
  };

  const powerCenterMobileCard = (item, redirectUri) => {
    return (
      <>
        {
          moment.utc(item.start_date_without_timezone).format("X") >=
            moment.utc().format("X") ?
            <div className={
                classes.__interactive_contests_power_center_card_row
              }>
              <div className={classes.__interactive_contests_power_center_card}>
                <PowerCenterMobileCard
                  id={item?.game_id}
                  title={item?.league}
                  prize={_.reduce(
                    item?.PrizePayouts,
                    function (memo, num) {
                      return memo + parseFloat(num.amount) * parseInt(num.prize);
                    },
                    0
                  )}
                  currency={item?.currency}
                  prize_currency={item?.prize_currency}
                  outOf={item?.enrolled_users}
                  total={item?.target}
                  percent={item?.percent}
                  game_type={item?.game_type}
                  paid_game={item?.is_game_paid}
                  targeted_game={item?.is_game_targeted}
                  game_set_start={
                    getLocalDateTime(item?.game_set_start, item?.start_time)?.date
                  }
                  start_time={
                    getLocalDateTime(item?.game_set_start, item?.start_time)?.time
                  }
                  entry_fee={item?.entry_fee}
                  PointsSystem={item?.PointsSystems}
                  Power={item?.Powers}
                  PrizePayout={item?.PrizePayouts.sort(function (a, b) {
                    return parseInt(a.from) - parseInt(b.from);
                  })}
                  userHasEntered={(enteredGames.findIndex(x => x.gameID == item?.game_id) > -1) ? enteredGames.find(x => x.gameID == item?.game_id).userHasEntered : false}
                  showDetails={showCardDetails === item?.game_id}
                  totalPoints={item?.powerdfs_challenge_amount}
                  onEnter={() => onEnter(item)}
                  onDetailsClick={(cardId) => setShowCardDetails(cardId)}
                  onBackClick={() => setShowCardDetails(-1)}
                  onNextClick={() => setShowCardDetails(-1)}
                  totalEntries={(enteredGames.findIndex(x => x.gameID == item?.game_id) > -1) ? enteredGames.find(x => x.gameID == item?.game_id).totalEntries : 0}
                />
              </div>
            </div>
            : ""
        }
      </>
    );
  };

  const setFilteredDataWithDate = (selectedOption) => {
    let day = moment(selectedOption).format("YYYY-MM-DD");
    const today = moment();
    let data = [];
    if (selectedOption === "All") {
      setFilteredData(powerCenterCardData);
    } else if (selectedOption === "Today") {
      powerCenterCardData.map((item) => {
        if (getLocalDateTime(item?.game_set_start, item?.start_time)?.date === today.format("YYYY-MM-DD")) {
          data.push(item);
        }
      });
      setFilteredData(data);
    } else {
      powerCenterCardData.map((item) => {
        if (getLocalDateTime(item?.game_set_start, item?.start_time)?.date === day) {
          data.push(item);
        }
      });
      setFilteredData(data);
    }
  };

  const onEnteredChange = () => {
    setShowEntered(!showEntered)
  }
  return (
    <>
      <div className="__table-wrapper __mb-6">
        <div className={isMobile || isTablet ? "" : ""}>
          <div style={{ flex: 1, display: "flex" }}>
            <div
              className="__badges-wrapper __text-in-one-line __mediam filtersTab"
              style={{ display: "flex", flex: 1 }}
            >
              {filters.map((item, index) => {
                return (
                  <div
                    className={
                      "__outline-badge " +
                      (selectedFilter === item.id && "__active")
                    }
                    onClick={() => {
                      setSelectedFilter(item?.id);
                      const filteredData =
                        item?.id === 1
                          ? powerCenterCardData
                          : powerCenterCardData?.length > 0 &&
                          powerCenterCardData.filter(
                            (cardItem) => cardItem.league === item.title
                          );
                      setFilteredData(filteredData);
                    }}
                  >
                    {item.icon}
                    {item.title}
                  </div>
                );
              })}
            </div>
            {(!isMobile || !isTablet) && (
              <div style={{ display: "flex", width: 330, justifyContent: "end" }}>
                {/* <div
                  className={`__outline-badge __f1 ${
                    showEntered ? "__active" : ""
                  }`}
                  style={{ marginRight: 10, cursor: "pointer" }}
                  onClick={() => {
                    setShowEntered(true);
                  }}
                >
                  Show Entered
                </div>
                <div
                  className={`__outline-badge __f1 ${
                    !showEntered ? "__active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowEntered(false);
                  }}
                >
                  Hide Entered
                </div> */}
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                  {showEntered ? "Show Entered" : "Hide Entered"}
                </label>
                <div className="form-check form-switch">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={showEntered}
                    onChange={() => onEnteredChange()}
                  />

                </div>
              </div>
            )}
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}
          ></div>
        </div>
        {!haveBalance && <Header />}
        {isMobile || isTablet ? (
          <div className={classes.__interactive_contests_filter}>
            <div className={classes.__interactive_contests_most_popular}>
              <p
                onClick={() => {
                  Sorter("Most Popular");
                }}
              >
                Most Popular
                <FilledArrow
                  down={sortedByMPAction === "asc" ? false : true}
                  up={sortedByMPAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div className={classes.__interactive_contests_date}>
              <CustomDropDown
                value={
                  selectedDate === "Today"
                    ? "Today"
                    : selectedDate === "All"
                      ? "All"
                      : moment(selectedDate).format("ddd, MMM DD")
                }
                options={days}
                onChange={(selectedOption) => {
                  setSelectedDate(selectedOption);
                  setFilteredDataWithDate(selectedOption);
                }}
              />
            </div>
          </div>
        ) : (
          <div className={classes.__interactive_contests_filter}>
            <div
              className={
                sortedBy === "Most Popular"
                  ? classes.__interactive_contests_most_popular
                  : classes.__interactive_contests_prize_total
              }
            >
              <p
                onClick={() => {
                  Sorter("Most Popular");
                }}
              >
                Most Popular{" "}
                <FilledArrow
                  down={sortedByMPAction === "asc" ? false : true}
                  up={sortedByMPAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div
              className={
                sortedBy === "Prize Total"
                  ? classes.__interactive_contests_most_popular
                  : classes.__interactive_contests_prize_total
              }
            >
              <p
                onClick={() => {
                  Sorter("Prize Total");
                }}
              >
                Prize Total
                <FilledArrow
                  down={sortedByPPAction === "asc" ? false : true}
                  up={sortedByPPAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div
              className={
                sortedBy === "Top Prize"
                  ? classes.__interactive_contests_most_popular
                  : classes.__interactive_contests_prize_total
              }
            >
              <p
                onClick={() => {
                  Sorter("Top Prize");
                }}
              >
                Top Prize
                <FilledArrow
                  down={sortedByTPAction === "asc" ? false : true}
                  up={sortedByTPAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div
              className={
                sortedBy === "Min Entry"
                  ? classes.__interactive_contests_most_popular
                  : classes.__interactive_contests_prize_total
              }
            >
              <p
                onClick={() => {
                  Sorter("Min Entry");
                }}
              >
                Min Entry
                <FilledArrow
                  down={sortedByMEAction === "asc" ? false : true}
                  up={sortedByMEAction === "asc" ? true : false}
                />
              </p>
            </div>
            <div
              className={`${classes.__interactive_contests_top_prize} ${classes.__drop_down_menu}`}
              ref={currencyMenuRef}
            >
              <p onClick={() => setCurrencyMenu(!currencyMenu)}>
                Currency
                {currencyMenu ? (
                  <FilledArrow up={true} />
                ) : (
                  <FilledArrow down={true} />
                )}
              </p>
              {currencyMenu && (
                <div className={classes.__currency_menu}>
                  {ALL_CURRENCIES.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`${classes.__currency_menu_item}
                                                ${selectedCurrencies?.includes(
                          item.value
                        ) &&
                          classes.__currency_menu_selected
                          }`}
                        onClick={() => {
                          const newCurrencyData = [...selectedCurrencies];
                          // Check if currency exist in array
                          const i = newCurrencyData.indexOf(item.value);
                          if (i > -1) {
                            newCurrencyData.splice(i, 1);
                          } else {
                            newCurrencyData.push(item.value);
                          }
                          setSelectedCurrencies(newCurrencyData);
                        }}
                      >
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={classes.__interactive_contests_date}>
              <CustomDropDown
                value={
                  selectedDate === "Today"
                    ? "Today"
                    : selectedDate === "All"
                      ? "All"
                      : moment(selectedDate).format("ddd, MMM DD")
                }
                options={days}
                onChange={(selectedOption) => {
                  setSelectedDate(selectedOption);
                  setFilteredDataWithDate(selectedOption);
                }}
              />
            </div>
          </div>
        )}
        {!isAgeRestricted ? (
          isLoading ? (
            <h2>Loading ....</h2>
          ) : isLoading == false &&
            filteredData
            ?
            (
              isMobile ? (
                (() => {
                  if (selectedFilter == 4 || selectedFilter == 2) {
                    return <OffSeasonComponent />;
                  }
                  if (selectedFilter == 3) {
                    return <ComingSoonComponent />;
                  }
                  const itemsInaRow = 1;
                  const numberOfRows = powerCenterCardData.length == 0 ? 0 : Math.ceil(
                    powerCenterCardData.length / itemsInaRow
                  );
                  var filterByCurrency = filterCurrency(filteredData);
                  var a1 = sortArray(filterByCurrency);
                  const powerCenterMobileCardView = Array(numberOfRows)
                    .fill(undefined)
                    .map((item, i) => {
                      const start = (i + 1) * itemsInaRow - 1;
                      const end = (i + 1) * itemsInaRow;
                      const items = a1.slice(start, end);
                      return (
                        items.map((power) => {
                          return powerCenterMobileCard(power, power.url);
                        })
                      );
                    });
                  return powerCenterMobileCardView;
                })()
              ) : isTablet || isBigScreenTablet ? (
                (() => {
                  if (selectedFilter == 4 || selectedFilter == 2) {
                    return <OffSeasonComponent />;
                  }
                  if (selectedFilter == 3) {
                    return <ComingSoonComponent />;
                  }
                  const itemsInaRow = 2;
                  const numberOfRows = Math.ceil(
                    powerCenterCardData.length / itemsInaRow
                  );
                  var filterByCurrency = filterCurrency(filteredData);
                  var a1 = sortArray(filterByCurrency);
                  const powerCenterCardView = Array(numberOfRows)
                    .fill(undefined)
                    .map((item, i) => {
                      const start = (i + 1) * itemsInaRow - 2;
                      const end = (i + 1) * itemsInaRow;
                      const items = a1.slice(start, end);
                      return (
                        <div
                          className={
                            classes.__interactive_contests_power_center_card_row
                          }
                        >
                          {
                            i < 1 && 
                            <PowerCenterUpcomingGameCard 
                              header="PowerdFs"
                              subtitle="Coming Feb'2022"
                              content="Stay tuned for the launch of our exciting Powered Fantasy Contests."
                              subcontent={<>In the meantime, enjoy our <span>NHL Fantasy Games!</span></>}
                            />
                          }
                          {items.map((power) => {
                            return powerCenterCard(power, power.url);
                          })}
                        </div>
                      );
                    });
                  return powerCenterCardView;
                })()
              ) : (
                (() => {
                  if (selectedFilter === 3) {
                    return <ComingSoonComponent />;
                  }
                  if (selectedFilter === 4 || selectedFilter === 2) {
                    return <OffSeasonComponent />;
                  } else {
                    const itemsInaRow = 1000;

                    const numberOfRows = Math.ceil(
                      powerCenterCardData.length / itemsInaRow
                    );
                  if(powerCenterCardData?.msg!=" No games exist"){
                    var filterByCurrency = filterCurrency(filteredData);
                    var a1 = sortArray(filterByCurrency);
                    const powerCenterCardView = Array(numberOfRows)
                      .fill(undefined)
                      .map((item, i) => {
                        const start = (i + 1) * itemsInaRow - 1000;
                        const end = (i + 1) * itemsInaRow;
                        const items = a1.slice(start, end);
                        return (
                          <div
                            className={
                              classes.__interactive_contests_power_center_card_row
                            }
                          >
                            {  
                              i < 1 &&
                              <PowerCenterUpcomingGameCard 
                                header="PowerdFs"
                                subtitle="Coming Feb'2022"
                                content="Stay tuned for the launch of our exciting Powered Fantasy Contests."
                                subcontent={<>In the meantime, enjoy our <span>NHL Fantasy Games!</span></>}
                              />
                            }
                            {items.map((power) => {
                              return powerCenterCard(power, power.url);
                            })}

                            {4 - items.length > 0 &&
                              _.times(4 - items.length, (i) => (
                                <div
                                  className={
                                    classes.__interactive_contests_power_center_card
                                  }
                                  style={{ width: 280 }}
                                />
                              ))}
                          </div>
                        );
                      });
                    return powerCenterCardView;
                      }
                  }
                })()
              )
            ) : (
              <>
                <ComingSoonComponent />
              </>
            )
        ) : (
          <div className={classes.__age_restirction}>
            Age Limit Restriction
            <p className={classes.__age_restirction_desctiprion}>
              Based on the Date of Birth you entered, you have not reached the
              age of majority in your State or Province.
              <p className={classes.__age_restirction_contact_us}>
                If this is an error please contact us at
              </p>
              <a
                className={classes.__age_restirction_link}
                href="mailto:support@powerplaygames.com"
              >
                support@powerplaygames.com
              </a>
            </p>
          </div>
        )}
        {isMobile && (
          <>
            <div className={`${classes.__power_up_text} w-100 mx-0`}>
              Power-Up to experience our ground-breaking live-play games where
              you have the Power to control your team’s destiny. *
            </div>
            <button className={`${classes.__power_up_btn} w-100 mx-0`}>
              Power Up!
            </button>
          </>
        )}
        <PromoModal
          visible={showPromoModal}
          onClose={onClosePromoModal}
          item={challengeGame}
          propss={propsGame}
        />
      </div>
    </>
  );
};

export default InteractiveContests;
