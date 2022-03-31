import React from "react";
import PropTypes from "prop-types";
import ordinal from "ordinal";

import classes from "./index.module.scss";
import Modal from "../Modal";
import CloseIcon from "../../icons/Close";
import CupIcon from "../../icons/Cup";

function PrizeModal(props) {
  const {
    visible = false,
    sportsName = "",
    data = [],
    onClose = () => {},
  } = props || {};

  const Item = ({ place, payout }) => (
    <div className={classes.item}>
      <div className={classes.item_text}>{place}</div>
      <div className={`${classes.item_text} ${classes.primary}`}>${payout}</div>
    </div>
  );

  return (
    <Modal visible={visible}>
      <div className={classes.wrapper}>
        <CupIcon className={classes.cup_svg} />
        <div className={classes.header}>
          <div className={classes.close_icon}>
            <CloseIcon onClick={onClose} />
          </div>
          <p className={classes.title}>
            PowerdFS - <span>{sportsName}</span>
          </p>
          <span className={classes.title_prize}>prize Grid</span>
        </div>

        <div className={classes.modal_body}>
          <div className={classes.table}>
            <div className={classes.table_header}>
              <div className={classes.header_text}>Place</div>
              <div className={classes.header_text}>Payout</div>
            </div>

            <div className={classes.table_body}>
              {data &&
                data?.length &&
                data?.map((item, ind) => {
                  return (
                    <>
                      {item?.from === item?.to ? (
                        <p
                          className={classes.__prize_grid_data_title}
                          key={ind}
                        >
                          {
                            <Item
                              place={ordinal(parseInt(item?.from))}
                              payout={item?.amount}
                              key={ind + "--"}
                            />
                          }
                        </p>
                      ) : (
                        <p
                          className={classes.__prize_grid_data_title}
                          key={ind}
                        >
                          {
                            <Item
                              place={`${ordinal(
                                parseInt(item?.from)
                              )} - ${ordinal(parseInt(item?.to))}`}
                              payout={item?.amount}
                              key={ind + "--"}
                            />
                          }
                        </p>
                      )}
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

PrizeModal.propTypes = {
  visible: PropTypes.bool,
  sportsName: PropTypes.string,
  data: PropTypes.array,
  onClose: PropTypes.func,
};

export default PrizeModal;
