import React from 'react';

const Clock = props => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" {...props}>
        <g fill="currentColor" fillRule="nonzero">
            <path d="M6.94 0C3.113 0 0 3.113 0 6.94c0 3.827 3.113 6.94 6.94 6.94 3.827 0 6.94-3.113 6.94-6.94C13.88 3.113 10.767 0 6.94 0zm0 12.403c-3.012 0-5.463-2.45-5.463-5.463s2.45-5.463 5.463-5.463c3.012 0 5.463 2.45 5.463 5.463s-2.45 5.463-5.463 5.463z" transform="translate(-268 -1176) translate(50 704) translate(0 228) translate(31 30) translate(187 210) translate(0 1) translate(0 3)" />
            <path d="M10.557 6.726H7.438v-3.75c0-.316-.256-.572-.571-.572-.316 0-.572.256-.572.572v4.321c0 .316.256.572.572.572h3.69c.315 0 .571-.256.571-.572 0-.315-.256-.571-.571-.571z" transform="translate(-268 -1176) translate(50 704) translate(0 228) translate(31 30) translate(187 210) translate(0 1) translate(0 3)" />
        </g>
    </svg>
)

export default Clock;