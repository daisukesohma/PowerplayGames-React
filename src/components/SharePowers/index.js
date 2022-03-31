import React from 'react';
import classes from './sharePowers.module.scss';
import ShareButton from '../../components/ShareButton';
import Button from '../../components/Button';
import Link from '../../components/Link';
import FaceBookIcon from '../../assets/facebook_icon.png';
import TwitterIcon from '../../assets/twitter_icon.png';
import PowerPlaySideBarIcon from '../../assets/power-play-sidebar-icon.png';

import {useMediaQuery} from 'react-responsive';

const SharePowers = (props) => {
    const {
        onFaceBookClick = () => {}, 
        onTwitterClick = () => {}, 
        onX10Click = () => {}, 
        onPurchaseNowClick = () => {}, 
        onGoPowerLessClick = () => {}} = props || {};

    const isMobile = useMediaQuery({ query: '(max-width: 414px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isBigScreenTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    
    const purchaseNowBtnMarginTop = isMobile || isTablet || isBigScreenTablet ? "0px" : "20px";
    const goPowerLessBtnMarginTop = isMobile || isTablet || isBigScreenTablet ? "50px" : "20px";

    return (
        <>
            <span className={classes.__sidebar_power_title}>Power <span className={classes.__sidebar_up_title}>- Up!</span></span>
            <p className={classes.__sidebar_unlock_power_text}>
                To unlock your Powers for this game, please select one of the following options:
            </p>
            <div className={classes.__sidebar_facebook_twitter}>
                <div className={classes.__sidebar_facebook}>
                    <ShareButton 
                        title="Share on Facebook"
                        icon={<img src={FaceBookIcon} width={50} height={51} alt="" />}
                        styles={{"backgroundImage":"linear-gradient(to bottom, #4e70a9, #4a6da5)"}}
                        onClick={onFaceBookClick}
                    />
                </div>
                <div className={classes.__sidebar_twitter}>
                    <ShareButton 
                        title="Share on Twitter"
                        icon={<img src={TwitterIcon} width={50} height={51} alt="" />}
                        styles={{"backgroundImage":"linear-gradient(to bottom, #2cc3e6, #25bde6)"}}
                        onClick={onTwitterClick}
                    />
                </div>
            </div>
            <div className={classes.__sidebar_x10_purchase_now}>
                <div className={classes.__sidebar_x10}>
                    <Button 
                        title="x10" 
                        icon={<img src={PowerPlaySideBarIcon} width="20" height="20" alt="" />}
                        styles={{"width":"100%","height":"51px","borderRadius":"12px","backgroundImage":"linear-gradient(to bottom, #ffffff, #ababab)", "color": "#17181a" }} 
                        onClick={onX10Click}
                    />
                </div>
                <div className={classes.__sidebar_purchase_now}>
                    <Button 
                        title="$1 • Purchase Now" 
                        styles={{"width":"100%","height":"51px","margin-top":`${purchaseNowBtnMarginTop}`, "borderRadius":"12px","boxShadow":"0 0 34px 0 rgba(251, 110, 0, 0.2)","backgroundImage":"linear-gradient(to bottom, #fb9700, #fb6e00)", "color":"#111", "font-size": "14"}} 
                        onClick={onPurchaseNowClick}
                    />
                </div>
            </div>
            <Link 
                title="Go Powerless" 
                onClick={onGoPowerLessClick} 
                styles={{"margin-top":`${goPowerLessBtnMarginTop}`}}     
            />
        </>
    );
};

export default SharePowers;