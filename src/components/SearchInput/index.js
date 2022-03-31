import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import SearchIcon from "../../icons/SearchIcon";

/**
 *
 * @param {*} props
 * @param {*} dropDown - if array of objects then it must have key name title or array of strings
 */
function SearchInput(props) {
  
  const [showTeamSelection, setTeamSelectionState] = useState(false);

  const {
    onSearch = (event) => {},
    onSelect = (item) => {},
    dropDown = [],
    selected = "",
    placeholder = "",
    searchText = "",
    isReset = false,
    setSearch = "",
    search = "",
  } = props || {};

  React.useEffect(() => {
    if(isReset)
    {
      setSearch("");
      props.setResetSearch(false);
    }
  },[isReset]);

  const onChange = (e) => {
    onSearch(e);
  };

  const isObject = (item) => {
    return typeof item === "object";
  };

  return (
    <form className={classes.search_form} style={props?.setStyle ? props?.setStyle : {}}>
      <span>
        <SearchIcon />
        <input
          value={search}
          onChange={onChange}
          placeholder={placeholder || "Search by Player name ..."}
          name="playerSearch"
          required
          id={"searchInput"}
        />
      </span>

      {dropDown && dropDown?.length ? (
        <div
          className={classes.search_dropdown}
          onClick={() => setTeamSelectionState(!showTeamSelection)}
        >
          {selected && isObject(selected)
            ? selected?.name
            : selected
            ? selected
            : `All Teams`}
          <span
            className={`${classes.arrow} 
                            ${showTeamSelection ? classes.up : classes.down}`}
          />
          {showTeamSelection && (
            <div
              className={classes.search_dropdown_menu}
              onMouseLeave={() => setTeamSelectionState(false)}
            >
              {dropDown?.map((item, ind) => (
                <span
                  key={ind + "" + item}
                  className={
                    isObject(item)
                      ? item?.name === selected?.name && classes.active
                      : item === selected && classes.active
                  }
                  onClick={() => onSelect(item)}
                >
                  {isObject(item) ? item?.name : item}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}

SearchInput.propTypes = {
  dropDown: PropTypes.array,
  selected: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  setSearch:PropTypes.string,
  search:PropTypes.string,
};

export default SearchInput;
