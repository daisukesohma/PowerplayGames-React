import React from "react";
import PropTypes from "prop-types";

function RankIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "90"}
      height={props?.size - 38 || "52"}
      viewBox="0 0 90 52"
      style={{ height: "auto" }}
    >
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g transform="translate(-1287 -863) translate(1083 516) translate(34 289) translate(170 58)">
                <rect width="10" height="4" y="48" fill="#FB6E00" rx="1" />
                <rect
                  width="10"
                  height="8"
                  x="16"
                  y="44"
                  fill="#FB6E00"
                  rx="2"
                />
                <rect
                  width="10"
                  height="12"
                  x="32"
                  y="40"
                  fill="#FB6E00"
                  rx="2"
                />
                <rect
                  width="10"
                  height="32"
                  x="64"
                  y="20"
                  fill="#FB6E00"
                  rx="2"
                />
                <rect
                  width="10"
                  height="20"
                  x="48"
                  y="32"
                  fill="#FB6E00"
                  rx="2"
                />
                <rect
                  width="10"
                  height="52"
                  x="80"
                  fill="#F2F2F2"
                  opacity=".3"
                  rx="2"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

RankIcon.propTypes = {
  size: PropTypes.number,
};

export default RankIcon;
