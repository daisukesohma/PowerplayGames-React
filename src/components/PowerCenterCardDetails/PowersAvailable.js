import React, { useState } from 'react';
import classes from './powersAvailable.module.scss';
import PointMultipliers from '../../assets/point-multipliers.png';
import PlayerSwaps from '../../assets/player-swaps.png';
import VideoReview from '../../assets/video-review.png';
import DWall from '../../assets/d-wall.png';
import LearnMoreModal from './LearnMoreModal';
import RetroBoost from '../../assets/retro-boost-icon.png';
import Challange from '../../assets/challenge.svg';
import InfoIcon from '../../assets/info-icon@3x.png';
import PowerUpIcon from '../../assets/power-up-icon.svg';

const data = [
  {
    id: 1,
    icon: PointMultipliers,
    count: 3,
    value: "Point Booster",
  },
  {
    id: 2,
    icon: PlayerSwaps,
    count: 2,
    value: "Swap Player",
  },
  {
    id: 3,
    icon: VideoReview,
    count: 2,
    value: "Video Review",
  },
  {
    id: 4,
    icon: DWall,
    count: 2,
    value: "D-Wall",
  },
];

const getIcon = (powerName) => {
  if (powerName) {
    if (powerName.toLowerCase().match(/wall/g))
      return DWall;

    else if (powerName.toLowerCase().match(/video|review/g))
      return VideoReview;

    else if (powerName.toLowerCase().match(/swap/g))
      return PlayerSwaps;

    else if (powerName.toLowerCase().match(/multi|boost|1.5|2.5/g))
      return PointMultipliers;

    else if (powerName.toLowerCase().match(/retro/g))
      return RetroBoost;

    else if (powerName.toLowerCase().match(/challenge/g))
      return Challange;

    else if (powerName.toLowerCase().match(/power-up/g))
      return PowerUpIcon
  }
}

const PowersAvailable = (props) => {
  const { title = "",
    isMobile = false,
    learnMore = () => { },
    Power = [],
    game_type=""
  } = props || {};
  
  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const powerSorting = [4,1,2,3,10,6,5,8];
  const onOpenModal = () => setLearnMoreModal(true);
  const onCloseModal = () => setLearnMoreModal(false);

  return (
    <div className={classes.__powers_available}>
      {isMobile ? (
        <>
          {/* {learnMoreModal && (
            <LearnMoreModal
              title={title}
              learnMoreModal={learnMoreModal}
              onCloseModal={onCloseModal}
            />
          )} */}

          <div className={classes.__my_game_center_card_powerdfs}>
            <p className={`text-left`}>
              <span className={classes.__my_game_center_card_powerdfs_title_first} style={{ fontSize: '18px', color: 'white' }}>
                {title}
              </span>
              <span className={classes.__my_game_center_card_powerdfs_title} style={{ fontSize: '18px' }}> PowerdFS </span>
              <span className={`${classes.__my_game_center_card_powerdfs_subtitle}`} style={{ fontSize: '14px' }}>
                Available Powers
              </span>
            </p>
          </div>

          {(() => {
            const itemsInaRow = 3;
            const numberOfRows = Math.ceil(Power.length / itemsInaRow);
            const myGameCenterCardAvailablePowerView = Array(numberOfRows)
              .fill(undefined)
              .map((item, i) => {
                const start = (i + 1) * itemsInaRow - 3;
                const end = (i + 1) * itemsInaRow;
                const items = Power.slice(start, end);

                return (
                  <div className={classes.__powers_available_data}>
                    {items.map((item, index) => {
                      return (
                        <div>
                          <div
                            className={classes.__powers_available_data_icon_div}
                            onClick={learnMore}
                          >
                            <img
                              src={getIcon(item?.powerName)}
                              width="28"
                              height="28"
                              className={classes.__powers_available_data_icon}
                              alt=""
                            />
                            <div
                              className={
                                classes.__powers_available_data_power_count
                              }
                            >
                              {item?.amount}
                            </div>
                          </div>
                          <div
                            className={
                              classes.__powers_available_data_value_div
                            }
                          >
                            <p
                              className={classes.__powers_available_data_value}
                            >
                              {item?.powerName}
                            </p>
                          </div>
                          {
                            Power.length === index + 1 && (
                              <div
                                className={
                                  classes.__powers_available_learn_more_div
                                }
                                onClick={() => onOpenModal()}
                              >
                                <p
                                  className={
                                    classes.__powers_available_learn_more_text
                                  }
                                >
                                  Learn more
                                </p>
                              </div>
                            )
                          }
                        </div>
                      );
                    })}
                  </div >
                );
              });
            return myGameCenterCardAvailablePowerView;
          })()}
        </>
      ) : game_type==="NHL_Fantasy" ? (
        <div className={classes.__powers_available_title_and_learn_more_div}>
          <div className={classes.__powers_available_title_div}>
            <div className={classes.__power_info_main}>
              <div className={classes.__powers_not_available}>
                <p className={classes.__powers_not_available_title}>Powers Available</p>
                <p className={classes.__powers_not_available_text}>Powers are not available for traditional Fantasy contests</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={classes.__powers_available_title_and_learn_more_div}>
            <div className={classes.__powers_available_title_div}>
              <div className={classes.__power_info_main}>
                <div className={classes.__info_main_title}>
                  <p className={classes.__powers_available_title}>
                    Powers Available
                  </p>
                </div>
                <div className={classes.__info_icon_mobile} onClick={() => onOpenModal()}>
                  <img src={InfoIcon} className={classes.__info_icon} alt="" srcset="" />
                </div>
              </div>
            </div>
            {learnMoreModal && (
              <LearnMoreModal
                title={title}
                learnMoreModal={learnMoreModal}
                onCloseModal={onCloseModal}
              />
            )}
          </div>

          <div className={classes.__power_scroll_bar}>
            {powerSorting.map((items, index) => {
              let item = Power[Power.findIndex(x => x.powerId == items)];
              if (item !== undefined) 
                return (
                  <div className={classes.__powers_available_data}>
                    <div className={classes.__powers_available_data_icon_div}>
                      <img
                        src={getIcon(item?.powerName)}
                        width="36"
                        height="36"
                        className={classes.__powers_available_data_icon}
                        alt=""
                      />
                      <div className={classes.__powers_available_data_power_count}>
                        {item.amount}
                      </div>
                    </div>
                    <div className={classes.__powers_available_data_value_div}>
                      <p className={classes.__powers_available_data_value}>
                        {item?.powerName}
                      </p>
                    </div>
                    {/* {Power.length === index + 1 && (
                      <div
                        className={classes.__powers_available_learn_more_div}
                        onClick={() => onOpenModal()}
                      >
                        <p className={classes.__powers_available_learn_more_text}>
                          Learn more
                        </p>
                      </div>
                    )} */}
                  </div>
                );
            })}
          </div>
        </>
      )}
    </div >
  );
};

export default PowersAvailable;
