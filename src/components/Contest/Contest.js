import React, { useState } from 'react';
import Calender from '../../icons/Calender';
import Clock from '../../icons/Clock';
import Crown from '../../icons/Crown';
import './Contest.scss'

const Contest = ({ player1, player2, score }) => {
    const [isFirstPointerChecked, setIsFirstPointerChecked] = useState(false);
    const [isFirstScoreChecked, setIsFirstScoreChecked] = useState(false);
    const [isSecPointerChecked, setIsSecPointerChecked] = useState(false);
    const [isSecScoreChecked, setIsSecScoreChecked] = useState(false);
    const [isOverChecked, setIsOverChecked] = useState(false);
    const [isUnderChecked, setIsUnderChecked] = useState(false);

    const onFirstPlayerPontChange = e => setIsFirstPointerChecked(e.target.checked);
    const onFirstScoreChange = e => setIsFirstScoreChecked(e.target.checked);
    const onSecPlayerPontChange = e => setIsSecPointerChecked(e.target.checked);
    const onSecScoreChange = e => setIsSecScoreChecked(e.target.checked);
    const onOverChange = e => setIsOverChecked(e.target.checked);
    const onUnderChange = e => setIsUnderChecked(e.target.checked);

    const placeTheBet = isFirstPointerChecked || isFirstScoreChecked || isSecPointerChecked || isSecScoreChecked ||isOverChecked || isUnderChecked;

    return (
        <div className='__contest __flex'>
            <div className={`__main __f1 ${placeTheBet ? '__active' : ''}`}>
                <div className='__flex'>
                    <div className={`__board __f1 ${isFirstPointerChecked || isFirstScoreChecked ? '__active' : ''}`}>
                        <div className='__mediam __bold __title __inline-block'>{player1.name}</div>
                        <label className='__flex __mt-1 __mb-s'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isFirstPointerChecked} onChange={onFirstPlayerPontChange} />
                            <div className='__keyname'>Point Spread</div>
                            <div>{player1.pointerSpeed}</div>
                        </label>
                        <label className='__flex'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isFirstScoreChecked} onChange={onFirstScoreChange} />
                            <div className='__keyname'>Money Line</div>
                            <div>{player1.moneyLine}</div>
                        </label>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __m-s'>Wagar <div>{player1.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player1.return}</div>
                        </div>
                    </div>

                    <div className='__m-1 __mediam'><div className='__h3 __vs'>VS</div></div>

                    <div className={`__board __f1 ${isSecPointerChecked || isSecScoreChecked ? '__active' : ''}`}>
                        <div className='__mediam __bold __title __inline-block'>{player2.name}</div>
                        <label className='__flex __mt-1 __mb-s'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isSecPointerChecked} onChange={onSecPlayerPontChange} />
                            <div className='__f1'>Point Spread</div>
                            <div>{player2.pointerSpeed}</div>
                        </label>
                        <label className='__flex'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isSecScoreChecked} onChange={onSecScoreChange} />
                            <div className='__f1'>Money Line</div>
                            <div>{player2.moneyLine}</div>
                        </label>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __m-s'>Wagar <div>{player2.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player2.return}</div>
                        </div>
                    </div>

                    <div className='__border __m-1'></div>

                    <div className={`__board __f1 ${isOverChecked || isUnderChecked ? '__active' : ''}`}>
                        <div className='__mediam __bold __title __inline-block'>Score Total</div>
                        <label className='__flex __mt-1 __mb-s'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isOverChecked} onChange={onOverChange} />
                            <div className='__f1'>Over</div>
                            <div className='__f1 __center'>{score.over1}</div>
                            <div className='__f1 __right'>{score.over2}</div>
                        </label>
                        <label className='__flex'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isUnderChecked} onChange={onUnderChange} />
                            <div className='__f1'>Under</div>
                            <div className='__f1 __center'>{score.under1}</div>
                            <div className='__f1 __right'>{score.under2}</div>
                        </label>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __m-s'>Wagar <div>{player1.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player1.return}</div>
                        </div>
                    </div>

                </div>
                <div className='__flex __flex-center __contest-footer __ml-4 __mr-4'>
                    <div className='__flex'><Clock className='__mr-s' />01:07 PM</div>
                    <div className='__flex __ml-2 __mr-2'><Calender className="__mr-s" />2020-09-28</div>
                    <div className='__flex'><Crown className='__mr-s' />Empower Field</div>
                </div>
            </div>
            <div className='__total-wagered __center __m-2'>
                Total Wagered
                <div className='__contest-btn __bold __mt-s __mb-1'>$999,999</div>
                <div className='__contest-btn'>To Return <b className='__bold'>$999,999</b></div>
                {placeTheBet && <div className='__contest-btn __mt-4'>Place Bet</div>}
            </div>
        </div>
    )
}

export default Contest;