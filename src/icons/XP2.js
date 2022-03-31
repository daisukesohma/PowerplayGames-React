import React from "react";
import PropTypes from "prop-types";

function XP2Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "40"}
      height={props?.size || "40"}
      viewBox="0 0 40 40"
      style={{ height: "auto" }}
      {...props}
    >
      <defs>
        <linearGradient
          id="8u877jaa5a"
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
              <g>
                <g transform="translate(-249 -938) translate(174 919) translate(19 19) translate(56)">
                  <circle
                    cx="20.229"
                    cy="20.183"
                    r="19.412"
                    fill="url(#8u877jaa5a)"
                  />
                  <g fillRule="nonzero">
                    <g>
                      <path
                        fill="#ECECEC"
                        d="M12.004 9.066L8.823 5.957l3.18-3.108c.121-.118.19-.278.19-.445 0-.166-.069-.326-.19-.444L10.187.184c-.25-.245-.658-.245-.909 0l-3.18 3.109L2.914.184c-.251-.245-.658-.245-.909 0L.188 1.96c-.25.246-.25.643 0 .889L3.37 5.958.19 9.066c-.252.246-.252.643 0 .888l1.817 1.777c.12.118.284.184.455.184.17 0 .334-.066.454-.184l3.181-3.109 3.181 3.109c.12.118.284.184.455.184.17 0 .334-.066.454-.184l1.818-1.777c.25-.245.25-.642 0-.888z"
                        transform="translate(6.411 10.355) translate(0 3.533)"
                      />
                      <path
                        fill="#FFF"
                        d="M.188 9.955l1.818 1.776c.12.118.284.184.455.184.17 0 .333-.066.454-.184l3.181-3.109v-5.33L2.915.185c-.251-.245-.658-.245-.909 0L.188 1.96c-.25.246-.25.643 0 .889L3.37 5.958.19 9.066c-.252.246-.252.643 0 .889z"
                        transform="translate(6.411 10.355) translate(0 3.533)"
                      />
                    </g>
                    <path
                      fill="#FFF"
                      d="M25.935 15.771v-2.954h-6.112c1.607-.97 2.987-2.159 4.14-3.565 1.154-1.406 1.731-2.844 1.731-4.314 0-1.327-.427-2.405-1.281-3.233C23.558.877 22.29.464 20.612.464c-1.607 0-2.936.463-3.987 1.391-1.052.928-1.622 2.312-1.71 4.154h3.66c.029-.842.178-1.463.449-1.863.27-.4.697-.6 1.281-.6 1.037 0 1.556.586 1.556 1.756 0 1.913-2.323 4.489-6.967 7.729v2.74h11.041z"
                      transform="translate(6.411 10.355)"
                    />
                  </g>
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
