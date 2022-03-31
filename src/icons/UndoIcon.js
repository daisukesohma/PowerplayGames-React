import React from 'react';
import PropTypes from 'prop-types';

function UndoIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "30"} height={props?.size || "30"} viewBox="0 0 30 30" style={{ height: 'auto' }}>
            <defs>
                <linearGradient id="jp5mypgs1a" x1="35.019%" x2="67.721%" y1="39.758%" y2="84.553%">
                    <stop offset="0%" stop-color="#FB6E00"/>
                    <stop offset="100%" stop-color="#FA3800"/>
                </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <g transform="translate(-422 -2824) translate(50 2689) translate(18 41) translate(322 89) translate(32.5 5)">
                                    <circle cx="26.507" cy="26.507" r="26.507" fill="url(#jp5mypgs1a)"/>
                                    <g fill-rule="nonzero">
                                        <path fill="#FFF" d="M10.599.095c.287-.217.69-.04.747.3l.006.08v5.199h11.654c4.024 0 6.686 2.026 7.99 5.304l-.034-.075c1.592 3.443 1.287 6.317.571 8.566l-.123.369-.103.282-.115.288-.128.294-.142.297c-1.023 2.037-3.12 4.21-7.916 4.34H4.261c-.552 0-1-.447-1-1v-3.413c0-.552.448-1 1-1h18.745c2.84 0 3.655-2.036 3.655-4.576 0-2.494-1.122-4.123-4.028-4.263H11.26v5.446c0 .235-.168.427-.387.467l-.15.013-.012-.002c-.012-.003-.027-.008-.048-.019l-.08-.047-.346-.252-2.605-2.054L.179 8.717c-.218-.174-.236-.493-.058-.691l.067-.062L10.598.095z" transform="translate(10 13)"/>
                                        <g fill="#ECECEC">
                                            <path d="M10.79 7.355c-.233 0 .454.49-9.397-7.327L.188.938c-.247.187-.252.56-.009.753L10.5 9.88c.308.244.762.023.762-.373V6.881c0 .263-.213.474-.47.474zM21.621 1.435h-7.819c-.107.028-.268.043-.494.043-1.509 0-1.94.948-2.047 1.695v.889h10.36c2.504 0 4.329.382 4.933 2.93.073.308-.173-5.557-4.933-5.557z" transform="translate(10 13) translate(0 7.026)"/>
                                            <path d="M31.337 18.343c-.108-.275-.948-2.584-2.74-3.756-1.794-1.173-3.058-1.779-9.645-1.606H6.355c-.172.028-1.478-.006-1.84 0-1.558.028-1.254 1.417-1.254 2.204v.889h15.691c11.795-.323 12.385 2.269 12.385 2.269z" transform="translate(10 13) translate(0 7.026) matrix(1 0 0 -1 0 31.295)"/>
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

UndoIcon.propTypes = {
    size: PropTypes.number,
};

export default UndoIcon;