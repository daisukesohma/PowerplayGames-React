import React from 'react';

import { HeartsIcons } from './HeartsIcons'
import HeartJack from './HeartJack'
import HeartKing from './HeartKing';
import HeartQueen from './HeartQueen';
import HeartAce from './HeartAce';

const Hearts = props => {
    const renderCards = (value) => {
        let _value = value.toString();
        switch(_value) {
            case "2":
                return HeartsIcons.twos()
            
            case "3":
                return HeartsIcons.threes()
            
            case "4":
                return HeartsIcons.fours()
            
            case "5":
                return HeartsIcons.fives()
            
            case "6":
                return HeartsIcons.sixs()
            
            case "7":
                return HeartsIcons.sevens()
            
            case "8":
                return HeartsIcons.eights()
            
            case "9":
                return HeartsIcons.nines()
            
            case "10":
                return HeartsIcons.tens()
            
            case "J":
                return <HeartJack />
            
            case "K":
                return <HeartKing />
            
            case "A":
                return <HeartAce />
            
            case "Q":
                return <HeartQueen />
                
        }
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.width || "73"} height={props?.height || "104"} viewBox="0 0 73 104" {...props}>
            <g fill="none" fillRule="evenodd" transform="translate(0 1)">
                <rect width="72.432" height="101.162" x=".211" y=".211" fill="#F9F9F8" fillRule="nonzero" stroke="#1D1D1B" strokeWidth=".25" rx="3.54" />
                {
                    renderCards(props?.value)
                }
            </g>
            {
                props?.value !== "A" && props?.value !== "Q" && props?.value !== "K" && props?.value !== "J" &&
                <>
                    <text x={props?.value?.length === 1 ? "1.5" : "0"} y="15" fill="#DF3439" style={{ fontSize: '12px', fontFamily: 'arial, sans-serif' }}>
                        {props?.value}
                    </text>

                    <text x={props?.value?.length === 1 ? "-70" : "-72.5"} y="-90" fill="#DF3439" style={{ fontSize: '12px', fontFamily: 'arial, sans-serif', transform: 'rotate(180deg)' }}>
                        {props?.value}
                    </text>
                </>
            }
        </svg>
    )
}

export default Hearts;