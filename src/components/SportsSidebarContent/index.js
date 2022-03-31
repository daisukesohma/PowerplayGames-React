import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import DeleteIcon from "../../icons/Delete2";
import PowerIcon from "../../assets/power_balance_icon.png";
import { CONSTANTS } from "../../utility/constants";

import { useMediaQuery } from "react-responsive";

const { P, C, SS, XB, OF, D } = CONSTANTS.FILTERS.MLB;

function SportsSidebarContent(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  const {
    data = [],
    onDelete = (id, matchId) => { },
    starIcon = "",
    selectedPlayerCount = 0,
  } = props || {};

  const SideBarSection = ({
    title,
    name,
    playerId,
    isStarPlayer,
    SvgIcon,
    svgSize,
    onDelete,
    keyVal,
    matchId,
  }) => (
    <div
      className={classes.sidebar_body_section}
      key={playerId + " - " + matchId}
    >
      {!isMobile && <span className={name ? classes.active : ""}>{title}</span>}
      <div>
        {isMobile && (
          <span className={name ? classes.active : ""}>{title}</span>
        )}
        {isStarPlayer && <img src={starIcon ? starIcon : PowerIcon} alt="" />}
        {SvgIcon && <SvgIcon size={svgSize} />}
        {name ? (
          <div className={classes.sidebar_body_value}>
            {name}{" "}
            <span onClick={() => {
              onDelete(playerId, matchId);
            }
            }>
              <DeleteIcon />
            </span>
          </div>
        ) : (
          <span>Not Selected</span>
        )}
      </div>
    </div>
  );

  return (
    <div className={classes.sidebar_body}>
      <p>
        {selectedPlayerCount}/{data?.length} Starting Players Selected
      </p>
      <div className={classes.sidebar_body_1}>

        {data?.length ? (
          data?.map((item, index) => (
            <SideBarSection
              title={item?.title}
              name={
                item?.type === D ? item?.team?.name : item?.player?.playerName
              }
              playerId={
                item?.type === D ? item?.team?.team_id : item?.player?.playerId
              }
              keyVal={
                item?.type === D ? item?.team?.team_id : item?.player?.playerId
              }
              SvgIcon={item?.icon}
              onDelete={onDelete}
              key={index.toString()}
              isStarPlayer={item?.isStarPlayer}
              matchId={item?.matchId}
            />
          ))
        ) : (
          <span>No data</span>
        )}
        {!isMobile && (
          <div className={classes.sidebar_arrow_container}>
            <span className={`${classes.arrow} ${classes.up}`} />
          </div>
        )}
      </div>
    </div>
  );
}

SportsSidebarContent.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
  starIcon: PropTypes.string,
  selectedPlayerCount: PropTypes.number,
};

export default SportsSidebarContent;
