import React from 'react'
import PropTypes from 'prop-types'

function SwapIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "12"} height={props?.size || "12"} viewBox="0 0 12 12" style={{ height: 'auto' }} {...props}>
            <g fill={props?.color || "none"} fillRule="evenodd" opacity=".6">
                <g fillRule="nonzero">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <g>
                                                <path fill="#FFF" d="M11.866 8.803L8.113 5.825c-.112-.089-.277-.008-.277.136v1.98h-4.27c-1.03 0-2.087-.288-2.867-.97-.122-.108-.31.001-.28.162.053.283.16.71.374 1.135.549 1.09 1.481 1.641 2.772 1.641h4.238v1.89c0 .066.037.126.095.155.057.029.126.024.179-.016l3.786-2.862c.042-.032.068-.082.068-.136 0-.053-.023-.104-.065-.137z" transform="translate(-626 -887) translate(186 638) translate(40 127) translate(.5) translate(20.5 94) translate(363 20) translate(16 5) translate(0 3)" />
                                                <path fill="#ECECEC" d="M11.866 8.803l-.49-.388c-3.565 2.695-3.32 2.528-3.402 2.528-.094 0-.17-.077-.17-.173v1.03c0 .065.036.125.094.154.057.029.126.024.179-.016l3.786-2.862c.042-.032.068-.082.068-.136 0-.053-.023-.104-.065-.137z" transform="translate(-626 -887) translate(186 638) translate(40 127) translate(.5) translate(20.5 94) translate(363 20) translate(16 5) translate(0 3)" />
                                                <path fill="#FFF" d="M11.512 4.845c-.314-1.681-1.362-2.777-3.146-2.777H4.128V.178c0-.142-.161-.223-.274-.138L.068 2.9c-.09.068-.091.204-.003.274C4.107 6.382 3.84 6.19 3.924 6.19c.094 0 .17-.077.17-.173v-1.98h4.272c1.032 0 2.088.29 2.866.97.122.107.31-.002.28-.162z" transform="translate(-626 -887) translate(186 638) translate(40 127) translate(.5) translate(20.5 94) translate(363 20) translate(16 5) translate(0 3)" />
                                                <g fill="#ECECEC">
                                                    <path d="M3.924 2.675c-.085 0 .165.178-3.417-2.665L.068.341C-.022.41-.023.545.065.615l3.753 2.978c.112.088.277.008.277-.136v-.955c0 .096-.077.173-.171.173zM11.512 2.285c-.037-.198-.1-.467-.209-.756-.114-.028-.975-1.007-2.937-1.007H5.143c-.045.01-.11.016-.204.016-.622 0-.8.344-.844.616v.323h4.27c1.033 0 2.089.29 2.867.97.122.107.31-.002.28-.162z" transform="translate(-626 -887) translate(186 638) translate(40 127) translate(.5) translate(20.5 94) translate(363 20) translate(16 5) translate(0 3) translate(0 2.56)" />
                                                </g>
                                                <path fill="#ECECEC" d="M6.871 8.88H3.565c-1.43 0-2.402-.684-2.903-1.934-.127-.063-.27.048-.243.187.314 1.681 1.362 2.776 3.146 2.776h4.238v-.244c-.031-.305-.197-.785-.932-.785z" transform="translate(-626 -887) translate(186 638) translate(40 127) translate(.5) translate(20.5 94) translate(363 20) translate(16 5) translate(0 3)" />
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

SwapIcon.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
}

export default SwapIcon

