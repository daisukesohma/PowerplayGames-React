import React from 'react';

const Plus = props => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "54"} height={props?.size || "54"} viewBox="0 0 34 34" {...props}>
        <defs>
            <linearGradient id="prefix__a" x1="35.019%" x2="67.721%" y1="39.758%" y2="84.553%">
                <stop offset="0%" stopColor="#FB6E00"/>
                <stop offset="100%" stopColor="#FA3800"/>
            </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
            <circle cx="16.699" cy="16.699" r="16.699" fill="url(#prefix__a)"/>
            <g fillRule="nonzero" transform="translate(8 7.7)">
                <circle cx="8.845" cy="8.845" r="8.845" fill="#F8F8F8"/>
                <path fill="#FB5A00" d="M13.285 7.88h-3.282c-.106 0-.193-.086-.193-.193V4.405c0-.533-.432-.965-.965-.965-.533 0-.965.432-.965.965v3.282c0 .107-.086.193-.193.193H4.405c-.533 0-.965.432-.965.965 0 .533.432.965.965.965h3.282c.107 0 .193.087.193.193v3.282c0 .533.432.966.965.966.533 0 .965-.433.965-.966v-3.282c0-.106.087-.193.193-.193h3.282c.533 0 .966-.432.966-.965 0-.533-.433-.965-.966-.965z"/>
            </g>
        </g>
    </svg>
)

export default Plus;