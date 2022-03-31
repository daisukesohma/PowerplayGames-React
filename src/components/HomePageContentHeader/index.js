import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import classes from "./index.module.scss";
import { isEmpty } from "lodash";
import HomePageTitle from '../../assets/HomePageTitle.png'

function HomePageContentHeader(props) {
    const {
        buttonTitle = "",
        footerTitle = "",
        redirectTo = "",
        showBtnBg = true,
        onButtonClick = () => { },
    } = props || {};
    const isMobileOrTablet = useMediaQuery({
        query: "(max-device-width: 540px)",
    });

    const renderHeaderFooter = () => {
        if (isMobileOrTablet) {
            return (
                <>
                    {footerTitle && <p className={classes.p2}>{footerTitle}</p>}
                    {buttonTitle && (
                        <Link
                            to={redirectTo}
                            className={`${classes.header_btn} ${showBtnBg && classes.header_btn_bg
                                }`}
                        >
                            {buttonTitle}
                        </Link>
                    )}
                </>
            );
        }

        return (
            <>
                {buttonTitle && isEmpty(redirectTo) ? (
                    <Link
                        className={`${classes.header_btn} ${showBtnBg && classes.header_btn_bg
                            }`}
                        onClick={onButtonClick}
                    >
                        {buttonTitle}
                    </Link>
                ) : (
                    buttonTitle &&
                    isEmpty(redirectTo) && (
                        <Link
                            to={redirectTo}
                            className={`${classes.header_btn} ${showBtnBg && classes.header_btn_bg
                                }`}
                        >
                            {buttonTitle}
                        </Link>
                    )
                )}
                {footerTitle && <p className={classes.p2}>{footerTitle}</p>}
            </>
        );
    };
    return (
        <section className={classes.root}>
            <div className={classes.container}>
                <div className={classes.titlesWrapper}>
                    <img src={HomePageTitle} alt='' className={classes.title} />
                    <h4 className={classes.subtitle}>Experience our ground-breaking live-play games where <br /> you have the Power to control your team’s destiny. *</h4>
                    <Link className={classes.powerBtn} to={redirectTo}>Power Up!</Link>
                </div>
                <p className={classes.blogSection}>*International Patents Pending</p>
            </div>
        </section>
    );
}

HomePageContentHeader.propTypes = {
    buttonTitle: PropTypes.string,
    redirectTo: PropTypes.string,
    footerTitle: PropTypes.any,
    showBtnBg: PropTypes.bool,
    onButtonClick: PropTypes.func,
};

export default HomePageContentHeader;
