import React from "react";
import PropTypes from "prop-types";

function MiniStar(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "32"}
      height={props?.size || "32"}
      viewBox="0 0 32 32"
      style={{ height: "auto" }}
      {...props}
    >
      <defs>
        <linearGradient id="o1n0najl1c" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#E05600" />
          <stop offset="100%" stopColor="#FB7B19" />
        </linearGradient>
        <filter
          id="bo46t4ze5a"
          width="262.5%"
          height="262.5%"
          x="-68.8%"
          y="-68.8%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="2"
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="4"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
        </filter>
        <path
          id="fhwq29fatb"
          d="M8 0h8v8c0 4.418-3.582 8-8 8H0V8c0-4.418 3.582-8 8-8z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g transform="translate(-70 -751) translate(76 505) translate(0 252)">
                <use fill="#000" filter="url(#bo46t4ze5a)" />
                <use fill="url(#o1n0najl1c)" />
              </g>
              <path
                fill="#202124"
                d="M8 10.511L5.061 12.045 5.612 8.776 3.245 6.455 6.524 5.969 8 3 9.476 5.969 12.755 6.455 10.388 8.776 10.939 12.045z"
                transform="translate(-70 -751) translate(76 505) translate(0 252)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

MiniStar.propTypes = {
  size: PropTypes.number,
};

export default MiniStar;
