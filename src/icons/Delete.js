import React from 'react'
import PropTypes from 'prop-types'

function DeleteIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={ props?.size || "34" } height={ props?.size || "34" } viewBox="0 0 34 30" {...props}>
            <g fill="#FA3800" fillRule="evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <g transform="translate(-488 -884) translate(50 634) translate(0 216) translate(20 20) translate(30 17) translate(393)">
                                            <use fill="#000" filter="url(#6csdp4hpha)"/>
                                            <use fill="#FA3800" fillOpacity=".8"/>
                                        </g>
                                        <g fill="#202124" fillRule="nonzero">
                                            <path d="M1.144 12.441c.015.352.305.63.657.63h6.141c.353 0 .643-.278.658-.63l.438-9.258H.705l.439 9.258zM6.26 5.483c0-.148.12-.268.267-.268h.428c.147 0 .267.12.267.268v5.289c0 .147-.12.267-.267.267h-.428c-.147 0-.267-.12-.267-.267v-5.29zm-1.87 0c0-.148.12-.268.267-.268h.427c.148 0 .268.12.268.268v5.289c0 .147-.12.267-.268.267h-.427c-.147 0-.267-.12-.267-.267v-5.29zm-1.87 0c0-.148.12-.268.267-.268h.427c.148 0 .268.12.268.268v5.289c0 .147-.12.267-.268.267h-.427c-.148 0-.267-.12-.267-.267v-5.29zM9.33.673H6.497V.138C6.497.062 6.435 0 6.359 0H3.384c-.076 0-.138.062-.138.138v.535H.413c-.228 0-.412.185-.412.413v1.297h9.742V1.086c0-.228-.185-.413-.413-.413z" transform="translate(-488 -884) translate(50 634) translate(0 216) translate(20 20) translate(30 17) translate(393) translate(7.2 5.6)"/>
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

DeleteIcon.propTypes = {
    size: PropTypes.number,
}

export default DeleteIcon;

