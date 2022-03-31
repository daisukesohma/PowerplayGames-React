import React from 'react';
import './BingoGameMain.scss';
import './BingoPreGame.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import clockimage from '../../assets/StopWatchIcon@2x.png';
import TimerClock from '../../components/TimerClock/TimerClock';
import lotteryImage from '../../assets/lotteryImg@2x.png';
import PowerPlays from '../../components/PowerPlays/PowerPlays';
import BingoGame from '../../components/BingoGame/BingoGame';
import BingoGame2 from '../../components/BingoGame2/BingoGame2';
import { useSelector } from 'react-redux';

const BINGO_INDEXES = { b: 0, i: 0, n: 0, g: 0, o: 0 };
const TARGET_NUMBERS = [
    [1, 2, 3, 4, 5], [16,17,18,19,20], [31,32,33,34,35], [46,47,48,49,50], [61,62,63,64,65]
];

const BingoPreGame = props => {
    const { bingo_game: bingoGame = {} } = useSelector((state) => state.bingoGame);
    return (
        <div className='__BingoGame __BingoPreGame'>
            <Header isStick={true} />
            <div className='__flex-stretch __main __container'>
                <div className='__main-left __mt-5 __ml-5 __hide-on-large'>
                    <div className='__title __bold'>Bingo</div>
                    <div className='__mt-1'><span className='__h3'>Win <span className='__primary-color'>$2000 </span></span><span className='__h6'>CAD</span></div>
                    <Link to='/' className='__uppercase __primary-color __see-contesy-rules __inline-block __mt-1 __mb-6 __light-bold'>SEE CONTEST RULES</Link>
                    <div className='__h4'>In Play</div>
                    <div className='__primary __progress-bar __mb-2' style={{ width: '26%' }}></div>
                    <div className='__timer-section __relative __center'>
                        <div className='__absolute __center'>
                            <img src={clockimage} alt='' className='__clock-image' />
                            <div className='__dark-white-color __smaller __mt-1 __mb-s'>Live draw begins in</div>
                            <TimerClock days={1} hours={23} mins={2} secs={50} />
                        </div>
                    </div>
                </div>
                <div className='__main-center __mt-6 __ml-a __mr-a'>
                    <div className='__header __flex-stretch __relative __wrap'>
                        <div className='__title __mr-a __mb-1'>
                            <div className='__h2 __bold'>Bingo</div>
                            <Link to='/' className='__uppercase __primary-color __see-contesy-rules __inline-block __smaller __mt-1 __light-bold'>SEE CONTEST RULES</Link>
                        </div>
                        <div className='__mb-1'>
                            <div className='__light-bold'>Jackpot</div>
                            <div><span className='__h2 __bolder __primary-color __h3-on-mediam'>$2000</span> <span className='__smaller-on-mediam'>CAD</span></div>
                            <div className='__smaller'>
                                Odds of winning depend on
                                <div className='__light-bold'>Powerplay usage</div>
                            </div>
                        </div>
                        <div className='__border __hide-on-large'></div>
                        <div className='__timer-wrapper __m-a'>
                            <div>Next draw starts in</div>
                            <div className='__inline-block'><TimerClock days={1} hours={23} mins={2} secs={50} /></div>
                            <div className='__hide-on-large'>Draw date <span className='__light-bold'>Sept 5th, 2020 , 8:00 pm EST</span></div>
                        </div>
                        <img alt='' src={lotteryImage} className='__absolute __lottery-image __hide-on-large' />
                    </div>
                    <BingoGame targetNumbers={TARGET_NUMBERS} />
                </div>
                <PowerPlays />
            </div>
            <div className='__container __bing-2-game-wrapper'>
                <BingoGame2 bingo={bingoGame} />
            </div>
            <div className='__hide-on-large'>
                <Footer isBlack={true} />
            </div>
        </div>
    )
}

export default BingoPreGame;