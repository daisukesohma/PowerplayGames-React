import React from 'react'
import PropTypes from 'prop-types'

function Clock3(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={props?.size || '12'}
            height={props?.size + 2 || '14'}
            viewBox="0 0 12 14"
            style={{ height: 'auto' }}
        >
            <g fill="none" fillRule="evenodd">
                <g fill={props?.color || "#B3B3B3"} fillRule="nonzero">
                    <g>
                        <g>
                            <g>
                                <path d="M5.803 4.642v3.482H2.32c0 1.923 1.559 3.481 3.482 3.481 1.923 0 3.481-1.558 3.481-3.481 0-1.923-1.558-3.482-3.481-3.482z" transform="translate(-73 -809) translate(59 759) translate(14 49) translate(0 1)" />
                                <path d="M10.021 4.146l.834-.834-.82-.821-.892.892c-.815-.578-1.766-.933-2.76-1.033V1.16h1.16V0H4.062v1.16h1.16v1.19c-.993.1-1.944.455-2.76 1.033l-.891-.892-.82.82.833.835c-2.17 2.298-2.102 5.912.155 8.126 2.257 2.214 5.87 2.214 8.128 0 2.256-2.214 2.325-5.828.154-8.126zm-4.218 8.62c-2.564 0-4.642-2.078-4.642-4.642 0-2.564 2.078-4.642 4.642-4.642 2.563 0 4.642 2.078 4.642 4.642-.003 2.562-2.08 4.639-4.642 4.642z" transform="translate(-73 -809) translate(59 759) translate(14 49) translate(0 1)" />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

Clock3.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
}

export default Clock3

