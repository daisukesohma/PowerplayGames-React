import React from 'react'
import PropTypes from 'prop-types'

function SearchIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={ props?.size || "18" } height={ props?.size || "19" } viewBox="0 0 18 19">
            <g fill="none" fillRule="evenodd">
                <g fill="#909192" fillRule="nonzero">
                    <g>
                        <g>
                            <g>
                                <path d="M17.726 17.14l-4.437-4.658c1.14-1.369 1.766-3.091 1.766-4.884C15.055 3.408 11.678 0 7.528 0 3.377 0 0 3.408 0 7.598c0 4.19 3.377 7.598 7.528 7.598 1.558 0 3.043-.475 4.312-1.375l4.471 4.693c.187.196.438.304.708.304.255 0 .497-.098.68-.276.39-.38.403-1.008.027-1.402zM7.528 1.982c3.067 0 5.563 2.52 5.563 5.616 0 3.096-2.496 5.616-5.563 5.616-3.068 0-5.564-2.52-5.564-5.616 0-3.097 2.496-5.616 5.564-5.616z" transform="translate(-523 -793) translate(50 735) translate(449 45) translate(24 13)"/>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

SearchIcon.propTypes = {
    size: PropTypes.number
}

export default SearchIcon

