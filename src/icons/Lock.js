import React from 'react'
import PropTypes from 'prop-types'

function LockIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "15"} height={props?.size + 6 || "21"} viewBox="0 0 15 21" style={{ height: 'auto' }}>
            <g fill="none" fillRule="evenodd">
                <g fillRule="nonzero">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <path fill="#F2F2F2" d="M7.394 0c-3.11.004-5.63 2.313-5.634 5.164v3.178c0 .22.194.397.434.397h1.733c.24 0 .433-.178.433-.397V5.164c0-1.536 1.359-2.78 3.034-2.78 1.675 0 3.033 1.244 3.033 2.78v3.178c0 .22.194.397.434.397h1.733c.24 0 .433-.178.433-.397V5.164C13.023 2.314 10.503.004 7.394 0z" transform="translate(-1210 -1140) translate(1083 516) translate(34 508) translate(22 27) translate(0 56) translate(71 33.5)" />
                                        <path fill="#F2F2F2" d="M2.194 7.945h10.4c1.197 0 2.167.889 2.167 1.986v7.15c0 1.097-.97 1.986-2.167 1.986h-10.4c-1.197 0-2.167-.89-2.167-1.986V9.93c0-1.097.97-1.986 2.167-1.986z" transform="translate(-1210 -1140) translate(1083 516) translate(34 508) translate(22 27) translate(0 56) translate(71 33.5)" />
                                        <path fill="#17181A" d="M9.56 12.314c.006-1.097-.96-1.99-2.157-1.994-1.197-.005-2.17.88-2.176 1.977-.003.758.464 1.452 1.206 1.789l-.335 2.145c-.033.217.132.418.369.449.02.002.04.004.06.004H8.26c.24.002.436-.174.438-.394 0-.02-.001-.04-.004-.06l-.335-2.145c.732-.336 1.197-1.02 1.202-1.771z" transform="translate(-1210 -1140) translate(1083 516) translate(34 508) translate(22 27) translate(0 56) translate(71 33.5)" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

LockIcon.propTypes = {
    size: PropTypes.number
}

export default LockIcon

