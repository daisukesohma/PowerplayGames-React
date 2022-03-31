import React from 'react';

const PlusAndMinus = props => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "54"} height={props?.size || "54"} viewBox="0 0 54 54" {...props}>
        <defs>
        <linearGradient id="prefix__a" x1="35.019%" x2="67.721%" y1="39.758%" y2="84.553%">
            <stop offset="0%" stopColor="#FB6E00"/>
            <stop offset="100%" stopColor="#FA3800"/>
        </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
        <circle cx="26.507" cy="26.507" r="26.507" fill="url(#prefix__a)"/>
        <circle cx="34" cy="33" r="9" fill="#D9D9DD" fillRule="nonzero"/>
        <path fill="#FB5A00" fillRule="nonzero" d="M38.518 32.018h-3.34c-.108 0-.196-.088-.196-.197v-3.339c0-.542-.44-.982-.982-.982s-.982.44-.982.982v3.34c0 .108-.088.196-.197.196h-3.339c-.542 0-.982.44-.982.982s.44.982.982.982h3.34c.108 0 .196.088.196.197v3.339c0 .542.44.982.982.982s.982-.44.982-.982v-3.34c0-.108.088-.196.197-.196h3.339c.542 0 .982-.44.982-.982s-.44-.982-.982-.982z"/>
        <g transform="translate(6 13)">
            <circle cx="9" cy="9" r="9" fill="#F8F8F8" fillRule="nonzero"/>
            <rect width="11" height="2" x="3.5" y="8" fill="#FB6100" rx="1"/>
        </g>
    </g>    
    </svg>
)

export default PlusAndMinus;