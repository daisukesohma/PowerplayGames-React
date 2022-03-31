import React from 'react';
import classes from './pinnaclePowers.module.scss';
import SidebarLockItem from '../../components/SidebarLockItem';
import Button from '../../components/Button';
import Link from '../../components/Link';
import LockIcon from '../../assets/lock.png';
import NewCardLiteIcon from '../../assets/new_card_lite.png';
import BoltLiteIcon from '../../assets/bolt_lite.png';
import PlusMinusLiteIcon from '../../assets/plus_minus_lite.png';
import PinnacleIcon from '../../assets/pinnacle.png';

const PinnaclePowers = () => {
    return (
        <>
            <span className={classes.__sidebar_power_title}>Power <span className={classes.__sidebar_up_title}>- Up!</span></span>
            <div className={classes.__sidebar_locked}>
                <SidebarLockItem
                    title="x2"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={NewCardLiteIcon} width={53} height={53} alt={''}/>}
                />
                <SidebarLockItem
                    title="x1"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={BoltLiteIcon} width={53} height={53} alt={''}/>}
                />
                <SidebarLockItem
                    title="x4"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={PlusMinusLiteIcon} width={53} height={53} alt={''}/>}
                />
            </div>
            <span className={classes.__sidebar_power_up_your_game}>Power - Up <span className={classes.__sidebar_power_up_your_game_with}>Your Game with</span></span>
            <img src={PinnacleIcon} width="100" height="50" alt="" />
            <p className={classes.__sidebar_open_an_account}>Open an account to unlock your Powers</p>
            <Button 
                title="Open Your Account" 
                onClick={() => {}} 
                styles={{"width":"100%","height":"51px", "margin-bottom":"5px", "borderRadius":"12px","boxShadow":"0 0 34px 0 rgba(251, 110, 0, 0.2)","backgroundImage":"linear-gradient(to bottom, #fb9700, #fb6e00)", "color":"#111", "font-size": "14"}} 
            />
            <Link title="Other Unlock Options" onClick={() => {}} />
        </>
    );
};

export default PinnaclePowers;