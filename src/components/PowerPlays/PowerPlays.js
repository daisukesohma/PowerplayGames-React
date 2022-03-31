import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PowerPlays.scss';
import ShuffleIcon from '../../assets/ShuffleIcon.png';
import ReplaceAllIcon from '../../assets/ReplaceAllIcon.png';
import PowerMatchIcon from '../../assets/PowerMatchIcon.png';
import IncreaseIcon from '../../assets/IncreaseIcon.png';
import DecreaseIcon from '../../assets/DecreaseIcon.png';
import PlusMinus from '../../icons/PlusAndMinus';
import BoltIcon from '../../assets/bolt.png';
import Replace from '../../icons/Replace';

const PowerPlays = props => {
    const [isActive, setIsActive] = useState(false);
    const { inventory: { replaceAll = 0, replace = 0, powerMatch = 0, increaseDecrease } = {} } = props || {};
    return (
        <div className={`__Bing-PowerPlays ${isActive ? 'active' : ''}`}>
            <div className='__mt-6 __ml-2 __mr-2 __center __power-plays-main'>
                <div className='__h4 __power-play-title __mediam-on-mediam' onClick={() => setIsActive(prevState => !prevState)}>My Powerplays</div>
                <div className='__power-plays-wrapper __relative'>
                    <div className="__mediam __my-balance __mt-1">My Balance <span className='__primary-color __bold'>$0.00</span></div>
                    <div className='__m-3 __my-powerplay'>
                        <div className='__relative __mediam __default-size-on-mediam'>
                            <div className='__absolute __bingo-badge'>{ replace } left</div>
                            {/* <img alt='' src={ShuffleIcon} /> */}
                            <Replace style={{height: 'auto'}} />
                            <div className='__bold'>Replace</div>
                        </div>
                    </div>
                    <div className='__m-3 __my-powerplay'>
                        <div className='__relative __mediam __default-size-on-mediam'>
                            <div className='__absolute __primary-color __bingo-badge'>{ replaceAll } left</div>
                            <img src={ReplaceAllIcon} alt='' />
                            <div className='__bold'>Replace All</div>
                        </div>
                    </div>
                    <div className='__m-3 __my-powerplay'>
                        <div className='__relative __mediam __default-size-on-mediam'>
                            <div className='__absolute __primary-color __bingo-badge'>{ powerMatch } left</div>
                            <img src={BoltIcon} alt='' width={55} height={55} />
                            <div className='__bold'>Power Match</div>
                        </div>
                    </div>
                    <div className='__m-3 __my-powerplay'>
                        <div className='__relative __mediam __default-size-on-mediam'>
                            <div className='__absolute __primary-color __bingo-badge'>{ increaseDecrease } left</div>
                            {/* <img src={IncreaseIcon} alt='' /> */}
                            <PlusMinus style={{height: 'auto'}} />
                            <div className='__bold'>Increase/Decrease</div>
                        </div>
                    </div>
                    {/* <div className='__m-3 __my-powerplay'>
                        <div className='__relative __mediam __default-size-on-mediam'>
                            <div className='__absolute __primary-color __bingo-badge'>$.25</div>
                            <img src={DecreaseIcon} alt='' />
                            <div className='__bold'>Decrease</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

PowerPlays.propTypes = {
    inventory: PropTypes.object,
}

export default PowerPlays;