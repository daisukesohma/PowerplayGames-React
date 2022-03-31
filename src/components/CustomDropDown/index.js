import React, { useRef, useState, useEffect } from "react";
import classes from "./customDropDown.module.scss";

const CustomDropDown = (props) => {
  const {
    value = "",
    options = [{}],
    onChange = () => { },
    wrapperClassName = "",
    dropdownClassName = "",
    wrapperHeaderClassName = "",
    wrapperHeaderMain = "",
    dropdownListItem = ""
  } = props || {};
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };

  }, []);

  const handleClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  return (
    <div
      className={`${classes.__custom_drop_down_wrapper} ${wrapperClassName}`}
      ref={wrapperRef}
    >
      <div
        className={`${classes.__custom_drop_down_wrapper_header} ${wrapperHeaderMain}`}
        onClick={() => setIsVisible(!isVisible)}
      >
        <div className={`${classes.__custom_drop_down_wrapper_header_title} ${wrapperHeaderClassName}`}>
          {value}{" "}
          <span
            className={classes.__custom_drop_down_wrapper_header_down_arrow}
          ></span>
        </div>
      </div>
      {isVisible && (
        <div
          className={`${classes.__custom_drop_down_wrapper_list} ${dropdownClassName}`}
        >
          {options.map((item, index) => {
            return (
              <div
                key={index}
                className={`${classes.__custom_drop_down_wrapper_list_item}
                                         ${item.value === value &&
                  classes.__custom_drop_down_wrapper_list_item_selected
                  }
                                         ${index == 0 &&
                  classes.__custom_drop_down_wrapper_list_item_border_radius_top
                  }
                                         ${options.length - 1 == index &&
                  classes.__custom_drop_down_wrapper_list_item_border_radius_bottom
                  }
                  ${dropdownListItem}`}
                onClick={() => {
                  onChange(item.value);
                  setIsVisible(!isVisible);
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
