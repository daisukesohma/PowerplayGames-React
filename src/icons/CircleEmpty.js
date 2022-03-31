import React from 'react'
import PropTypes from 'prop-types'

function CircleEmpty(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={ props?.size || "32" } height={ props?.size || "32" } viewBox="0 0 32 32" style={{height: 'auto'}}>
            <g fill={ props?.filled ? '#688FBD' : 'none' } fillRule="evenodd">
                <g fillRule="nonezero" stroke="#688FBD" strokeWidth="2">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <path d="M25.607 4.393C22.773 1.56 19.007 0 15 0S7.226 1.56 4.393 4.393C1.56 7.226 0 10.993 0 15s1.56 7.773 4.393 10.607C7.226 28.44 10.993 30 15 30s7.773-1.56 10.607-4.393C28.44 22.773 30 19.007 30 15s-1.56-7.773-4.393-10.607z" transform="translate(-1202 -943) translate(1083 516) translate(34 331) translate(3 42) translate(83 55)"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

CircleEmpty.propTypes = {
    size: PropTypes.number,
    filled: PropTypes.bool,
}

export default CircleEmpty

