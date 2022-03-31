import React from 'react';
import PropTypes from 'prop-types';

function AmericanFootballTicket(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "132"} height={props?.size || "132"} viewBox="0 0 132 132" style={{height: 'auto'}} {...props}>
    <defs>
        <filter id="289sl43zca" width="226.5%" height="226.5%" x="-63.2%" y="-63.2%" filterUnits="objectBoundingBox">
            <feOffset dy="6" in="SourceAlpha" result="shadowOffsetOuter1"/>
            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="8"/>
            <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
            <feMerge>
                <feMergeNode in="shadowMatrixOuter1"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
        <g fill="#FB6E00" fillRule="nonzero">
            <g>
                <g>
                    <g filter="url(#289sl43zca)" transform="translate(-290 -940) translate(250 829) translate(40 112) translate(32 31)">
                        <path d="M64.648 28.459c.567 0 1.026-.46 1.026-1.026V19.77c0-1.17-.951-2.121-2.12-2.121H4.446c-1.17 0-2.121.951-2.121 2.12v7.663c0 .566.46 1.026 1.026 1.026 3.056 0 5.541 2.486 5.541 5.541s-2.485 5.541-5.54 5.541c-.568 0-1.027.46-1.027 1.026v7.662c0 1.17.951 2.121 2.12 2.121h59.107c1.17 0 2.121-.951 2.121-2.12v-7.663c0-.566-.46-1.026-1.026-1.026-3.056 0-5.541-2.486-5.541-5.541s2.485-5.541 5.54-5.541zM57.054 34c0 3.84 2.864 7.022 6.568 7.524v6.705c0 .038-.031.069-.069.069H4.447c-.038 0-.069-.031-.069-.069v-6.705c3.704-.502 6.568-3.685 6.568-7.524 0-3.84-2.864-7.022-6.568-7.524V19.77c0-.038.031-.069.069-.069h59.106c.038 0 .069.031.069.069v6.705c-3.704.502-6.568 3.685-6.568 7.524z" transform="rotate(-45 34 34)"/>
                        <path d="M25.486 38.204c-.567 0-1.026.46-1.026 1.026v6.567c0 .567.46 1.027 1.026 1.027.567 0 1.026-.46 1.026-1.027V39.23c0-.567-.459-1.026-1.026-1.026z" transform="rotate(-45 25.486 42.514)"/>
                        <path d="M25.973 32.124h3.284c.566 0 1.026-.46 1.026-1.026 0-.567-.46-1.027-1.026-1.027h-3.284c-.567 0-1.026.46-1.026 1.027 0 .566.459 1.026 1.026 1.026z" transform="rotate(-45 27.615 31.098)"/>
                        <path d="M27.305 30.963H42.63c.567 0 1.027-.46 1.027-1.026 0-.567-.46-1.027-1.027-1.027H27.305c-.566 0-1.026.46-1.026 1.027 0 .566.46 1.026 1.026 1.026z" transform="rotate(-45 34.967 29.937)"/>
                        <path d="M30.722 34.833h13.135c.567 0 1.026-.46 1.026-1.026 0-.567-.46-1.027-1.026-1.027H30.722c-.567 0-1.026.46-1.026 1.027 0 .566.46 1.026 1.026 1.026z" transform="rotate(-45 37.29 33.807)"/>
                        <path d="M41.347 38.198H34.78c-.567 0-1.026.46-1.026 1.026 0 .567.459 1.026 1.026 1.026h6.567c.567 0 1.026-.459 1.026-1.026s-.46-1.026-1.026-1.026z" transform="rotate(-45 38.063 39.224)"/>
                        <path d="M49.087 30.458h-6.568c-.566 0-1.026.46-1.026 1.027 0 .566.46 1.026 1.026 1.026h6.568c.567 0 1.026-.46 1.026-1.026 0-.567-.46-1.027-1.026-1.027z" transform="rotate(-45 45.803 31.485)"/>
                        <path d="M31.39 26.706h3.284c.567 0 1.027-.46 1.027-1.026 0-.567-.46-1.026-1.027-1.026h-3.283c-.567 0-1.026.459-1.026 1.026s.459 1.026 1.026 1.026z" transform="rotate(-45 33.033 25.68)"/>
                        <path d="M40.092 19.236H36.81c-.567 0-1.027.46-1.027 1.026 0 .567.46 1.026 1.027 1.026h3.283c.567 0 1.026-.46 1.026-1.026 0-.567-.459-1.026-1.026-1.026z" transform="rotate(-45 38.45 20.262)"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
    )
}

AmericanFootballTicket.propTypes = {
    size: PropTypes.number
}

export default AmericanFootballTicket
