import React from 'react';

const Minus = props => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "54"} height={props?.size || "54"} viewBox="0 0 34 34" {...props}>
        <defs>
            <linearGradient id="prefix__a" x1="35.019%" x2="67.721%" y1="39.758%" y2="84.553%">
                <stop offset="0%" stopColor="#FB6E00"/>
                <stop offset="100%" stopColor="#FA3800"/>
            </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
            <circle cx="16.699" cy="16.699" r="16.699" fill="url(#prefix__a)"/>
            <g transform="translate(8 8)">
                <circle cx="8.505" cy="8.505" r="8.505" fill="#F8F8F8" fillRule="nonzero"/>
                <rect width="10.395" height="1.89" x="3.308" y="7.56" fill="#FB6100" rx=".63"/>
            </g>
        </g>
    </svg>
)

export default Minus;