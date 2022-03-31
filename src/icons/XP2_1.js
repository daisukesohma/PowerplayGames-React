import React from "react";
import PropTypes from "prop-types";

function XP2Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "24"}
      height={props?.size || "24"}
      viewBox="0 0 24 24"
      style={{ height: "auto" }}
      {...props}
    >
      <defs>
        <linearGradient
          id="nu1tjhzc6a"
          x1="35.019%"
          x2="67.721%"
          y1="39.758%"
          y2="84.553%"
        >
          <stop offset="0%" stopColor="#688FBD" />
          <stop offset="100%" stopColor="#30598A" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g transform="translate(-991 -1507) translate(957 516) translate(0 991) translate(34)">
                <circle
                  cx="12.138"
                  cy="12.11"
                  r="11.647"
                  fill="url(#nu1tjhzc6a)"
                />
                <g fillRule="nonzero">
                  <g>
                    <path
                      fill="#ECECEC"
                      d="M7.202 5.44L5.294 3.574 7.202 1.71c.073-.07.113-.166.113-.266s-.04-.196-.113-.267L6.112.11c-.151-.147-.395-.147-.546 0L3.658 1.976 1.748.11c-.15-.147-.394-.147-.544 0L.113 1.176c-.15.147-.15.386 0 .533l1.909 1.866L.113 5.44c-.15.147-.15.386 0 .533l1.09 1.066c.073.07.171.11.273.11.103 0 .2-.04.273-.11l1.909-1.866L5.566 7.04c.073.07.17.11.273.11.102 0 .2-.04.273-.11l1.09-1.066c.15-.147.15-.386 0-.533z"
                      transform="translate(3.847 6.213) translate(0 2.12)"
                    />
                    <path
                      fill="#FFF"
                      d="M.113 5.973l1.09 1.066c.073.07.171.11.273.11.103 0 .2-.04.273-.11l1.909-1.866V1.976L1.748.11c-.15-.147-.394-.147-.544 0L.113 1.176c-.15.147-.15.386 0 .533l1.909 1.866L.113 5.44c-.15.147-.15.386 0 .533z"
                      transform="translate(3.847 6.213) translate(0 2.12)"
                    />
                  </g>
                  <path
                    fill="#FFF"
                    d="M15.561 9.463V7.69h-3.667c.964-.582 1.792-1.295 2.484-2.139.692-.843 1.039-1.706 1.039-2.588 0-.797-.257-1.443-.77-1.94-.512-.497-1.272-.745-2.28-.745-.964 0-1.761.278-2.392.835-.631.557-.973 1.387-1.025 2.492h2.195c.017-.505.107-.878.27-1.117.161-.24.418-.36.768-.36.622 0 .933.351.933 1.053 0 1.148-1.393 2.694-4.18 4.638v1.644h6.625z"
                    transform="translate(3.847 6.213)"
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

XP2Icon.propTypes = {
  size: PropTypes.number,
};

export default XP2Icon;
