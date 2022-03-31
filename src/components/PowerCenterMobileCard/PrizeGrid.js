import React from 'react';
import classes from './prizeGrid.module.scss';
import CurrencyFormat from 'react-currency-format';
import ordinal from 'ordinal';

const PrizeGrid = (props) => {
    const {
        title = '',
        game_type="",
        PrizePayout = [],
        game_set_start = '',
        start_time = '',
        showDateTime= true
    } = props || {};

    const data1 = [
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
    ];

    const data2 = [
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

        <div className={classes.__prize_grid}>
            {showDateTime &&
                <div className={classes.__prize_grid_date_time}>
                    {game_set_start} | {start_time} ET
                </div>
            }
            <div className={classes.__my_game_center_card_powerdfs}>
                <p className={`text-left`} >
                    <span className={classes.__my_game_center_card_powerdfs_title_first} style={{ fontSize: '18px', color: 'white' }}>
                        {title}
                    </span>
                    <span className={classes.__my_game_center_card_powerdfs_title} style={{ fontSize: '18px' }}> {game_type === "NHL_Fantasy" ? "Fantasy" : "PowerdFS"} </span>
                    <span className={`${classes.__my_game_center_card_powerdfs_subtitle}`} style={{ fontSize: '14px', opacity:0.6 }}>
                        Prize Grid
                    </span>
                </p>
            </div>
            <div className={classes.__prize_grid_data_container}>
                <div className={classes.__prize_grid_data_content}>
                    {
                        PrizePayout.map((item, index) =>
                            <>
                                {index < 5 && (
                                    <div className={classes.__prize_grid_data} key={index}>
                                        <div className={classes.__prize_grid_data_title_div}>
                                            {item?.from === item?.to ? (
                                                <p className={classes.__prize_grid_data_title}>
                                                    {ordinal(parseInt(item?.from))}
                                                </p>
                                            ) : (
                                                <p className={classes.__prize_grid_data_title}>
                                                    {ordinal(parseInt(item?.from))} - {ordinal(parseInt(item?.to))}
                                                </p>
                                            )}
                                        </div>
                                        <div className={classes.__prize_grid_data_value_div}>
                                            <p className={classes.__prize_grid_data_value}>
                                                <CurrencyFormat value={item?.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}.00</div>} />
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    }
                </div>
                <div className={classes.__prize_grid_data_content}>
                    {PrizePayout.map((item, index) =>
                        <>
                            {index >= 5 && (
                                <div className={classes.__prize_grid_data} key={index}>
                                    <div className={classes.__prize_grid_data_title_div}>
                                        {item?.from === item?.to ? (
                                            <p className={classes.__prize_grid_data_title}>
                                                {ordinal(parseInt(item?.from))}
                                            </p>
                                        ) : (
                                            <p className={classes.__prize_grid_data_title}>
                                                {ordinal(parseInt(item?.from))} - {ordinal(parseInt(item?.to))}
                                            </p>
                                        )}
                                    </div>
                                    <div className={classes.__prize_grid_data_value_div}>
                                        <p className={classes.__prize_grid_data_value}>{item?.amount}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default PrizeGrid;