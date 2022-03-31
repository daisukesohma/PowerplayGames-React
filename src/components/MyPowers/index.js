import React from 'react';
import classes from './myPowers.module.scss';
import SidebarButton from '../../components/SidebarButton';
import Replace from '../../icons/Replace';
import BoltIcon from '../../assets/bolt.png';
import ReplaceAllIcon from '../../assets/ReplaceAllIcon.png';
import PlusMinus from '../../icons/PlusAndMinus';

const MyPowers = (props) => {
    const { replace = 0, replaceAll = 0, powerMatch = 0, increaseOrDecrease = 0 } = props.inventory || {};
    return (
        <>
            <span className={classes.__sidebar_my_powers_title}>My Powers</span>
            <div className={classes.__sidebar_my_powers}>
                {
                    replace >= 0
                    &&
                    <SidebarButton
                        success={replace > 0 ? true : false}
                        primary={replace <= 0 ? true : false}
                        title="Power Hit"
                        toolText={`${replace} left`}
                        icon={<Replace style={{ height: 'auto' }} />}
                    />
                }

                {
                    powerMatch >= 0
                    &&
                    <SidebarButton
                        success={powerMatch > 0 ? true : false}
                        primary={powerMatch <= 0 ? true : false}
                        title="Power Ace"
                        toolText={`${powerMatch} left`}
                        icon={<img src={BoltIcon} width={53} height={53} alt={''}/>}
                    />
                }

                {
                    increaseOrDecrease >= 0
                    &&
                    <SidebarButton
                        success={increaseOrDecrease > 0 ? true : false}
                        primary={increaseOrDecrease <= 0 ? true : false}
                        title="Power Up/Down"
                        toolText={`${increaseOrDecrease} left`}
                        icon={<PlusMinus style={{height: 'auto'}}/>}
                    />
                }   
                
                {
                    replaceAll >= 0
                    &&
                    <SidebarButton
                        success={replaceAll > 0 ? true : false}
                        primary={replaceAll <= 0 ? true : false}
                        title="Power Hand"
                        toolText={`${replaceAll} left`}
                        icon={<img src={ReplaceAllIcon} width={53} height={53} alt={''}/>}
                    />
                }
            </div>
            
        </>
    );
};

export default MyPowers;