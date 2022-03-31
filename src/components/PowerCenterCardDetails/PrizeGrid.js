import React from 'react';

import CurrencyFormat from 'react-currency-format';
import classes from './prizeGrid.module.scss';
import ordinal from 'ordinal';
import MLBPlayer from "../../assets/mlb-player.png";

const PrizeGrid = (props) => {
  const {
    PrizePayout,
  } = props;

  const data = [
    {
      title: '1st',
      value: '$2,000.00'
    },
    {
      title: '2nd',
      value: '$750.00'
    },
    {
      title: '3rd',
      value: '$350.00'
    },
    {
      title: '4th',
      value: '$200.00'
    },
    {
      title: '5th',
      value: '$150.00'
    },
    {
      title: '6th - 7th',
      value: '$100.00'
    },
    {
      title: '8th - 10th',
      value: '$80.00'
    },
    {
      title: '11th - 15th',
      value: '$60.00'
    },
    {
      title: '16th - 20th',
      value: '$50.00'
    },
    {
      title: '21st - 30th',
      value: '$40.00'
    },
  ];

  return (
    <div className={`${classes.__prize_grid}`}>
      <p className={classes.__prize_grid_title} >Prize Grid</p>
      <div className={classes.__prize_grid_scroll_bar}>
        {
          PrizePayout.map((item, index) => {
            return (
              <div className={classes.__prize_grid_data}>
                <div className={classes.__prize_grid_data_title_div}>
                  {item?.from === item?.to ? (
                    <p className={classes.__prize_grid_data_title}>
                      {
                        ordinal(parseInt(item?.from))
                      }
                    </p>
                  ) : (
                    <p className={classes.__prize_grid_data_title}>
                      {
                        ordinal(parseInt(item?.from))} - {ordinal(parseInt(item?.to))
                      }
                    </p>
                  )}
                </div>
                <div className={classes.__prize_grid_data_value_div}>

                  <p className={classes.__prize_grid_data_value}>
                    <CurrencyFormat value={item?.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}.00</div>} />
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PrizeGrid;
