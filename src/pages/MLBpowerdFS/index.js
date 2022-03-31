import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { isEmpty, cloneDeep, uniqBy } from "lodash";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat";
import _ from "underscore";

import * as MLBActions from "../../actions/MLBActions";
import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/baseball.jpg";
import BaseballImageMobile from "../../assets/baseball-player-select-mobile1.png";
import Tick2 from "../../icons/Tick2";
import ContestRulesIcon from "../../icons/ContestRules";
import RightArrow from "../../assets/right-arrow.png";
import MLBFooterImage from "../../assets/MLB.png";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import SportsSidebarContent from "../../components/SportsSidebarContent";
import SelectionCard3 from "../../components/SportsSelectionCard3";
import EmployeeIcon from "../../icons/Employee";
import SportsFilters from "../../components/SportsFilters";
import Search from "../../components/SearchInput";
import PowerCollapesible from "../../components/PowerCollapesible";
import { CONSTANTS } from "../../utility/constants";
import AcceleRadar from "../../assets/partners/acceleradar.png";
import StarImg from "../../assets/star.png";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";
import StarPlayersCheck from "../../components/StarPlayersCheck";
import PrizeModal from "../../components/PrizeModal";
import { PAGE_TYPES } from "../../components/SportsSelectionCard3/PageTypes";
import SportsTeamSelectionCard from "../../components/SportsTeamSelectionCard";
import Button from "../../components/Button";
import ButtonFloating from "../../components/ButtonFloating";
import ModalBottom from "../../components/ModalBottom";

import ContestRuleIcon from "../../assets/icons/contest-rules.png";
import PrizeCupIcon from "../../assets/icons/prize-cup.png";
import CloseIconGrey from "../../assets/close-icon-grey.png";
import MenuIcon from "../../assets/icons/menu.png";
import SwapPlayerIcon from "../../assets/swap-player-icon.png";
import PointMultiplierIcon from "../../assets/point-multiplier-icon.png";
import VideoReviewIcon from "../../assets/video-review-icon.png";
import DWallIcon from "../../assets/d-wall-icon.png";
import UndoIcon from "../../assets/undo-icon.png";
import RetroBoostIcon from "../../assets/retro-boost-icon.png";
import ChallengeIcon from "../../assets/challenge.svg";
import BackArrow from "../../icons/BackArrow";
import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import RetroBoostIcons from "../../icons/RetroBoost";
import ChallengeIcons from "../../icons/Challenge";
import PowerUpIcons from "../../icons/PowerUp";
import LockIcon from "../../icons/Lock";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";

import { useMediaQuery } from "react-responsive";
import { printLog, redirectTo } from "../../utility/shared";
import { dummyData } from "./dummyData";

import { BottomSheet } from "react-spring-bottom-sheet";
import "./bottomSheetStyles.scss";
import PowerUpIcon from "../../assets/power-up-icon.svg";
import { showToast } from "../../actions/uiActions";

const getIcon = (powerName) => {
  if (powerName) {
    if (powerName.toLowerCase().match(/wall/g)) return DWallIcon;
    else if (powerName.toLowerCase().match(/video|review/g))
      return VideoReviewIcon;
    else if (powerName.toLowerCase().match(/swap/g)) return SwapPlayerIcon;
    else if (powerName.toLowerCase().match(/multi|boost|1.5|2.5/g))
      return PointMultiplierIcon;
    else if (powerName.toLowerCase().match(/retro/g)) return RetroBoostIcon;
    else if (powerName.toLowerCase().match(/challenge/g)) return ChallengeIcon;
    else if (powerName.toLowerCase().match(/power-up/g)) return PowerUpIcon;
  }
};

const { P, C, SS, XB, OF, D } = CONSTANTS.FILTERS.MLB;

const SIDEBAR_INITIAL_LIST = [
  {
    title: P,
    filter: P,
    name: "",
    playerId: "",
  },
  {
    title: C,
    filter: C,
    name: "",
    playerId: "",
  },
  {
    title: SS,
    filter: SS,
    name: "",
    playerId: "",
  },
  {
    title: `${XB}1`,
    filter: XB,
    name: "",
    playerId: "",
  },
  {
    title: `${XB}2`,
    filter: XB,
    name: "",
    playerId: "",
  },
  {
    title: `${OF}1`,
    filter: OF,
    name: "",
    playerId: "",
  },
  {
    title: `${OF}2`,
    filter: OF,
    name: "",
    playerId: "",
  },
  {
    title: D,
    icon: EmployeeIcon,
    filter: D,
    name: "",
    playerId: "",
  },
];

const FILTERS_INITIAL_VALUES = [
  {
    id: 1,
    title: P,
    remaining: 1,
  },
  {
    id: 2,
    title: C,
    remaining: 1,
  },
  {
    id: 3,
    title: SS,
    remaining: 1,
  },
  {
    id: 4,
    title: XB,
    remaining: 2,
  },
  {
    id: 5,
    title: OF,
    remaining: 2,
  },
  {
    id: 6,
    title: D,
    remaining: 1,
  },
];

const contestScoring = {
  data1: [
    {
      title: "Hitters",
      data: [
        { title: "Single", points: "+3 pts" },
        { title: "Double", points: "+5 pts" },
        { title: "Triple", points: "+8 pts" },
        { title: "Home Run", points: "+10 pts" },
        { title: "Run Batted in", points: "+2 pts" },
        { title: "Run", points: "+2 pts" },
        { title: "Base on Balls", points: "+1 pts" },
        { title: "Stolen Base", points: "+5 pts" },
      ],
    },
  ],
  data2: [
    {
      title: "Pitchers",
      data: [
        { title: "Innings 1-8 Outs", points: "+1 Pt per Out" },
        { title: "Innings 9+ Outs", points: "+ 2 Pts per Out" },
        { title: "Innings 1-7 K’s", points: "+ 2 Pts" },
        { title: "Innings 8+ K’s", points: "+ 3 Pts" },
      ],
    },
    {
      title: "Team Defence",
      data: [{ title: "Runs Against", points: "- 5 Pts" }],
    },
  ],
};

const headerText = [
  {
    id: 1,
    text: `Select 1 Pitcher, you can use your Swap Power to swap your SP for a RP during the game.`,
  },
  {
    id: 2,
    text: `Select 1 Catcher.`,
  },
  {
    id: 3,
    text: `Select 1 Shortstop.`,
  },
  {
    id: 4,
    text: `Select 2 players from the pool of players at First Base (1B), Second Base (2B), and Third Base (3B). You may only select one Star player from the XB pool.`,
  },
  {
    id: 5,
    text: `Select 2 Outfielders (OF) from the pool of players at Left Field (LF), Center Field (CF), and Right Field (RF). You may select only one Star player from the OF pool.`,
  },
  {
    id: 6,
    text: `Select 1 Team Defense, Goals against result in negative points for your team. You can see the Average Runs Against (ARA) for each team below. Click the Arrow icon to see starting Pitchers.`,
  },
];

const prizeData = [
  { place: "1st", payout: "$2,0000.00" },
  { place: "2nd", payout: "$750.00" },
  { place: "3rd", payout: "$350.00" },
  { place: "4th", payout: "$200.00" },
  { place: "5th", payout: "$150.00" },
  { place: "6th - 7th", payout: "$100.00" },
  { place: "8th - 10th", payout: "$80.00" },
  { place: "11th - 15th", payout: "$60.00" },
  { place: "16th - 20th", payout: "$50.00" },
  { place: "21st - 30th", payout: "$40.00" },
];

let starPowerIndex = 0;
let selectedPlayerCount = 0;
let test = 0;

function MLBPowerdFs(props) {
  const onGoBack = () => {
    redirectTo(props, { path: "/my-game-center" });
  };
  const [selected, setSelected] = useState(new Map());
  const [selectedFilter, setSelectedFilter] = useState(
    FILTERS_INITIAL_VALUES[0]
  );
  const [sideBarList, setSidebarList] = useState(SIDEBAR_INITIAL_LIST);
  const [filters, setFilters] = useState(FILTERS_INITIAL_VALUES);
  const [selectedData, setSelectedData] = useState();
  const [filterdData, setFilterdData] = useState();
  const [selectedDropDown, setSelectedDropDown] = useState();
  const [showPrizeModal, setPrizeModalState] = useState(false);
  const [selectedType, setSelectedType] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [dropDownState, setDropDownTeam] = useState([]);
  const [outOf, setOutOf] = useState("10000");
  const [enrolledUsers, setEnrolledUsers] = useState(9999);
  const [prizePool, setPrizePool] = useState(0);
  const [gameStartTime, setGameStartTime] = useState("");
  const [powers, setPowers] = useState([]);
  const [points, setPoints] = useState([]);
  const [topPrize, setTopPrize] = useState(0);
  const [prizes, setPrizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [resetSearch,  setResetSearch] = useState(false);
  const [isPaid, setIsPaid] = useState(true);
  const [data, setData] = useState([]);

  const [swapCounts, setSwapCounts] = useState(0);
  const [dwallCounts, setDwallCounts] = useState(0);
  const [challengeCounts, setChallengeCounts] = useState(0);
  const [pointMultiplierCounts, setPointMultiplierCounts] = useState(0);
  const [pointBooster15x, setPointBooster15xCounts] = useState(0);
  const [pointBooster2x, setPointBooster2xCounts] = useState(0);
  const [pointBooster3x, setPointBooster3xCounts] = useState(0);
  const [retroBoostCounts, setRetroBoostCounts] = useState(0);
  const [powerUpCounts, setPowerUpCounts] = useState(0);

  const text = process.env.REACT_APP_POST_SHARING_TEXT;

  let {
    // data = [],
    starPlayerCount = 0,
    game_id,
    sport_id,
    isEdit = false,
    allData = [],
    savedPlayers = [],
  } = useSelector((state) => state.mlb);

  let a = useSelector((state) => state);
  const selector_team_id = useSelector((state) => state?.mlb?.team_id);

  const { auth: { user = {} } = {} } = useSelector((state) => state);

  const { token = "", user_id } = user || {};

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    outOf: OutOf = "",
    enrolledUsers: EnrolledUsers = 0,
    prizePool: PrizePool = 0,
    game_set_start = "",
    PointsSystem = [],
    Power = [],
    topPrize: TopPrize = 0,
    prizes: Prizes = [],
    start_time = "",
    paid_game = true,
    entry_fee = "",
    currency = "",
    game_type = ""
  } = history?.location?.state || {};

  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  //reset the states
  useEffect(() => {
    dispatch(MLBActions.setStarPlayerCount(0));
    setSidebarList(cloneDeep(SIDEBAR_INITIAL_LIST));
    setSelected(new Map());
    setSelectedFilter(FILTERS_INITIAL_VALUES[0]);
    setFilters(cloneDeep(FILTERS_INITIAL_VALUES));
    setFilterdData(null);
    setSelectedData(null);

    setIsPaid(paid_game);
    setOutOf(OutOf);
    setEnrolledUsers(EnrolledUsers);
    setPrizePool(PrizePool);
    setGameStartTime(game_set_start);
    setPoints(_.groupBy(PointsSystem, "type"));
    setPowers(Power);
    setTopPrize(TopPrize);
    setPrizes(Prizes);

    //unmount
    return function cleanUp() {
      starPowerIndex = 0;
      selectedPlayerCount = 0;
      dispatch(MLBActions.setEditPlayers({ data: [], isEdit: false }));
    };
  }, []);

  useEffect(() => {
    getData();
  }, [user]);

  const setPowerss = () => {
    let remainingPowers = Power;
    let challenge = 0;
    let swap = 0;
    let point_booster = 0;
    let p15 = 0;
    let p2 = 0;
    let p3 = 0;
    let dwall = 0;
    let retro_boost = 0;
    let power_up = 0;
    for (let i = 0; i < remainingPowers.length; i++) {
      let rec = remainingPowers[i];
      if (rec.powerName === "D-Wall") {
        dwall = remainingPowers[i].amount;
      } else if (rec.powerName === "Challenge") {
        challenge = remainingPowers[i].amount;
      } else if (rec.powerName === "1.5x Point Booster") {
        p15 = remainingPowers[i].amount;
        point_booster = point_booster + parseInt(remainingPowers[i].amount);
      } else if (rec.powerName === "2x Point Booster") {
        p2 = remainingPowers[i].amount;
        point_booster = point_booster + parseInt(remainingPowers[i].amount);
      } else if (rec.powerName === "3x Point Booster") {
        p3 = remainingPowers[i].amount;
        point_booster = point_booster + parseInt(remainingPowers[i].amount);
      } else if (rec.powerName === "Swap") {
        swap = remainingPowers[i].amount;
      } else if (rec.powerName === "Retro Boost") {
        retro_boost = remainingPowers[i].amount;
      } else if (rec.powerName === "Power-Up") {
        power_up = remainingPowers[i].amount;
      }
    }
    setChallengeCounts(challenge);
    setSwapCounts(swap);
    setDwallCounts(dwall);
    setPointMultiplierCounts(point_booster);
    setRetroBoostCounts(retro_boost);
    setPowerUpCounts(power_up);
    setPointBooster15xCounts(p15);
    setPointBooster2xCounts(p2);
    setPointBooster3xCounts(p3);
  };

  const isPowerAvailable = (type) => {
    let powerss = powers;
    let available = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    if (typeof powerss == "undefined") {
      return;
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          available = 1;
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          available = 1;
          break;
        }
      }
    }
    return available;
  };

  function isPowerLocked(type) {
    let powerss = powers;
    if (typeof powerss == "undefined") {
      return;
    }
    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          if (
            powerss[i].SocialMediaUnlock == true ||
            powerss[i].SocialMediaUnlock == "true"
          ) {
            locked = 1;
          }
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          if (
            powerss[i].SocialMediaUnlock == true ||
            powerss[i].SocialMediaUnlock == "true"
          ) {
            locked = 1;
          }
          break;
        }
      }
    }
    return locked;
  }

  React.useEffect(() => {
    setPowerss();
  }, []);

  const RenderPower = ({
    title = "",
    Icon = "",
    isSvgIcon = false,
    count = 0,
  }) => {
    const text = process.env.REACT_APP_POST_SHARING_TEXT;
    return (
      <div className={classes.sidebar_content_p}>
        <div className={classes.sidebar_power_header}>
          {isSvgIcon ? (
            <Icon size={54} />
          ) : (
            <img src={Icon} width={54} height={54} />
          )}
          {isPowerAvailable(title) === 1 && isPowerLocked(title) === 1 && (
            <div className={classes.sidebar_lock_icon}>
              <LockIcon />
            </div>
          )}
        </div>
        <p className={classes.power_title}>{title}</p>
        {isPowerAvailable(title) === 0 ? (
          <div style={{ opacity: 0.6, fontSize: "0.9rem" }}>Not Available</div>
        ) : (
          <div className={classes.power_footer}>
            {isPowerLocked(title) === 1 ? (
              <>
                <p>Share to unlock:</p>
                <div>
                  <button
                    onClick={() => {
                      var left = window.screen.width / 2 - 600 / 2,
                        top = window.screen.height / 2 - 600 / 2;
                      window.open(
                        `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                        "targetWindow",
                        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                        left +
                        ",top=" +
                        top
                      );
                    }}
                  >
                    <FacebookIcon />
                  </button>

                  <button
                    onClick={() => {
                      var left = window.screen.width / 2 - 600 / 2,
                        top = window.screen.height / 2 - 600 / 2;
                      window.open(
                        `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                        "targetWindow",
                        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                        left +
                        ",top=" +
                        top
                      );
                    }}
                  >
                    <TwitterIcon />
                  </button>
                </div>
              </>
            ) : (
              <p className={classes.power_footer_count}>{count}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const getData = async () => {
    setLoading(true);
    const response = await dispatch(
      MLBActions.mlbData(history.location?.state?.game_id)
    );
    if (
      response.game_id == 0 &&
      response.sport_id == 0 &&
      response.filterdList.length == 0 &&
      response.allData.length == 0
    ) {
      return;
    }
    if (response) {
      setData(response?.filterdList);

      const { filterdList = [], allData = [] } = response || {};

      setFilterdData(filterdList[0]);
      setSelectedData(filterdList[0]);

      //set dropdown
      const _dropDownlist = filterdList?.filter(
        (list) => list?.type === "d" || list?.type === "D"
      );
      const dropDownTeams = [
        {
          team_id: "all",
          name: "All Teams",
        },
        ..._dropDownlist?.[0]?.listData,
      ];
      const noDuplicatedTeam = uniqBy(dropDownTeams, (team) => team.team_id);
      setDropDownTeam(noDuplicatedTeam);
    }

    setLoading(false);
  };

  useEffect(() => {
    autoSelectOnEdit();
  }, [isEdit, loading]);

  const autoSelectOnEdit = () => {
    if (isEdit === true && !loading && selected.entries().next().done) {
      const pls = [];
      savedPlayers.forEach((element) => {
        if (element.team_id) {
          pls.push({
            team_id: element?.team_id,
            matchId: element?.match_id,
          });
        } else {
          pls.push({
            playerId: element?.playerId,
            matchId: element?.matchId,
          });
        }
      });

      let _selected = new Map(selected);
      let _playerList = [...sideBarList];

      let test = 0;
      for (let i = 0; i < pls.length; i++) {
        const res = setPlayerSelection(
          pls[i].playerId || pls[i].team_id,
          pls[i].matchId || pls[i].match_id,
          _selected,
          _playerList
        );
        _selected = res.selected;
        _playerList = [...res._playersList];
        dispatch(MLBActions.setStarPlayerCount(res._starPlayerCount));

        activateFilter(
          res.currentPlayer,
          res.currentPlayer?.type?.toLocaleLowerCase()
        );
        onSelectFilter(res.currentPlayer?.type?.toLocaleLowerCase(), false);
      }
      setSelected(_selected);
      setSidebarList(_playerList);
      document.getElementById("p-filter").click(); // Patch to activate P Tab in Edit Mode instead of D Tab
    }
  };
  const checkIfIsStarPlayer = (player) => {
    if (player?.type == "p" || player?.type == "P") {
      if (player?.playerStats?.earned_runs_average < 3.5) {
        return true;
      }
    } else {
      if (
        player?.playerStats?.batting_average > 0.29 ||
        player?.playerStats?.home_runs > 30
      ) {
        return true;
      }
    }
    return false;
  };

  const onPlayerSelectDeselect = useCallback(
    (id, matchId) => {
      //if (loading) return;

      const _selected = new Map(selected);
      const res = setPlayerSelection(id, matchId, _selected, sideBarList);

      dispatch(MLBActions.setStarPlayerCount(res._starPlayerCount));
      if (res.isPlayerSelectd) {
        setSelected(res.selected);

        setSidebarList(res._playersList);
        activateFilter(
          res.currentPlayer,
          res.currentPlayer?.type?.toLocaleLowerCase()
        );
        onSelectFilter(res.currentPlayer?.type?.toLocaleLowerCase(), false);
      }
    },
    [selected, selectedFilter, selectedData, isEdit]
  );

  const setPlayerSelection = (
    id,
    matchId,
    selected = new Map(),
    playerList = []
  ) => {
    const [currentPlayer] = allData?.filter((player) => {
      if (player?.type?.toLocaleLowerCase() === D) {
        return player?.team_id === id && player?.match_id === matchId;
      } else {
        return player?.playerId === id && player?.match_id === matchId;
      }
    });

    let _starPlayerCount = starPlayerCount;
    const selectionId = `${id} - ${matchId}`;

    //selected players
    const _playersList = [...playerList];

    if (!selected.get(selectionId)) {
      const [_player] = _playersList?.filter((player) => {
        let obj = {};
        if (currentPlayer?.type?.toLocaleLowerCase() === D) {
          obj = player?.team;
        } else {
          obj = player?.player;
        }

        return (
          player?.filter === currentPlayer?.type?.toLocaleLowerCase() &&
          isEmpty(obj)
        );
      });

      //show warning alert
      if (starPlayerCount >= 3 && checkIfIsStarPlayer(currentPlayer)) {
        dispatch(
          showToast(
            "You cannot have more than 3 Star Players on your team",
            "warning"
          )
        );

        return {
          selected,
          _playersList,
          currentPlayer,
          _starPlayerCount,
          isPlayerSelectd: false,
        };
      }

      if (!isEmpty(_player)) {
        let selectedObj = {};
        if (currentPlayer?.type?.toLocaleLowerCase() === D) {
          selectedObj = _player?.team;
        } else {
          selectedObj = _player?.player;
        }

        if (isEmpty(selectedObj)) {
          const playerListIndex = _playersList?.indexOf(_player);
          let player = { ..._player };

          if (currentPlayer?.type?.toLocaleLowerCase() === D) {
            player.team = { ...currentPlayer };
          } else {
            player.player = { ...currentPlayer };
          }
          player.type = currentPlayer?.type?.toLocaleLowerCase();
          player.matchId = currentPlayer?.match_id;
          _playersList[playerListIndex] = player;

          //Star Power Player selection (sidebar)
          if (starPlayerCount < 3 && checkIfIsStarPlayer(currentPlayer)) {
            player.isStarPlayer = checkIfIsStarPlayer(currentPlayer);
            selected.set(selectionId, !selected.get(selectionId));
            _starPlayerCount++;
          } else if (!checkIfIsStarPlayer(currentPlayer)) {
            selected.set(selectionId, !selected.get(selectionId));
          }

          selectedPlayerCount++;
        }
      }
    } else {
      let existingPlayerIndex = _playersList?.findIndex((player) => {
        if (currentPlayer?.type?.toLocaleLowerCase() === D) {
          return (
            player?.team?.team_id === id && player?.team?.match_id === matchId
          );
        } else {
          return (
            player?.player?.playerId === id &&
            player?.player?.match_id === matchId
          );
        }
      });
      if (existingPlayerIndex !== -1) {
        selected.set(selectionId, !selected.get(selectionId));

        if (starPlayerCount > 0 && checkIfIsStarPlayer(currentPlayer)) {
          _playersList[existingPlayerIndex].isStarPlayer = false;
          _starPlayerCount--;
        }

        _playersList[existingPlayerIndex].type = "";
        _playersList[existingPlayerIndex].matchId = "";

        if (currentPlayer?.type?.toLocaleLowerCase() === D) {
          _playersList[existingPlayerIndex].team = {};
        } else {
          _playersList[existingPlayerIndex].player = {};
        }
      }
      selectedPlayerCount--;
    }

    return {
      selected,
      _playersList,
      currentPlayer,
      _starPlayerCount,
      isPlayerSelectd: true,
    };
  };

  const onSelectFilter = useCallback(
    (type, isFilterSelected = true) => {
      if (loading) return;

      // reset search filter
      if (isFilterSelected)
        onSelectSearchDropDown({ team_id: "all", name: "All Teams" });

      setResetSearch(true);

      // if(isMobile)
      // {
      //   document.querySelectorAll("[class*=MLBpowerdFS_container__]")[0].scrollIntoView();
      // }
      // else {
      //   document.querySelector('[class*=PowerpickCard_card_wrapper__]').scroll(0,0)
      // }
     

      const [_selectedFilter] = filters?.filter(
        (filter) => filter.title === type
      );
      const [_selectedData] = data?.filter(
        (_data) =>
          `${_data?.type}`?.toLocaleLowerCase() ===
          `${_selectedFilter?.title}`?.toLocaleLowerCase()
      );
      if (isFilterSelected || isEdit) {
        setSelectedType(_selectedFilter?.title);
        setSelectedData(_selectedData);
        setSelectedFilter(_selectedFilter);
        setFilterdData(_selectedData);
      }
    },
    [
      selectedFilter,
      loading,
      setSelectedType,
      setSelectedData,
      setSelectedFilter,
      setFilterdData,
    ]
  );

  //increase/decrease filter counter.
  const activateFilter = (player, type) => {
    const [_selectedFilter] = filters?.filter(
      (filter) => filter?.title === type
    );
    const filter = _selectedFilter;
    let _remaining = filter?.remaining;
    let id = type === D ? player?.team_id : player?.playerId;
    const selectionId = `${id} - ${player?.match_id}`;

    if (_remaining > 0) {
      if (!!!selected.get(selectionId)) {
        _remaining -= 1;
      } else if (_remaining < 2) {
        _remaining += 1;
      }
      if (_remaining <= 0) {
        _remaining = 0;
        setSelectedFilter(filter);
      }
    } else if (!!selected.get(selectionId) && _remaining < 2) {
      _remaining++;
    } else {
      setSelectedFilter(_selectedFilter);
    }

    if (filter) {
      filter.remaining = _remaining;
      const filterIndex = filters?.findIndex(
        (filter) => filter?.id === _selectedFilter?.id
      );
      const _filters = [...filters];
      _filters[filterIndex] = filter;
      setFilters(_filters);
    }
  };

  const onDelete = (id, matchId) => {
    onPlayerSelectDeselect(id, matchId);
  };

  const onSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;
    var tempObj = [];
    var tempIds = [];
    if (!isEmpty(value)) {
      setSearchText(value);
      if (selectedData?.type == "d") {
        var _filterdData = selectedData?.listData?.filter((player) =>
          player?.city
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase())
        );
        var _filterdDataHomeTeam = selectedData?.listData?.filter((player) =>
          player?.name
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase())
        );
        for (var i = 0; i < _filterdData.length; i++) {
          var id = _filterdData[i].match_id;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdData[i]);
          }
        }
        for (var i = 0; i < _filterdDataHomeTeam.length; i++) {
          var id = _filterdDataHomeTeam[i].match_id;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdDataHomeTeam[i]);
          }
        }
      } else {
        var _filterdData = selectedData?.listData?.filter((player) =>
          player?.playerName
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase())
        );
        var _filterdDataHomeTeam = selectedData?.listData?.filter((player) =>
          player?.homeTeam
            ?.toLocaleLowerCase()
            ?.includes(value?.toLocaleLowerCase())
        );
        for (var i = 0; i < _filterdData.length; i++) {
          var id = _filterdData[i].playerId;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdData[i]);
          }
        }
        for (var i = 0; i < _filterdDataHomeTeam.length; i++) {
          var id = _filterdDataHomeTeam[i].playerId;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdDataHomeTeam[i]);
          }
        }
      }
      const _filterdDataObj = {
        type: selectedData?.type,
        listData: tempObj,
      };
      setFilterdData(_filterdDataObj);
    } else {
      setFilterdData(selectedData);
    }
  };

  const onSelectSearchDropDown = (team) => {
    if (team === selectedDropDown) return setSelectedDropDown(null);

    if (team) {
      if (team?.team_id !== "all") {
        const _filterdData = selectedData?.listData?.filter((player) => {
          return (
            player?.team_id === team?.team_id ||
            player?.awayTeam_id === team?.team_id
          );
        });

        const _filterdDataObj = {
          type: selectedData?.type,
          listData: _filterdData,
        };
        setFilterdData(_filterdDataObj);
      } else {
        setFilterdData(selectedData);
      }
    }

    setSelectedDropDown(team);
  };

  const onSubmitMLbSelection = async () => {
    setIsLoading(true);
    if (isEmpty(user)) {
      setIsLoading(false);
      return redirectTo(props, { path: "/login" });
    }

    if (selectedPlayerCount < 8) {
      setIsLoading(false);
      return;
    }

    const players = [];

    for (let i = 0; i < sideBarList?.length - 1; i++) {
      players.push({
        playerId: sideBarList[i]?.player?.playerId,
        matchId: sideBarList[i]?.player?.match_id,
      });
    }

    const [teamD] = sideBarList?.filter((team) => team?.type === D);
    const { team = {} } = teamD || {};

    if (!isEmpty(team) && players?.length === 7) {
      // TODO: Fix user_id issue
      const payload = {
        game_id: game_id,
        sport_id: sport_id,
        user_id: user_id,
        players: [...players],
        team_d_id: team?.team_id,
        match_id: teamD?.team?.match_id,
        team_id: selector_team_id,
      };
      if (isEdit) {
        await dispatch(MLBActions.editDfsTeamPlayer(payload));
        setIsLoading(false);
      } else {
        await dispatch(MLBActions.saveAndGetSelectPlayers(payload));
        if (isPaid || isPaid === null) {
          if (currency !== "PWRS") {
            dispatch(MLBActions.calculateAdminFee(user_id, game_id));
          }
          dispatch(MLBActions.deductUserBalance(user_id, game_id));
          dispatch(MLBActions.savePrizePool(user_id, game_id));
        }
        setIsLoading(false);
      }
      redirectTo(props, { path: "/my-game-center" });
      setIsLoading(false);
    }
  };

  const isAfterTime = (date, time) => {
    const adminDate = moment(game_set_start).clone().format("YYYY-MM-DD");
    const adminTime = moment(`${game_set_start} ${start_time}`)
      .clone()
      .format("HH:MM");

    const playerDate = moment(date).clone().format("YYYY-MM-DD");
    const playerTime = moment(`${date} ${time}`).clone().format("HH:MM");

    const isSameOrAfter = moment(
      moment(`${playerDate} ${time}`).clone().format("YYYY-MM-DD HH:MM")
    ).isSameOrAfter(
      moment(`${adminDate} ${adminTime}`).clone().format("YYYY-MM-DD HH:MM")
    );

    return isSameOrAfter;
  };

  const ContestScoringRow = ({ item = {}, width = {} }) => (
    <div className={classes.scoring_row}>
      <p>{item?.plays}</p>{" "}
      <span className={width && width}>+{item?.points} pts</span>
    </div>
  );

  const ContestScoringColumn = ({ data = [], styles = {}, title = "" }) => (
    <div className={classes.scoring_column} style={styles}>
      <div
        className={classes.scoring_title}
        style={{
          marginTop: title == "Team Defence" && 38,
          marginBottom: 6,
        }}
      >
        <p>{title}</p>
      </div>
      {data &&
        data?.length &&
        data.map((item, index) => {
          return (
            <div className={classes.scoring_body}>
              <ContestScoringRow item={item} key={index + "-"} />
            </div>
          );
        })}
    </div>
  );

  const ContestSummaryRow = ({ text = <></> }) => (
    <div className={classes.column_row}>
      <Tick2 size={17} />
      {text}
    </div>
  );

  const ContestColumn = ({
    title = "",
    widthClass = {},
    styles = {},
    children = <></>,
  }) => (
    <div
      className={`${classes.footer_column} ${widthClass && widthClass}`}
      style={styles}
    >
      <div className={classes.column_title}>
        <p>{title}</p>
      </div>
      {children}
    </div>
  );

  const RenderIcon = ({ title, count, Icon, iconSize = 24 }) => (
    <div className={classes.body_card}>
      <span>{count}</span>
      <img src={Icon} alt="" />
      <p>{title}</p>
    </div>
  );

  const getBackgroundImageWithStyle = () => {
    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
      backgroundColor: "#17181a",
      backgroundImage: `url(${MLBFooterImage})`,
      backgroundSize: "cover",
      opacity: 0.6,
    };

    // backgroundImageStyle.backgroundPosition = "-16px -13px";

    return backgroundImageStyle;
  };

  const [showPowerInfoModal, setShowPowerInfoModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const focusRef = useRef();
  const sheetRef = useRef();

  const powerInfoModal = () => {
    return (
      <>
        <ModalBottom visible={showPowerInfoModal}>
          <div className={classes.__info_modal}>
            <div className={classes.__close_icon}>
              <img
                src={CloseIconGrey}
                width="20px"
                height="20px"
                onClick={() => setShowPowerInfoModal(false)}
                alt=""
              />
            </div>
            <div className={classes.__powerInfoModalTitle}>
              <span>MY</span> POWERS
            </div>
            <br />
            <div className={classes.__powers_available}>
              <RenderIcon
                title="Point Booster"
                Icon={PointMultiplierIcon}
                iconSize={54}
                count={pointMultiplierCounts}
              />

              <RenderIcon
                title="Swap Player"
                Icon={SwapPlayerIcon}
                iconSize={54}
                count={swapCounts}
              />

              <RenderIcon
                title="D-Wall"
                Icon={DWallIcon}
                iconSize={54}
                count={dwallCounts}
              />
            </div>
            <div className={classes.__powers_available}>
              <RenderIcon
                title="Challenge"
                Icon={ChallengeIcon}
                iconSize={54}
                count={challengeCounts}
              />
              <RenderIcon
                title="Retro Boost"
                Icon={RetroBoostIcon}
                iconSize={24}
                count={retroBoostCounts}
              />
              <RenderIcon
                title="Power Up"
                Icon={PowerUpIcon}
                iconSize={54}
                count={powerUpCounts}
              />
            </div>

            <div className={classes.__buttons_div}>
              <ContestRulesPopUp
                points={points}
                powers={powers}
                component={({ showPopUp }) => (
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      showPopUp();
                    }}
                    title={"Gameplay Rules"}
                    icon={
                      <img
                        src={ContestRuleIcon}
                        width="18"
                        height="18"
                        alt=""
                      />
                    }
                    styles={{
                      marginRight: "10px",
                      backgroundColor: "rgba(242, 242, 242, 0.1)",
                      border: "0px",
                    }}
                  />
                )}
              />
              <Button
                title={"Prize Grid"}
                icon={<img src={PrizeCupIcon} width="18" height="18" alt="" />}
                styles={{
                  backgroundColor: "rgba(242, 242, 242, 0.1)",
                  border: "0px",
                }}
                onClick={() => setPrizeModalState(true)}
              />
            </div>
          </div>
        </ModalBottom>
      </>
    );
  };

  const setSelectedTop = (arr) => {
      let selectionArr = [];
      let nonSelectionArr = [];
      for(let i = 0; i < arr.length; i++)
      {
        if(selectedFilter?.title === D)
        {
          if(!!selected.get(
            `${arr[i]?.team_id} - ${arr[i]?.match_id}`
          ))
          {
            selectionArr.push(arr[i]);
          }
          else {
            nonSelectionArr.push(arr[i]);
          }
        }
        else {
          if(!!selected.get(
            `${arr[i]?.playerId} - ${arr[i]?.match_id}`
          ))
          {
            selectionArr.push(arr[i]);
          }
          else {
            nonSelectionArr.push(arr[i]);
          }
        }
      }
      return selectionArr.concat(nonSelectionArr);
  };

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header4
          outof={outOf}
          enrolledUsers={enrolledUsers}
          points={points}
          powers={powers}
          titleMain1="MLB"
          titleMain2="PowerdFS"
          subHeader1="Introducing Live-Play Fantasy Baseball"
          subHeader2={
            <>
              Use your <span>Powers</span> during the live game to drive your
              team up the standings
            </>
          }
          contestBtnTitle="Gameplay Rules"
          prizeBtnTitle="Prize Grid"
          bgImageUri={isMobile ? BaseballImageMobile : BaseballImage}
          onClickPrize={() => setPrizeModalState(true)}
          token={token}
          isMobile={isMobile}
        />

        <div className={classes.container}>
          <div className={classes.container_left}>
            {!isMobile && (
              <>
                {isEdit ? (
                  <button
                    onClick={onGoBack}
                    className={`${classes.button_back}`}
                  >
                    <BackArrow /> &nbsp; Go to My Game center
                  </button>
                ) : (
                  ""
                )}
                <h2>
                  {loading
                    ? "Loading..."
                    : isEdit
                      ? "Edit your team"
                      : "Select your team"}
                </h2>
                <div className={classes.container_left_header_2}>
                  <p>7 starters + 1 team D</p> <span className={classes.line} />
                </div>
              </>
            )}

            <div className={classes.container_top}>
              {!isMobile && <p>Select Position</p>}
              <div className={classes.container_top_1}>
                <SportsFilters
                  data={filters}
                  onSelect={onSelectFilter}
                  selectedFilter={selectedFilter}
                />
                <Search
                  onSearch={onSearch}
                  //onSelect={onSelectSearchDropDown}
                  //dropDown={dropDownState}
                  selected={selectedDropDown}
                  placeholder={"Search by player or team name..."}
                  isReset={resetSearch}
                  setResetSearch={setResetSearch}
                />
              </div>
            </div>
            {isMobile && (
              <div className={classes.select_team_info}>
                {headerText[selectedFilter?.id - 1]?.text}
              </div>
            )}

            <div className={classes.container_body}>
              <Card>
                {loading ? (
                  <p className={classes.loading_view}>Loading...</p>
                ) : (
                  <>
                    {!isMobile && (
                      <div className={classes.card_header}>
                        <p>{headerText[selectedFilter?.id - 1]?.text}</p>
                      </div>
                    )}

                    <div className={classes.card_body}>
                      {filterdData && filterdData?.listData?.length ? (
                        setSelectedTop(filterdData?.listData)?.map((item, index) => (
                          <>
                            {selectedFilter?.title === D ? (
                              /*Remove isAfterTime function from here because edit picks was not working due to this function*/
                              (item?.date, item?.time) && (
                                <SportsTeamSelectionCard
                                  item={item}
                                  isSelected={
                                    !!selected.get(
                                      `${item.team_id} - ${item.match_id}`
                                    )
                                  }
                                  key={item?.team_id + " - " + item?.match_id}
                                  onSelectDeselect={onPlayerSelectDeselect}
                                  disabled={
                                    item.isStarPlayer &&
                                    item.isStarPlayer &&
                                    starPowerIndex >= 3
                                  }
                                  mlbCard
                                />
                              )
                            ) : (
                              /*Remove isAfterTime function from here because edit picks was not working due to this function*/
                              <>
                                {(item?.date, item?.time) && (
                                  <>
                                    <SelectionCard3
                                      player={item}
                                      isSelected={
                                        !!selected.get(
                                          `${item.playerId} - ${item?.match_id}`
                                        )
                                      }
                                      key={
                                        item.playerId + " - " + item?.match_id
                                      }
                                      loading={loading}
                                      onSelectDeselect={onPlayerSelectDeselect}
                                      pageType={PAGE_TYPES.MLB}
                                      type={selectedData?.type}
                                    // disabled={
                                    //   item.isStarPlayer &&
                                    //   item.isStarPlayer &&
                                    //   starPlayerCount >= 3
                                    // }
                                    />
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ))
                      ) : (
                        <p>No Data</p>
                      )}
                    </div>
                  </>
                )}
              </Card>
              {!isMobile && (
                <img
                  src={AcceleRadar}
                  className={classes.partner_logo}
                  alt=""
                />
              )}
            </div>

            {isMobile ? (
              <>
                <div className={classes.container_footer}>
                  <div className={classes.container_footer_header}>
                    <div className={classes.container_footer_title}>
                      <h2>Contest Rules</h2>
                      <span className={classes.separator} />
                    </div>
                  </div>

                  <div className={classes.__mobilefooter}>
                    <div
                      style={getBackgroundImageWithStyle()}
                      className={classes.__mobilefooterimage}
                    ></div>

                    <ContestColumn title="" widthClass={classes.width_200}>
                      <div className={classes.column_body}>
                        <ContestSummaryRow
                          text={
                            <p>
                              <span>
                                <CurrencyFormat
                                  value={prizePool}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                  renderText={(value) => <div>{value}</div>}
                                />
                              </span>{" "}
                              Prize Pool
                            </p>
                          }
                        />
                        <ContestSummaryRow
                          text={
                            <p>
                              Live-play <span>Powers</span> included with <br />
                              entry fee
                            </p>
                          }
                        />
                        <ContestSummaryRow
                          text={
                            <p>
                              Pick players from any teams scheduled to play on{" "}
                              <span>
                                {dateFormat(gameStartTime, "mmmm dS, yyyy")}
                              </span>
                            </p>
                          }
                        />
                      </div>
                    </ContestColumn>

                    <div className={classes.__see_full_rules}>
                      <ContestRulesPopUp
                        points={points}
                        powers={powers}
                        component={({ showPopUp }) => (
                          <button
                            onClick={showPopUp}
                            className={classes.footer_full_rules}
                            href="#"
                          >
                            See Full Rules <img src={RightArrow} alt="" />
                          </button>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={classes.container_footer}>
                <div className={classes.container_footer_header}>
                  <ContestRulesIcon />
                  <div className={classes.container_footer_title}>
                    <h2>Contest Rules</h2>
                    <span className={classes.separator} />
                  </div>
                </div>
                <div className={classes.container_footer_1}>
                  <div className={classes.container_footer_2}>
                    <div className={classes.container_tabs}>
                      <Tabs
                        selectedIndex={activeTab}
                        onSelect={(tabIndex) => {
                          setActiveTab(tabIndex);
                        }}
                      >
                        <TabList className={classes.tabs_header}>
                          <Tab
                            className={`${activeTab === 0 && classes.active}`}
                          >
                            Summary
                          </Tab>
                          <Tab
                            className={`${activeTab === 1 && classes.active}`}
                          >
                            Scoring
                          </Tab>
                          <Tab
                            className={`${activeTab === 2 && classes.active} ${classes.__last_tab_header
                              }`}
                          >
                            Powers Available
                          </Tab>
                        </TabList>

                        <div className={classes.tab_body}>
                          <TabPanel>
                            <ContestColumn
                              title=""
                              widthClass={classes.width_200}
                            >
                              <div className={classes.column_body}>
                                <ContestSummaryRow
                                  text={
                                    <p>
                                      <span>
                                        <CurrencyFormat
                                          value={prizePool}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          prefix={"$"}
                                          renderText={(value) => (
                                            <div>{value}</div>
                                          )}
                                        />
                                      </span>{" "}
                                      Prize Pool
                                    </p>
                                  }
                                />
                                <ContestSummaryRow
                                  text={
                                    <p>
                                      Live-play <span>Powers</span> included
                                      with entry fee
                                    </p>
                                  }
                                />
                                <ContestSummaryRow
                                  text={
                                    <p>
                                      Pick players from any teams scheduled to
                                      play on{" "}
                                      <span>
                                        {dateFormat(
                                          gameStartTime,
                                          "mmmm dS, yyyy"
                                        )}
                                      </span>
                                    </p>
                                  }
                                />
                              </div>
                            </ContestColumn>
                          </TabPanel>

                          <TabPanel>
                            <ContestColumn title="">
                              <div className={classes.contest_scoring_wrapper}>
                                {Object.keys(points).map((data, index) => {
                                  return (
                                    <>
                                      <ContestScoringColumn
                                        title={Object.keys(points)[index]}
                                        data={
                                          points[Object.keys(points)[index]]
                                        }
                                      />
                                    </>
                                  );
                                })}
                              </div>
                            </ContestColumn>
                          </TabPanel>
                          <TabPanel>
                            <div className={classes.__powers_available}>
                              <RenderPower
                                title="Point Booster"
                                isSvgIcon
                                Icon={XpIcon}
                                count={pointMultiplierCounts}
                              />
                              <RenderPower
                                title="Swap Player"
                                isSvgIcon
                                Icon={ReplaceIcon}
                                count={swapCounts}
                              />
                              <RenderPower
                                title="D-Wall"
                                isSvgIcon
                                Icon={ShieldIcon}
                                count={dwallCounts}
                              />
                            </div>
                            <div className={classes.__powers_available}>
                              <RenderPower
                                title="Challenge"
                                isSvgIcon
                                Icon={ChallengeIcons}
                                count={challengeCounts}
                              />
                              <RenderPower
                                title="Retro Boost"
                                isSvgIcon
                                Icon={RetroBoostIcons}
                                count={retroBoostCounts}
                              />
                              <RenderPower
                                title="Power Up"
                                isSvgIcon
                                Icon={PowerUpIcons}
                                count={powerUpCounts}
                              />
                            </div>
                          </TabPanel>
                        </div>
                      </Tabs>
                    </div>
                  </div>
                  <div className={classes.__see_full_rules}>
                    <ContestRulesPopUp
                      points={points}
                      powers={powers}
                      component={({ showPopUp }) => (
                        <button
                          onClick={showPopUp}
                          className={classes.footer_full_rules}
                          href="#"
                        >
                          See Full Rules <img src={RightArrow} alt="" />
                        </button>
                      )}
                    />
                  </div>
                </div>

                <img
                  src={MLBFooterImage}
                  className={classes.container_body_img}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className={classes.sidebar_container}>
            <Sidebar styles={{ padding: 20 }}>
              <CashPowerBalance
                showIcons={false}
                entryFee={entry_fee}
                currency={currency}
                powerBalance={topPrize}
                cashBalance={prizePool}
                styles={{
                  marginTop: "-40px",
                }}
                entryTitle="Entry Fee"
                cashTitle="Prize Pool"
                powerTitle="Top Prize"
                centered
              />

              <PowerCollapesible powers={powers} game_type={game_type} />

              <div className={classes.sidebar_header}>
                <h2>My Selections</h2>
                <div className={classes.sidebar_header_1}>
                  <p>
                    <span>
                      <img src={StarImg} className={classes.smallImg} alt="" />
                      Star Power
                    </span>{" "}
                    players selected
                  </p>
                </div>
                <div className={classes.sidebar_circles}>
                  <StarPlayersCheck
                    totalStarPlayers={3}
                    selectedCount={starPlayerCount}
                  />
                </div>
              </div>
              <SportsSidebarContent
                data={sideBarList}
                onDelete={(id, matchId) => onDelete(id, matchId)}
                starIcon={StarImg}
                selectedPlayerCount={selectedPlayerCount}
              />
              {isLoading ? (
                <button className={classes.sidebar_button}>
                  Submitting...
                </button>
              ) : (
                <button
                  className={classes.sidebar_button}
                  onClick={onSubmitMLbSelection}
                >
                  Submit!
                </button>
              )}
            </Sidebar>
          </div>
        </div>
      </div>
      <Footer isBlack={true} />

      {isMobile && (
        <BottomSheet
          open
          skipInitialTransition
          ref={sheetRef}
          initialFocusRef={focusRef}
          defaultSnap={({ maxHeight }) => maxHeight / 2}
          snapPoints={({ maxHeight }) => [
            maxHeight - maxHeight / 10,
            selectedPlayerCount === sideBarList.length
              ? maxHeight / 5.3
              : maxHeight / 8,
            // maxHeight * 0.6,
          ]}
          blocking={false}
          expandOnContentDrag
          onSpringEnd={(event) => {
            if (event.type === "SNAP") {
              if (sheetRef.current.height > window.innerHeight / 5.3) {
                setIsExpanded(true);
              } else {
                setIsExpanded(false);
              }
            }
          }}
        >
          {!isExpanded && (
            <>
              <div className={classes.sidebar_header}>
                <p className={classes.sidebar_player_count_text}>
                  {selectedPlayerCount}/{sideBarList?.length} Starting Players
                  Selected
                </p>
                <div className={classes.sidebar_header_1}>
                  <p>
                    <span>
                      <img src={StarImg} className={classes.smallImg} />
                      Star Power
                    </span>{" "}
                    players
                    <span className={classes.sidebar_circles_snap_half}>
                      <StarPlayersCheck
                        totalStarPlayers={3}
                        selectedCount={starPlayerCount}
                      />
                    </span>
                  </p>
                </div>
              </div>

              {selectedPlayerCount === sideBarList.length && (
                <button
                  className={classes.sidebar_button}
                  onClick={onSubmitMLbSelection}
                >
                  Submit!
                </button>
              )}
            </>
          )}

          {isExpanded && (
            <>
              <div className={classes.sidebar_header}>
                <h2>My Selections</h2>
                <div className={classes.sidebar_header_1}>
                  <p>
                    <span>
                      <img src={StarImg} className={classes.smallImg} />
                      Star Power
                    </span>{" "}
                    players selected
                  </p>
                </div>
                <div className={classes.sidebar_circles}>
                  <StarPlayersCheck
                    totalStarPlayers={3}
                    selectedCount={starPlayerCount}
                  />
                </div>
              </div>

              <SportsSidebarContent
                data={sideBarList}
                onDelete={(id, matchId) => onDelete(id, matchId)}
                starIcon={StarImg}
                selectedPlayerCount={selectedPlayerCount}
              />

              <button
                className={classes.sidebar_button}
                onClick={onSubmitMLbSelection}
              >
                Submit!
              </button>
            </>
          )}
        </BottomSheet>
      )}

      {isMobile && (
        <ButtonFloating
          isRounded
          transparent
          icon={<img src={MenuIcon} width="58" height="58" alt="" />}
          iconOnly={true}
          onClick={() => setShowPowerInfoModal(true)}
        />
      )}

      {showPowerInfoModal && powerInfoModal()}
      <PrizeModal
        visible={showPrizeModal}
        sportsName="MLB"
        data={prizes}
        onClose={() => setPrizeModalState(false)}
      />
    </>
  );
}

export default MLBPowerdFs;
