import React from 'react'
import PropTypes from 'prop-types'

function ForwardArrow(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={props?.size || "16"} height={props?.size - 4 || "12"}
            viewBox="0 0 16 12"
            style={{ height: 'auto' }}
        >
            <g fill="none" fillRule="evenodd" opacity="1">
                <g fill={props?.color || "#688FBD"} fillRule="nonzero">
                    <g>
                        <g>
                            <g>
                                <path d="M446.994 155.388c-.584-3.261-1.431-7.386-5.85-7.386h-2.47v-3.667c0-.275-.3-.433-.509-.268l-7.038 5.55c-.167.132-.17.395-.006.531 7.515 6.222 7.016 5.848 7.174 5.848.174 0 .318-.149.318-.335v-3.84h2.532c2.649 0 3.881 2.56 5.328 3.881.227.208.577-.004.521-.314z" transform="translate(-501 -1206) translate(50 634) translate(0 216) translate(20 212) matrix(-1 0 0 1 878 0)" />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

ForwardArrow.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
}

export default ForwardArrow

