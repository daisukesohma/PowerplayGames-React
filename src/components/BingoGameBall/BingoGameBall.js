import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './BingoGameBall.scss';
import Replace from '../../icons/Replace'
import Plus from '../../icons/Plus'
import Minus from '../../icons/Minus'
import BoltIcon from '../../assets/bolt.png';
import IncreaseIcon from '../../assets/IncreaseIcon.png';
import DecreaseIcon from '../../assets/DecreaseIcon.png';

const BingoGameBall = props => {
    const [showPopup, setPopupState] = useState(false);
    const { active = false, number = 0, keyVal = '', row = 0, column = 0, onPowerMatch = () => { }, onIncrease = () => { }, onDecrease = () => { }, onReplace = () => { }, inRangeB = false, inRangeI = false, inRangeN = false, inRangeG = false, inRangeO
     = false } = props || {};

    return (
        <div className={`__BingoGameBall __relative __flex __flex-center __h5 __mediam-on-mediam ${active ? 'active' : ''}`} key={keyVal}>
            <div className='__ball-number __flex __flex-center __absolute' onClick={() => setPopupState(!showPopup)}>{number}</div>
            {
                !active && ((inRangeB && column === 0) || (inRangeI && column === 1) || (inRangeN && column === 2) || (inRangeG && column === 3) || (inRangeO && column === 4)) && showPopup &&
                <>
                    <div className={`__triangle __absolute __primary-color`}></div>
                    <div className={`__flex __ball-actions __absolute __primary-color`} onMouseLeave={() => setPopupState(false)}>
                        <Replace size={45} style={{height: 'auto'}} onClick={() => onReplace(row, column)} />
                        <img alt='' src={BoltIcon} onClick={() => onPowerMatch(row, column)} />
                        <Plus size={45} style={{ height: 'auto' }} onClick={() => onIncrease(number, row, column)} />
                        <Minus size={45} style={{height: 'auto'}} onClick={() => onDecrease(number, row, column)} />
                        {/* <img alt='' src={DecreaseIcon} onClick={() => { console.log('clicked: ', number) }} /> */}
                    </div>
                </>
            }
        </div>
    )
}

BingoGameBall.propTypes = {
    active: PropTypes.bool,
    number: PropTypes.any,
    keyVal: PropTypes.string,
    column: PropTypes.number,
    row: PropTypes.number,
    inRangeB: PropTypes.bool,
    inRangeI: PropTypes.bool,
    inRangeN: PropTypes.bool,
    inRangeG: PropTypes.bool,
    inRangeO: PropTypes.bool,
    onPowerMatch: PropTypes.func,
    onIncrease: PropTypes.func,
    onDecrease: PropTypes.func,
    onReplace: PropTypes.func
}

export default BingoGameBall;