import React from 'react';
import ClubAce from './ClubAce';

import { ClubIcons } from './ClubIcons'
import ClubJack from './ClubJack';
import ClubKing from './ClubKing';
import ClubQueen from './ClubQueen';

const Clubs = props => {
    const renderCards = (value) => {
        let _value = value.toString();
        switch(_value) {
            case "2":
                return ClubIcons.twos()
            
            case "3":
                return ClubIcons.threes()
            
            case "4":
                return ClubIcons.fours()
            
            case "5":
                return ClubIcons.fives()
            
            case "6":
                return ClubIcons.sixs()
            
            case "7":
                return ClubIcons.sevens()
            
            case "8":
                return ClubIcons.eights()
            
            case "9":
                return ClubIcons.nines()
            
            case "10":
                return ClubIcons.tens()
            
            case "J":
                return <ClubJack />
            
            case "K":
                return <ClubKing />
            
            case "A":
                return <ClubAce />
            
            case "Q":
                return <ClubQueen />
                
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
                    <text x={props?.value?.length === 1 ? "1.5" : "0"} y="17" fill="#010000" style={{ fontSize: '12px', fontFamily: 'arial, sans-serif' }}>
                        {props?.value}
                    </text>

                    <text x={props?.value?.length === 1 ? "-70" : "-72.5"} y="-88" fill="#010000" style={{ fontSize: '12px', fontFamily: 'arial, sans-serif', transform: 'rotate(180deg)' }}>
                        {props?.value}
                    </text>
                </>
            }
        </svg>
    )
}

export default Clubs;