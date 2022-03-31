import React from "react";
import PropTypes from "prop-types";

function VideoIcon(props) {
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
          id="u857whvu9a"
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
                <g transform="translate(-993 -1225) translate(59 761) translate(738 357) translate(145 104) translate(51 3)">
                  <circle
                    cx="12.08"
                    cy="12.08"
                    r="11.644"
                    fill="url(#u857whvu9a)"
                  />
                  <g fillRule="nonzero">
                    <g>
                      <path
                        fill="#ECECEC"
                        d="M16.14 1.044c-.172-.096-.383-.115-.556-.019l-3.896 2.034v3.513l3.877 2.034c.077.038.173.058.269.058.096 0 .21-.02.307-.077.172-.096.268-.288.268-.5V1.544c0-.192-.096-.384-.268-.499z"
                        transform="translate(4.126 7.2)"
                      />
                      <path
                        fill="#FFF"
                        d="M11.86 1.179c0-.653-.498-1.152-1.15-1.152H1.151C.499.027 0 .526 0 1.179v7.293c0 .652.499 1.151 1.152 1.151h9.557c.653 0 1.152-.499 1.152-1.151V1.179z"
                        transform="translate(4.126 7.2)"
                      />
                      <path
                        fill="#FB6E00"
                        d="M1.75 1.4C1.175 1.4.7 1.874.7 2.448s.476 1.05 1.05 1.05c.573 0 1.049-.476 1.049-1.05 0-.574-.476-1.05-1.05-1.05z"
                        transform="translate(4.126 7.2)"
                      />
                    </g>
                    <g>
                      <path
                        fill="#FB6E00"
                        d="M4.893.84C4.353.297 3.633 0 2.87 0c-.69 0-1.346.244-1.865.69L.45.146.338 2.032l1.918-.142-.545-.504c.33-.259.734-.4 1.158-.4 1.035 0 1.878.844 1.878 1.88 0 1.037-.843 1.88-1.878 1.88-.476 0-.93-.178-1.277-.502-.347-.322-.558-.758-.595-1.228l-.012-.154H0l.01.178C.1 4.55 1.357 5.732 2.87 5.732c.765 0 1.484-.298 2.024-.84.541-.54.84-1.26.84-2.026 0-.765-.299-1.485-.84-2.027z"
                        transform="translate(4.126 7.2) translate(3.499 2.1)"
                      />
                      <path
                        fill="#FB3800"
                        d="M4.893.84C4.353.297 3.633 0 2.87 0h-.003v.986h.003c1.035 0 1.878.844 1.878 1.88 0 1.037-.843 1.88-1.878 1.88h-.003v.986h.003c.765 0 1.484-.298 2.024-.84.541-.54.84-1.26.84-2.026 0-.765-.299-1.485-.84-2.027z"
                        transform="translate(4.126 7.2) translate(3.499 2.1)"
                      />
                    </g>
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

VideoIcon.propTypes = {
  size: PropTypes.number,
};

export default VideoIcon;
