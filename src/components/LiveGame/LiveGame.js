import React from 'react';
import './LiveGame.scss';
import CheckIcon from '../../icons/CheckIcon';

const LiveGame = ({ player1, player2, score }) => {
    return (
        <div className='__liveGame __flex'>
            <div className='__main __f1'>
                <div className='__board __f1'>
                    <div className='__flex __title-wrapper __primary-color'>
                        <CheckIcon />
                        <div className='__mediam __bold __title __mr-s'>{player1.name}</div>
                        <div className='__h5 __bolder'>{player1.points}</div>
                    </div>
                    <div>Moneyline</div>
                    <div>{player1.moneyLine}</div>
                    <div>Wagared</div>
                    <div className='__small __bolder __primary-color'>{player1.wagar}</div>
                    <div>To Return</div>
                    <div className='__small __bolder __primary-color'>{player1.return}</div>
                </div>

                <div className='__h3 __vs __m-a'>VS</div>

                <div className='__board __f1 __deactive'>
                    <div className='__flex __title-wrapper'>
                        <div className='__mediam __bold __title __mr-s'>{player2.name}</div>
                        <div className='__h5 __bolder'>{player2.points}</div>
                        <div className='__h6 __pts'>Pts</div>
                    </div>
                    <div className='__no-wagar __center'>No Wagars</div>
                    {/* <div>Money Line</div>
                    <div>{player1.moneyLine}</div>
                    <div>Wagared</div>
                    <div className='__small __bolder __primary-color'>{player2.wagar}</div>
                    <div>To Return</div>
                    <div className='__small __bolder __primary-color'>{player2.return}</div> */}
                </div>

                <div className='__border'></div>

                <div className='__board __f1 __score-board'>
                    <div className='__flex __title-wrapper'>
                        <div className='__mediam __bold __title __mr-s'>Score Total</div>
                        <div className='__h5 __bolder'>{player2.points}</div>
                    </div>
                    <div>Under</div>
                    <div className='__small __bolder __primary-color'>{score.under}</div>
                    <div>Wagared</div>
                    <div className='__small __bolder __primary-color'>{score.wagar}</div>
                    <div>To Return</div>
                    <div className='__small __bolder __primary-color'>{score.return}</div>
                </div>
                <div className='__live-footer __flex __flex-center __flex-start __center'>
                    <div>
                        <div>Yards to FD/EZ</div>
                        <div>10/20</div>
                    </div>
                    <div className='__mr-1 __ml-1'>
                        <div>Downs</div>
                        <div>1/4</div>
                        <div className='__mt-1'>DEN 30</div>
                    </div>
                    <div>
                        <div>Team TD Prob</div>
                        <div>80%</div>
                    </div>
                </div>
            </div>
            <div className='__total-wagered __center'>
                Total Wagered
                <div className='__LiveGame-btn __bold __mt-s __mb-1'>$999,999</div>
                <div className='__LiveGame-btn'>To Return <b className='__bold'>$999,999</b></div>
            </div>
        </div>
    )
}

export default LiveGame;