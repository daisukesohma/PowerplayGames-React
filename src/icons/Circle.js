import React from 'react';

const Circle = props => (
    <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
                id="base-timer-path-remaining"
                strokeDasharray={0.1}
                className="base-timer__path-remaining"
                d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                "
            ></path>
        </g>
    </svg>
)

export default Circle;