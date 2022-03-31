import React from 'react'
import PropTypes from 'prop-types'

function RightArrowIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={ props?.size || "26" } height={ props?.size - 8 || "18" } viewBox="0 0 26 18" style={{height: 'auto'}}>
            <defs>
                <path id="yqpm5104qa" d="M0.06 0.287L25.195 0.287 25.195 17.999 0.06 17.999z"/>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <g transform="translate(-247 -2069) translate(50 1752) translate(18 41) translate(42 259) rotate(-180 81.5 17.5)">
                                    <mask id="lr4ew9w5hb" fill="#fff">
                                        <use/>
                                    </mask>
                                    <path fill="#000" d="M8.219.553c.355-.356.914-.356 1.269 0 .344.344.344.914 0 1.258L3.051 8.248h21.242c.496 0 .902.395.902.887 0 .496-.406.902-.902.902H3.051l6.437 6.426c.344.355.344.93 0 1.27-.355.355-.914.355-1.269 0L.258 9.772c-.344-.344-.344-.914 0-1.258L8.219.553z" mask="url(#lr4ew9w5hb)"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

RightArrowIcon.propTypes = {
    size: PropTypes.number,
}

export default RightArrowIcon

