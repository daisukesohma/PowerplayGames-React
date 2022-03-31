import React from 'react';
import classes from './index.module.scss';
import PointBooster from '../../assets/point-booster.svg';
import SwapPlayer from '../../assets/swap-player.svg';
import DWall from '../../assets/d-wall.svg';
import Challenge from '../../assets/challenge.svg';
import RetroBoost from '../../assets/retro-boost.svg';
import RechargeAll from '../../assets/recharge-all.svg';
import BatteryPower from '../../assets/battery-power.svg';
import BatteryPowerHigh from '../../assets/battery-power-high.svg';
import BatteryPowerMedium from '../../assets/battery-power-medium.svg';
import BatteryPowerLow from '../../assets/battery-power-low.svg';
import BatteryPowerDanger from '../../assets/battery-power-danger.svg';
import Facebook from '../../assets/facebook.svg';
import Twitter from '../../assets/twitter.svg';

const BatteryPowerLevels = () => {

    const row = (
        firstColPower, 
        firstColTitle, 
        firstColBattery, 
        firstColBatteryDuration, 
        secondColPower, 
        secondColTitle, 
        secondColBattery,
        secondColBatteryDuration ) => {
        return (
            <div className={classes.battery_levels}>
                <div>
                    <div>
                        <img src={firstColPower} />
                    </div>
                    <div className={classes.power_title}>
                        {firstColTitle}
                    </div>
                    <div style={{ marginTop: firstColTitle == 'Point Booster' ? 6 : 0}}>
                        <img src={firstColBattery} />
                    </div>
                    <div className={classes.battery_duration_text}>
                        {firstColBatteryDuration}
                    </div>
                </div>
                <div>
                    <div>
                        <img src={secondColPower} />
                    </div>
                    <div className={classes.power_title}>
                        {secondColTitle}
                    </div>
                    {
                        secondColTitle != 'Recharge All'
                        ?
                        <>
                            <div>
                            <img src={secondColBattery} />
                            </div>
                            <div className={classes.battery_duration_text}>
                                {secondColBatteryDuration}
                            </div>
                        </>
                        :
                        <div className={classes.recharge_all_container}>
                            <div className={classes.share_to_recharge}>
                                Share to recharge:
                            </div>
                            <div>
                                <img src={Facebook} />
                                <img src={Twitter} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };
    
    return (
        <div className={classes.battery_power_levels}>
            <div className={classes.title}>
                <span>MY</span> Powers
            </div>
            {row(PointBooster, 'Point Booster', BatteryPower, '', SwapPlayer, 'Swap Player', BatteryPowerHigh, '~ 1 min')}
            {row(DWall, 'D-Wall', BatteryPowerMedium, '~ 5 min', Challenge, 'Challenge', BatteryPowerLow, '~ 8 min')}
            {row(RetroBoost, 'Retro Boost', BatteryPowerDanger, '~ 12 min', RechargeAll, 'Recharge All', BatteryPowerLow, '~ 8 min')}
        </div>
    );
};

export default BatteryPowerLevels;