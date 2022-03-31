import React from 'react';
import classes from './index.module.scss';
import Bars from '../../assets/bars.svg';
import SidebarBtnIcon from '../../assets/nhl-sidebar-icon.png';

const LiveRankBox = () => {
    return (
        <div className={classes.live_rank_container}>
            <div className={classes.live_rank}>
                <span className={classes.circle}></span>
                <span className={classes.text}>Live Rank</span>
                <span className={classes.vertical_line}></span>
                <span className={classes.count}>23</span>
            </div>
            <div className={classes.live_rank_content}>
                <span className={classes.currently_winning}>Currently Winning:</span>
                <span className={classes.currently_winning_count}>$100,000</span>
                <div className={classes.progress}>
                    <div>
                        <div>
                            <span className={classes.my_score}>My Score:</span>
                            <span className={classes.my_score_count}>30</span>
                        </div>
                        <div>
                            <span className={classes.leader}>Leader:</span>
                            <span className={classes.leader_count}>66</span>
                        </div>
                    </div>
                    <div className={classes.bars_div}>
                        <img src={Bars} />
                    </div>
                </div>
                <div className={classes.see_full_standings}>
                    <img src={SidebarBtnIcon} />
                    <span className={classes.see_full_standings_text}>See Full Standings</span>
                </div>
            </div>
        </div>
    );
};

export default LiveRankBox;