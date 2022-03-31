import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, cloneDeep } from "lodash";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import * as MLBActions from "../../actions/MLBActions";

import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/baseball.jpg";
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

import SwapPlayerIcon from "../../assets/swap-player-icon.png";
import PointMultiplierIcon from "../../assets/point-multiplier-icon.png";
import VideoReviewIcon from "../../assets/video-review-icon.png";
import DWallIcon from "../../assets/d-wall-icon.png";
import UndoIcon from "../../assets/undo-icon.png";
import RetroBoostIcon from "../../assets/retro-boost-icon.png";
import LiveRankBox from "../../components/LiveRankBox";
import BatteryPowerLevels from "../../components/BatteryPowerLevels";
import { redirectTo } from "../../utility/shared";

const { P, C, SS, XB, OF, D } = CONSTANTS.FILTERS.MLB;

const INITIAL_PLAYER_LIST = [
  {
    title: P,
    name: "",
    filter: P,
    playerId: "",
  },
  {
    title: C,
    name: "",
    filter: C,
    playerId: "",
  },
  {
    title: SS,
    name: "",
    filter: SS,
    playerId: "",
  },
  {
    title: `${XB}1`,
    name: "",
    filter: XB,
    playerId: "",
  },
  {
    title: `${XB}2`,
    name: "",
    filter: XB,
    playerId: "",
  },
  {
    title: `${OF}1`,
    name: "",
    filter: OF,
    playerId: "",
  },
  {
    title: `${OF}2`,
    name: "",
    filter: OF,
    playerId: "",
  },
  {
    title: D,
    name: "",
    icon: EmployeeIcon,
    filter: D,
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

const dropDown = [
  { title: "Team A" },
  { title: "Team B" },
  { title: "Team C" },
  { title: "Team D" },
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
const sidebarObj = {};

function MLBPowerLevels(props) {
  const [selected, setSelected] = useState(new Map());
  const [selectedFilter, setSelectedFilter] = useState(
    FILTERS_INITIAL_VALUES[0]
  );
  const [playerList, setPlayerList] = useState(INITIAL_PLAYER_LIST);
  const [filters, setFilters] = useState(FILTERS_INITIAL_VALUES);
  const [selectedData, setSelectedData] = useState();
  const [filterdData, setFilterdData] = useState();
  const [selectedDropDown, setSelectedDropDown] = useState();
  const [showPrizeModal, setPrizeModalState] = useState(false);
  const [selectedType, setSelectedType] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [dropDownState, setDropDownTeam] = useState(dropDown);

  const { data = [], starPlayerCount = 0, game_id, sport_id } = useSelector(
    (state) => state.mlb
  );
  const { auth: { user: { token = "" } } = {} } = useSelector((state) => state);

  const dispatch = useDispatch();

  //reset the states
  useEffect(() => {
    getData();
    dispatch(MLBActions.setStarPlayerCount(0));
    setPlayerList(cloneDeep(INITIAL_PLAYER_LIST));
    setSelected(new Map());
    setSelectedFilter(FILTERS_INITIAL_VALUES[0]);
    setFilters(cloneDeep(FILTERS_INITIAL_VALUES));
    setFilterdData(null);
    setSelectedData(null);
  }, []);

  const getData = async () => {
    setLoading(true);
    await dispatch(MLBActions.mlbData());
    setLoading(false);
  };

  useEffect(() => {
    if (data?.length) {
      setFilterdData(data[0]);
      setSelectedData(data[0]);

      //set dropdown
      const _dropDownlist = data?.filter(
        (list) => list?.type === "d" || list?.type === "D"
      );
      const dropDownTeams = [
        {
          team_id: "all",
          name: "All Teams",
        },
        ..._dropDownlist?.[0]?.listData,
      ];
      setDropDownTeam(dropDownTeams);
    }
  }, [data]);

  const onPlayerSelectDeselect = useCallback(
    (id, matchId) => {
      if (loading) return;

      const { type = "", listData: _selectedData = [] } = selectedData || {};

      const [currentPlayer] = _selectedData?.filter((player) =>
        type?.toLocaleLowerCase() === D
          ? player?.team_id === id
          : player?.playerId === id && player?.match_id === matchId
      );
      const _selected = new Map(selected);
      let _starPlayerCount = starPlayerCount;

      //selected players
      const _playersList = [...playerList];

      if (!_selected.get(id)) {
        const [_player] = _playersList?.filter(
          (player) =>
            player?.filter === selectedData?.type && isEmpty(player.name)
        );
        if (!isEmpty(_player) && isEmpty(_player.name)) {
          const playerListIndex = _playersList?.indexOf(_player);
          let player = { ..._player };

          if (type?.toLocaleLowerCase() === D) {
            player.name = currentPlayer?.name;
            player.playerId = currentPlayer?.team_id;
            player.isStarPlayer = currentPlayer?.isStarPlayer;
            player.matchId = currentPlayer?.match_id;
          } else {
            player.name = currentPlayer?.playerName;
            player.playerId = currentPlayer?.playerId;
            player.isStarPlayer = currentPlayer?.isStarPlayer;
            player.matchId = currentPlayer?.match_id;
          }
          _playersList[playerListIndex] = player;

          _selected.set(id, !selected.get(id));
          //Star Power Player selection (sidebar)
          if (starPlayerCount < 3 && currentPlayer?.isStarPlayer) {
            _starPlayerCount++;
          }
          selectedPlayerCount++;
        }
      } else {
        let existingPlayerIndex = _playersList?.findIndex(
          (player) => player?.playerId === id
        );

        if (existingPlayerIndex !== -1) {
          _selected.set(id, !selected.get(id));
          if (
            starPlayerCount > 0 &&
            _playersList[existingPlayerIndex].isStarPlayer
          ) {
            _starPlayerCount--;
          }

          _playersList[existingPlayerIndex].name = "";
          _playersList[existingPlayerIndex].playerId = "";
          _playersList[existingPlayerIndex].isStarPlayer = false;
        }
        selectedPlayerCount--;
      }

      dispatch(MLBActions.setStarPlayerCount(_starPlayerCount));
      setSelected(_selected);
      setPlayerList(_playersList);
      activateFilter(currentPlayer, type);
    },
    [selected, selectedFilter, selectedData]
  );

  const onSelectFilter = useCallback(
    (type) => {
      if (loading) return;

      const [_selectedFilter] = filters?.filter(
        (filter) => filter.title === type
      );
      const [_selectedData] = data?.filter(
        (_data) => _data?.type === _selectedFilter?.title
      );

      setSelectedType(_selectedFilter?.title);
      setSelectedData(_selectedData);
      setSelectedFilter(_selectedFilter);
      setFilterdData(_selectedData);
    },
    [selectedFilter, loading]
  );

  //increase/decrease filter counter.
  const activateFilter = (player, type) => {
    const [_selectedFilter] = filters?.filter(
      (filter) => filter?.title === type
    );
    const filter = _selectedFilter;
    let _remaining = filter?.remaining;
    let id = type === D ? player?.team_id : player?.playerId;

    if (_remaining > 0) {
      if (!!!selected.get(id)) _remaining -= 1;
      else if (_remaining < 2) _remaining += 1;
      if (_remaining <= 0) {
        _remaining = 0;
        setSelectedFilter(filter);
      }
    } else if (!!selected.get(id) && _remaining < 2) {
      _remaining++;
    } else {
      setSelectedFilter(_selectedFilter);
    }

    filter.remaining = _remaining;
    const filterIndex = filters?.findIndex(
      (filter) => filter?.id === _selectedFilter?.id
    );
    const _filters = [...filters];
    _filters[filterIndex] = filter;
    setFilters(_filters);
  };

  const onDelete = (id, matchId) => {
    onPlayerSelectDeselect(id, matchId);
  };

  const onSearch = (e) => {
    const { value } = e.target;
    if (!isEmpty(value)) {
      const _filterdData = selectedData?.listData?.filter((player) =>
        player?.playerName
          ?.toLocaleLowerCase()
          ?.includes(value?.toLocaleLowerCase())
      );
      const _filterdDataObj = {
        type: selectedData?.type,
        listData: _filterdData,
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
        const _filterdData = selectedData?.listData?.filter(
          (player) => player?.team_id === team?.team_id
        );

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

  const ContestScoringRow = ({ item = {}, width = {} }) => (
    <div className={classes.scoring_row}>
      <p>{item?.title}</p>{" "}
      <span className={width && width}>{item?.points}</span>
    </div>
  );

  const ContestScoringColumn = ({ data = [], styles = {} }) => (
    <div className={classes.scoring_column} style={styles}>
      {data.map((mainItem, mainIndex) => {
        return (
          <>
            <div
              className={classes.scoring_title}
              style={{
                marginTop: mainItem.title == "Team Defence" && 38,
                marginBottom: 6,
              }}
              key={mainIndex}
            >
              <p>{mainItem.title}</p>
            </div>
            {data &&
              data?.length &&
              mainItem.data.map((item, index) => {
                return (
                  <div className={classes.scoring_body}>
                    <ContestScoringRow item={item} key={index + "-"} />
                  </div>
                );
              })}
          </>
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

  const onSubmitMLbSelection = async () => {
    redirectTo(props, { path: "/live-play-power-levels" });
    if (selectedPlayerCount < 8) {
      return;
    }

    const playerIds = [];
    for (let i = 0; i < playerList?.length - 1; i++) {
      playerIds.push(playerList[i]?.playerId);
    }
    const payload = {
      gameId: game_id,
      sportId: sport_id,
      userId: 92,
      players: [...playerIds],
      team_d_id: playerList[playerList?.length - 1]?.playerId,
    };
    await dispatch(MLBActions.saveAndGetSelectPlayers(payload));

  };

  const RenderIcon = ({ title, count, Icon, iconSize = 24 }) => (
    <div className={classes.body_card}>
      <span>{count}</span>
      <img src={Icon} />
      <p>{title}</p>
    </div>
  );

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header4
          titleMain1="MLB"
          titleMain2="PowerdFS"
          subHeader1="Introducing Live-Play Fantasy Baseball"
          subHeader2={
            <>
              Use your <span>Powers</span> during the live game to drive your
              team up the standings
            </>
          }
          contestBtnTitle="Contest Rules"
          prizeBtnTitle="Prize Grid"
          bgImageUri={BaseballImage}
          onClickPrize={() => setPrizeModalState(true)}
          token={token}
        />

        <div className={classes.container}>
          <div className={classes.container_left}>
            <h2>Select your team</h2>
            <div className={classes.container_left_header_2}>
              <p>7 starters + 1 team D</p> <span className={classes.line} />
            </div>

            <div className={classes.container_top}>
              <p>Select Position</p>
              <div className={classes.container_top_1}>
                <SportsFilters
                  data={filters}
                  onSelect={onSelectFilter}
                  selectedFilter={selectedFilter}
                />

                <Search
                  onSearch={onSearch}
                  onSelect={onSelectSearchDropDown}
                  dropDown={dropDownState}
                  selected={selectedDropDown}
                />
              </div>
            </div>

            <div className={classes.container_body}>
              <Card>
                {loading ? (
                  <p className={classes.loading_view}>Loading...</p>
                ) : (
                  <>
                    <div className={classes.card_header}>
                      <p>{headerText[selectedFilter?.id - 1]?.text}</p>
                    </div>

                    <div className={classes.card_body}>
                      {filterdData && filterdData?.listData?.length ? (
                        filterdData?.listData?.map((item, index) =>
                          selectedFilter?.title === D ? (
                            <SportsTeamSelectionCard
                              item={item}
                              isSelected={!!selected.get(item.team_id)}
                              key={item?.team_id + " - " + item?.match_id}
                              onSelectDeselect={onPlayerSelectDeselect}
                              disabled={
                                item.isStarPlayer &&
                                item.isStarPlayer &&
                                starPowerIndex >= 3
                              }
                              mlbCard
                            />
                          ) : (
                            <SelectionCard3
                              player={item}
                              isSelected={!!selected.get(item.playerId)}
                              key={item.playerId + " - " + item?.match_id}
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
                          )
                        )
                      ) : (
                        <p>No Data</p>
                      )}
                    </div>
                  </>
                )}
              </Card>
              <img src={AcceleRadar} className={classes.partner_logo} />
            </div>

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
                        <Tab className={`${activeTab === 0 && classes.active}`}>
                          Summary
                        </Tab>
                        <Tab className={`${activeTab === 1 && classes.active}`}>
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
                                    <span>$100,000</span> Prize Pool
                                  </p>
                                }
                              />
                              <ContestSummaryRow
                                text={
                                  <p>
                                    Live-play <span>Powers</span> included with
                                    entry fee
                                  </p>
                                }
                              />
                              <ContestSummaryRow
                                text={
                                  <p>
                                    Pick players from any teams scheduled to
                                    play on <span>July 19, 2021</span>
                                  </p>
                                }
                              />
                            </div>
                          </ContestColumn>
                        </TabPanel>
                        <TabPanel>
                          <ContestColumn title="">
                            <div className={classes.contest_scoring_wrapper}>
                              <ContestScoringColumn
                                data={contestScoring.data1}
                              />
                              <ContestScoringColumn
                                data={contestScoring.data2}
                              />
                            </div>
                          </ContestColumn>
                        </TabPanel>
                        <TabPanel>
                          <div className={classes.__powers_available}>
                            <RenderIcon
                              title="Point Multiplier"
                              Icon={PointMultiplierIcon}
                              iconSize={54}
                              count={2}
                            />

                            <RenderIcon
                              title="Swap Player"
                              Icon={SwapPlayerIcon}
                              iconSize={54}
                              count={2}
                            />

                            <RenderIcon
                              title="Undo"
                              Icon={UndoIcon}
                              iconSize={54}
                              count={2}
                            />
                          </div>
                          <div className={classes.__powers_available}>
                            <RenderIcon
                              title="Retro Boost"
                              Icon={RetroBoostIcon}
                              iconSize={24}
                              count={1}
                            />

                            <RenderIcon
                              title="D-Wall"
                              Icon={DWallIcon}
                              iconSize={54}
                              count={1}
                            />

                            <RenderIcon
                              title="Video Review"
                              Icon={VideoReviewIcon}
                              iconSize={54}
                              count={1}
                            />
                          </div>
                        </TabPanel>
                      </div>
                    </Tabs>
                  </div>
                </div>
                <div className={classes.__see_full_rules}>
                  <ContestRulesPopUp
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
          </div>

          <div className={classes.sidebar_container}>
            <Sidebar styles={{ padding: 20 }}>
              <CashPowerBalance
                showIcons={false}
                powerBalance={50000}
                cashBalance={200000}
                styles={{
                  marginTop: "-40px",
                }}
                cashTitle="Prize Pool"
                powerTitle="Top Prize"
                centered
              />
              <PowerCollapesible />
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
                data={playerList}
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
            </Sidebar>
          </div>
        </div>
      </div>
      <Footer isBlack={true} />

      <PrizeModal
        visible={showPrizeModal}
        sportsName="MLB"
        data={prizeData}
        onClose={() => setPrizeModalState(false)}
      />
    </>
  );
}

export default MLBPowerLevels;
