import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { isEmpty, cloneDeep, uniqBy } from "lodash";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat";
import _ from "underscore";
import { showToast } from "../../actions/uiActions";
import MobileBalance from "../../components/MobileBalance";
import * as NHLActions from "../../actions/NHLActions";
import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import NHLHeaderImage from "../../assets/hockey2.png";
import NHLHeaderImageMobile from "../../assets/hockey3.png";
import Tick2 from "../../icons/Tick2";
import ContestRulesIcon from "../../icons/ContestRules";
import RightArrow from "../../assets/right-arrow.png";
import NHLFooterImage from "../../assets/NHL.png";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import SportsSidebarContent from "../../components/SportsSidebarContent/indexNHL";
import SelectionCard3 from "../../components/SportsSelectionCard3";
import EmployeeIcon from "../../icons/Employee";
import SportsFilters from "../../components/SportsFilters";
import Search from "../../components/SearchInput";
import CustomDropDown from "../../components/CustomDropDown";
import PowerCollapesible from "../../components/PowerCollapesible";
import { CONSTANTS } from "../../utility/constants";
import AcceleRadar from "../../assets/partners/acceleradar.png";
import StarImg from "../../assets/star.png";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";
import StarPlayersCheck from "../../components/StarPlayersCheck";
import PrizeModal from "../../components/PrizeModal";
import { PAGE_TYPES } from "../../components/SportsSelectionCard3/PageTypes";
import SportsTeamSelectionCard from "../../components/SportsTeamSelectionCardNHL";
import Button from "../../components/Button";
import ButtonFloating from "../../components/ButtonFloating";
import ModalBottom from "../../components/ModalBottom";
import { showDepositForm } from "../../actions/uiActions";

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
import PowerUpIcon from '../../assets/power-up-icon.svg';
import BackArrow from "../../icons/BackArrow";

import { useMediaQuery } from "react-responsive";
import { printLog, redirectTo } from "../../utility/shared";
import { dummyData } from "./dummyData";

import { BottomSheet } from "react-spring-bottom-sheet";
import "./bottomSheetStyles.scss";

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

const { CENTER, XW, D, G, TD } = CONSTANTS.FILTERS.NHL;

const SIDEBAR_INITIAL_LIST = [
  {
    title: CENTER,
    filter: CENTER,
    name: "",
    id: "",
  },
  {
    title: `${XW}1`,
    filter: XW,
    name: "",
    id: "",
  },
  {
    title: `${XW}2`,
    filter: XW,
    name: "",
    id: "",
  },
  {
    title: `${XW}3`,
    filter: XW,
    name: "",
    id: "",
  },
  {
    title: `${D}1`,
    filter: D,
    name: "",
    id: "",
  },
  {
    title: `${D}2`,
    filter: D,
    name: "",
    id: "",
  },
  {
    title: G,
    filter: G,
    name: "",
    id: "",
  },
  {
    title: TD,
    icon: EmployeeIcon,
    filter: TD,
    name: "",
    id: "",
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
export const TeamDdata =[
  {teamName:"Anaheim Ducks",shortName:"Ducks",trackingLink:"https://fanatics.93n6tx.net/kjkXRx"},
  {teamName:"Arizona Coyotes",shortName:"Coyotes",trackingLink:"https://fanatics.93n6tx.net/c/2068372/620810/9663"},
  {teamName:"Boston Bruins",shortName:"Bruins",trackingLink:"https://fanatics.93n6tx.net/c/2068372/620812/9663"},
  {teamName:"Buffalo Sabres",shortName:"Sabres",trackingLink:"https://fanatics.93n6tx.net/c/2068372/620814/9663"},
  {teamName:"Calgary Flames",	shortName:"Flames",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620815/9663"},
  {teamName:"Carolina Hurricanes",	shortName:"Hurricanes",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620816/9663"},
  {teamName:"Chicago Blackhawks",	shortName:"Blackhawks",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620817/9663"},
  {teamName:"Colorado Avalanche",	shortName:"Avalanche",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620819/9663"},
  {teamName:"Columbus Blue Jackets",	shortName:"Blue Jackets",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620820/9663"},
  {teamName:"Dallas Stars",	shortName:"Stars",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620822/9663"},
  {teamName:"Detroit Red Wings",	shortName:"Red Wings",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620823/9663"},
  {teamName:"Edmonton Oilers",	shortName:"Oilers",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620824/9663"},
  {teamName:"Florida Panthers",	shortName:"Panthers",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620825/9663"},
  {teamName:"Los Angeles Kings",	shortName:"Kings",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620826/9663"},
  {teamName:"Minnesota Wild",	shortName:"Wild",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620828/9663"},
  {teamName:"Montreal Canadiens",	shortName:"Canadiens",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620830/9663"},
  {teamName:"Nashville Predators",	shortName:"Predators",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620831/9663"},
  {teamName:"New Jersey Devils",	shortName:"Devils",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620833/9663"},
  {teamName:"New York Islanders",	shortName:"Islanders",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620835/9663"},
  {teamName:"New York Rangers",	shortName:"Rangers",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620836/9663"},
  {teamName:"Ottawa Senators",	shortName:"Senators",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620838/9663"},
  {teamName:"Philadelphia Flyers",	shortName:"Flyers",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620839/9663"},
  {teamName:"Pittsburgh Penguins",	shortName:"Penguins",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620840/9663"},
  {teamName:"San Jose Sharks",	shortName:"Sharks",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620841/9663"},
  {teamName:"Seattle Kraken",	shortName:"Kraken",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/860547/9663?subId1=Seattle_Kraken"},
  {teamName:"St. Louis Blues",	shortName:"Blues",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620842/9663"},
  {teamName:"Tampa Bay Lightning",	shortName:"Lightning",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620843/9663"},
  {teamName:"Toronto Maple Leafs",	shortName:"Maple Leafs",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620844/9663"},
  {teamName:"Vancouver Canucks",	shortName:"Canucks",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620845/9663"},
  {teamName:"Vegas Golden Knights",	shortName:"Golden Knights",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620846/9663"},
  {teamName:"Washington Capitals",	shortName:"Capitals",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620847/9663"},
  {teamName:"Winnipeg Jets",	shortName:"Jets",	trackingLink:"https://fanatics.93n6tx.net/c/2068372/620848/9663"},
  
]

const FILTERS_INITIAL_VALUES = [
  {
    id: 1,
    title: CONSTANTS.FILTERS.NHL.CENTER,
    remaining: 1,
  },
  {
    id: 2,
    title: CONSTANTS.FILTERS.NHL.XW,
    remaining: 3,
  },
  {
    id: 3,
    title: CONSTANTS.FILTERS.NHL.D,
    remaining: 2,
  },
  {
    id: 4,
    title: CONSTANTS.FILTERS.NHL.G,
    remaining: 1,
  },
  {
    id: 5,
    title: CONSTANTS.FILTERS.NHL.TD,
    remaining: 1,
  },
];

const basicRules = [
  "No purchase necessary.",
  "Open to residents of United States who are over the age of majority.",
  "Contest closes at 11:59pm ET - April 22, 2020.",
];

const detailRules = [
  "Five (5) prizes to be won. See full rules for complete details of all prizes.",
  "One entry per person.",
  "Odds of winning depend on player knowledge.",
  "Mathematical skill testing question must be correctly answered to win.",
];

let starPlayerCount = 0;
const dropDown = [
  { title: "Team A" },
  { title: "Team B" },
  { title: "Team C" },
  { title: "Team D" },
];

const headerText = [
  {
    id: 1,
    text: `Select 1 Center.`,
  },
  {
    id: 2,
    text: `Select 3 Wingers.`,
  },
  {
    id: 3,
    text: `Select 2 Defensemen.`,
  },
  {
    id: 4,
    text: `Select 1 Goaltender.`,
  },
  {
    id: 5,
    text: `Select 1 Team Defense, Shots and Goals against will result in negative points for your team.`,
  },
];

const MenuDataList = [
  {
    label: `Start Time`,
    value: `Sort Players by Start Time`,
  },
  {
    label: `Player Name`,
    value: `Sort Players by Player Name`,
  },
  {
    label: `Goals Scored`,
    value: `Sort Players by Goals Scored`,
  },
  {
    label: 'Total Points',
    value: `Sort Players by Total Points`,
  }
];

let starPowerIndex = 0;
let selectedPlayerCount = 0;

function NHLPowerdFs(props) {
  // console.log("NHLPowerdFs props",props)
  const onGoBack = () => {
    redirectTo(props, { path: "/my-game-center" });
  };
  const [selected, setSelected] = useState(new Map());
  const [selectedFilter, setSelectedFilter] = useState(
    FILTERS_INITIAL_VALUES[0]
  );
  const [sideBarList, setSidebarList] = useState(SIDEBAR_INITIAL_LIST);
  const [filters, setFilters] = useState(FILTERS_INITIAL_VALUES);
  const [displayGameName, setDisplayGameName] = useState();
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
  const [isPaid, setIsPaid] = useState(true);
  const [teamDMatchId, setTeamDMatchId] = useState("");

  
  const [data, setData] = useState([]);
  const [selectMenuData, setSelectMenuData] = useState(MenuDataList[0].value);
  const [search, setSearch] = useState("");

  let {
    // data = [],
    starPlayerCount = 0,
    game_id,
    sport_id,
    isEdit = false,
    allData = [],
    savedPlayers = [],
  } = useSelector((state) => state.nhl);

  const selector_team_id = useSelector((state) => state?.nhl?.team_id);

  const { auth: { user = {} } = {} } = useSelector((state) => state);

  const { token = "", user_id } = user || {};

  const dispatch = useDispatch();
  const history = useHistory();
  const cardRef = useRef(null)

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
    game_type = "",
    powerdfs_challenge_amount = 0,
    game_edit = false,
  } = history?.location?.state || {};
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  //reset the states
  useEffect(() => {
    if (isEdit) {
      dispatch(NHLActions.setStarPlayerCount(starPlayerCount));
    } else {
      dispatch(NHLActions.setStarPlayerCount(0));
    }

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
      dispatch(NHLActions.setEditPlayers({ data: [], isEdit: false }));
    };
  }, []);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  // const getImagePath=(imgName)=>{
  //   let filteredData = TeamDdata.filter(x => x?.shortName == imgName);
  //     return filteredData
    
  // }
  const getData = async () => {
    setLoading(true);
    const response = await dispatch(
      NHLActions.getFantasyPlayers(history.location?.state?.game_id)
    );

    console.log("response: ", response);
    // response.display_game_name

    if (response) {
      setData(response?.filterdList);

      const { filterdList = [], allData = [] } = response || {};
      let FilterDateView = filterdList[0]?.listData;
      if (selectMenuData === MenuDataList[0].value) {
        let sorterDate = (a, b) => {
          return (new Date(a?.match?.scheduled) - new Date(b?.match?.scheduled)) ||
            ((a.full_name > b.full_name) ? 1 : -1) ||
            (parseInt(b?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.goals)) -
              parseInt(a?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.goals))))) ||
            (parseInt(b?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.points)) -
              parseInt(a?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.points)))));
        }
        FilterDateView?.sort(sorterDate);
        SortSelectedOnTop(FilterDateView,sorterDate)
      }
      setFilterdData(filterdList[0]);
      setSelectedData(filterdList[0]);
      setDisplayGameName(response.display_game_name);

      //set dropdown
      const _dropDownlist = filterdList?.filter(
        (list) => list?.type === "td" || list?.type === "TD"
      );
      const dropDownTeams = [
        {
          team_id: "all",
          name: "All Teams",
        },
        ..._dropDownlist?.[0]?.listData,
      ];
      const noDuplicatedTeam = uniqBy(dropDownTeams, (team) => team.id);
      setDropDownTeam(noDuplicatedTeam);

      console.log("filterd Data: ", filterdData);
    }

    setLoading(false);
  };

  useEffect(() => {
    autoSelectOnEdit();
  }, [isEdit, loading]);

  const autoSelectOnEdit = () => {
    if (isEdit === true && !loading && selected.entries().next().done) {
      // console.log("savedPlayers");
      const pls = [];
      savedPlayers.forEach((element) => {
        if (element?.type?.toLocaleLowerCase() === TD) {
          setTeamDMatchId(element?.match?.id)
        }
        //   pls.push({
        //     team_id: element?.id,
        //     matchId: element?.match_id,
        //   });
        // } else {
        pls.push({
          id: element?.id,
          matchId: element?.match?.id,
        });
        // }
      });
      console.log("pls",sideBarList);
      // console.log(pls);

      let _selected = new Map(selected);
      let _playerList = [...sideBarList];

      for (let i = 0; i < pls.length; i++) {
        const res = setPlayerSelection(
          pls[i].id || pls[i].id,
          pls[i].matchId || pls[i]?.match_id,
          _selected,
          _playerList
        );
        _selected = res.selected;
        _playerList = [...res._playersList];
        dispatch(NHLActions.setStarPlayerCount(res._starPlayerCount));
        activateFilter(
          res.currentPlayer,
          res.currentPlayer?.fantasyPlayerPosition?.toLocaleLowerCase()
        );
        onSelectFilter(
          res.currentPlayer?.fantasyPlayerPosition?.toLocaleLowerCase(),
          false
        );
      }
      setSelected(_selected);
      setSidebarList(_playerList);
      document.getElementById("c-filter").click(); // Patch to activate P Tab in Edit Mode instead of D Tab
    }
  };

  const onPlayerSelectDeselect = useCallback(
    (id, matchId) => {
      // if (loading) return;

      const _selected = new Map(selected);
      const res = setPlayerSelection(id, matchId, _selected, sideBarList);
      console.log("RES: ", res);

      dispatch(NHLActions.setStarPlayerCount(res._starPlayerCount));
      setSelected(res.selected);
      setSidebarList(res._playersList);
      activateFilter(
        res.currentPlayer,
        res.currentPlayer?.type?.toLocaleLowerCase()
      );
      //onSelectFilter(res.currentPlayer?.type?.toLocaleLowerCase(), false);
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
      if (player?.type?.toLocaleLowerCase() === TD) {
        if(player?.id === id)setTeamDMatchId(matchId )
        return player?.id === id;
      } else {
        return player?.id === id && player?.match?.id === matchId;
      }
    });

    let _starPlayerCount = starPlayerCount;
    const selectionId = `${id} - ${matchId}`;
    //selected players
    const _playersList = [...playerList];
    if (!selected.get(selectionId)) {
      const [_player] = _playersList?.filter((player) => {
        let obj = {};
        if (currentPlayer?.type?.toLocaleLowerCase() === TD) {
          obj = player?.team;
        } else {
          obj = player?.player;
        }

        return (
          player?.filter === currentPlayer?.type?.toLocaleLowerCase() &&
          isEmpty(obj)
        );
      });
      if (!isEmpty(_player)) {
        let selectedObj = {};
        if (currentPlayer?.type?.toLocaleLowerCase() === TD) {
          selectedObj = _player?.team;
        } else {
          selectedObj = _player?.player;
        }

        if (isEmpty(selectedObj)) {
          if (
            starPlayerCount >= 3 &&
            (currentPlayer?.is_starPlayer || currentPlayer?.is_starTeamD)
          ) {
            dispatch(
              showToast(
                "You have reached the Star Power limit for your team. Please select another player or team that does not have the 'Star Power' identifier.",
                "success",
                { placement: "bottom-center" }
              )
            );
          } else {
            const playerListIndex = _playersList?.indexOf(_player);
            let player = { ..._player };

            if (currentPlayer?.type?.toLocaleLowerCase() === TD) {
              player.team = { ...currentPlayer };
              player.is_starTeamD = currentPlayer?.is_starTeamD;
            } else {
              player.player = { ...currentPlayer };
            }
            player.type = currentPlayer?.type?.toLocaleLowerCase();
            player.matchId = currentPlayer?.match?.id;
            player.is_starPlayer = currentPlayer?.is_starPlayer;
            _playersList[playerListIndex] = player;

            selected.set(selectionId, !selected.get(selectionId));
            //Star Power Player selection (sidebar)
            if (
              starPlayerCount < 3 &&
              (currentPlayer?.is_starPlayer || currentPlayer?.is_starTeamD)
            ) {
              _starPlayerCount++;
            }
            selectedPlayerCount++;
          }
        }
      }
    } else {
      let existingPlayerIndex = _playersList?.findIndex((player) => {
        if (currentPlayer?.type?.toLocaleLowerCase() === TD) {
          return player?.team?.id === id && player?.team?.match_id === matchId;
        } else {
          return (
            player?.player?.id === id && player?.player?.match?.id === matchId
          );
        }
      });
      if (existingPlayerIndex !== -1) {
        selected.set(selectionId, !selected.get(selectionId));
        if (
          starPlayerCount > 0 &&
          (_playersList[existingPlayerIndex].is_starPlayer ||
            _playersList[existingPlayerIndex].is_starTeamD)
        ) {
          _starPlayerCount--;
        }

        _playersList[existingPlayerIndex].is_starPlayer = false;
        _playersList[existingPlayerIndex].type = "";
        _playersList[existingPlayerIndex].matchId = "";

        if (currentPlayer?.type?.toLocaleLowerCase() === TD) {
          _playersList[existingPlayerIndex].team = {};
          _playersList[existingPlayerIndex].is_starTeamD = false;
        } else {
          _playersList[existingPlayerIndex].player = {};
        }
      }
      selectedPlayerCount--;

      console.log("selectedPlayerCount 1: ", selectedPlayerCount);
    }

    return {
      selected,
      _playersList,
      currentPlayer,
      _starPlayerCount,
    };
  };

  const onSelectFilter = useCallback(
    (type, isFilterSelected = true) => {
      if (loading) return;
      // if(type==undefined)type='td'

      // reset search filter
      if (isFilterSelected)
        onSelectSearchDropDown({ team_id: "all", name: "All Teams" });

      const [_selectedFilter] = filters?.filter(
        (filter) => filter.title === type
      );
      const [_selectedData] = data?.filter(
        (_data) =>
          `${_data?.type}`?.toLocaleLowerCase() ===
          `${_selectedFilter?.title}`?.toLocaleLowerCase()
      );
      let FilterDateTimeView = _selectedData?.listData;
      if (_selectedFilter?.title === 'td') {
        if (selectMenuData === MenuDataList[0].value) {
          let sorterDate = (a, b) => {
            return (new Date(a?.match?.scheduled) - new Date(b?.match?.scheduled)) ||
              ((a.name > b.name) ? 1 : -1);
          }
          FilterDateTimeView.sort(sorterDate);
          SortSelectedOnTop(FilterDateTimeView, sorterDate)
        }
      } else {
        if (selectMenuData === MenuDataList[0].value) {
          let sorterDate = (a, b) => {
            return (new Date(a?.match?.scheduled) - new Date(b?.match?.scheduled)) ||
              ((a.full_name > b.full_name) ? 1 : -1) ||
              ((a.full_name > b.full_name) ? 1 : -1) ||
              (parseInt(b?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.goals)) -
                parseInt(a?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.goals))))) ||
              (parseInt(b?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.points)) -
                parseInt(a?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.points)))));
          }
          FilterDateTimeView?.sort(sorterDate);
          SortSelectedOnTop(FilterDateTimeView, sorterDate)
        }
      }

      if (isFilterSelected || isEdit) {
        setSelectedType(_selectedFilter?.title);
        setSelectedData(_selectedData);
        setSelectedFilter(_selectedFilter);
        setFilterdData(_selectedData);
        setSelectMenuData(MenuDataList[0].value)
        setSearch("")
      }

      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
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

  const SortSelectedOnTop = (FilteredArray, sortType) => {
    
    const _data = cloneDeep(FilteredArray);
    let newArray = []
    
    _data?.forEach((val) => {
      if (((selected.get(`${val.id} - ${val?.match_id}`)) 
            || (selected.get(`${val.id} - ${val?.match?.id}`))) 
            && !newArray.includes(val)) 
        {
          FilteredArray.forEach((item,i) => {
            if(item._id === val._id){
              FilteredArray.splice(i, 1)
            }
          })
        newArray.push(val)
      }
    })

    newArray.sort(sortType).reverse().forEach((val) => {
      FilteredArray.unshift(val)
    })
  }

  //increase/decrease filter counter.
  const activateFilter = (player, type) => {
    if(type==undefined)type='td'
    const [_selectedFilter] = filters?.filter(
      (filter) => filter?.title === type
    );
    const filter = _selectedFilter;
    let _remaining = filter?.remaining;
    let id = type === TD ? player?.id : player?.id;
    let selectionId = type !== TD ? `${id} - ${player?.match?.id}`:`${id} - ${player?.match_id}`;

    if (starPlayerCount >= 3 && player.is_starPlayer) return;
    if (_remaining > 0) {
      if (!!!selected.get(selectionId)) {
        _remaining -= 1;
      } else if (_remaining < 2) {
        _remaining += 1;
      } else if (selected.get(selectionId)) {
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
      setSearch(value)
      if (selectedData?.type == "td") {
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
          var id = _filterdData[i].match?.id;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdData[i]);
          }
        }
        for (var i = 0; i < _filterdDataHomeTeam.length; i++) {
          var id = _filterdDataHomeTeam[i].match?.id;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdDataHomeTeam[i]);
          }
        }
      } else {
        if (selectedData == null) {
          return;
        }
        var _filterdData = selectedData?.listData?.filter(
          (player) =>
            player?.full_name
              ?.toLocaleLowerCase()
              ?.startsWith(value?.toLocaleLowerCase())
        );
        // console.log("_filterdData",_filterdData)
        var _filterdDataHomeTeam = selectedData?.listData?.filter((player) =>
          player?.match?.home?.name
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase())
        );
        var _filterdDataAwayTeam = selectedData?.listData?.filter((player) =>
          player?.match?.away?.name
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase())
        );
        for (var i = 0; i < _filterdData.length; i++) {
          var id = _filterdData[i].id;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdData[i]);
          }
        }
        for (var i = 0; i < _filterdDataHomeTeam.length; i++) {
          var id = _filterdDataHomeTeam[i].id;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdDataHomeTeam[i]);
          }
        }
        for (var i = 0; i < _filterdDataAwayTeam.length; i++) {
          var id = _filterdDataAwayTeam[i].id;
          if (tempIds.indexOf(id) == -1) {
            tempIds.push(id);
            tempObj.push(_filterdDataAwayTeam[i]);
          }
        }
      }
      const _filterdDataObj = {
        type: selectedData?.type,
        listData: tempObj,
      };
      setFilterdData(_filterdDataObj);
    } else {
      setSearch("")
      setFilterdData(selectedData);
    }
  };

  const onSelectSearchDropDown = (team) => {
    if (team === selectedDropDown) return setSelectedDropDown(null);
    if (team) {
      if (team?.id !== "all") {
        const _filterdData = selectedData?.listData?.filter((player) => {
          return player?.id === team?.id || player?.match?.away?.id === team?.id;
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

  const onSubmitNHL = async () => {
    setIsLoading(true);
    if (isEmpty(user)) {
      setIsLoading(false);
      return redirectTo(props, { path: "/login" });
    }

    if (selectedPlayerCount < 8) {
      setIsLoading(false);
      return;
    }
    const players1 = [];
    let players = [];
    for (let i = 0; i < sideBarList?.length - 1; i++) {
      players1.push({
        playerId: sideBarList[i]?.player?.id,
        matchId: sideBarList[i]?.player?.match_id,
      });
      let t = sideBarList[i]?.player;
      delete t.seasons;
      players.push(sideBarList[i]?.player);
    }

    let cTypePlayers = players.filter(
      (item) => item.type.toLocaleLowerCase() === CENTER
    );
    let xwTypePlayers = players.filter(
      (item) => item.type.toLocaleLowerCase() === XW
    );
    let dTypePlayers = players.filter(
      (item) => item.type.toLocaleLowerCase() === D
    );
    let gTypePlayers = players.filter(
      (item) => item.type.toLocaleLowerCase() === G
    );

    cTypePlayers.forEach((item, index) => {
      item.positionID = index + 1;
    });
    xwTypePlayers.forEach((item, index) => {
      item.positionID = index + 1;
    });
    dTypePlayers.forEach((item, index) => {
      item.positionID = index + 1;
    });
    gTypePlayers.forEach((item, index) => {
      item.positionID = index + 1;
    });

    players = [
      ...cTypePlayers,
      ...xwTypePlayers,
      ...dTypePlayers,
      ...gTypePlayers,
    ];

    const [teamD] = sideBarList?.filter((team) => team?.type === TD);
    const { team = {} } = teamD || {};
    if (!isEmpty(team) && players?.length === 7) {
      const payload1 = {
        game_id: game_id,
        sport_id: sport_id,
        user_id: user_id,
        players: [...players1],
        team_d_id: team?.id,
        match_id: teamD?.team?.match_id,
        team_id: selector_team_id,
        user_display_name: user.display_name,
      };
      const payload = {
        userID: user_id,
        gameID: game_id,
        players: [...players],
        powers: [],
        teamD: team,
        user_display_name: user.display_name
      };
      console.log("payload: ", payload);
      if (isEdit) {
        await dispatch(NHLActions.editDfsTeamPlayer(payload1));
        await dispatch(NHLActions.editFantasyTeam(payload));
        setIsLoading(false);
      } else {
        await dispatch(NHLActions.saveAndGetSelectPlayers(payload1));
        await dispatch(NHLActions.createFantasyTeam(payload));

        if (isPaid || isPaid === null) {
          if (currency !== "PWRS") {
            dispatch(NHLActions.calculateAdminFee(user_id, game_id));
          }
          dispatch(NHLActions.deductUserBalance(user_id, game_id));
          dispatch(NHLActions.savePrizePool(user_id, game_id));
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
      backgroundImage: `url(${NHLFooterImage})`,
      backgroundSize: "cover",
      opacity: 0.6,
    };

    // backgroundImageStyle.backgroundPosition = "-16px -13px";

    return backgroundImageStyle;
  };

  const [showPowerInfoModal, setShowPowerInfoModal] = useState(false);
  const setShowDepositModal = () => dispatch(showDepositForm());
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

            <div className={classes.__powers_available} style={{overflowY: 'scroll', height: '50%', justifyContent:'space-evenly' }}>
              {game_type === "NHL_Fantasy" ? 
                <>
                  Powers are not available for this Contest.
                </>
                 : 
                powers &&
                powers.length > 0 &&
                powers.map((item) => {
                  return (
                    <>
                      <RenderIcon
                        title={item?.powerName}
                        Icon={getIcon(item?.powerName)}
                        iconSize={54}
                        count={item.amount}
                      />
                    </>
                  );
                })}
            </div>
            <div className={classes.__buttons_div}>
              <ContestRulesPopUp
                game_type={game_type}
                title="NHL"
                isEditPicks={game_edit ? true : false}
                      point={game_edit ? PointsSystem : points}
                      points={game_edit ? PointsSystem : points}
                powers={powers}
                component={({ showPopUp }) => (
                  <Button
                    onClick={showPopUp}
                    title={"Gameplay Rules"}
                    icon={
                      <img src={ContestRuleIcon} width="18" height="18" alt="" />
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
                onClick={() => setPrizeModalState(true)}
                title={"Prize Grid"}
                icon={<img src={PrizeCupIcon} width="18" height="18" alt="" />}
                styles={{
                  backgroundColor: "rgba(242, 242, 242, 0.1)",
                  border: "0px",
                }}
              />
            </div>
          </div>
        </ModalBottom>
      </>
    );
  };

  const handleFilterDataList = (selectedOptionValue) => {
    let FilterListView = filterdData?.listData;
    console.log("FilterListView", FilterListView)
    if (selectedOptionValue === "Sort Players by Player Name") {
      let sorterFullName = (a, b) => {
        return ((a.full_name > b.full_name) ? 1 : -1) || new Date(a?.match?.scheduled) - new Date(b?.match?.scheduled);
      }
      FilterListView.sort(sorterFullName);
      setFilterdData(filterdData)
      SortSelectedOnTop(FilterListView, sorterFullName)
    } else if (selectedOptionValue === "Sort Players by Start Time") {
      let sorterDate = (a, b) => {
        return (new Date(a?.match?.scheduled) - new Date(b?.match?.scheduled)) ||
          ((a.full_name > b.full_name) ? 1 : -1) ||
          (parseInt(b?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.goals)) -
            parseInt(a?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.goals))))) ||
          parseInt(b?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.points)) -
            parseInt(a?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.points))));
      }
      FilterListView.sort(sorterDate);
      setFilterdData(filterdData)
      SortSelectedOnTop(FilterListView, sorterDate)
    } else if (selectedOptionValue === "Sort Players by Goals Scored") {
      if (FilterListView?.filter(dataList => dataList?.seasons?.length > 0)?.length) {
        let sorterGoals = (a, b) => {
          return (
            parseInt(b?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.goals))) -
            parseInt(a?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.goals)))
          )
            || (new Date(a?.match?.scheduled) - new Date(b?.match?.scheduled));
        }
        FilterListView.sort(sorterGoals);
        console.log("filteredData in Sort by Goals ", filterdData)
        setFilterdData(filterdData)
        SortSelectedOnTop(FilterListView, sorterGoals)
      }
    } else if (selectedOptionValue === "Sort Players by Total Points") {
      let sorterPoints;
      if (FilterListView?.filter(dataList => dataList?.seasons?.length > 0)?.length) {
        sorterPoints = (a, b) => {
          return (
            parseInt(b?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.points))) -
            parseInt(a?.seasons?.map((val) => val?.teams?.map((data) => data.statistics.total.points)))
          )
            || (new Date(a?.match?.scheduled) - new Date(b?.match?.scheduled));
        }
        FilterListView.sort(sorterPoints)
        setFilterdData(filterdData)
        SortSelectedOnTop(FilterListView, sorterPoints)
      }
    }
    cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header4
          outof={outOf}
          enrolledUsers={enrolledUsers}
          points={game_edit ? PointsSystem : points}
          isEditPicks={game_edit ? true : false}
          powers={powers}
          titleMain1="NHL"
          titleMain2={game_type === "NHL_Fantasy" ? "Fantasy" : "PowerdFS"}
          subHeader1={game_type === "NHL_Fantasy" ? "Pick your team today and win!" : "Introducing Live-Play Fantasy Hockey"}
          subHeader2={
            game_type === "NHL_Fantasy" ? 
            <>
              Pick a team from players listed below. At the conclusion of all games, winners will be determined based on total points.
            </> :
            <>
              Use your <span>Powers</span> during the live game to drive your
              team up the standings
            </>
          }
          contestBtnTitle="Gameplay Rules"
          prizeBtnTitle="Prize Grid"
          bgImageUri={isMobile ? NHLHeaderImageMobile : NHLHeaderImage}
          onClickPrize={() => setPrizeModalState(true)}
          token={token}
          isMobile={isMobile}
          depositClicked={setShowDepositModal}
          selectedTeam={{
            game: {
              game_type: game_type,
              powerdfs_challenge_amount: powerdfs_challenge_amount,
              prizePool: topPrize,
            },
          }}
          isTeamSelectionPage={true}
          teamSelectionPageText={`Manage your team to ${powerdfs_challenge_amount} points and win`}
        />
        {isMobile && <MobileBalance depositClicked={setShowDepositModal} />}
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
                <div className={classes.container_searchList}>
                  <Search
                    onSearch={onSearch}
                    search={search}
                    setSearch={setSearch}
                    //onSelect={onSelectSearchDropDown}
                    //dropDown={dropDownState}
                    selected={selectedDropDown}
                    placeholder={"Search by player or team name..."}
                  />
                  <div className={classes.sort_dropdown}>
                    <CustomDropDown
                      value={
                        selectMenuData === "Sort Players by Start Time" ? "Sort Players by Start Time"
                          : selectMenuData === "Sort Players by Player Name" ? "Sort Players by Player Name"
                            : selectMenuData === "Sort Players by Goals Scored" ? "Sort Players by Goals Scored"
                              : selectMenuData === "Sort Players by Total Points" ? "Sort Players by Total Points" : ""
                      }
                      options={MenuDataList}
                      onChange={(selectedOption) => {
                        setSelectMenuData(selectedOption);
                        handleFilterDataList(selectedOption);
                      }}
                      wrapperClassName={classes.select_sorted}
                      wrapperHeaderMain={classes.select_header_main}
                      wrapperHeaderClassName={classes.select_header_title}
                      dropdownClassName={classes.select_dropdown}
                      dropdownListItem={classes.select_list_menuItem}
                    />
                  </div>


                </div>
              </div>
            </div>
            {isMobile && (
              <div ref={cardRef} className={classes.select_team_info}>
                <p>{headerText[selectedFilter?.id - 1]?.text}</p>
              </div>
            )}

            <div className={classes.container_body}>
              <Card>
                {loading ? (
                  <p className={classes.loading_view}>Loading...</p>
                ) : (
                  <>
                    {!isMobile && (
                      <div ref={cardRef} className={classes.card_header}>
                        <p>{headerText[selectedFilter?.id - 1]?.text}</p>
                      </div>
                    )}
                    <div className={classes.card_body}>
                      {filterdData && filterdData?.listData?.length ? (
                        filterdData?.listData?.map((item, index) => (
                          <>
                            {selectedFilter?.title === TD ? (
                              /*Remove isAfterTime function from here because edit picks was not working due to this function*/
                              // (item?.date, item?.time) &&
                              <>
                             
                              <SportsTeamSelectionCard
                                item={item}
                                image={ TeamDdata.filter(x => x?.shortName == item?.name)}
                                isSelected={
                                  !!selected.get(
                                    `${item.id} - ${teamDMatchId}`
                                  )
                                }
                                key={item?.id + " - " + item?.match_id}
                                onSelectDeselect={onPlayerSelectDeselect}
                                disabled={
                                  item.is_starPlayer &&
                                  item.is_starPlayer &&
                                  starPowerIndex >= 3
                                }
                              />
                              </>
                            ) : (
                              /*Remove isAfterTime function from here because edit picks was not working due to this function*/
                              <>
                                {/* {(item?.date, item?.time) &&  */}
                                <>
                                  <SelectionCard3
                                    player={item}
                                    image={ TeamDdata.filter(x => x?.teamName== (item?.isFromAwayTeam?item?.match?.away?.name:item?.match?.home?.name))}
                                    isSelected={
                                      !!selected.get(
                                        `${item.id} - ${item?.match?.id}`
                                      )
                                    }
                                    key={item.id + " - " + item?.match_id}
                                    loading={loading}
                                    onSelectDeselect={onPlayerSelectDeselect}
                                    pageType={PAGE_TYPES.NHL}
                                    type={selectedData?.type}
                                  // disabled={
                                  //   item.is_starPlayer &&
                                  //   item.is_starPlayer &&
                                  //   starPlayerCount >= 3
                                  // }
                                  />
                                </>
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
                        {game_type !== "NHL_Fantasy" &&
                          <ContestSummaryRow
                            text={
                              <p>
                                Live-play <span>Powers</span> included with <br/>
                                entry fee
                              </p>
                            }
                          />
                        }
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
                        game_type={game_type}
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
                                {game_type !== "NHL_Fantasy" &&
                                  <ContestSummaryRow
                                    text={
                                      <p>
                                        Live-play <span>Powers</span> included
                                        with entry fee
                                      </p>
                                    }
                                  />
                                }
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
                          {game_type === "NHL_Fantasy" ? 
                          <>
                            <div className={classes.__powers_not_available}>
                              <p>Powers are not available for this Contest.</p>
                            </div>
                          </> 
                          :
                          <>
                            <div className={classes.__powers_available}>
                              {powers &&
                                powers.length > 0 &&
                                powers.map((item, index) => {
                                  return (
                                    <>
                                      {index < 3 && (
                                        <RenderIcon
                                          title={item?.powerName}
                                          Icon={getIcon(item?.powerName)}
                                          iconSize={54}
                                          count={item.amount}
                                        />
                                      )}
                                    </>
                                  );
                                })}
                            </div>
                            <div className={classes.__powers_available}>
                              {powers &&
                                powers.length > 0 &&
                                powers.map((item, index) => {
                                  return (
                                    <>
                                      {index >= 3 && (
                                        <RenderIcon
                                          title={item?.powerName}
                                          Icon={getIcon(item?.powerName)}
                                          iconSize={54}
                                          count={item.amount}
                                        />
                                        )}
                                    </>
                                  );
                                })}
                              </div>
                              </>
                            }
                          </TabPanel>
                        </div>
                      </Tabs>
                    </div>
                  </div>
                  <div className={classes.__see_full_rules}>
                    <ContestRulesPopUp
                      game_type={game_type}
                      isEditPicks={game_edit ? true : false}
                      point={game_edit ? PointsSystem : points}
                      points={game_edit ? PointsSystem : points}
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
                      title="NHL"
                    />
                  </div>
                </div>

                <img
                  src={NHLFooterImage}
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
                <>
                  {sideBarList.length === selectedPlayerCount ? (
                    <button
                      className={classes.sidebar_button}
                      onClick={onSubmitNHL}
                    >
                      Submit!
                    </button>
                  ) : (
                    <button
                      className={classes.sidebar_button}
                    >
                      Select your team
                    </button>
                  )}
                </>
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
          scrollLocking={false}
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
                  onClick={onSubmitNHL}
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

              <button className={classes.sidebar_button} onClick={onSubmitNHL}>
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
        sportsName="NHL"
        data={prizes}
        onClose={() => setPrizeModalState(false)}
      />
    </>
  );
}

export default NHLPowerdFs;
