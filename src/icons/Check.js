import React from 'react'
import PropTypes from 'prop-types'

function CheckIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "30"} height={props?.size || "30"} viewBox="0 0 30 30" style={{ height: 'auto' }}>
            <g fill="none" fillRule="evenodd">
                <g fillRule="nonzero">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <path fill="#688FBD" d="M25.587 4.39C22.756 1.56 18.992 0 14.988 0 10.985 0 7.221 1.56 4.39 4.39 1.56 7.22 0 10.985 0 14.988c0 4.004 1.56 7.768 4.39 10.599 2.83 2.83 6.595 4.39 10.598 4.39 4.004 0 7.768-1.56 10.599-4.39 2.83-2.831 4.39-6.595 4.39-10.599 0-4.003-1.56-7.767-4.39-10.598z" transform="translate(-1203 -944) translate(1083 516) translate(34 331) translate(3 42) translate(83 55)" />
                                    <path fill="#FAFAFA" d="M23.98 11.446l-10.427 9.642c-.213.197-.493.296-.773.296s-.56-.099-.773-.296l-5.855-5.414c-.427-.395-.427-1.035 0-1.43s1.12-.395 1.546 0l5.082 4.7 9.654-8.928c.427-.395 1.119-.395 1.546 0 .427.395.427 1.035 0 1.43z" transform="translate(-1203 -944) translate(1083 516) translate(34 331) translate(3 42) translate(83 55)" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

CheckIcon.propTypes = {
    size: PropTypes.number,
}

export default CheckIcon

