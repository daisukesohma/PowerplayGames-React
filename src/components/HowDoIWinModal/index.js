import React from 'react';
import classes from './howDoIWin.module.scss';
import Modal from '../../components/Modal';
import NewCard from '../../assets/new-card.png';
import PowerUpDown from '../../assets/power-up-down.png';
import PowerMatch from '../../assets/power-match.png';

const HowDoIWinModal = (props) => {
    const {howDoIWinModal = false, onCloseModal = () => { }} = props || {};

    return (
        <Modal visible={howDoIWinModal}>
            <div className={classes.__how_do_i_win_modal_modal}>
                <div className={classes.__how_do_i_win_modal_close_icon} onClick={() => onCloseModal()}>
                    <p>X</p>
                </div>
                <div className={classes.__how_do_i_win_modal_main_content}>
                    <h1 className={classes.__how_do_i_win_modal_title}>Chase The Ace</h1>
                    
                    <h3 className={classes.__how_do_i_win_modal_heading}>How Do I Win?</h3>
                    <p className={classes.__how_do_i_win_modal_text}>
                        In this exciting multi-round contest, you must achieve five Aces in one hand in order to move on to the Chase the Ace round. Find the Ace of Spades in the Chase the Ace round and you win!
                    </p>
                    
                    <h3 className={classes.__how_do_i_win_modal_heading}>How can I get five Aces?</h3>
                    <p className={classes.__how_do_i_win_modal_text}>
                        The game is played with two full decks so it is possible to be dealt five Aces. We decided to make it more interesting by providing Powers to help you win! You will be dealt three hands per game.
                    </p>
                    
                    <h3 className={classes.__how_do_i_win_modal_heading}>How do I use Powers?</h3>
                    <p className={classes.__how_do_i_win_modal_text}>
                        If you get a card other than and Ace, you can use your Powers by clicking on the active card before the timer runs out. This will activate Powers for that card.
                    </p>
                    
                    <h3 className={classes.__how_do_i_win_modal_heading}>What Powers do I have?</h3>
                    <p className={classes.__how_do_i_win_modal_text}>Chase the Ace will have three Powers available:</p>
                    
                    <div className={classes.__how_do_i_win_modal_powers}>
                        <img src={NewCard} width="26" height="26" />
                        <p className={classes.__how_do_i_win_modal_power_text}>
                            <b>New Card</b> - swap your current card for a random new card from the deck
                        </p>
                    </div> 

                    <div className={classes.__how_do_i_win_modal_powers}>
                        <img src={PowerUpDown} width="26" height="26" />
                        <p className={classes.__how_do_i_win_modal_power_text}>
                            <b>Power Up/Down</b> - Use this power to increase the value of a card. If you get a deuce, use Power Down to make it an Ace!
                        </p>
                    </div>

                    <div className={classes.__how_do_i_win_modal_powers}>
                        <img src={PowerMatch} width="26" height="26" />
                        <p className={classes.__how_do_i_win_modal_power_text}>
                            <b>Power Match</b> - The most powerful Power! Use this Power to turn and card into an Ace!
                        </p>
                    </div>

                    <h3 className={classes.__how_do_i_win_modal_heading}>What is the 'Chase the Ace' round?</h3>
                    <p className={classes.__how_do_i_win_modal_text}>
                        If you make a hand of 5 aces, you will then move on to the Chase the Ace round. In this round you will be presented with a full deck of cards face down. Pick the Ace of Spades and you win! Pick any other card and it will remain visible. Your odds get better each time you make it in!
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default HowDoIWinModal;