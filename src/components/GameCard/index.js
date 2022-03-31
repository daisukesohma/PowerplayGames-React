import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip';

import Replace from '../../icons/Replace'
import Plus from '../../icons/Plus'
import Minus from '../../icons/Minus'
import boltIcon from '../../assets/bolt.png'
import Tick from '../../icons/Tick'
import Cards from '../../icons/Cards/index'
import classes from "./gameCard.module.scss"
import ProgressBar from '../../components/Progress';
import { render } from '@testing-library/react';
import StartButton from '../StartButton';

import { useMediaQuery } from 'react-responsive';


function GameCard(props) {

    const [showPopup, setPopupState] = useState(false)
    const [hasReplaced, setHasReplacedState] = useState(false)

    const {
        isSelected = false,
        showCardPopup = false,
        isCompleted = false,
        image = '',
        text = '',
        styles = {},
        card = {},
        inventory: { replace = 0, powerMatch = 0, increaseOrDecrease = 0 } = {},
        activeCard = {},
        time = 0,
        width = 0,
        height = 0,
        hoverShadow = false,
        currentCard = 0,
        cardIndex = 0,
        start = false,
        onStart = () => {},
        showPowerMatchPower = false,
        showReplacePower = false,
        showIncrementOrDecrementPower = false,
        onClick = () => { },
        onIncrease = () => { },
        onDecrease = () => { },
        onPowerMatch = () => { },
        onReplace = () => { },
        onReplaceAll = () => { },
        myPowers = false,
        showTimer = false,
        gotAceWithPower = false,
        powerHandEnabled = false
    } = props || {}

    useEffect(() => {
        if (time <= 0) {
            setHasReplacedState(false)
            setPopupState(false)
        } else if (!isCompleted && myPowers) {
            setPopupState(true);
        }
    }, [time])

    const isMobile = useMediaQuery({ query: '(max-width: 414px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isBigScreenTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    const toolTip = (id, tip) => {
        return (
            <ReactTooltip id={id} place="top" textColor="#fff" effect="solid">
                {tip}
            </ReactTooltip>
        );
    }

    const _onReplace = () => { 
        setHasReplacedState(true)
    }

    // Start Button
    const renderStartButton = () => {
        return (
            <>
                <p className={classes.__card_game_Next_card_drawn_in}>Click Start to Begin</p>
                <StartButton onStart={() => onStart()} />
            </>
        );
    };

    // Get progress bar size on screen size
    const getProgressBarSize = () => {
        if (isMobile) {
            return 40;
        } else if (isTablet) {
            return 55;
        } else if (isBigScreenTablet) {
            return 60;
        } else {
            return 62;
        }
    };

    // Get progress bar stroke width
    const getProgressBarStrokeWidth = () => {
        if (isMobile) {
            return 2;
        } else if (isTablet) {
            return 3;
        } else {
            return 4;
        }
    };

    // Get powers pop up margin left
    const getPowersPopUpMarginLeft = () => {
        if (cardIndex == 0) {
            if (isMobile) {
                return 50;
            } else if (isTablet) {
                return 80;
            } else if (isBigScreenTablet) { 
                return 90;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    // Get powers pop up margin right
    const getPowersPopUpMarginRight = () => {
        if (cardIndex == 4) {
            if (isMobile) {
                return 50;
            } else if (isTablet) {
                return 80;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    // Get power icon size
    const getPowerIconSize = () => {
        if (isMobile) {
            return 29;
        } else if (isTablet) {
            return 34;
        } else {
            return 39;
        }
    };

    return (
        <div className={`${classes.__game_card_wrapper} ${hoverShadow && classes.shadow}`} style={styles} {...props}>
            {
                //if rank === 12 => "A"
                isCompleted &&
                <Tick style={{
                    height: "auto",
                    position: "absolute",
                    alignSelf: "center",
                    transform: `translate(25%, -25%)`
                }}/>
            }
            {
                isSelected
                    ?
                    <div className={classes.__game_card_selected} onClick={() => {
                        if (showCardPopup && myPowers) {
                            setPopupState(!showPopup)
                        }
                        onClick()
                    }} onBlur={() => {
                        setPopupState(false)
                        }}>
                        {
                            image ?
                                <div className={classes.__game_card_selected}>
                                    <img src={image} style={{width: '100%', height: '100%'}}/>
                                </div>
                                :
                                <Cards card={card} width={width || 130} height={height || 195} />
                        }
                    </div>
                    :
                    <div className={classes.__game_card_container}>    
                        {
                            showTimer
                            ?
                                start
                                ?
                                    cardIndex !== currentCard
                                    ?
                                        <div className={classes.__question_mark}>
                                            <span>?</span>                                
                                        </div>
                                    :
                                    <>
                                        <p className={classes.__card_game_Next_card_drawn_in}>Next card drawn in</p>
                                        <ProgressBar
                                            progress={time}
                                            maxProgress={5}
                                            size={getProgressBarSize()}
                                            strokeWidth={getProgressBarStrokeWidth()}
                                            circleOneStroke='grey'
                                            circleTwoStroke='#fff'
                                        />
                                    </>
                                :
                                cardIndex == 0
                                ?
                                renderStartButton()
                                :
                                <div className={classes.__question_mark}>
                                    <span>?</span>                                
                                </div>
                            :
                            <div className={classes.__question_mark}>
                                <span>?</span>                                
                            </div>
                        }
                    </div>
            }
            {
                showPopup && activeCard === card && time > 0 && !gotAceWithPower &&
                <div className={classes.__game_card_popup_container}
                    style={{ 
                        marginLeft: !isCompleted ? getPowersPopUpMarginLeft() : 0,
                        marginRight: !isCompleted ? getPowersPopUpMarginRight() : 0
                    }}
                >
                    <div className={classes.__game_card_popup}>
                        {
                            isCompleted ?
                                <span>No action required</span>
                                :
                                <>
                                    {
                                        showReplacePower || showPowerMatchPower || showIncrementOrDecrementPower
                                            ?
                                            !powerHandEnabled
                                            &&
                                            <>
                                                {toolTip("newCard", "Power Hit")}
                                                {
                                                    showReplacePower && !hasReplaced &&
                                                    <div>
                                                        <button className={classes.__btn__} onClick={() => {
                                                            onReplace()
                                                            _onReplace()
                                                        }}
                                                        data-tip data-for="newCard">
                                                            <Replace style={{height: 'auto'}} size={getPowerIconSize()}/>
                                                        </button>
                                                        {
                                                            (isMobile || isTablet)
                                                            &&
                                                            <span className={classes.__game_card_popup_power_label}>Power Hit</span>
                                                        }
                                                    </div>
                                                }    
                                                    {toolTip("powerMatch", "Power Ace")}
                                                {
                                                    showPowerMatchPower &&
                                                    <div>
                                                        <button className={classes.__btn__} onClick={onPowerMatch} data-tip data-for="powerMatch">
                                                            <img src={boltIcon} width={getPowerIconSize()} height={getPowerIconSize()}/>
                                                        </button>
                                                        {
                                                            (isMobile || isTablet)
                                                            &&
                                                            <span className={classes.__game_card_popup_power_label}>Power Ace</span>    
                                                        }
                                                    </div>
                                                }

                                                {
                                                    showIncrementOrDecrementPower &&
                                                    <>
                                                        {toolTip("powerUp", "Power Up")}
                                                        <div>
                                                            <button className={classes.__btn__} data-tip data-for="powerUp">
                                                                <Plus style={{height: 'auto'}} size={getPowerIconSize()} onClick={onIncrease}/>
                                                            </button>
                                                            {
                                                                (isMobile || isTablet)
                                                                &&
                                                                <span className={classes.__game_card_popup_power_label}>Power Up</span>
                                                            }
                                                        </div>
                                                        {toolTip("powerDown", "Power Down")}
                                                        <div>
                                                            <button className={classes.__btn__} data-tip data-for="powerDown">
                                                                <Minus style={{height: 'auto'}} size={getPowerIconSize()} onClick={onDecrease}/>
                                                            </button>  
                                                            {
                                                                (isMobile || isTablet)
                                                                &&
                                                                <span className={classes.__game_card_popup_power_label}>Power Down</span>  
                                                            } 
                                                        </div>                                                   
                                                    </>
                                                }   
                                            </>
                                            :
                                            <span>All your Powers have been used</span>
                                    }
                                </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

GameCard.propTypes = {
    isSelected: PropTypes.bool,
    showCardPopup: PropTypes.bool,
    isCompleted: PropTypes.bool,
    image: PropTypes.string,
    text: PropTypes.string,
    styles: PropTypes.object,
    onClick: PropTypes.func,
    card: PropTypes.object,
    inventory: PropTypes.object,
    activeCard: PropTypes.object,
    showPowerMatchPower: PropTypes.bool,
    showReplacePower: PropTypes.bool,
    showIncrementOrDecrementPower: PropTypes.bool,
    time: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    hoverShadow: PropTypes.bool,
    onIncrease: PropTypes.func,
    onDecrease: PropTypes.func,
    onPowerMatch: PropTypes.func,
    onReplace: PropTypes.func
}

export default GameCard
