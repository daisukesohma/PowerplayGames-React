import React from 'react';
import './TimerClock.scss'

const TimerClock = ({days, hours, mins, secs}) => {
    return (
        <div className='__TimerClock'>
            <div className='__primary-color __h5 __bold'>{days}</div>
            <div className='__primary-color __h5 __bold'>{hours}</div>
            <div className='__primary-color __h5 __bold'>{mins}</div>
            <div className='__primary-color __h5 __bold'>{secs}</div>
            <div className='__label'>Days</div>
            <div className='__label'>hours</div>
            <div className='__label'>mins.</div>
            <div className='__label'>secs.</div>
        </div>
    )
}

export default TimerClock;