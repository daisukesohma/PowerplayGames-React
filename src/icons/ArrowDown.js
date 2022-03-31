import React from 'react'

function ArrowDown(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "48"} height={props?.size || "48"} viewBox="0 0 48 48" {...props}>
            <g fill="none" fillRule="evenodd">
                <circle cx="23.564" cy="23.564" r="23.564" fill="#E7304E"/>
                <path fill="#FFF" fillRule="nonzero" d="M24.97 30.992L35.4 20.065c.664-.695.664-1.822 0-2.516-.663-.695-1.74-.695-2.402 0l-9.23 9.668-9.228-9.668c-.664-.695-1.74-.695-2.403 0s-.663 1.822 0 2.517l10.43 10.926c.332.348.767.521 1.201.521.435 0 .87-.174 1.202-.52z"/>
            </g>
        </svg>
    )
}

export default ArrowDown
