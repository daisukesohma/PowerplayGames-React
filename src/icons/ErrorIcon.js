import React from "react";
import PropTypes from "prop-types";

function ErrorIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "14"}
      height={props?.size || "14"}
      viewBox="0 0 14 14"
      style={{ height: "auto" }}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <g fill="#CC2929" fillRule="nonzero">
          <g>
            <g>
              <g>
                <path
                  d="M7 0c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7zm0 5.48c-.276 0-.5.094-.5.21v4.582c0 .116.224.209.5.209s.5-.093.5-.209V5.69c0-.115-.224-.208-.5-.208zm0-2.076c-.276 0-.5.12-.5.27v.538c0 .148.224.269.5.269s.5-.12.5-.27v-.538c0-.149-.224-.27-.5-.27z"
                  transform="translate(-889.000000, -482.000000) translate(487.000000, 321.000000) translate(340.000000, 159.000000) translate(62.000000, 2.000000) translate(7.000000, 7.000000) scale(1, -1) translate(-7.000000, -7.000000)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

ErrorIcon.propTypes = {
  size: PropTypes.number,
};

export default ErrorIcon;
