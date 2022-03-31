import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";
import Modal from "../Modal";
import CloseIcon from "../../icons/Close";
import { redirectTo } from "../../utility/shared";
import _ from "underscore";

import NFLbg from "../../assets/group-31.png";
import NHLbg from "../../assets/NHLPopupBg.png";
import NBAbg from "../../assets/NBAPopupBg.png";
import MLBbg from "../../assets/MLBPopupBg.png";

function FreeEntryModal(props) {
  const { visible = false, onClose = () => { }, item = {} } =
    props || {};
    const { league = "MLB" } = item || {};
    const getBG = () => {
      switch(league) {
        case "MLB": 
          return MLBbg;
        case "NFL": 
          return NFLbg;
        case "NHL": 
          return NHLbg;
        case "NBA": 
          return NBAbg;
        case "default":
          return MLBbg;
      }
    }
  const redirectToUrl = () => {
    let item = props.item;
    // return redirectTo(props.propss, {
    //   path: `/mlb-select-team`,
    //   state: {
    //     game_id: item?.game_id,
    //     sport_id: item?.sports_id,
    //     start_date: getLocalDateTime(item?.start_date, item?.start_time)?.date,
    //     game_set_start: getLocalDateTime(item?.game_set_start, item?.start_time)?.date,
    //     start_time: getLocalDateTime(item?.game_set_start, item?.start_time)?.time,
    //     end_date: getLocalDateTime(item?.end_date, item?.end_time)?.date,
    //     outOf: item?.target,
    //     enrolledUsers: item?.enrolled_users,
    //     prizePool: _.reduce(
    //       item?.PrizePayouts,
    //       function (memo, num) {
    //         return memo + parseInt(num.amount) * parseInt(num.prize);
    //       },
    //       0
    //     ),
    //     topPrize: parseFloat(
    //       _.max(item?.PrizePayouts, function (ele) {
    //         return ele.amount;
    //       }).amount
    //     ),
    //     PointsSystem: item?.PointsSystems,
    //     Power: item?.Powers,
    //     prizes: item?.PrizePayouts,
    //     paid_game: item?.is_game_paid,
    //     entry_fee: item?.entry_fee,
    //     currency: item?.currency,
        
    //   },
    // });
  }

  

  return (
    <>
        <Modal visible={visible}>
            <div className={classes.wrapper} style={{ width: 780, backgroundImage: `url(${getBG()})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: 20, paddingBottom: 20 }}>
                <div className={classes.modal_body}>
                    <div className={classes.topButtons}>
                        <div className={classes.closeButton}>
                            <CloseIcon onClick={onClose} />
                        </div>
                    </div>
                    <div className={classes.modalHeading}>
                        <p>Please complete the free entry survey below:</p>
                    </div>
                    <div className={classes.modalForm}>
                        <div className={classes.formElem}>
                            <p>
                                What MLB team do you cheer for?
                            </p>
                            <select>
                                <option>Select your MLB team</option>
                            </select>
                        </div>

                        <div className={classes.formElem}>
                            <p>
                                What NFL team do you cheer for?
                            </p>
                            <select>
                                <option>Select your NFL team</option>
                            </select>
                        </div>

                        <div className={classes.formElem}>
                            <p>
                                What NBA team do you cheer for?
                            </p>
                            <select>
                                <option>Select your NBA team</option>
                            </select>
                        </div>

                        <div className={classes.formElem}>
                            <p>
                                What NHL team do you cheer for?
                            </p>
                            <select>
                                <option>Select your NHL team</option>
                            </select>
                        </div>
                    
                        <div className={classes.bottomButtons}>
                            <button className={classes.backButton}>
                                {"< Back"}
                            </button>
                            <button className={classes.entryButton}>
                                {"Free Entry"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </>
  );
}

FreeEntryModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default FreeEntryModal;
