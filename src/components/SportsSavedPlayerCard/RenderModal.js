import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import classes from "./index.module.scss";
import Modal from "../Modal";
import CloseIcon from "../../icons/Close";
import PowerPlayIcon from "../../assets/star.svg";
import StarPlayer from "../StarPlayersCheck";
import Search from "../SearchInput";
import SportsSelectionCard3 from "../SportsSelectionCard3";

function RenderModal(props) {
  const [replaceData, setReplaceData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterString, setFilterString] = useState("");
  const {
    visible = false,
    player: currentPlayer = {},
    onClose = () => {},
    onSwap = (playerId, match_id) => {},
    playerList = {},
    starPlayerCount = 0,
    loading = false,
  } = props || {};

  useEffect(() => {
    if (loading) return;
    setSelectedData(playerList);
  }, [loading]);

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   if (filterString === "") {
  //     setSelectedData(playerList);
  //   } else {
  //     setSelectedData(filteredData);
  //   }
  // }, [filterString]);

  const { name: playerName = "", type = "", type1 = "" } = currentPlayer || {};

  const onSearch = (e) => {
    const { value } = e.target;
    if (!isEmpty(value)) {
      setFilterString(value);
      const _filterdData = playerList?.listData?.filter((data) =>
        data?.playerName
          ?.toLocaleLowerCase()
          ?.startsWith(value?.toLocaleLowerCase())
      );
      const _filterdDataHomeTeam = playerList?.listData?.filter((data) =>
        data?.homeTeam
          ?.toLocaleLowerCase()
          ?.startsWith(value?.toLocaleLowerCase())
      );
      var tempObj = [];
      var tempIds = [];
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
      const _filterdDataObj = {
        type: playerList?.type,
        listData: tempObj,
      };
      setFilteredData(_filterdDataObj);
    } else {
      setFilterString("");
      setSelectedData(playerList);
    }
  };

  if (!visible) return <></>;

  return (
    <Modal visible={visible} scrollable={false}>
      <div className={classes.modal_container}>
        <div className={classes.modal_header}>
          <div className={classes.modal_header_top}>
            <CloseIcon size={16} onClick={onClose} />
          </div>
          <div className={classes.modal_header_bottom}>
            <p className={classes.modal_title}>
              Swap Your <span>{type1 ? type1 : type}</span>
            </p>

            <div className={classes.modal_star_player_container}>
              <img src={PowerPlayIcon} />
              <div className={classes.star_player_right}>
                <p>My Star Players</p>
                <StarPlayer
                  totalStarPlayers={3}
                  selectedCount={starPlayerCount}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.modal_body}>
          <div className={classes.modal_header}>
            <div className={classes.header_left}>
              <p>Choose player to replace</p>
              <p className={classes.header_player_name}>
                <img src={PowerPlayIcon} />
                {playerName}
              </p>
            </div>
            <Search
              placeholder={"Search by player or team name..."}
              onSearch={onSearch}
            />
          </div>

          <div className={classes.modal_list}>
            {loading ? (
              <p
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  display: "flex",
                  flex: 1,
                }}
              >
                Loading
              </p>
            ) : (
              selectedData?.listData?.length &&
              selectedData?.listData?.map((player, ind) =>
                starPlayerCount >= 3 &&
                player?.isStarPlayer &&
                !currentPlayer?.isStarPlayer ? null : (
                  <SportsSelectionCard3
                    player={player}
                    btnTitle="Swap"
                    key={ind + "--"}
                    onSelectDeselect={(playerId, match_id) =>
                      onSwap(playerId, match_id)
                    }
                    type={selectedData?.type}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

RenderModal.propTypes = {
  visible: PropTypes.bool,
  starPlayerCount: PropTypes.number,
  player: PropTypes.object,
  playerList: PropTypes.object,
  onSwap: PropTypes.func,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
};

export default RenderModal;
