import React from 'react'
import PropTypes from 'prop-types'

function FacebookIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "20"} height={props?.size || "20"} viewBox="0 0 20 20" style={{ height: 'auto' }}>
            <g fill="none" fillRule="evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <g transform="translate(-1207 -1199) translate(1083 516) translate(34 508) translate(22 27) translate(0 56) translate(8 86) translate(60 6)">
                                            <circle cx="10" cy="10" r="10" fill="#688FBD" />
                                            <g fill="#000" fillRule="nonzero">
                                                <path d="M6.261.003L4.703 0c-1.75 0-2.882 1.16-2.882 2.957V4.32H.255c-.136 0-.245.11-.245.245v1.976c0 .135.11.245.245.245H1.82v4.984c0 .136.11.245.245.245H4.11c.136 0 .245-.11.245-.245V6.786h1.832c.135 0 .245-.11.245-.245V4.565c0-.065-.025-.127-.071-.173-.046-.046-.108-.072-.173-.072H4.355V3.165c0-.556.133-.838.856-.838h1.05c.135 0 .245-.11.245-.245V.248c0-.136-.11-.245-.245-.245z" transform="translate(6.25 3.75)" />
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

FacebookIcon.propTypes = {
    size: PropTypes.number
}

export default FacebookIcon

