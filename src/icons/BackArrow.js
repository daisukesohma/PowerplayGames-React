import React from 'react'
import PropTypes from 'prop-types'

function BackArrow(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props?.size || "24"}
            height={props?.size || "24"}
            viewBox="0 0 24 24"
            style={{ height: 'auto' }}
        >
            <g fill="none" fillRule="evenodd">
                <g>
                    <g transform="translate(-51 -590) translate(51 590)">
                        <circle cx="12" cy="12" r="12" fill="#688FBD" />
                        <g fill="#FFF" fillRule="nonzero">
                            <path d="M11.144 3.994l.019.004H3.26l2.484-2.49c.122-.12.189-.285.189-.458 0-.173-.067-.337-.189-.458L5.36.205C5.237.083 5.075.016 4.903.016c-.173 0-.335.067-.457.188L.188 4.462C.066 4.584 0 4.746 0 4.919c0 .174.066.337.188.459l4.258 4.258c.122.121.284.188.457.188.172 0 .334-.067.456-.188l.386-.387c.122-.121.189-.284.189-.456 0-.173-.067-.327-.189-.448L3.233 5.842h7.92c.356 0 .655-.307.655-.663v-.547c0-.355-.308-.638-.664-.638z" transform="translate(6 6.857)" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

BackArrow.propTypes = {
    size: PropTypes.number
}

export default BackArrow

