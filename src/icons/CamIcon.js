import React from 'react'
import PropTypes from 'prop-types'

function CamIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "54"} height={props?.size || "54"} viewBox="0 0 54 54" style={{ height: 'auto' }}>
            <defs>
                <linearGradient id="xvmpul8yxa" x1="35.019%" x2="67.721%" y1="39.758%" y2="84.553%">
                    <stop offset="0%" stopColor="#FB6E00" />
                    <stop offset="100%" stopColor="#FA3800" />
                </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g transform="translate(-1298 -1263) translate(1083 516) translate(34 508) translate(22 27) translate(126 212) translate(33)">
                                        <circle cx="26.507" cy="26.507" r="26.507" fill="url(#xvmpul8yxa)" />
                                        <g fillRule="nonzero">
                                            <g>
                                                <path fill="#ECECEC" d="M36.744 2.377c-.393-.218-.874-.262-1.267-.044l-8.87 4.632v7.995l8.826 4.631c.175.088.393.131.612.131.218 0 .48-.043.699-.174.393-.219.612-.656.612-1.136V3.513c0-.437-.219-.874-.612-1.136z" transform="translate(8.4 15.4)" />
                                                <path fill="#FFF" d="M27 2.683C27 1.197 25.866.06 24.38.06H2.62C1.136.061 0 1.197 0 2.683v16.602c0 1.486 1.136 2.622 2.621 2.622H24.38c1.486 0 2.622-1.136 2.622-2.622V2.683z" transform="translate(8.4 15.4)" />
                                                <path fill="#FB6E00" d="M3.982 3.186c-1.306 0-2.39 1.083-2.39 2.39 0 1.305 1.084 2.388 2.39 2.388s2.39-1.083 2.39-2.389c0-1.306-1.084-2.39-2.39-2.39z" transform="translate(8.4 15.4)" />
                                            </g>
                                            <g>
                                                <path fill="#FB6E00" d="M11.14 1.911C9.909.679 8.272 0 6.53 0 4.961 0 3.468.556 2.286 1.572L1.022.33.77 4.625l4.366-.323-1.24-1.147c.75-.59 1.672-.91 2.635-.91 2.358 0 4.276 1.92 4.276 4.28 0 2.359-1.918 4.279-4.276 4.279-1.082 0-2.114-.406-2.907-1.143-.788-.732-1.269-1.725-1.354-2.794l-.027-.352H0l.024.405c.206 3.437 3.064 6.129 6.506 6.129 1.742 0 3.379-.679 4.61-1.911 1.23-1.232 1.909-2.87 1.909-4.614 0-1.742-.678-3.38-1.91-4.613z" transform="translate(8.4 15.4) translate(7.964 4.779)" />
                                                <path fill="#E06200" d="M11.14 1.911C9.909.679 8.272 0 6.53 0h-.006v2.245h.006c2.358 0 4.276 1.92 4.276 4.28 0 2.359-1.918 4.279-4.276 4.279h-.006v2.245h.006c1.742 0 3.379-.679 4.61-1.911 1.23-1.232 1.909-2.87 1.909-4.614 0-1.742-.678-3.38-1.91-4.613z" transform="translate(8.4 15.4) translate(7.964 4.779)" />
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

CamIcon.propTypes = {
    size: PropTypes.number
}

export default CamIcon

