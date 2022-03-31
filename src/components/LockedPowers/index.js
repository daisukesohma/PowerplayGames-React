import React from 'react';
import classes from './lockedPowers.module.scss';
import SidebarLockItem from '../../components/SidebarLockItem';
import Button from '../../components/Button';
import Link from '../../components/Link';
import NewCardLiteIcon from '../../assets/new_card_lite.png';
import BoltLiteIcon from '../../assets/bolt_lite.png';
import PlusMinusLiteIcon from '../../assets/plus_minus_lite.png';
import LockIcon from '../../assets/lock.png';

const LockedPowers = (props) => {
    const {onPurchaseNowClick = () => {}, onOtherUnlockOptionsClick = () => {}} = props || {};
    return (
        <>
            <span className={classes.__sidebar_power_title}>Power <span className={classes.__sidebar_up_title}>- Up!</span></span>
            <div className={classes.__sidebar_lock_item}>
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
            <p className={classes.__sidebar_purchase_powers_text}>Purchase Powers</p>
            <p className={classes.__sidebar_to_power_up}>to Power-up</p>
            <p className={classes.__sidebar_purchase_powers_text}>your game!</p>
            <Button 
                title="$1 • Purchase Now" 
                onClick={onPurchaseNowClick} 
                styles={{"width":"190px","height":"51px","margin":"20px 0 20px","borderRadius":"12px","boxShadow":"0 0 34px 0 rgba(251, 110, 0, 0.2)","backgroundImage":"linear-gradient(to bottom, #fb9700, #fb6e00)","fontFamily":"Poppins","fontSize":"16px","fontWeight":"500","fontStretch":"normal","fontStyle":"normal","lineHeight":"normal","letterSpacing":"normal","textAlign":"center","color":"#111111"}} 
            />
            <Link 
                title="Other Unlock Options" 
                onClick={onOtherUnlockOptionsClick} 
            />
        </>
    );
};

export default LockedPowers;