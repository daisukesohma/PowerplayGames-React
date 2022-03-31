import React from 'react';
import classes from './powersAvailable.module.scss';
import PointBooster from '../../assets/point-booster-mobile.png';
import SwapPlayer from '../../assets/swap-player-mobile.png';
import Undo from '../../assets/undo-mobile.png';
import RetroBoost from '../../assets/retro-boost-mobile.png';
import DWall from '../../assets/d-wall-mobile.png';
import VideoReview from '../../assets/video-review-mobile.png';
import PointMultipliers from '../../assets/point-multipliers.png';
import PlayerSwaps from '../../assets/player-swaps.png';
import InfoIcon from '../../assets/info-icon@3x.png';
import Challange from '../../assets/challenge.svg';
import PowerUpIcon from '../../assets/power-up-icon.svg';

const data1 = [
    {
        id: 1,
        icon: PointBooster,
        count: 2,
        value: 'Point Booster'
    },
    {
        id: 2,
        icon: SwapPlayer,
        count: 2,
        value: 'Swap Player'
    },
    {
        id: 3,
        icon: Undo,
        count: 2,
        value: 'Undo'
    },
];

const data2 = [
    {
        id: 4,
        icon: RetroBoost,
        count: 3,
        value: 'Retro Boost'
    },
    {
        id: 5,
        icon: DWall,
        count: 2,
        value: 'D-Wall'
    },
    {
        id: 6,
        icon: VideoReview,
        count: 2,
        value: 'Video Review'
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

        else if (powerName.toLowerCase().match(/multi|point/g))
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
    const {
        game_type = '',
        title = '',
        Power = [],
        game_set_start = '',
        start_time = '',
        showDateTime = true
    } = props || {};

    const getPowerCount = (name) => {
        let val = 0;
        Power.forEach(element => {
            if(name == "Point Booster")
            {
                if(element.powerName == "1.5x Point Booster" || element.powerName == "2x Point Booster" || element.powerName == "3x Point Booster") {
                    val = val + parseInt(element.amount == "" ? 0 : element.amount);
                }
            }
            else {
                if(name == element.powerName) {
                    val = parseInt(element.amount == "" ? 0 : element.amount);
                }
            }
        });
        return val;
    }

    return (
        <div className={classes.__powers_available}>
            {showDateTime && 
                <div className={classes.__powers_available_date_time}>
                    {game_set_start} | {start_time} ET
                </div>
            }
            {game_type==="NHL_Fantasy" ? 
            <>
            <div className={classes.__my_game_center_card_powerdfs}>
                <p className={`text-left`} >
                    <span className={classes.__my_game_center_card_powerdfs_title_first} style={{ fontSize: '18px', color: 'white' }}>
                        {title}
                    </span>
                    <span className={classes.__my_game_center_card_powerdfs_title} style={{ fontSize: '18px' }}> Fantasy </span>
                </p>
            </div>
            <div className={classes.__my_game_center_card_power_not_available}>
                <p className={classes.__powers_not_available_title}>Powers Available</p>
                <p className={classes.__powers_not_available_text}>Powers are not available for traditional Fantasy contests</p>
            </div>
            </>
            :
            <>
            <div className={classes.__my_game_center_card_powerdfs}>
                <p className={`text-left`} >
                    <span className={classes.__my_game_center_card_powerdfs_title_first} style={{ fontSize: '18px', color: 'white' }}>
                        {title}
                    </span>
                    <span className={classes.__my_game_center_card_powerdfs_title} style={{ fontSize: '18px' }}> PowerdFS </span>
                    <span className={`${classes.__my_game_center_card_powerdfs_subtitle}`} style={{ fontSize: '14px', opacity:0.6 }}>
                        Powers Available
                    </span>
                </p>
            </div>
            <div className={classes.__powers_available_data_container}>
                <div className={classes.__powers_available_data}>
                    <div className={classes.__powers_available_data_icon_div}>
                        <img src={getIcon("Swap Players")} alt="" width="34" height="34" className={classes.__powers_available_data_icon} />
                        <div className={classes.__powers_available_data_power_count}>
                            <p>
                                {getPowerCount("Swap")}
                            </p>
                        </div>
                    </div>
                    <div className={classes.__powers_available_data_value_div}>
                        <p className={classes.__powers_available_data_value}>Swaps</p>
                    </div>
                </div>
                <div className={classes.__powers_available_data}>
                    <div className={classes.__powers_available_data_icon_div}>
                        <img src={getIcon("Point Booster")} alt="" width="34" height="34" className={classes.__powers_available_data_icon} />
                        <div className={classes.__powers_available_data_power_count}>
                            <p>
                                {getPowerCount("Point Booster")}
                            </p>
                        </div>
                    </div>
                    <div className={classes.__powers_available_data_value_div}>
                        <p className={classes.__powers_available_data_value}>Point Booster</p>
                    </div>
                </div>
                <div className={classes.__powers_available_data}>
                    <div className={classes.__powers_available_data_icon_div}>
                        <img src={getIcon("Retro Boost")} alt="" width="34" height="34" className={classes.__powers_available_data_icon} />
                        <div className={classes.__powers_available_data_power_count}>
                            <p>
                                {getPowerCount("Retro Boost")}
                            </p>
                        </div>
                    </div>
                    <div className={classes.__powers_available_data_value_div}>
                        <p className={classes.__powers_available_data_value}>Retro Boost</p>
                    </div>
                </div>
            </div>
            <div className={classes.__powers_available_data_container}>
                <div className={classes.__powers_available_data}>
                    <div className={classes.__powers_available_data_icon_div}>
                        <img src={getIcon("Challenge")} alt="" width="34" height="34" className={classes.__powers_available_data_icon} />
                        <div className={classes.__powers_available_data_power_count}>
                            <p>
                                {getPowerCount("Challenge")}
                            </p>
                        </div>
                    </div>
                    <div className={classes.__powers_available_data_value_div}>
                        <p className={classes.__powers_available_data_value}>Challenge</p>
                    </div>
                </div>

                <div className={classes.__powers_available_data}>
                    <div className={classes.__powers_available_data_icon_div}>
                        <img src={getIcon("D-Wall")} alt="" width="34" height="34" className={classes.__powers_available_data_icon} />
                        <div className={classes.__powers_available_data_power_count}>
                            <p>
                                {getPowerCount("D-Wall")}
                            </p>
                        </div>
                    </div>
                    <div className={classes.__powers_available_data_value_div}>
                        <p className={classes.__powers_available_data_value}>D-Wall</p>
                    </div>
                </div>
                
                {/* <div className={classes.__powers_available_data}>
                    <div className={classes.__powers_available_data_icon_div}>
                        <img src={getIcon("Power-Up")} alt="" width="34" height="34" className={classes.__powers_available_data_icon} />
                        <div className={classes.__powers_available_data_power_count}>
                            <p>
                                {getPowerCount("Power-Up")}
                            </p>
                        </div>
                    </div>
                    <div className={classes.__powers_available_data_value_div}>
                        <p className={classes.__powers_available_data_value}>Power Up</p>
                    </div>
                </div> */}
            </div>
            </>
            }
        </div >
    );
};

export default PowersAvailable;