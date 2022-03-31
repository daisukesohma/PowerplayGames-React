import React from 'react';
import classes from './footer.module.scss';

const Footer = (props) => {
    const {
        entry_fee = '',
        onBack = () => { },
        onNext = () => { },
        onEnter = () => { },
        myGameCenter = false,
        userHasEntered = false,
        game_type = "",
        isCompleted=false
    } = props || {};
    return (
        <div className={classes.__power_center_card_details_footer}>
            <div className={classes.__power_center_card_details_footer_back}>
                <div className={classes.__power_center_card_details_back_arrow}>
                    {"<"}
                </div>
                <div className={classes.__power_center_card_details_footer_back_text} onClick={onBack}>
                    Back
                </div>
            </div>
            {!isCompleted &&(<>
            
            {
                !myGameCenter
                &&
                <div className={classes.__power_center_card_details_enter}>
                    {userHasEntered == true ? (
                        <button>{`Entered`}</button>
                    ) : (
                        game_type == "PowerdFs_challenge" || game_type == "PowerdFs_promo" ? 
                        <button onClick={onEnter}>{`Enter`}</button> : <button onClick={onEnter}>{`Enter  •  $${entry_fee}`}</button>
                    )}
                </div>
            }
            <div className={classes.__power_center_card_details_footer_next}>
                <div className={classes.__power_center_card_details_footer_next_text} onClick={onNext}>
                    Next
                </div>
                <div className={classes.__power_center_card_details_footer_forward_arrow}>
                    {">"}
                </div>
            </div>
            </>)}
        </div >
    );
};

export default Footer;