import React, { useState, useMemo } from 'react';
import styles from './styles.module.scss';
import CreatePopUpPortal from '../../utility/CreatePopUpPortal';
import ChallengePowerIcon from '../../assets/challenge-power.svg';
import ChallengePowerGreyIcon from '../../assets/challenge-power-grey.svg';
const ChallengePopUp = props => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [popupMode, setPopupMode] = useState(0);
    const [timers, setTimers] = useState(0);
    return (
        <>
            {useMemo(() => props.component && props.component({ showPopUp: () => { setPopupMode(0);setShowPopUp(true); }}), [props])}
            {showPopUp && <CreatePopUpPortal>
                <div className={styles.popupWrapper}>
                    <div className={styles.blur} onClick={() => setShowPopUp(false)}></div>
                    <div className={styles.popupInnerDiv}>
                        <div className={`__title-6 modal-animation ${styles.popup}`}>
                            {popupMode === 0 && 
                                <>
                                    <img src={ChallengePowerIcon} />
                                    <p>
                                        Use your <span className="orangeColor">Challenge Power</span> to try to reverse the last scoring play. If successful 6 points will be reversed from your score. You have a 50/50 chance!
                                    </p>
                                    <div>
                                        <button className={styles.cancelButton} onClick={() => {
                                            setShowPopUp(false);
                                        }}>Cancel</button>
                                        <button className={styles.challengePlayButton} onClick={() => {
                                            
                                            if(props.challenge > 0)
                                            {
                                                setPopupMode(1);
                                                setTimers(3);
                                                var t = 3;
                                                var a = setInterval(function() {
                                                    t = t - 1;
                                                    setTimers(t);
                                                    if(t == -1) {
                                                        clearInterval(a);
                                                        var a1 = [2,3];
                                                        var random = a1[Math.floor(Math.random()*a1.length)];
                                                        setPopupMode(random);
                                                        setTimeout(function() {
                                                            if(random == 2)
                                                                props.useChallenge(true);
                                                            setShowPopUp(false);
                                                        },2000);
                                                    }
                                                },1000);
                                            }
                                            else {
                                                alert("You cannot use this power");
                                                setShowPopUp(false);
                                                return;
                                            }
                                        }}>Challenge Play</button>
                                    </div>
                                </>
                            }
                            {popupMode === 1 && 
                                <>
                                    <img src={ChallengePowerIcon} />
                                    <p className={styles.reviewText}>
                                        Play is under review
                                    </p>
                                    <p className={styles.timerText}>
                                        0:0{timers}
                                    </p>
                                </>
                            }
                            {popupMode === 2 && 
                                <>
                                    <img src={ChallengePowerIcon} />
                                    <p className={styles.reviewText}>
                                        Success!
                                    </p>
                                    <p className={styles.timerText}>
                                        Points will be reversed
                                    </p>
                                </>
                            }
                            {popupMode === 3 && 
                                <>
                                    <img src={ChallengePowerGreyIcon} />
                                    <p className={styles.timerText}>
                                        Declined
                                    </p>
                                    <p>
                                        The play stands. <br /> Points will not be reversed
                                    </p>
                                </>
                            }
                        </div>
                    </div>
                </div>   
            </CreatePopUpPortal>}
        </>
    );
};

export default ChallengePopUp;