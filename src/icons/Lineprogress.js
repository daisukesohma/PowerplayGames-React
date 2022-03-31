import React from 'react'
import PropTypes from 'prop-types'

function Lineprogress(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161 38" width={props?.width || "161"} height={props?.height || "38"}>
            <path fill="#ccc" strokeLinecap="round" width={props?.width} id="Shape 1" class="shp0" d="M1 37.5L1 0.5L161 0.5L161 37.5L1 37.5Z"/>
            <path fill="#333" strokeLinecap="round" id="Shape 1 copy" class="shp1" d="M1 37.5L0.5 1.11L95.5 1.11L96 37.5L1 37.5Z"/>
        </svg>
    )
}

Lineprogress.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
}

export default Lineprogress

