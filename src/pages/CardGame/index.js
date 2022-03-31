import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { GetAceCardIndex, hasMaxAceCards, redirectTo } from '../../utility/shared'
import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer/Footer'
import Alert from '../../components/Alert'
import CardsSvg from '../../icons/Cards'
import Sidebar from '../../components/Sidebar'
import { CONSTANTS } from '../../utility/constants'
import { IsAceCard, getRandomCard } from '../../utility/shared'
import { setCardState, resetCardState, cardGameInventory } from '../../actions/cardGameAction'
import classes from './cardGamePage.module.scss'
import MyPowers from '../../components/MyPowers'
import LockedPowers from '../../components/LockedPowers'
import SharePowers from '../../components/SharePowers'
import CashPowerBalance from '../../components/CashPowerBalance'

import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import HowDoIWinModal from '../../components/HowDoIWinModal'

const TOTAL_ROUNDS = 5;
const TOTAL_CARDS = 5;
const MAX_ROUND_TIME = 5;
const MAX_RESET_BTN_COUNT_DOWN = 0;
const REPLACE_ALL_SPEED_TIME = 1;
let _round = 1;
let _currentCard = 0;
const cardsArr = []
const aceCardsArr = []
let time = MAX_ROUND_TIME;
let resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN;

function CardGame(props) {
    const [cardsState, setCardsState] = useState({})
    const [count, setCount] = useState(MAX_ROUND_TIME)
    const [currentRound, setCurrentRound] = useState(_round)
    const [currentCard, setCurrentCard] = useState(_currentCard)
    const [resetBtnCountDown, setResetBtnCountDown] = useState(MAX_RESET_BTN_COUNT_DOWN)
    const [showResetTimer, setResetTimerState] = useState(false)
    const [isReplaceAll, setIsReplaceAllState] = useState(false)
    const [myPowers, setMyPowers] = useState(false);
    const [shareOptions, setShareOptions] = useState(false);
    const [unLockOptions, setUnlockOptions] = useState(true);
    const [start, setStart] = useState(false);
    const [practiceModeEnabled, setPracticeModeEnabled] = useState(false);
    const [practiceGameBtnText, setPracticeGameBtnText] = useState('Try a Practice game');
    const [gotAceWithPower, setGotAceWithPower] = useState(false);
    const [mobileSlideMenu, setMobileSlideMenu] = useState(false);
    const [howDoIWinModal, setHowDoIWinModal] = useState(false);

    const onOpenModal = () => setHowDoIWinModal(true);
    const onCloseModal = () => setHowDoIWinModal(false);

    const dispatch = useDispatch();
    const { collectedAceCards = [],
        inventory = {}
    } = useSelector(state => state.cardGame)

    const { replace = 0, replaceAll = 0, powerMatch = 0, increaseOrDecrease = 0 } = inventory || {}

    const isMobile = useMediaQuery({ query: '(max-width: 414px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isBigScreenTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    
    useEffect(() => { 
        dispatch(resetCardState())
        resetGameState()

        return () => resetGameState()
    }, [])

    useEffect(() => {
        if (start) {
            let timeOut = gameStart();
            gameCompleted(timeOut);

            return function clearnup() {
                return clearInterval(timeOut)
            }
        }
    }, [currentCard, currentRound, start])

    const gameStart = () => {
        // Set got ace with power to false to show options
        setGotAceWithPower(false);
        let timeOut = null
        if (_currentCard < TOTAL_CARDS) {
            if (!isReplaceAll)
                time = MAX_ROUND_TIME;
            else
                time = REPLACE_ALL_SPEED_TIME
            setResetTimerState(false)
            timeOut = setInterval(() => {
                gameCompleted(timeOut)
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
                setIsReplaceAllState(false)
                gameCompleted(timeOut)
                if (time !== 0) {
                    time--;
                    setCount(time)
                } else {
                    setResetTimerState(false)
                    setIsReplaceAllState(false)
                    clearInterval(timeOut)
                }
            }, 1000)
        }

        return timeOut
    }

    const resetList = (list = []) => {
        while (list?.length > 0) {
            list.pop()
        }
    }

    const resetGameState = () => {
        resetList(cardsArr)
        resetList(aceCardsArr)

        resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN
        _currentCard = 0;
        setCardsState({})
        setCurrentCard(_currentCard)
        setCount(MAX_ROUND_TIME)
        setResetBtnCountDown(MAX_RESET_BTN_COUNT_DOWN)
        setResetTimerState(false)
        setIsReplaceAllState(false)
        dispatch(setCardState([]))
    }

    const updateCardState = () => {
        let card = getRandomCard()

        let isCardAceCompleted = updateAceCard(card)
        if (isCardAceCompleted) {
            //recursive call
            return updateCardState()
        }
        cardsArr.push(card)

        setCardsState({ ...cardsState, collectedCards: cardsArr, activeCard: card })
    }

    const updateAceCard = (card) => {
        if (IsAceCard(card)) {
            const _collectedAceCards = collectedAceCards;
            if (_collectedAceCards?.length && _collectedAceCards?.length > 0) {
                const _aceCardInfo = _collectedAceCards?.filter(_card => _card.suit === card.suit)[0]
                if (_aceCardInfo) {
                    const { suit = 0, aceCards = 0 } = _aceCardInfo || {}
                    let _aceCards = aceCards
                    if (_aceCards === CONSTANTS.MAX_ACE_PER_CARD) {
                        //ace cards for current suit is completed
                        //select random card
                        updateCardState()
                        return true;
                    } else {
                        _aceCards += 1;
                    }

                    const _aceCard = {
                        suit: suit,
                        aceCards: _aceCards,
                    }
                    let cardIndex = _collectedAceCards?.indexOf(_aceCardInfo)
                    aceCardsArr[cardIndex] = _aceCard
                    dispatch(setCardState(aceCardsArr))
                } else {
                    const _aceCard = {
                        suit: card.suit,
                        aceCards: 1
                    }

                    aceCardsArr.push(_aceCard)
                    dispatch(setCardState(aceCardsArr))
                }
            } else {
                //no ace card is available in state
                //store new ace cards to state
                const _aceCard = {
                    suit: card.suit,
                    aceCards: 1
                }

                aceCardsArr.push(_aceCard)
                dispatch(setCardState(aceCardsArr))
            }
        }

        return false
    }

    const updateCards = (index, card) => {
        cardsArr[index] = card
        let isAceCompleted = updateAceCard(card)
        if (!isAceCompleted) {
            setCardsState({ ...cardsState, collectedCards: cardsArr, activeCard: card })
        }
    }

    const gameCompleted = (timeOut = setInterval(null, 0)) => {
        if (getAceCards() >= CONSTANTS.MAX_ACE_CARDS) {
            return clearTimeout(timeOut)
        }
    }

    const _redirectTo = (path = '/') => {
        redirectTo(props, { path })
    }

    const getAceCards = () => {
        let totalAces = 0;
        if (collectedAceCards.length) {
            totalAces = collectedAceCards?.reduce((c1, c2) => {
                return c1 + (c2['aceCards'] || 0)
            }, 0)
        }

        return totalAces;
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

            case CONSTANTS.CARD_POP_ACTIONS.REPLACE_ALL:
                _inventory.replaceAll = inventoryValue
                break;
        }

        dispatch(cardGameInventory(_inventory))
    }


    const onReplaceAll = () => {
        let _replaceAll = replaceAll

        if (_replaceAll <= 0) return

        _replaceAll -= 1
        updateInventory(_replaceAll, CONSTANTS.CARD_POP_ACTIONS.REPLACE_ALL)
        resetGameState()
        setIsReplaceAllState(true)
        setCount(REPLACE_ALL_SPEED_TIME)
        time = REPLACE_ALL_SPEED_TIME
    }

    // Hide/Show Sidebar Options
    const hideShowSideBarOptions = (myPower, shareOption, unLockOption) => {
        setMyPowers(myPower);
        setShareOptions(shareOption);
        setUnlockOptions(unLockOption);
    }

    const onIncrease = (cardIndex, card) => {
        const { suit = 0, rank = 0 } = card || {}
        let _rank = rank
        if (getMaxAceCardsForCardSuit(card) || increaseOrDecrease <= 0 || cardsState?.activeCard !== card) {
            return;
        }

        if (_rank !== GetAceCardIndex()) {
            _rank += 1;
        }

        const _card = {
            suit: suit,
            rank: _rank,
        }

        // Check if got ace if power
        checkGotAceWithPower(_rank);

        let _increase = increaseOrDecrease;

        if (!practiceModeEnabled) _increase -= 1;

        //update the cards array in parent component
        updateCards(cardIndex, _card)
        updateInventory(_increase, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
    }

    const onReplace = (cardIndex, card) => {
        const { rank = 0 } = card || {}
        if (replace <= 0 || cardsState?.activeCard !== card)
            return;

        let _replace = replace;
        if (!practiceModeEnabled) _replace -= 1;

        let newCard = getRandomCard();
        if (newCard?.rank === rank) {
            newCard = getRandomCard();
        }

        // Check if got ace if power
        checkGotAceWithPower(newCard.rank);

        updateCards(cardIndex, newCard)
        updateInventory(_replace, CONSTANTS.CARD_POP_ACTIONS.REPLACE)
    }

    const onPowerMatch = (cardIndex, card) => {
        const { suit = 0 } = card || {}
        if (getMaxAceCardsForCardSuit(card) || powerMatch <= 0 || cardsState?.activeCard !== card) return;

        let _powerMatch = powerMatch;
        if (!practiceModeEnabled) _powerMatch -= 1;

        const _aceCard = {
            suit: suit,
            rank: GetAceCardIndex(),
        }

        checkGotAceWithPower(GetAceCardIndex());

        updateCards(cardIndex, _aceCard)
        updateInventory(_powerMatch, CONSTANTS.CARD_POP_ACTIONS.POWER_MATCH)
    }

    const onDecrease = (cardIndex, card) => {
        const { suit = 0, rank = 0 } = card || {}
        let _rank = rank
        if (getMaxAceCardsForCardSuit(card) || increaseOrDecrease <= 0 || cardsState?.activeCard !== card) {
            return;
        }

        if (_rank > 0) {
            _rank -= 1;
        } else {
            _rank = GetAceCardIndex()
        }

        const _card = {
            suit: suit,
            rank: _rank,
        }

        // Check if got ace with power
        checkGotAceWithPower(_rank);

        let _decrease = increaseOrDecrease;
        if (!practiceModeEnabled) _decrease -= 1;

        //update the cards array in parent component
        updateCards(cardIndex, _card)
        updateInventory(_decrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
    }

    const checkGotAceWithPower = (rank) => {
        rank == 12 ? setGotAceWithPower(true) : setGotAceWithPower(false);
    }

    const getMaxAceCardsForCardSuit = (card) => {
        const { suit = 0 } = card || {}
        const aceCard = collectedAceCards?.filter(_card => _card?.suit === suit)[0];
        const { aceCards = 0 } = aceCard || {}
        if (aceCards && hasMaxAceCards(aceCards)) {
            return true
        }

        return false
    }

    const practiceGame = () => {
        practiceGameBtnText == 'Try a Practice game' ? setPracticeGameBtnText('back to live-play mode') : setPracticeGameBtnText('Try a Practice game');
        setPracticeModeEnabled(!practiceModeEnabled);
        setMyPowers(!myPowers);
        setUnlockOptions(!unLockOptions);
        setStart(false);
        setMobileSlideMenu(false);
        resetGameState();
        const resetInventory = {
            replace: 5,
            replaceAll: -1,
            powerMatch: 5,
            increaseOrDecrease: 5
        };
        dispatch(cardGameInventory(resetInventory));
    }

    const getCardWidth = () => {
        if (isMobile) {
            return 66;
        } else if (isTablet) {
            return 100;
        } else if (isBigScreenTablet) {
            return 134;
        }
    }

    const getCardHeight = () => {
        if (isMobile) {
            return 100;
        } else if (isTablet) {
            return 134;
        } else if (isBigScreenTablet) {
            return 168;
        }
    }

    const getSlideMenuWidth = () => {
        if (isMobile) {
            return 300;
        } else if (isTablet) {
            return 400;
        } else {
            return 500;
        }
    };

    const renderMobileSlideMenu = () => {
        return (
            <Menu 
                right 
                width={getSlideMenuWidth()} 
                styles={{bmMenu: {backgroundColor: '#000000', marginTop: 68}, bmItem: {outline: 'none'}}} 
                customBurgerIcon={false}
                customCrossIcon={false}
                isOpen={mobileSlideMenu}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ width: '90%', height: 50 }} onClick={() => setMobileSlideMenu(false)}>
                        <p style={{ textAlign: 'right', color: '#fb6e00', paddingTop: 30 }}>X</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 40, marginTop: 20, fontSize: 18 }}>
                        <p style={{ padding: 10 }}>See Contest Rules</p>
                        <p style={{ padding: 10 }}
                            onClick={() => {
                                setMobileSlideMenu(false);
                                onOpenModal();
                            }}>How Do I Win?</p>
                        <p
                            style={{ padding: 10 }}
                            onClick={() => practiceGame()}>
                            {practiceGameBtnText}
                        </p>
                    </div>
                    <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', marginBottom: 30 }}>
                        <CashPowerBalance />
                    </div>
                </div>
            </Menu>
        );
    };

    return (
        <>
            <Header />
            {
                (isMobile || isTablet || isBigScreenTablet)
                &&
                renderMobileSlideMenu()
            }
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Chase The Ace" onThreeDotsClick={() => setMobileSlideMenu(!mobileSlideMenu)} />
                    <div className={classes._card_game_content_top}>
                        <CardsSvg style={{ display: 'flex', height: 'auto' }} />
                        <p className={classes.__card_game_card_counter}>Card <span>{currentCard}</span> of {TOTAL_CARDS}
                        </p>
                        <span className={classes.__card_divider} />
                    </div>

                    <div className={classes.__card_game_content_body}>
                        <div className={classes.__card_game_content_btns}>
                            <button
                                className={classes.__card_game_content_practice_btn}
                                onClick={() => practiceGame()}>
                                {practiceGameBtnText}
                            </button>
                        </div>

                        <Card styles={{ boxShadow: "inset 0 1px 24px 0 rgba(0, 0, 0, 0.5)" }}>
                            {
                                practiceModeEnabled
                                &&
                                <div style={{ position: 'relative', top: -60, alignSelf: 'center' }}>
                                    <button className={classes.__card_game_content_practice_game_mode}>Try a Practice game</button>
                                </div>
                            }
                            <div className={classes.__card_game_content_cards}>
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[0]?.rank] === "A"}
                                    card={cardsState?.collectedCards?.[0]}
                                    isSelected={cardsState?.collectedCards?.[0] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsState?.collectedCards?.[0]) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={0}
                                    onStart={() => setStart(true)}
                                    start={start}
                                    onIncrease={() => onIncrease(0, cardsState?.collectedCards?.[0])}
                                    onDecrease={() => onDecrease(0, cardsState?.collectedCards?.[0])}
                                    onPowerMatch={() => onPowerMatch(0, cardsState?.collectedCards?.[0])}
                                    onReplace={() => onReplace(0, cardsState?.collectedCards?.[0])}
                                    myPowers={myPowers}
                                    showTimer={true}
                                    gotAceWithPower={gotAceWithPower}
                                    width={getCardWidth()}
                                    height={getCardHeight()}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[1]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[1]?.rank] === "A"}
                                    isSelected={cardsState?.collectedCards?.[1] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsArr[1]) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={1}
                                    start={start}
                                    onIncrease={() => onIncrease(1, cardsState?.collectedCards?.[1])}
                                    onDecrease={() => onDecrease(1, cardsState?.collectedCards?.[1])}
                                    onPowerMatch={() => onPowerMatch(1, cardsState?.collectedCards?.[1])}
                                    onReplace={() => onReplace(1, cardsState?.collectedCards?.[1])}
                                    myPowers={myPowers}
                                    showTimer={true}
                                    gotAceWithPower={gotAceWithPower}
                                    width={getCardWidth()}
                                    height={getCardHeight()}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[2]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[2]?.rank] === "A"}
                                    isSelected={cardsState?.collectedCards?.[2] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsArr[2]) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={2}
                                    start={start}
                                    onIncrease={() => onIncrease(2, cardsState?.collectedCards?.[2])}
                                    onDecrease={() => onDecrease(2, cardsState?.collectedCards?.[2])}
                                    onPowerMatch={() => onPowerMatch(2, cardsState?.collectedCards?.[2])}
                                    onReplace={() => onReplace(2, cardsState?.collectedCards?.[2])}
                                    myPowers={myPowers}
                                    showTimer={true}
                                    gotAceWithPower={gotAceWithPower}
                                    width={getCardWidth()}
                                    height={getCardHeight()}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[3]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[3]?.rank] === "A"}
                                    isSelected={cardsState?.collectedCards?.[3] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsArr[3]) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={3}
                                    start={start}
                                    onIncrease={() => onIncrease(3, cardsState?.collectedCards?.[3])}
                                    onDecrease={() => onDecrease(3, cardsState?.collectedCards?.[3])}
                                    onPowerMatch={() => onPowerMatch(3, cardsState?.collectedCards?.[3])}
                                    onReplace={() => onReplace(3, cardsState?.collectedCards?.[3])}
                                    myPowers={myPowers}
                                    showTimer={true}
                                    gotAceWithPower={gotAceWithPower}
                                    width={getCardWidth()}
                                    height={getCardHeight()}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[4]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[4]?.rank] === "A"}
                                    isSelected={cardsState?.collectedCards?.[4] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsState?.activeCard) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={4}
                                    start={start}
                                    onIncrease={() => onIncrease(4, cardsState?.collectedCards?.[4])}
                                    onDecrease={() => onDecrease(4, cardsState?.collectedCards?.[4])}
                                    onPowerMatch={() => onPowerMatch(4, cardsState?.collectedCards?.[4])}
                                    onReplace={() => onReplace(4, cardsState?.collectedCards?.[4])}
                                    myPowers={myPowers}
                                    showTimer={true}
                                    gotAceWithPower={gotAceWithPower}
                                    width={getCardWidth()}
                                    height={getCardHeight()}
                                />
                            </div>
                            {/* <button className={`${classes.__reload_btn} ${showResetTimer && classes.active}`} onClick={onReplaceAll}
                                disabled={!showResetTimer}
                            >
                                {
                                    showResetTimer &&
                                    <span style={{ position: 'absolute', top: '-15px', left: '50%', color: '#fff', transform: 'translateX(-50%)' }}>{ resetBtnCountDown }</span>

                                }
                                <Reload size={48} className={classes.__reload_svg_icon}/>
                            </button> */}
                            {
                                !myPowers
                                &&
                                <p className={classes.__powers_not_active}>Powers not active. <span className={classes.__powers_not_active + ' ' + classes.__power_up}>Power-Up</span> before you start!</p>
                            }
                        </Card>
                    </div>

                    <div className={classes.__card_game_content_footer}>
                        {
                            !start ?
                                <Alert renderMsg={() => <p>Click Start to begin your game.</p>} primary />
                                :
                                cardsArr.length < CONSTANTS.MAX_ACE_CARDS
                                &&
                                <Alert primary renderMsg={() => (<p>{CONSTANTS.MAX_ACE_CARDS - getAceCards()} {getAceCards() == 4 ? 'Ace' : 'Aces'} to go</p>)} />
                        }
                        {
                            getAceCards() >= CONSTANTS.MAX_ACE_CARDS ?
                                <>
                                    <Alert success renderMsg={() => (<p>Congrats! You have 5 Aces! Click below to Chase the Ace!</p>)} />
                                    <button className={`__btn ${classes.__card_game_footer_btn}`}
                                        onClick={() => _redirectTo('/chase-a-card')}>
                                        Chase The Ace!
                                    </button>
                                </>
                                :
                                cardsArr.length >= CONSTANTS.MAX_ACE_CARDS && time <= 0
                                &&
                                <>
                                    <Alert danger renderMsg={() => (<p>Sorry, you did not get { CONSTANTS.MAX_ACE_CARDS} aces.</p>)} />
                                    <button className={`__btn ${classes.__card_game_footer_btn}`}
                                        onClick={() => {
                                            setStart(false);
                                            resetGameState();
                                            time = MAX_ROUND_TIME;
                                            const resetInventory = {
                                                replace: 5,
                                                replaceAll: -1,
                                                powerMatch: 5,
                                                increaseOrDecrease: 5
                                            };
                                            dispatch(cardGameInventory(resetInventory));
                                        }}>
                                        Try Again?
                                    </button>
                                </>
                        }
                    </div>
                </div>

                <Sidebar>
                        {
                            (!isMobile || !isTablet || !isBigScreenTablet)
                            &&
                            <CashPowerBalance />
                        }
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
                {
                    howDoIWinModal
                    &&
                    <HowDoIWinModal howDoIWinModal={howDoIWinModal} onCloseModal={onCloseModal} />
                }
            </div>
            <Footer isBlack />
        </>
    )
}

CardGame.propTypes = {}

export default withRouter(CardGame)

