import React from 'react'
import PropTypes from 'prop-types'

function RetroBoostIcon(props) {
    return (   
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "30"} height={props?.size || "30"} viewBox="0 0 30 30" style={{ height: 'auto' }}>
            <defs>
                <linearGradient id="nsupql9kba" x1="35.019%" x2="67.721%" y1="39.758%" y2="84.553%">
                    <stop offset="0%" stop-color="#FB6E00"/>
                    <stop offset="100%" stop-color="#FA3800"/>
                </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g transform="translate(-142 -2930) translate(50 2689) translate(18 41) translate(42 195) translate(32.5 5)">
                                        <circle cx="26.507" cy="26.507" r="26.507" fill="url(#nsupql9kba)"/>
                                    </g>
                                    <path fill="#FFF" fill-rule="nonzero" d="M15.36 40.646c-.868-.684-1.017-1.942-.333-2.81.684-.867 1.941-1.016 2.809-.332 1.16.914 2.464 1.642 3.883 2.159 7.265 2.644 15.3-1.102 17.944-8.368 2.644-7.265-1.102-15.3-8.368-17.944-7.265-2.644-15.3 1.102-17.944 8.368-.377 1.038-1.525 1.573-2.563 1.195-1.038-.378-1.573-1.525-1.195-2.563 3.4-9.342 13.729-14.158 23.07-10.758 9.342 3.4 14.159 13.729 10.759 23.07-3.4 9.342-13.73 14.159-23.071 10.759-1.82-.663-3.499-1.6-4.991-2.776z" transform="translate(-142 -2930) translate(50 2689) translate(18 41) translate(42 195) translate(32.5 5) rotate(-26 26.992 26.507)"/>
                                    <g fill-rule="nonzero">
                                        <g>
                                            <path fill="#FFF" d="M9.026 5.286V1.152c0-.31-.353-.488-.599-.302L.15 7.107c-.197.148-.2.445-.007.598 8.838 7.014 8.25 6.592 8.436 6.592.205 0 .375-.167.375-.377V9.59l.072-4.304z" transform="translate(-142 -2930) translate(50 2689) translate(18 41) translate(42 195) translate(32.5 5) translate(3.007 16.9) rotate(-90 8.15 7.768)"/>
                                            <path fill="#ECECEC" d="M8.58 12.209c-.186 0 .36.39-7.472-5.826l-.958.724c-.197.148-.2.445-.007.598l8.205 6.511c.244.195.606.019.606-.296v-2.088c0 .21-.17.377-.375.377z" transform="translate(-142 -2930) translate(50 2689) translate(18 41) translate(42 195) translate(32.5 5) translate(3.007 16.9) rotate(-90 8.15 7.768)"/>
                                        </g>
                                        <path fill="#ECECEC" d="M23.343.795c1.054 0 1.918.816 1.994 1.85l.006.15-.001 6.774 4.842 3.558c.89.654 1.082 1.906.428 2.796-.622.846-1.782 1.061-2.66.52l-.136-.092-5.662-4.16c-.564-.414-.848-1.068-.813-1.719l.002-7.677c0-1.105.895-2 2-2z" transform="translate(-142 -2930) translate(50 2689) translate(18 41) translate(42 195) translate(32.5 5) translate(3.007 16.9)"/>
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

RetroBoostIcon.propTypes = {
    size: PropTypes.number,
}

export default RetroBoostIcon

