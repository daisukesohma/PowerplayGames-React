import React from 'react';
import classes from './hitters.module.scss';

const data1 = [
    {
        heading: 'Hitters',
        hitters: [
            {
                title: 'Single',
                value: '+ 3 Pts'
            },
            {
                title: 'Double',
                value: '+ 5 Pts'
            },
            {
                title: 'Tripple',
                value: '+ 8 Pts'
            },
            {
                title: 'Home Run',
                value: '+ 10 Pts'
            },
            {
                title: 'Run Batted in',
                value: '+ 2 Pts'
            },
        ]
    }
];

const data2 = [
    {
        heading: '',
        hitters: [
            {
                title: 'Run',
                value: '+ 2 Pts'
            },
            {
                title: 'Base on Balls',
                value: '+ 2 Pts'
            },
            {
                title: 'Hit by Pitch',
                value: '+ 2 Pts'
            },
            {
                title: 'Stolen Base',
                value: '+ 5 Pts'
            },
        ]
    }
];

const Hitters = (props) => {
    const { title = '' } = props || {};

    return (
        <div className={classes.__hitters}>
            <div className={classes.__hitters_date_time}>
                Oct 24, 2020  |  8:00PM ET
            </div>
            <div className={classes.__hitters_powerdfs}>
                <div>
                    <p className={classes.__hitters_powerdfs_title}>
                        <span className={classes.__hitters_powerdfs_title_first}>{title}</span> PowerdFS
                    </p>
                </div>
                <div className={classes.__hitters_title}>
                    Point System
                </div>
            </div>
            <div className={classes.__prize_grid_data_container}>
                <div className={classes.__prize_grid_data_content}>
                    {
                        data1.map((d, i) => {
                            return (
                                <>
                                    <div className={classes.__hitters_heading}>{d.heading}</div>
                                    {
                                        d.hitters.map((item, index) => {
                                            return (
                                                <div className={classes.__hitters_data}>
                                                    <div className={classes.__hitters_data_title_div}>
                                                        <p className={classes.__hitters_data_title}>{item.title}</p>
                                                    </div>
                                                    <div className={classes.__hitters_data_value_div}>
                                                        <p className={classes.__hitters_data_value}>{item.value}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </>
                            );
                        })
                    }
                </div>
                <div className={classes.__prize_grid_data_content}>
                    {
                        data2.map((d, i) => {
                            return (
                                <>
                                    <div className={classes.__hitters_heading}>{d.heading}</div>
                                    {
                                        d.hitters.map((item, index) => {
                                            return (
                                                <div className={classes.__hitters_data}>
                                                    <div className={classes.__hitters_data_title_div}>
                                                        <p className={classes.__hitters_data_title}>{item.title}</p>
                                                    </div>
                                                    <div className={classes.__hitters_data_value_div}>
                                                        <p className={classes.__hitters_data_value}>{item.value}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Hitters;