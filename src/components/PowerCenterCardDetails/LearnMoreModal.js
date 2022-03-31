import React, {useState} from 'react';
import classes from './learnMoreModal.module.scss';
import Modal from '../../components/Modal';
import CloseIcon from '../../assets/close-white-icon.png';
import PointMultipliersMain from '../../assets/point-multipliers-main.png';
import PlayerSwapsMain from '../../assets/player-swaps-main.png';
import VideoReviewMain from '../../assets/video-review-main.png';
import DWallMain from '../../assets/d-wall-main.png';
// import ChallengeMain from '../../assets/chall';
import PointMultipliersLight from '../../assets/point-multipliers-light.png';
import PlayerSwapsLight from '../../assets/player-swaps-light.png';
import VideoReviewLight from '../../assets/video-review-light.png';
import DWallLight from '../../assets/d-wall-light.png';
import X3 from '../../assets/x_3.png';
import X2 from '../../assets/x_2.png';
import X_1_5 from '../../assets/x_1.5.png';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SwapIcon from '../../icons/Swap';


import ReplaceAllIcon from "../../icons/Replace";
import ShieldIcon from "../../icons/ShieldIcon";
import ChallengeIcon from "../../icons/Challenge";
import RetroIcon from "../../icons/RetroBoost";
import PowerUpIcon from "../../icons/PowerUp";
import XPIcon from "../../icons/XPIcon";

const mainIconWidthAndHeight = 85;
const lightIconWidthAndHeight = 64;

const LearnMoreModal = (props) => {
    const {title = '', learnMoreModal = false, onCloseModal = () => { }} = props || {};
    const [activeTab, setActiveTab] = useState(0);


    return (
        <Modal visible={learnMoreModal}>
            <div 
                className={classes.__learn_more_modal} 
                >
                
            <Tabs   
              selectedIndex={activeTab}
              onSelect={(tabIndex) => {
                setActiveTab(tabIndex);
              }}
              className={classes.reacttabs}
            >
              <div className={classes.__learn_more_modal_close_icon}>
                    <img 
                        src={CloseIcon}
                        width="20" 
                        height="20" 
                        onClick={() => onCloseModal()} 
                        style={{cursor: 'pointer'}} 
                    />
                </div>
              <TabList className={classes.tabs_header}>
                <Tab className={`${activeTab === 0 && classes.active}`}>
                  <XPIcon />
                </Tab>
                <Tab className={`${activeTab === 1 && classes.active}`}>
                    <ReplaceAllIcon />
                </Tab>
                <Tab className={`${activeTab === 2 && classes.active}`}>
                    <ShieldIcon />
                </Tab>
                <Tab className={`${activeTab === 3 && classes.active}`}>
                    <ChallengeIcon />
                </Tab>
                <Tab className={`${activeTab === 4 && classes.active}`}>
                    <RetroIcon />
                </Tab>
                <Tab className={`${activeTab === 5 && classes.active}`}>
                    <PowerUpIcon />
                </Tab>
              </TabList>

              <div className={classes.tab_body}>
                <TabPanel>
                  <div className={classes.tabTitle}>
                      Point Booster
                  </div>
                  <div className={classes.tabContent}>
                    <p>
                        Power-up your points with a Point Booster Power! Choose between 1.5x, 2x, and 3x boosters. You chose when to use. Try 3x when bases are loaded... or at the beginning of an NFL drive.
                    </p>
                    <br />
                    <p>
                        MLB – Point boosters last for 1 inning or remainder of current inning.
                    </p>
                    <p>
                        NFL – Point boosters last until the current drive ends.
                    </p>
                    <p>
                        NHL/NBA - Point boosters last 2 mins of game time.
                    </p>
                    <br /><br />
                    <a>
                        You have the Power!
                    </a>
                    <br /><br />
                  </div>
                </TabPanel>
                <TabPanel>
                    <div className={classes.tabTitle}>
                      Swap
                    </div>
                    <div className={classes.tabContent}>
                        <p>
                            Keep your team in the game by swapping out underperforming or injured players.
                        </p>
                        <br />
                        <p> 
                            You can swap for any same-position player whose game started at the same time asyour original selection.
                        </p>
                        <br />
                        <p> 
                            For example, you can swap your QB for a new QB whose game started as the same time as your original selection.
                        </p>
                        <br /><br />
                        <a>You have the Power!</a>
                        <br /><br />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={classes.tabTitle}>
                      D-Wall
                    </div>
                    <div className={classes.tabContent}>
                        <p>
                            Protect your Team-D with this point blocking Power. 
                        </p>
                        <br />
                        <p> 
                            Any points against your Team-Dwill not count while this Power is active.
                        </p>
                        <br />
                        <p> 
                            MLB – D-Wall lasts for 1 inning or remainder of current inning.
                        </p>
                        <p>NFL – D-Wall lasts until the current drive ends.</p>
                        <p>NHL/NBA - D-Wall lasts for 2 mins of game time.</p>     
                        <br /><br />
                        <a>You have the Power!</a>
                        <br /><br />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={classes.tabTitle}>
                      Challenge
                    </div>
                    <div className={classes.tabContent}>
                        <p>
                            This is a Coaches Challenge that you can use to challenge the last point generating play scored against your Team-D. 
                        </p>
                        <br />
                        <p> 
                            Activate it and our head office will flip a coin to see if the points scored against your Team-D will be reversed.
                        </p>
                        <br />
                        <p> 
                            We thought it might be good to use after a Grand Slam or a 50-yard TD.
                        </p>  
                        <br /><br />
                        <a>You have the Power!</a>
                        <br /><br />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={classes.tabTitle}>
                      Retro Boost
                    </div>
                    <div className={classes.tabContent}>
                        <p>
                            Our very own time travel machine is ready for you! 
                        </p>
                        <br />
                        <p> 
                            Missed using your point booster before a TD, HR, or goal? 
                        </p>
                        <br />
                        <p> 
                            No worries, you have 30 seconds after the play to retroactively boost any missed opportunities by 2x.
                        </p>  
                        <br /><br />
                        <a>You have the Power!</a>
                        <br /><br />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={classes.tabTitle}>
                      Power Up
                    </div>
                    <div className={classes.tabContent}>
                        <p>
                            Have you run out of Powers? Need a couple more to push you to the top of the leaderboard?
                        </p>
                        <br />
                        <p> 
                            Redeem your Power Tokens to get a new supply!
                        </p>
                        <br /><br />
                        <a>You have the Power!</a>
                        <br /><br />
                    </div>
                </TabPanel>
              </div>
            </Tabs>




            </div>
        </Modal>
    );
};

export default LearnMoreModal;