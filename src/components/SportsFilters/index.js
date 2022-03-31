import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import Tick2 from "../../icons/Tick2";

function SportsFilters(props) {
  const {
    data = [],
    onSelect = () => {},
    activeFilter = {},
    selectedFilter = {},
  } = props || {};
  return (
    <div className={classes.container_top_2}>
      {data?.length ? (
        data?.map((item) => (
          <button
            className={`
              ${item.remaining <= 0 ? classes.active : ""} 
              ${
                selectedFilter?.id === item?.id && item.remaining > 0
                  ? classes.selected
                  : selectedFilter?.id === item?.id && classes.border
              }`}
            onClick={() => onSelect(item?.title)}
            key={item?.id.toString()}
            id={item?.title+"-filter"}
          >
            {item.title} <span>{item.remaining} Left</span>
            <div className={classes.tick}>
              <Tick2 />
            </div>
          </button>
        ))
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

SportsFilters.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
  activeFilter: PropTypes.object,
  selectedFilter: PropTypes.object,
};

export default SportsFilters;
