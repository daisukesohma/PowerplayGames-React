import React, {useState, useEffect} from 'react'

import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer/Footer'
import CardsSvg from '../../icons/Cards'
import CardBack from '../../assets/card_back.png'
import ProgressBar from '../../components/Progress'
import { CONSTANTS } from '../../utility/constants'
import Alert from '../../components/Alert'
import classes from './cardGamePage.module.scss'
import { redirectTo } from '../../utility/shared'

// const MAX_TIMER = 5;

function ChaseACard(props) {
    // const [timer, setTimer] = useState(MAX_TIMER)
    const [cards, setCards] = useState([])
    const [hasWon, setHasWonState] = useState(false)
    const [hasCardSelected, setHasCardSelected] = useState(false)
    const [spadeCardIndex, setSpadeCardIndex] = useState(null)

    useEffect(() => {
        resetAllState()
        generateCards()
    }, [])

    // useEffect(() => {
    //     let timeOut = null
    //     if (timer > 0 && hasCardSelected) {
    //     let _timer = timer
    //         timeOut = setInterval(() => { 
    //             _timer -= 1
    //             setTimer(_timer)
    //         }, 1000)
    //     } else {
    //         clearInterval(timeOut)
    //     }

    //     return () => {
    //         return clearInterval(timeOut)
    //     }
    //  }, [timer, hasCardSelected])

    function resetAllState() {
        // setTimer(MAX_TIMER)
        setCards([])
        setSpadeCardIndex(null)
        setHasCardSelected(false)
        setHasWonState(false)
    }

    function onCardClick (card, index) {
        if(hasWon || hasCardSelected) return

        const { isSelected = false, card: { suit, rank } = {} } = card || {}
        
        let _isSelected = isSelected
        _isSelected = true;
        card.isSelected = _isSelected

        const _selectedCards = [...cards]
        _selectedCards[index] = card

        setHasCardSelected(true)
        setCards(_selectedCards)

        if (suit === CONSTANTS.CARD_SUITS.SPADE && CONSTANTS.CARD_RANKS[rank] === "A") {
            return setHasWonState(true)
        }
     }

    function generateCards() {
        const _cards = []
        for (let suit = 1; suit <= 4; suit++) {
            for (let rank = 0; rank < 13; rank++) {
                const _card = {}
                _card.card = card(suit, rank)
                _card.isSelected = false
                _cards.push(_card)
            }
        }

        shuffleCards(_cards)
        let spadeOfAceIndex = _cards.findIndex(_card => _card?.card?.suit === CONSTANTS.CARD_SUITS.SPADE && _card?.card?.rank === 12)
        setSpadeCardIndex(spadeOfAceIndex)
        setCards(_cards)
    }

    function shuffleCards(cards = []) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]]
        }
    }

    function onRevealCard() {
        if(hasWon) return

        let spadeOfAce = cards[spadeCardIndex]
        const revealCard = {
            card: spadeOfAce?.card,
            isSelected: true
        }

        const _cards = [...cards]
        _cards[spadeCardIndex] = revealCard
        setCards(_cards)
    }

    function card(suit, rank) {
        return {
            suit,
            rank
        }
    }

    return (
        <>
            <Header />
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Chase The Ace" />
                    <div className={classes._card_game_content_top}>
                            <CardsSvg style={{display: 'flex', height: 'auto'}} />
                        <p className={classes.__card_game_card_counter}>Chase The Ace Round</p>
                        <p className={classes.__card_game_info}> Select one card and if it's the Ace of Spades, you win $2000 CAD! </p>
                    </div>

                    <div className={`${classes.__card_game_content_body}`}>
                        {
                            hasCardSelected &&
                            <div className={`${classes.__card_game_content_game_end} ${hasWon ? classes.__card_game_content_game_end_success : classes.__card_game_content_game_end_failed}`}
                                onClick={onRevealCard}
                            >
                                    <Alert danger={!hasWon} success={hasWon} renderMsg={() => (
                                        <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                            {hasWon ? `Congratulations! You are a winner!` : `Sorry, you did not find the Ace of Spade. Try again tomorrow at 8:00PM ET.`}
                                        </p>)
                                }   />
                                </div>
                        }
                        <Card>
                            <p>
                                Ace of Spade Located At Number: {spadeCardIndex + 1}
                                <br /> Note: For testing purpose only
                            </p>
                            {
                                // hasCardSelected &&
                                // <div className={`${classes.__card_game_timer_wrapper} ${classes.dashed_repeating_gradient}`}>
                                //     <ProgressBar
                                //         progress={timer}
                                //         maxProgress={5}
                                //         size={62}
                                //         strokeWidth={4}
                                //         circleOneStroke='grey'
                                //         circleTwoStroke='#fff'
                                //     />
                                //     <p>
                                //         Want another chance? 
                                //     </p>
                                //     <button className={`${'__btn __style-3 __large-btn'} ${classes.__card_game_card_top_btn}`}>
                                //         <span>$5.00</span> Activate Pick +
                                //     </button>
                                //     <strong>
                                //         Activate for Free
                                //     </strong>
                                // </div>
                            }
                            <div className={classes.__card_game_content_cards}>
                                {
                                    cards.map(
                                        (card, index) => {
                                            const { card: selectedCard = {}, isSelected: isCardSelected = false } = card || {}
                                            return (
                                                <GameCard
                                                    key={card + index.toString()}
                                                    isSelected
                                                    card={selectedCard}
                                                    image={!isCardSelected ? CardBack : null}
                                                    onClick={() => onCardClick(card, index)}
                                                    styles={{
                                                        width: '76px',
                                                        height: '104px',
                                                        margin: '5px 3.5px'
                                                    }}
                                                    width={76}
                                                    height={104}
                                                    hoverShadow={!isCardSelected}
                                                />
                                            )
                                        }
                                    )
                                }
                            </div>
                            {
                                hasCardSelected && !hasWon &&
                                <div className={classes.card_footer}>
                                    <button className={`${'__btn'}`} onClick={() => {
                                        return redirectTo(props, {
                                            path: '/card-game'
                                        })
                                    }}>
                                        Try again
                                    </button>
                                </div>
                            }
                        </Card>
                    </div>                
                </div>  
            </div>
            <Footer isBlack />
        </>
    )
}

export default ChaseACard

