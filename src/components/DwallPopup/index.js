import React, { useState, useMemo, useEffect } from 'react';
import styles from './styles.module.scss';
import CreatePopUpPortal from '../../utility/CreatePopUpPortal';
import ShieldIcon from '../../icons/ShieldIcon';
import ChallengePowerGreyIcon from '../../assets/challenge-power-grey.svg';
import { useSelector } from 'react-redux';
import axios from 'axios';
const DwallPopup = props => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [popupMode, setPopupMode] = useState(0);
    const [timers, setTimers] = useState(0);
    const {
        live_clock = "20:00",
        gameID = "",
        live_teamD = {}
    } = useSelector(state => state.nhl);
    const userID = localStorage.getItem("PERSONA_USER_ID");
    const applyDWall = async () => {
        props.setShowPleaseWait(true);
        var a = await axios.post("https://nhl.powerplaysystems.com/api/v1/services/fantasy/dWallApplied", {
            gameID: gameID,
            userID: userID,
            timeApplied: live_clock,
            teamDId:live_teamD?.id
        })
        .then((res) => {
            if(res.data.code == 200)
            {
                props.useDwall(true);
                props.setIsDwallActive(true);
                setShowPopUp(false);
                props.setShowPleaseWait(false);
            }
            else {
                props.setShowPleaseWait(false);
                alert(res.data.message);
                setShowPopUp(false);
            }
        })
        .catch((er) => {
            props.setShowPleaseWait(false);
            alert(er.response?.data?.message);
            setShowPopUp(false);
        });
    };
    return (
        <>
            {useMemo(() => props.component && props.component({ showPopUp: () => { setPopupMode(0);setShowPopUp(true); }}), [props])}
            {showPopUp && <CreatePopUpPortal>
                <div className={styles.popupWrapper}>
                    <div className={styles.blur} onClick={() => setShowPopUp(false)}></div>
                    <div className={styles.popupInnerDiv}>
                        <div className={`__title-6 modal-animation ${styles.popup}`}>
                            <>
                                <ShieldIcon size={100} />
                                <p>
                                    Use your <span className="orangeColor">D-Wall Power</span> to block any points against your Team D for this inning.
                                </p>
                                <div>
                                    <button className={styles.cancelButton} onClick={() => {
                                        setShowPopUp(false);
                                    }}>Cancel</button>
                                    <button className={styles.challengePlayButton} onClick={() => {
                                        if(props.dwall > 0)
                                        {
                                            applyDWall();
                                        }
                                        else {
                                            alert("You cannot use D-Wall power");
                                        }
                                    }}>Activate D-Wall</button>
                                </div>
                            </>
                        </div>
                    </div>
                </div>   
            </CreatePopUpPortal>}
        </>
    );
};

export default DwallPopup;