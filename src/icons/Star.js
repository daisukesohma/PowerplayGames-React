import React from "react";
import PropTypes from "prop-types";
import { printLog } from "../utility/shared";

function StarIcon(props) {
  printLog(props?.solidcolor);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "14"}
      height={props?.size - 1 || "13"}
      viewBox="0 0 14 13"
      style={{ height: "auto" }}
    >
      <defs>
        <linearGradient
          id="y7hhh09t3a"
          x1="35.019%"
          x2="67.721%"
          y1="39.758%"
          y2="84.553%"
        >
          <stop offset="0%" stopColor={props?.solidcolor || "#FA3800"} />
          <stop offset="100%" stopColor={props?.solidcolor || "#FB6E00"} />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g fill="url(#y7hhh09t3a)" transform="translate(-1139 -1258)">
          <g>
            <g>
              <g>
                <g>
                  <path
                    d="M7 10.515L2.886 12.663 3.657 8.086 0.343 4.837 4.934 4.156 7 0 9.066 4.156 13.657 4.837 10.343 8.086 11.114 12.663z"
                    transform="translate(1083 516) translate(33 676) translate(1) translate(22 66)"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

StarIcon.propTypes = {
  size: PropTypes.number,
  solidcolor: PropTypes.string,
};

export default StarIcon;
