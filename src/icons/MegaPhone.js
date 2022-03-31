import React from 'react';
import PropTypes from 'prop-types';

function MegaPhone(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "132"} height={props?.size || "132"} viewBox="0 0 132 132" style={{height: 'auto'}} {...props}>
             <defs>
        <filter id="vb8dpcz0sa" width="230.3%" height="226.5%" x="-65.2%" y="-63.2%" filterUnits="objectBoundingBox">
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
                    <g>
                        <g filter="url(#vb8dpcz0sa)" transform="translate(-732 -1090) translate(250 829) translate(40 112) translate(440 150) translate(34 31)">
                            <path d="M30.916.786c-1.043.202-1.906.861-2.37 1.809L3.006 54.822l-1.423 1.57c-1.235 1.361-1.123 3.467.25 4.694l6.78 6.06c1.373 1.228 3.495 1.118 4.73-.243l1.423-1.57 9.258-5.718 2.704 2.417c2.23 1.992 5.563 2.286 8.108.714l10.347-6.392c.461-.284.87-.625 1.22-1.012.804-.885 1.301-2.01 1.41-3.237.156-1.765-.516-3.458-1.843-4.644l-.928-.83 19.38-11.97c.274-.17.518-.373.727-.603.477-.527.773-1.195.838-1.926.093-1.05-.307-2.057-1.097-2.763L33.8 1.58c-.79-.705-1.84-.994-2.883-.793zM14.71 62.213l-8.908-7.94 23.83-48.486 31.291 27.894L14.71 62.213zm-4.107 3.318l-6.588-5.87c-.482-.43-.521-1.168-.086-1.645l.788-.867 8.338 7.429-.789.866c-.434.478-1.18.517-1.663.087zm33.945-16.556c.815.73 1.227 1.773 1.13 2.86-.095 1.088-.684 2.042-1.614 2.619l-10.242 6.351c-1.723 1.069-3.98.87-5.49-.484l-2.222-1.993 17.067-10.583 1.37 1.23zm19.596-18.077c.288.254.434.617.4.995-.033.378-.24.71-.568.91l-.779.474L30.462 4.375l.4-.81c.168-.34.482-.577.862-.65.38-.071.763.033 1.051.288l31.369 27.695z"/>
                            <path d="M31.159 12.752c-.477-.168-1.058-.012-1.299.349l-.967 1.451c-.241.361-.05.79.427.958.393.14.858.057 1.144-.18.06-.049.112-.106.154-.169l.968-1.451c.24-.361.049-.79-.427-.958zM26.725 18.375l-7.979 16.597c-.264.55-.042 1.21.497 1.475.445.219.967.099 1.284-.26.067-.075.125-.162.171-.258l7.98-16.596c.264-.55.041-1.211-.498-1.476-.539-.264-1.19-.032-1.455.518z"/>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
        </svg>
    )
}

MegaPhone.propTypes = {
    size: PropTypes.number
}

export default MegaPhone
