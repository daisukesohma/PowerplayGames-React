import React from 'react'
import PropTypes from 'prop-types'

function TwitterIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "20"} height={props?.size || "20"} viewBox="0 0 20 20" style={{ height: 'auto' }}>
            <g fill="none" fillRule="evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <g>
                                                <g fill="#688FBD" transform="translate(-1231 -1199) translate(1083 516) translate(34 508) translate(22 27) translate(0 56) translate(8 86) translate(60 6) translate(24)">
                                                    <circle cx="10" cy="10" r="10" />
                                                </g>
                                                <g fill="#000" fillRule="nonzero">
                                                    <path d="M3.796 9.809c4.553 0 7.043-3.772 7.043-7.043 0-.107-.002-.214-.007-.32.483-.35.903-.786 1.235-1.282-.444.197-.921.33-1.422.39.511-.307.904-.792 1.089-1.37-.478.284-1.008.49-1.572.601C9.71.305 9.067.003 8.355.003c-1.367 0-2.476 1.109-2.476 2.475 0 .195.022.384.065.565C3.886 2.939 2.062 1.954.84.457.63.822.506 1.247.506 1.7c0 .858.437 1.617 1.102 2.06C1.2 3.75.82 3.637.486 3.451v.032c0 1.2.853 2.2 1.986 2.427-.208.056-.427.087-.653.087-.159 0-.314-.016-.465-.045.315.984 1.23 1.7 2.313 1.72-.848.664-1.915 1.06-3.075 1.06-.2 0-.397-.012-.59-.035 1.095.702 2.396 1.112 3.794 1.112" transform="translate(-1231 -1199) translate(1083 516) translate(34 508) translate(22 27) translate(0 56) translate(8 86) translate(60 6) translate(24) translate(3.704 5.185)" />
                                                </g>
                                            </g>
                                        </g>
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

TwitterIcon.propTypes = {
    size: PropTypes.number
}

export default TwitterIcon

