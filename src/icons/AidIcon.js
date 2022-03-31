import React from 'react'
import PropTypes from 'prop-types'

function AidIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "21"} height={props?.size || "21"} viewBox="0 0 21 21" style={{ height: 'auto' }}>
            <g fill="none" fillRule="evenodd">
                <g fillRule="nonzero">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <path fill="#EEE" d="M4.115 0C1.843 0 0 1.879 0 4.197v12.17c0 2.317 1.843 4.196 4.115 4.196h5.88L11.75 9.848 9.994 0H4.115z" transform="translate(-260 -1075) translate(50 634) translate(0 216) translate(210 225)" />
                                    <path fill="#D3CFCF" d="M20.237 16.367V4.197C20.237 1.879 18.37 0 16.07 0h-5.952v20.563h5.952c2.301 0 4.167-1.879 4.167-4.196z" transform="translate(-260 -1075) translate(50 634) translate(0 216) translate(210 225)" />
                                </g>
                                <g>
                                    <path fill="#FA3800" d="M5.222 10.445L6.963 5.222 5.222 0 2.774 0 2.774 2.774 0 2.774 0 7.67 2.774 7.67 2.774 10.445z" transform="translate(-260 -1075) translate(50 634) translate(0 216) translate(210 225) translate(4.76 5.44)" />
                                    <path fill="#C72D00" d="M5.222 10.445L5.222 0 7.67 0 7.67 2.774 10.445 2.774 10.445 7.67 7.67 7.67 7.67 10.445z" transform="translate(-260 -1075) translate(50 634) translate(0 216) translate(210 225) translate(4.76 5.44)" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

AidIcon.propTypes = {
    size: PropTypes.number
}

export default AidIcon

