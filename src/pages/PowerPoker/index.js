import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {getRandomCard, getCardsRankPairs, royalFlush} from '../../utility/shared'
import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import ProgressBar from '../../components/Progress'
import Footer from '../../components/Footer/Footer'
import Alert from '../../components/Alert'
import Reload from '../../icons/Reload'
import BoltIcon from '../../assets/bolt.png'
import CardsSvg from '../../icons/Cards'
import Sidebar from '../../components/Sidebar'
import SidebarButton from '../../components/SidebarButton'
import Replace from '../../icons/Replace'
import PlusMinus from '../../icons/PlusAndMinus'
import { CONSTANTS } from '../../utility/constants'
import {
    resetPowerPokersCardState,
    powerPokersGameInventory
} from '../../actions/powerPokerActions'
import { isEmpty, isEqual } from 'lodash'
import classes from './pokerHands.module.scss'
import CashPowerBalance from '../../components/CashPowerBalance'
import MyPowers from '../../components/MyPowers'
import SharePowers from '../../components/SharePowers'
import LockedPowers from '../../components/LockedPowers'
import ReplaceAllIcon from '../../assets/ReplaceAllIcon.png'

const INITIAL_STATE = {
    collectedCards: [{}, {}, {}, {}, {}],
    activeCard: {}
}
const TOTAL_ROUNDS = 3;
const TOTAL_CARDS = 5;
const MAX_ROUND_TIME = 5;
const MAX_RESET_BTN_COUNT_DOWN = 0;
const REPLACE_ALL_SPEED_TIME = 2;
let _round = 1;
let _currentCard = 0;
const cardsArr = [{}, {}, {}, {}, {}]
let time = MAX_ROUND_TIME;
let resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN;

function PowerRoyalsGame(props) {
    const [cardsState, setCardsState] = useState(INITIAL_STATE)
    const [count, setCount] = useState(MAX_ROUND_TIME)
    const [completedChallengeText, setCompletedChallengeText] = useState()
    const [currentRound, setCurrentRound] = useState(_round)
    const [currentCard, setCurrentCard] = useState(_currentCard)
    const [resetBtnCountDown, setResetBtnCountDown] = useState(MAX_RESET_BTN_COUNT_DOWN)
    const [showResetTimer, setResetTimerState] = useState(false)
    const [isReplaceAll, setIsReplaceAllState] = useState(false)
    const [isGameCompleted, setGameCompleted] = useState(false)
    const [selectedRoundCard, setSelectedRoundCard] = useState()
    const [isCurrentFailed, setIsCurrentRoundFailed] = useState(false)
    const [myPowers, setMyPowers] = useState(false);
    const [shareOptions, setShareOptions] = useState(false);
    const [unLockOptions, setUnlockOptions] = useState(true);
    const [start, setStart] = useState(false);
    const [practiceModeEnabled, setPracticeModeEnabled] = useState(false);
    const [practiceGameBtnText, setPracticeGameBtnText] = useState('Try a Practice game');
    const [showTimer, setShowTimer] = useState(true);
    const [powerHandEnabled, setPowerHandEnabled] = useState(false);

    const dispatch = useDispatch();
    const {inventory = {}} = useSelector(state => state.powerPoker)

    const {
        replace = 0, replaceAll = 0, newHands = 0,
        powerMatch = 0, increaseOrDecrease = 0
    } = inventory || {}
    
    useEffect(() => {
        dispatch(resetPowerPokersCardState())
        resetGameState()

        return () => resetGameState()
    }, [])

    useEffect(() => {
        if (start) {
            let timeOut = gameStart();
            
            // if(isGameCompleted) clearInterval(timeOut)
            
            return function cleanup() {
                return clearInterval(timeOut && timeOut)
            }
        }
    }, [currentCard, currentRound, completedChallengeText, isCurrentFailed, start, isReplaceAll])

    const gameStart = () => {
        let timeOut = null
        if (_currentCard < TOTAL_CARDS) {
            if (!isReplaceAll)
                time = MAX_ROUND_TIME;
            else
                time = REPLACE_ALL_SPEED_TIME
            setResetTimerState(false)
            timeOut = setInterval(() => {
                if (time !== 0) {
                    time--;
                    setCount(time)
                } else {
                    if (!isReplaceAll)
                        time = MAX_ROUND_TIME;
                    else
                        time = REPLACE_ALL_SPEED_TIME
                    setCount(time)

                    _currentCard += 1;
                    setCurrentCard(_currentCard)
                    updateCardState()
                    if (currentCard >= TOTAL_CARDS) setIsReplaceAllState(false)
                }
            }, 1000)
        } else {
            resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN
            timeOut = setInterval(() => {
                if (time !== 0) {
                    time--;
                    setCount(time)
                } else {
                    setPowerHandEnabled(true);
                    if (!powerHandEnabled) {
                        setIsReplaceAllState(true);
                        time = MAX_ROUND_TIME;
                    }
                    setResetTimerState(true)
                    if (resetAllBtnTime !== 0) {
                        resetAllBtnTime--;
                        setResetBtnCountDown(resetAllBtnTime)
                    } else {
                        setResetTimerState(false)
                        clearInterval(timeOut)
                    }
                }
            }, 1000)
        }
        return timeOut
    }

    const resetGameState = () => {
        for (let i = 0; i < 5; i++) {
            cardsArr[i] = {}
        }

        resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN
        _currentCard = 0;
        setCardsState(INITIAL_STATE)
        setCompletedChallengeText(null)
        setIsCurrentRoundFailed(false)
        setCurrentCard(_currentCard)
        setCount(MAX_ROUND_TIME)
        setResetBtnCountDown(MAX_RESET_BTN_COUNT_DOWN)
        setResetTimerState(false)
        setSelectedRoundCard(null)
        setIsReplaceAllState(false)
    }

    const updateCardState = () => {
        let card = getRandomCard()

        if (isEmpty(selectedRoundCard) && _currentCard === 1) {
            setSelectedRoundCard(card)
        }

        cardsArr[currentCard] = card

        if (hasCardAlreadyExists(card)?.length > 1) {
            return updateCardState()
        }

        challengeCompleted()

        setCardsState({ ...cardsState, collectedCards: cardsArr, activeCard: card })
    }

    //if the card of same rank and suit is already exists then get any other random card
    const hasCardAlreadyExists = (card) => cardsArr?.filter(c => c?.rank === card?.rank && c?.suit === card?.suit);

    const challengeCompleted = () => {
        //Note: This poker hand is from Highiest to lowest, and the sequence must be below sequence
        
        if (_currentCard !== cardsArr?.length) { return null }

        if (hasRoyalFlush()) {
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have a Royal Flush.</p>)
     
            return setGameCompleted(true)
        }
        else if (hasStraightFlushSameSuit()) {
            //Straight Completed
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have a Straight Flush.</p>)

            return setGameCompleted(true)
        }
        else if (hasFoureOfAKindFlush()) {
            //4 of a kind completed
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have 4 of a kind.</p>)

            return setGameCompleted(true)
        }
        else if (hasFullHouseFlush()) {
            //Full House Completed
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have a Full House.</p>)

            return setGameCompleted(true)
        }
        else if (hasFlush()) {
            //fluch completed
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have a Flush.</p>)

            return setGameCompleted(true)
        }
        else if (hasStraightFlushDiffSuit()) {
            //straight flush diff suit completed
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have a Straight.</p>)

            return setGameCompleted(true)
        }
        else if (hasThreeOfAKindFlush()) {
            //three of a kind compeleted
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have 3 of a kind.</p>)

            return setGameCompleted(true)
        }
        else if (hasTwoPairFlush()) {
            //two pair compeleted
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have 2 Pair.</p>)

            return setGameCompleted(true)
        }
        else if (hasPairFlush()) {
            //Pair completed
            setIsCurrentRoundFailed(false)
            setCompletedChallengeText(<p>You have 1 Pair.</p>)

            return setGameCompleted(true)
        }

        setIsCurrentRoundFailed(true)
        setCompletedChallengeText(<p>Sorry, you did not win on this hand.</p>)

        return setGameCompleted(false)
    }

    const updateInventory = (inventoryValue, actionType) => {
        const _inventory = inventory;

        switch (actionType) {
            case CONSTANTS.CARD_POP_ACTIONS.INCREASE:
                _inventory.increaseOrDecrease = inventoryValue
                break
            
            case CONSTANTS.CARD_POP_ACTIONS.POWER_MATCH:
                _inventory.powerMatch = inventoryValue
                break;
            
            case CONSTANTS.CARD_POP_ACTIONS.REPLACE:
                _inventory.replace = inventoryValue
                break;
            
            case CONSTANTS.CARD_POP_ACTIONS.NEW_HAND:
                _inventory.newHands = inventoryValue
                break;
            case CONSTANTS.CARD_POP_ACTIONS.REPLACE_ALL:
                _inventory.replaceAll = inventoryValue
                break;
        }

        dispatch(powerPokersGameInventory(_inventory))
    }

    // Hide/Show Sidebar Options
    const hideShowSideBarOptions = (myPower, shareOption, unLockOption) => {
        setMyPowers(myPower);
        setShareOptions(shareOption);
        setUnlockOptions(unLockOption);
    }

    const onReplaceAll = () => {
        let _replaceAll = replaceAll
        if (_replaceAll <= 0) return

        _replaceAll -= 1

        updateInventory(_replaceAll, CONSTANTS.CARD_POP_ACTIONS.REPLACE_ALL)
        resetGameState()
        setIsReplaceAllState(true)
        setShowTimer(false)
        setPowerHandEnabled(true)
        setGameCompleted(false)
        setCount(REPLACE_ALL_SPEED_TIME)
        time = REPLACE_ALL_SPEED_TIME
    }

    const onIncrease = (card, cardIndex) => {
        const { rank = 0, suit = 0 } = card || {}
        let _increaseOrDecrease = increaseOrDecrease

        if (increaseOrDecrease <= 0) {
            return
        }
        
        _increaseOrDecrease -= 1;

        let _rank = rank
        if(CONSTANTS.CARD_RANKS[_rank] !== "A") {
            _rank += 1;
        }
        
        const newCard = {
            suit: suit,
            rank: _rank
        }
        cardsArr[cardIndex] = newCard

        if (hasCardAlreadyExists(newCard)?.length > 1) {
            newCard.rank += 1;
            cardsArr[cardIndex] = newCard
        }

        challengeCompleted()
        
        setCardsState({...cardsState, collectedCards: cardsArr, activeCard: newCard})
        updateInventory(_increaseOrDecrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
    }

    const onDecrease = (card, cardIndex) => {
        const { rank = 0, suit = 0 } = card || {}
        let _increaseOrDecrease = increaseOrDecrease

        if (increaseOrDecrease <= 0) {
            return
        }

        _increaseOrDecrease -= 1

        let _rank = rank
        if(CONSTANTS.CARD_RANKS[_rank] !== "2") {
            _rank -= 1;
        }
        
        const newCard = {
            suit: suit,
            rank: _rank
        }
        cardsArr[cardIndex] = newCard

        if (hasCardAlreadyExists(newCard)?.length > 1) {
            if (CONSTANTS.CARD_RANKS[_rank] !== "2") {
                newCard.rank -= 1;
            }
            cardsArr[cardIndex] = newCard
        }

        challengeCompleted()
        
        setCardsState({...cardsState, collectedCards: cardsArr, activeCard: newCard})
        updateInventory(_increaseOrDecrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
    }

    const onReplace = (card, cardIndex) => {
        let _replace = replace
        if (replace <= 0) {
            return
        }

        _replace -= 1

        let newCard = getRandomCard();
        
        if (currentCard === 1 && card === cardsState?.activeCard) {
            setSelectedRoundCard(newCard)
        }
        
        cardsArr[cardIndex] = newCard
        
        if (hasCardAlreadyExists(newCard)?.length > 1) { 
            newCard = getRandomCard()
            cardsArr[cardIndex] = newCard
        }

        challengeCompleted()
        
        setCardsState({ ...cardsState, collectedCards: cardsArr, activeCard: newCard })
        updateInventory(_replace, CONSTANTS.CARD_POP_ACTIONS.REPLACE)
    }

    const hasStraightFlushDiffSuit = () => {
        //Five cards in a sequence, but not of the same suit.
        let hasFlush = cardsArr?.every((c, i, ar) => {
            return !i || ar[i - 1]?.rank > c?.rank
        })

        return hasFlush
    }

    const hasFullHouseFlush = () => {
        //Three of a kind with a pair.
        let hasFlush = false;
        const threeOfAKind = getCardsRankPairs(cardsArr)
        Object.entries(threeOfAKind).forEach(([key, val]) => {
            if (val % 2 === 0 && val % 3 === 0) {
                hasFlush = true
            }
        })

        return hasFlush
    }

    const hasFlush = () => {
        //Any five cards of the same suit, but not in a sequence.
        const cards = cardsArr?.filter(c => c?.suit === cardsArr[0]?.suit);
        if (cards?.length === 5) {
            return true;
        }

        return false;
    }

    const hasStraightFlushSameSuit = () => {
        //Five cards in a sequence, all in the same suit.
        const flushCards = cardsArr?.filter(c => c?.suit === selectedRoundCard?.suit)
        let hasFlush = false;
        if (flushCards?.length >= 5) {
            //all same suit cards
            hasFlush = cardsArr?.every((c, i, ar) => {
                if(ar[0]?.rank > ar[1]?.rank)
                    return !i || ar[i - 1]?.rank > c?.rank //highest to lowest
                
                return !i || ar[i - 1]?.rank < c?.rank //lowest to highest
            })
        }

        return hasFlush
    }

    const hasThreeOfAKindFlush = () => {
        //Three cards of the same rank.
        let hasFlush = false;
        const counts = getCardsRankPairs(cardsArr)
        Object.entries(counts).forEach(([key, val]) => {
            if (val % 3 === 0) {
                hasFlush = true
            }
        })

        return hasFlush
    }

    const hasTwoPairFlush = () => {
        //two pairs
        let pairsCount = 0;
        const counts = getCardsRankPairs(cardsArr)
        Object.entries(counts).forEach(([key, val]) => {
            if (val % 2 === 0) {
                pairsCount ++
            }
        })

        return pairsCount === 2 ? true : false
    }

    const hasPairFlush = () => {
        //Two cards of the same rank.
        let hasFlush = false
        const counts = getCardsRankPairs(cardsArr)
        Object.entries(counts).forEach(([key, val]) => {
            if (val % 2 === 0) {
                hasFlush = true
            }
        })

        return hasFlush
    }

    const hasFoureOfAKindFlush = () => {
        //foure cards of same rank
        let hasFlush = false
        const counts = getCardsRankPairs(cardsArr)
        Object.entries(counts).forEach(([key, val]) => {
            if(val % 4 === 0) {
                hasFlush = true
            }
        })

        return hasFlush
    }

    const hasRoyalFlush = () => {
        //A, K, Q, J, 10, all the same suit.
        const _royalFlush = royalFlush(selectedRoundCard ? selectedRoundCard?.suit : cardsArr[0]?.suit)
        if (isEqual(cardsArr, _royalFlush)) {
            return true;
        }
        return false
    }

    return (
        <>
            <Header/>
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Power Poker" seconds={6}/>
                    <div className={classes._card_game_content_top}>
                        <div className={classes._card_game_content_header_text}>
                            <p>
                                Welcome to <span>Power Poker!</span> Use Powers to make winning hands! Can you get a Royal Flush? You have the Power!
                            </p>
                        </div>
                        <CardsSvg style={{display: 'flex', height: 'auto'}}/>
                        <p className={classes.__card_game_card_counter}>
                            Card <span>{currentCard}</span> of {TOTAL_CARDS}
                        </p>
                        {/* <p className={classes.__card_game_round_counter}>
                            Hand <span>{currentRound}</span> of {TOTAL_ROUNDS}
                        </p> */}
                        <span className={classes.__card_divider} />
                    </div>

                    <div className={classes.__card_game_content_body}>
                        <div className={classes.__card_game_content_btns}>
                            <button 
                                className={classes.__card_game_content_practice_btn} 
                                onClick={() => {
                                    practiceGameBtnText == 'Try a Practice game' ? setPracticeGameBtnText('back to live-play mode') : setPracticeGameBtnText('Try a Practice game');
                                    setPracticeModeEnabled(!practiceModeEnabled);
                                    setMyPowers(!myPowers);
                                    setUnlockOptions(!unLockOptions);
                                    setStart(false);
                                    setPowerHandEnabled(false);
                                    resetGameState();
                                    const resetInventory = {
                                        replace: 5,
                                        replaceAll: 1,
                                        powerMatch: -1,
                                        increaseOrDecrease: 5
                                    };
                                    dispatch(powerPokersGameInventory(resetInventory));
                                }}>
                                {practiceGameBtnText}
                            </button>
                        </div>
                        <Card>
                            {
                                practiceModeEnabled
                                &&
                                <div style={{ position: 'relative', top: -60, alignSelf: 'center'}}>
                                    <button className={classes.__card_game_content_practice_game_mode}>Try a Practice game</button>
                                </div>
                            }
                            <div className={`${classes.__card_game_content_cards}`}>
                                {cardsState?.collectedCards?.map((c, index) => (
                                    isEmpty(c) ?
                                        <GameCard key={index + ''}
                                            isCompleted={false}
                                            showCardPopu={false}
                                            isSelected={false}
                                            activeCard={null}
                                            showCardPopup={false}
                                            time={time}
                                            showIncrementOrDecrementPower={false}
                                            showPowerMatchPower={false}
                                            showReplacePower={false}
                                            onDecrease={() => { }}
                                            onReplace={() => { }}
                                            onPowerMatch={() => { }}
                                            onIncrease={() => { }}
                                            onReplaceAll={() => onReplaceAll()}
                                            start={start}
                                            showTimer={showTimer}
                                            currentCard={currentCard}
                                            cardIndex={index}
                                            onStart={() => setStart(true)}
                                            myPowers={myPowers}
                                            powerHandEnabled={powerHandEnabled}
                                        />
                                        :
                                        <GameCard
                                            key={index + ''}
                                            showCardPopup={!isReplaceAll && true}
                                            isCompleted={false}
                                            card={cardsState?.collectedCards?.[index]}
                                            isSelected={cardsState?.collectedCards?.[index] && true}
                                            activeCard={cardsState?.activeCard}
                                            time={time}
                                            inventory={inventory}
                                            showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                            showPowerMatchPower={false}
                                            showReplacePower={replace > 0}
                                            onDecrease={() => onDecrease(cardsState?.collectedCards?.[index], index)}
                                            onReplace={() => onReplace(cardsState?.collectedCards?.[index], index)}
                                            onPowerMatch={() => { }}
                                            onIncrease={() => onIncrease(cardsState?.collectedCards?.[index], index)}
                                            onReplaceAll={() => onReplaceAll()}
                                            start={start}
                                            showTimer={showTimer}
                                            currentCard={currentCard}
                                            cardIndex={index}
                                            myPowers={myPowers}
                                            powerHandEnabled={powerHandEnabled}
                                        /> 
                                    ))}
                            </div>
                            {
                                currentCard == TOTAL_CARDS && replaceAll > 0 && powerHandEnabled && time > 0
                                &&
                                <div style={{ alignSelf: 'flex-end', marginTop: 20}}>
                                <SidebarButton
                                    success={time > 0 ? true : false}
                                    primary={time <= 0 ? true : false}
                                    toolText={time}
                                    icon={<img src={ReplaceAllIcon} width={40} height={40} alt={''}/>}
                                    onClick={() => onReplaceAll()}
                                />
                                </div>
                            }
                            {
                                !myPowers
                                &&
                                <p className={classes.__powers_not_active}>Powers not active. <span className={classes.__powers_not_active + ' ' + classes.__power_up}>Power-Up</span> before you start!</p>
                            }
                        </Card>

                        {
                            time > 0 && !start &&
                                <>
                                    <br />
                                    <Alert renderMsg={() => <p>Click Start to begin your game.</p>} primary />
                                </>
                        }
                        
                        {
                            completedChallengeText && time <= 0 && powerHandEnabled &&
                                <>
                                    <br />
                                    <Alert renderMsg={() => completedChallengeText} success={!isCurrentFailed} danger={isCurrentFailed} />
                                    {
                                        isCurrentFailed
                                        &&
                                        <button className={`__btn ${classes.__card_game_footer_btn}`}
                                            onClick={() => {
                                                setStart(false);
                                                resetGameState();
                                                setShowTimer(true);
                                                setPowerHandEnabled(false);
                                                time = MAX_ROUND_TIME;
                                                const resetInventory = {
                                                    replace: 5,
                                                    replaceAll: 1,
                                                    powerMatch: -1,
                                                    increaseOrDecrease: 5
                                                };
                                            dispatch(powerPokersGameInventory(resetInventory));
                                            }}>
                                            Try Again?
                                        </button>
                                    }
                                </>
                        }

                        {
                            isGameCompleted && time <= 0 && powerHandEnabled &&
                                <>
                                    <br />
                                    <Alert renderMsg={() => <p>Congrats! You won 10 Power Tokens!</p>} success />
                                </>
                        }

                    </div>
                </div>

                <Sidebar>
                    <CashPowerBalance />
                    <div className={classes.__sidebar_my_powers_wrapper}>
                        <div className={classes.__sidebar_button_wrapper}>
                        {
                                    myPowers
                                    &&
                                    <MyPowers inventory={inventory} />
                                }
                                {
                                    shareOptions
                                    &&
                                    <SharePowers 
                                        onFaceBookClick={() => hideShowSideBarOptions(true, false, false)}
                                        onTwitterClick={() => hideShowSideBarOptions(true, false, false)}
                                        onX10Click={() => hideShowSideBarOptions(true, false, false)}
                                        onPurchaseNowClick={() => hideShowSideBarOptions(true, false, false)}
                                        onGoPowerLessClick={() => hideShowSideBarOptions(false, false, true)}
                                    />
                                }
                                {
                                    unLockOptions
                                    &&
                                    <LockedPowers 
                                        onPurchaseNowClick={() => {
                                            if (!start) {
                                                hideShowSideBarOptions(true, false, false)
                                            }
                                        }}
                                        onOtherUnlockOptionsClick={() => {
                                            if (!start) {
                                                hideShowSideBarOptions(false, true, false)
                                            }
                                        }} 
                                    />
                                }        
                        </div>
                    </div>
                </Sidebar>
            </div>
            <Footer isBlack/>
        </>
    )
}

export default withRouter(PowerRoyalsGame)