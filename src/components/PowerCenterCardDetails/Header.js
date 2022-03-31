import React from 'react';
import classes from './header.module.scss';

const Header = (props) => {
    const {title = '', game_type =''} = props || {};
    return (
        <>
            <div className={classes.__power_center_card_details_header}>
                <span className={classes.__power_center_card_details_header_hr + ' ' + classes.__power_center_card_details_header_hr_left}></span>
                <p className={classes.__power_center_card_details_header_title}>
                    <span className={classes.__power_center_card_details_header_title_first}>{title}</span> {game_type === "NHL_Fantasy" ? "Fantasy": "PowerdFS"}
                </p>
                <span className={classes.__power_center_card_details_header_hr + ' ' + classes.__power_center_card_details_header_hr_right}></span>
            </div>
        </>
    );
};

export default Header;