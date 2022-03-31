import React from 'react';

const Info = props => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props?.size || "20"} height={ props?.size || "20" } viewBox="0 0 20 20" {...props} style={{height: 'auto'}}>
        <g fillRule="nonzero" fill='currentColor'>
            <path d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zm0-1.667c-4.602 0-8.333-3.73-8.333-8.333 0-4.602 3.73-8.333 8.333-8.333 4.602 0 8.333 3.73 8.333 8.333 0 4.602-3.73 8.333-8.333 8.333z" transform="translate(-303 -1694) translate(57 1614) translate(246 80)" />
            <path d="M9.167 5.005c0-.246.076-.448.23-.604.153-.156.354-.234.603-.234s.45.078.603.234c.154.156.23.358.23.604 0 .24-.076.438-.23.594-.153.156-.354.234-.603.234s-.45-.078-.603-.234c-.154-.156-.23-.354-.23-.594zm1.666 3.328v7.5H9.167v-7.5h1.666z" transform="translate(-303 -1694) translate(57 1614) translate(246 80)" />
        </g>
    </svg>
)

export default Info;