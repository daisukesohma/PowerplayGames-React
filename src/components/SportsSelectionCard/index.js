import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ClockIcon from "../../icons/Clock2";
import CalenderIcon from "../../icons/Calendar2";
import StadiumIcon from "../../icons/Stadium2";
import Tick2 from "../../icons/Tick2";
import DeleteIcon from "../../assets/delete.png";
import PowerPlayIcon from "../../assets/token.png";
import ForwardArrow from "../../icons/ForwardArrow";
import AidIcon from "../../icons/AidIcon";

function SportsSelectionCard(props) {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    item = {},
    onSelectDeselect = (id) => {},
    disabled = false,
    isSelected = false,
    btnTitle = "Select",
    btnIcon = "",
  } = props || {};

  const {
    title = "",
    avgVal = 0,
    teamA = "",
    teamB = "",
    time = "",
    date = "",
    stadium = "",
    id = "",
    isStarPlayer = false,
    steps = [],
    injured = false,
  } = item || {};

  const nextStep = () => {
    let _currentStep = currentStep;
    if (currentStep < steps?.length - 1) {
      _currentStep++;
    } else {
      _currentStep = 0;
    }

    setCurrentStep(_currentStep);
  };

  return (
    <div className={classes.container_body_card}>
      {isStarPlayer && (
        <span className={classes.container_body_card_start_power}>
          {" "}
          <img src={PowerPlayIcon} /> Star Power{" "}
        </span>
      )}
      <div className={classes.container_body_card_header}>
        <p
          className={`${classes.container_selected_p} ${
            isSelected ? classes.active : ""
          }`}
        >
          {title}
        </p>
        {injured && (
          <div className={classes.injured}>
            <AidIcon />
            <span>Injured</span>
          </div>
        )}
        {!isSelected ? (
          <button
            onClick={() => onSelectDeselect(id)}
            className={disabled && classes.disabled}
            disabled={disabled}
          >
            {btnIcon && btnIcon} {btnTitle || "+ Select"}
          </button>
        ) : (
          <div className={classes.container_selected}>
            <p className={classes.container_selected_p_1}>
              <Tick2 /> Selected{" "}
              <img src={DeleteIcon} onClick={() => onSelectDeselect(id)} />
            </p>
          </div>
        )}
      </div>

      {steps?.length ? (
        <div
          className={`${classes.card_state_main_container} ${
            currentStep === 1 && classes.space_evenly
          }`}
        >
          {steps[currentStep]?.step?.ad ? (
            <img src={steps[currentStep]?.step?.ad} />
          ) : (
            <>
              {currentStep === 1 && (
                <div className={classes.card_state_left}>
                  {steps[currentStep]?.step?.map((val, key) => (
                    <strong key={key.toString()}>{val?.title}</strong>
                  ))}
                </div>
              )}
              <div
                className={`
                  ${classes.container_body_card_state} 
                  ${isSelected && classes.active} 
                  ${currentStep === 0 && classes.border}`}
              >
                {
                  <div className={classes.card_state}>
                    <div className={classes.card_state_title}>
                      {steps[currentStep]?.titles?.map((title, index) => (
                        <span
                          key={index.toString()}
                          className={`${
                            currentStep === 1 && classes.state_step_1_title
                          }`}
                        >
                          {title}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`
                        ${classes.card_state_values} 
                        ${currentStep === 1 && classes.column}`}
                    >
                      {steps[currentStep]?.step?.length &&
                        steps[currentStep]?.step?.map((val, key) =>
                          val?.title ? (
                            <div
                              key={key.toString()}
                              className={classes.card_state_title_1}
                            >
                              {val?.values?.map((value, index) => (
                                <div
                                  key={index.toString()}
                                  className={classes.step_value}
                                >
                                  <strong
                                    className={classes.state_step_1_value}
                                  >
                                    {value}
                                  </strong>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div
                              key={key.toString()}
                              className={`${classes.step_value} ${classes.step_value_1}`}
                            >
                              <strong>{val}</strong>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                }
              </div>
            </>
          )}
        </div>
      ) : (
        <p
          className={`${classes.container_body_card_state} ${
            classes.card_state_no_data
          } ${isSelected ? classes.active : ""}`}
        >
          No Data
        </p>
      )}

      <div className={classes.container_card_footer_main}>
        {currentStep === 0 && (
          <div className={classes.card_footer_left}>
            <p>
              <span className={classes.teamA}>{teamA}</span> VS {teamB}
            </p>

            <div className={classes.divider}></div>
            <p className={classes.container_body_footer}>
              <span>
                <ClockIcon /> {time}
              </span>
              <span>
                <CalenderIcon /> {date}
              </span>
              <span>
                <StadiumIcon /> {stadium}
              </span>
            </p>
          </div>
        )}
        {steps?.length ? (
          <div className={classes.card_footer_right} onClick={nextStep}>
            <ForwardArrow color={"#fb6e00"} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

SportsSelectionCard.propTypes = {
  item: PropTypes.object,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  btnTitle: PropTypes.string,
  btnIcon: PropTypes.element,
  onSelectDeselect: PropTypes.func,
};

export default SportsSelectionCard;
