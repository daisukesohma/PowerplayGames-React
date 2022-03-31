import React from 'react';

import { SpadeNumbers } from './SpadeIconNumbers'
import SpadeKing from './SpadeKing';
import SpadeJack from './SpadeJack';
import SpadeQueen from './SpadeQueen';
import SpadeAce from './SpadeAce';

const Spades = props => {
    const renderCards = (value) => {
        let _value = value.toString();
        switch(_value) {
            case "2":
                return SpadeNumbers.twos()
            
            case "3":
                return SpadeNumbers.threes()
            
            case "4":
                return SpadeNumbers.fours()
            
            case "5":
                return SpadeNumbers.fives()
            
            case "6":
                return SpadeNumbers.sixs()
            
            case "7":
                return SpadeNumbers.sevens()
            
            case "8":
                return SpadeNumbers.eights()
            
            case "9":
                return SpadeNumbers.nines()
            
            case "10":
                return SpadeNumbers.tens()
            
            case "J":
                return <SpadeJack />
            
            case "K":
                return <SpadeKing />
            
            case "A":
                return <SpadeAce />
            
            case "Q":
                return <SpadeQueen />
                
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
                    <text x={props?.value?.length === 1 ? "1.5" : "0"} y="17" fill="#000" style={{ fontSize: '12px', fontFamily: 'arial, sans-serif' }}>
                        {props?.value}
                    </text>

                    <text x={props?.value?.length === 1 ? "-70" : "-72.5"} y="-88" fill="#000" style={{ fontSize: '12px', fontFamily: 'arial, sans-serif', transform: 'rotate(180deg)' }}>
                        {props?.value}
                    </text>
                </>
            }
        </svg>
    )
}

export default Spades;