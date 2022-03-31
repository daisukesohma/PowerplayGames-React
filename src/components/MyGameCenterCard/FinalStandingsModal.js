import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from "react-currency-format";
import classes from './finalStandingsModal.module.scss';
import Modal from '../Modal';
import CloseIcon from '../../assets/close-white-icon.png';
import MagnifierIcon from '../../assets/magnifier_icon.png';
import * as MLBActions from "../../actions/MLBActions";

import PowerCurrency from '../../assets/power-blue.png';
import BtcCurrency from '../../assets/btc-blue.png';
import EthCurrency from '../../assets/ethereum-blue.png';
import TeamPointsModal from '../../pages/MyGameCenter/TeamPointsModal';

const FinalStandingsModal = (props) => {

    const { isVisible = false,
        onClose = () => { },
        gameId = 0,
        game_set_start = 'Oct 24, 2020',
        start_time = '8:00PM',
        prize = '10,000',
        currency = 'USD'
    } = props || {};

    const dispatch = useDispatch();
    const [finalStandings, setFinalStandings] = useState([]);
    const [teamPointsModal, setTeamPointsModal] = useState(false);
    const stands = useSelector((state) => state?.mlb?.finalStandings)

    useEffect(() => {
        async function getData() {
            await dispatch(MLBActions.getFinalStandings(gameId));
        };
        getData();
    }, [])

    useEffect(() => {
        if (finalStandings.length === 0) {
            setFinalStandings(stands);
        }
    })

    const handleViewTeam = () => {
        setTeamPointsModal(true);
    }

    const getCurrency = (currency) => {
        if (currency.toUpperCase() === 'PWRS') {
            return PowerCurrency;
        } else if (currency.toUpperCase() === 'BTC') {
            return BtcCurrency;
        } else if (currency.toUpperCase() === 'ETH') {
            return EthCurrency;
        }
    }

    return (
        <Modal visible={isVisible}>
            <div className={classes.__final_standings_modal}>
                <div className={classes.__final_standings_modal_main_content}>
                    <div className={classes.__final_standings_modal_close_icon}>
                        <img
                            src={CloseIcon}
                            width="16"
                            height="16"
                            onClick={() => onClose()}
                            style={{ cursor: 'pointer' }}
                            alt=""
                        />
                    </div>
                    <div className={classes.__final_standings_modal_title_div}>
                        <div className={classes.__final_standings_modal_title}>
                            Final Standings
                        </div>
                        <div className={classes.__final_standings_modal_title_price}>
                            {currency === 'USD' ? (
                                `$`
                            ) : (
                                <img

                                    style={{ marginRight: 4 }}
                                    src={getCurrency(currency)}
                                    width="18"
                                    height="18"
                                    alt=""
                                />
                            )}{<CurrencyFormat
                                value={prize}
                                displayType={"text"}
                                thousandSeparator={prize >= 10000 ? true : false}
                                renderText={(value) => value}
                            />}
                        </div>
                    </div>
                    <div className={classes.__final_standings_modal_date_time_div}>
                        <div className={classes.__final_standings_modal_date_time}>
                            {game_set_start} |  {start_time} ET
                        </div>
                        <div className={classes.__final_standings_modal_prize_pool}>
                            Prize Pool
                        </div>
                    </div>
                    <hr />
                    <div className={classes.__final_standings_modal_search}>
                        <div className={classes.__final_standings_modal_search_magnifier_icon}>
                            <img src={MagnifierIcon} alt="" />
                        </div>
                        <div className={classes.__final_standings_modal_search_input_field_div}>
                            <input
                                type="text"
                                placeholder="Search by Display name"
                                className={classes.__final_standings_modal_search_input_field}
                            />
                        </div>
                    </div>
                    <div className={classes.__final_standings_modal_data_main_div}>
                        <div className={classes.__final_standings_modal_data_header}>
                            <div className={
                                `${classes.__final_standings_modal_data_header_title} 
                                ${classes.__final_standings_modal_data_header_title_place}`}>
                                Place
                            </div>
                            <div
                                className={
                                    `${classes.__final_standings_modal_data_header_title} 
                                    ${classes.__final_standings_modal_data_header_title_display_name}`}>
                                Display name
                            </div>
                            <div className={
                                `${classes.__final_standings_modal_data_header_title} 
                                ${classes.__final_standings_modal_data_header_title_points}`}>
                                Points
                            </div>
                            <div className={
                                `${classes.__final_standings_modal_data_header_title} 
                                ${classes.__final_standings_modal_data_header_title_amount_won}`}>
                                Amount Won
                            </div>
                            <div className={
                                `${classes.__final_standings_modal_data_header_title} 
                                ${classes.__final_standings_modal_data_header_title_action}`}>
                                Action
                            </div>
                        </div>
                        {
                            finalStandings.map((item, index) => {
                                return (
                                    <div className={classes.__final_standings_modal_data_div} key={index}>
                                        <div className={
                                            `${classes.__final_standings_modal_data_text} 
                                            ${classes.__final_standings_modal_data_place}`}>
                                            {item?.rank}
                                        </div>
                                        <div className={
                                            `${classes.__final_standings_modal_data_text}
                                            ${classes.__final_standings_modal_data_display_name}`}>
                                            {item?.users?.display_name}
                                        </div>
                                        <div className={
                                            `${classes.__final_standings_modal_data_text} 
                                            ${classes.__final_standings_modal_data_points}`}>
                                            {item?.score || '--'}
                                        </div>
                                        <div className={
                                            `${classes.__final_standings_modal_data_text}
                                            ${classes.__final_standings_modal_data_amount_won}`}>

                                            {currency === 'USD' ? (
                                                `$`
                                            ) : (
                                                <img

                                                    style={{ marginRight: 4 }}
                                                    src={getCurrency(currency)}
                                                    width="18"
                                                    height="18"
                                                    alt=""
                                                />
                                            )}{<CurrencyFormat
                                                value={item?.win_amount}
                                                displayType={"text"}
                                                thousandSeparator={item?.win_amount >= 10000 ? true : false}
                                                renderText={(value) => value}
                                            />}
                                        </div>
                                        <div className={`${classes.__final_standings_modal_data_action}`}>
                                            <button onClick={handleViewTeam} className={classes.__final_standing_modal_data_action_button}>View Team</button>
                                        </div>
                                        {
                                            teamPointsModal
                                            &&

                                            <TeamPointsModal
                                                isVisible={teamPointsModal}
                                                onClose={() => setTeamPointsModal(false)}
                                                item={item}
                                            />
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default FinalStandingsModal;