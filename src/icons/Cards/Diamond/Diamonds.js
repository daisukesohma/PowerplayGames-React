import React from 'react';
import DiamondAce from './DiamondAce';

import { DiamondIcons } from './DiamondIcons'
import DiamondJack from './DiamondJack';
import DiamondKing from './DiamondKing'
import DiamondQueen from './DiamondQueen';

const Diamonds = props => {
    const renderCards = (value) => {
        let _value = value.toString();
        switch(_value) {
            case "2":
                return DiamondIcons.twos()
            
            case "3":
                return DiamondIcons.threes()
            
            case "4":
                return DiamondIcons.fours()
            
            case "5":
                return DiamondIcons.fives()
            
            case "6":
                return DiamondIcons.sixs()
            
            case "7":
                return DiamondIcons.sevens()
            
            case "8":
                return DiamondIcons.eights()
            
            case "9":
                return DiamondIcons.nines()
            
            case "10":
                return DiamondIcons.tens()
            
            case "J":
                return <DiamondJack />
            
            case "K":
                return <DiamondKing />
            
            case "A":
                return <DiamondAce />
            
            case "Q":
                return <DiamondQueen />
                
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
                    <text x={props?.value?.length === 1 ? "1.5" : "0"} y="17" fill="#DF3439" style={{ fontSize: '12px', fontFamily: 'arial, sans-serif' }}>
                        {props?.value}
                    </text>

                    <text x={props?.value?.length === 1 ? "-70" : "-72.5"} y="-88" fill="#DF3439" style={{ fontSize: '12px', fontFamily: 'arial, sans-serif', transform: 'rotate(180deg)' }}>
                        {props?.value}
                    </text>
                </>
            }
        </svg>
    )
}

export default Diamonds;