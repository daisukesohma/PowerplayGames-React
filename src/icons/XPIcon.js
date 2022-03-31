import React from "react";
import PropTypes from "prop-types";

function XPIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "30"}
      height={props?.size || "30"}
      viewBox="0 0 30 30"
      style={{ height: "auto" }}
      {...props}
    >
      <defs>
        <linearGradient
          id="ltgmovwqea"
          x1="35.019%"
          x2="67.721%"
          y1="39.758%"
          y2="84.553%"
        >
          <stop offset="0%" stopColor="#FB6E00" />
          <stop offset="100%" stopColor="#FA3800" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g transform="translate(-255 -887) translate(59 759) translate(139 105) translate(57 23)">
                <circle
                  cx="14.726"
                  cy="14.726"
                  r="14.726"
                  fill="url(#ltgmovwqea)"
                />
                <g fillRule="nonzero">
                  <g>
                    <path
                      fill="#ECECEC"
                      d="M8.876 7.626L6.524 5.011l2.352-2.615c.089-.099.139-.233.139-.373 0-.14-.05-.275-.14-.374L7.533.155c-.186-.207-.487-.207-.672 0L4.508 2.77 2.155.155c-.185-.207-.486-.207-.672 0L.14 1.649c-.185.206-.185.54 0 .747l2.352 2.615L.14 7.626c-.185.207-.185.541 0 .747l1.344 1.495c.09.099.21.155.336.155.126 0 .247-.056.336-.155l2.353-2.615L6.86 9.868c.089.099.21.155.336.155.126 0 .247-.056.336-.155l1.344-1.495c.185-.206.185-.54 0-.747z"
                      transform="translate(4.122 8.561) translate(0 1.581)"
                    />
                    <path
                      fill="#FFF"
                      d="M.14 8.373l1.343 1.495c.09.099.21.155.336.155.126 0 .247-.056.336-.155l2.352-2.615V2.77L2.155.155c-.185-.207-.486-.207-.672 0L.14 1.649c-.185.206-.185.54 0 .747l2.352 2.615L.14 7.626c-.185.207-.185.541 0 .747z"
                      transform="translate(4.122 8.561) translate(0 1.581)"
                    />
                  </g>
                  <path
                    fill="#FFF"
                    d="M14.738 12.581V8.196h1.871c.977 0 1.807-.174 2.49-.521.682-.348 1.197-.825 1.544-1.432s.52-1.3.52-2.078c0-1.25-.388-2.242-1.164-2.979-.777-.737-1.907-1.105-3.39-1.105h-4.89v12.5h3.019zm1.536-6.807h-1.536V2.521h1.536c1.212 0 1.818.548 1.818 1.644 0 1.073-.606 1.61-1.818 1.61z"
                    transform="translate(4.122 8.561)"
                  />
                  <path
                    fill="#ECECEC"
                    d="M16.61.081c1.482 0 2.612.368 3.389 1.105.776.737 1.165 1.73 1.165 2.98 0 .777-.174 1.47-.521 2.077-.347.607-.862 1.084-1.545 1.432-.682.347-1.512.521-2.489.521h-1.186V5.774h.85c1.15 0 1.754-.481 1.814-1.444l.005-.165c0-1.096-.606-1.644-1.818-1.644l-.85-.001V.081z"
                    transform="translate(4.122 8.561)"
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

XPIcon.propTypes = {
  size: PropTypes.number,
};

export default XPIcon;
