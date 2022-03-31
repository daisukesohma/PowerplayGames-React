import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";
import LivePowerPlay from "./LivePowerPlay";
import "./PowerCenter.scss";
import "./table.scss";
import Footer from "../../components/Footer/Footer";
import InteractiveContests from "./InteractiveContests";
import PowerCenterBannerTitleIcon from "../../assets/power-center-banner-title-icon.png";
import { getLocalStorage } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import Balance from "../../components/Balance";
import MobileBalance from "../../components/MobileBalance";
import { hideDepositForm, showDepositForm } from "../../actions/uiActions";
import { getPSiGateMonthlyTransaction } from "../../actions/userActions";

const PowerCenter = (props) => {
    const { url } = props.match;
    const { auth: { user: { token = "" } } = {} } = useSelector((state) => state);
    const isMobile = useMediaQuery({ query: "(max-width: 540px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
    const isBigScreenTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const dispatch = useDispatch();

    const setShowDepositModal = () => dispatch(showDepositForm());

    useEffect(() => {
        dispatch(getPSiGateMonthlyTransaction());
    }, [])

    return (
        <Fragment>
            <Header style={{maxWidth: 1240}}/>
            <div className="__power_center">
                <div className="__power_center_banner">
                    <div className="__power_center_banner_left __container" style={{maxWidth: 1240}}>
                        <div className="__power_center_banner_left_icon">
                            <img
                                src={PowerCenterBannerTitleIcon}
                                className="__banner_title_icon"
                            />
                        </div>
                        <div className="__power_center_banner_left_title">
                            <div className="__power_center_banner_left_title_main">
                                Power Center
                            </div>
                            <div className="__power_center_banner_left_title_sub">
                                {isMobile || isTablet || isBigScreenTablet
                                    ? "Worlds first Live-Play Fantasy Sports platform"
                                    : "Welcome to the worlds first Live-Play Fantasy Sports platform"}
                            </div>
                        </div>
                    </div>
                    
                </div>
                {token || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER) ? (
                        <>
                            {isMobile ? (
                                <MobileBalance depositClicked={setShowDepositModal} />
                            ) : (
                                <div style={{backgroundColor: "#000"}}>
                                    <Balance depositClicked={setShowDepositModal} style={{maxWidth: 1240, margin: "0 auto"}}/>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ height: 50 }}></div>
                    )}
                <div className="__container" style={{maxWidth: 1240}}>
                    <Route exact path={url} component={InteractiveContests} />
                    <Route path={`${url}/contests`} component={LivePowerPlay} />
                </div>
            </div>
            {/* <div className='__container'>
                <div className='__h3 __center __h5-on-large'>Your Cash Balance: <span className='__primary-color __h3'> $3,000</span></div>
                <div className='__h3 __center __mt-s __mb-3 __h5-on-large'>Your Powerplay Token Balance: <span className='__primary-color __h3 __inline-flex'> 5,000 <img alt='' src={PowerPlayIcon} width='36' /></span></div>
            </div> */}
            <Footer isBlack={true} />
        </Fragment>
    );
};

export default PowerCenter;
