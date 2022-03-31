import React from "react";
import PropTypes from "prop-types";

function BaseballStick(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "14"}
      height={props?.size || "14"}
      viewBox="0 0 14 14"
      className={`${{ height: "auto" }} ${{ ...props?.style }}`}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <g fill="#F2F2F2" fillRule="nonzero">
          <g>
            <g>
              <g>
                <g>
                  <path
                    d="M7.6 8.509l6.078-6.078c.43-.43.43-1.126 0-1.555l-.554-.554c-.43-.43-1.126-.43-1.555 0L5.49 6.4c-.801.802-1.903 2.826-2.636 3.691-.362.427-1.582 1.582-1.582 1.582-.291-.29-.763-.29-1.055 0-.29.292-.29.764 0 1.055l1.055 1.055c.291.29.763.29 1.055 0 .29-.292.29-.764 0-1.055 0 0 1.155-1.22 1.582-1.582.865-.733 2.889-1.835 3.69-2.636z"
                    transform="translate(-569 -727) translate(59 503) translate(492 2) translate(16 219) translate(2 3)"
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

BaseballStick.propTypes = {
  size: PropTypes.number,
  style: PropTypes.object,
};

export default BaseballStick;
