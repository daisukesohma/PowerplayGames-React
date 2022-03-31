import React, { useEffect, useState } from 'react';
import './ReverseTimer.scss';

const ReverseTimer = props => {
    const { maxSec = 5, className } = props;
    const [currentSec, setCurrentSec] = useState(maxSec);
    useEffect(() => {
        let initialTimer = maxSec;
        const timer = setInterval(() => {
            if (initialTimer <= 0) return clearInterval(timer);
            setCurrentSec(--initialTimer);
        }, 1000);
        return () => clearInterval(currentSec);
    }, [])
    return (
        <div className={`base-timer __relative ${className}`}>
            <svg viewBox="0 0 100 100" className='__primary-color'>
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    <path
                        strokeDasharray={`${(maxSec - currentSec) / maxSec * 283} 283`}
                        className="base-timer__path-remaining"
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                    "
                    ></path>
                </g>
            </svg>
            <div className='__absolute __time-left __center'>
                <span className='__h5 __bold'>{currentSec}</span>
                <div className='__smaller'>Sec</div>
            </div>
        </div >
    )
}

export default ReverseTimer;