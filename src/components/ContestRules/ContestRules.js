import React from 'react';
import book from '../../assets/gaming.svg';
import './ContestRules.scss';
import check from '../../assets/check.svg';
import LeftArrow from '../../icons/LeftArrow';

const ContestRules = props => (
    <div className='__ContestRules __p-3 __relative'>
            <div className='__rules-header __flex __flex-start'>
                <div className='__flex-start __flex __mr-1s'>
                    <img src={check} alt='' />
                    <div>No purchase <br /> necessary.</div>
                </div>
                <div className='__flex-start __flex __mr-3'>
                    <img src={check} alt='' />
                    <div>Open to residents of United States <br /> who are over the age of majority.</div>
                </div>
                <div className='__flex-start __flex'>
                    <img src={check} alt='' />
                    <div>Contest closes at <br /> 11:59pm ET - April 22, 2020.</div>
                </div>
            </div>
            <ul className='__p-0 __mt-3'>
                <li>Five (5) prizes to be won. See full rules for complete details of all prizes.</li>
                <li>One entry per person.</li>
                <li>Odds of winning depend on player knowledge.</li>
                <li>Mathematical skill testing question must be correctly answered to win.</li>
            </ul>
            <button className='__btn __style-3 __large-btn __white __mediam '>See Full Rules <LeftArrow className="__ml-s" /> </button>
        <div className='__flex-stretch __absolute __image-wrapper'>
            <img src={book} className='__book' alt='' />
            <span className='__mediam __mt-s __ml-s'>Gameplay Rules</span>
        </div>
    </div>
)

export default ContestRules;