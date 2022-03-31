import React from 'react'
import PropTypes from 'prop-types'

function TDBadge(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "24"} height={props?.size || "24"} viewBox="0 0 24 24" style={{ height: 'auto' }}>
            <defs>
                <filter id="fyjhm8eaua" width="255.6%" height="255.6%" x="-77.8%" y="-55.6%" filterUnits="objectBoundingBox">
                    <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="4" />
                    <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0.901960784 0 0 0 0 0.247058824 0 0 0 0 0.184313725 0 0 0 0.384833916 0" />
                </filter>
                <circle id="1sr7lwxjpb" cx="9" cy="9" r="9" />
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <g transform="translate(-499 -880) translate(50 634) translate(0 216) translate(20 20) translate(353 10) translate(76) translate(3 3)">
                                                <use fill="#000" filter="url(#fyjhm8eaua)" />
                                                <use fill="#E63F2F" />
                                            </g>
                                            <path fill="#FAFAFA" fill-rule="nonzero" d="M14.717 6.604l-1.238 1.923c-.025.04-.075.057-.119.04-2.858-1.44-6.157 1.204-9.055.572-.027-.005-.05-.02-.066-.043L2.35 6.208c-.03-.043-.03-.1 0-.144.03-.044.083-.065.135-.053.725.167 1.46.288 2.2.362 4.415.237 6.806-2.414 10.01.099.04.031.05.088.023.132zm-3.622 5.515c.023.01.05.002.062-.02l1.508-2.324c.008-.015.009-.032.002-.046-.006-.015-.019-.026-.035-.03-2.153-.748-4.181.688-7.28.767-.045.002-.086.027-.108.067-.022.04-.02.088.003.127l3.339 5.16c.02.032.059.046.094.034.036-.012.06-.046.057-.083l-.721-3.267c-.005-.028.012-.054.04-.062.26-.096 2.153-.738 3.049-.33l-.01.007z" transform="translate(-499 -880) translate(50 634) translate(0 216) translate(20 20) translate(353 10) translate(76) translate(3 3)" />
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

TDBadge.propTypes = {
    size: PropTypes.number,
}

export default TDBadge

