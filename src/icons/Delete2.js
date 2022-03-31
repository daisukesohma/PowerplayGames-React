import React from 'react'
import PropTypes from 'prop-types'

function Delete2Icon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={ props?.size || "12" } height={ props?.size && ( parseInt(props?.size) + 4 ) || "16" } viewBox="0 0 12 16" style={{height: 'auto'}}>
            <g fill="none" fillRule="evenodd" opacity=".8">
                <g fill="#FA3800" fillRule="nonzero">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <g>
                                                <path d="M11.133 3.896l-.54 11.332c-.019.432-.376.772-.81.772H2.219c-.435 0-.792-.34-.81-.772L.869 3.896h10.264zM8.567 6.384h-.526c-.182 0-.33.146-.33.327v6.474c0 .18.148.327.33.327h.526c.182 0 .33-.146.33-.327V6.711c0-.18-.148-.327-.33-.327zm-2.303 0h-.527c-.181 0-.329.146-.329.327v6.474c0 .18.148.327.33.327h.526c.182 0 .329-.146.329-.327V6.711c0-.18-.147-.327-.33-.327zm-2.304 0h-.526c-.182 0-.33.146-.33.327v6.474c0 .18.148.327.33.327h.526c.182 0 .33-.146.33-.327V6.711c0-.18-.148-.327-.33-.327zM7.833 0c.094 0 .17.076.17.169v.655h3.49c.28 0 .508.226.508.506v1.587H0V1.33C0 1.05.228.824.509.824H4V.17c0-.093.076-.169.17-.169z" transform="translate(-1356 -1066) translate(1083 516) translate(34 331) translate(0 179) translate(20 24) translate(3) translate(30) translate(186 16)"/>
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

Delete2Icon.propTypes = {
    size: PropTypes.number,
}

export default Delete2Icon

