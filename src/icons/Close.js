import React from "react";
import PropTypes from "prop-types";

function CloseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "20"}
      height={props?.size || "20"}
      viewBox="0 0 20 20"
      style={{ height: "auto" }}
      onClick={props?.onClick}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={props?.color || "#F2F2F2"} fillRule="nonzero">
          <g>
            <g>
              <path
                d="M19.157 16.205l-6.188-6.188 6.188-6.188c.815-.815.815-2.136 0-2.951s-2.137-.815-2.951 0l-6.189 6.188L3.83.878C3.014.063 1.693.063.878.878s-.815 2.136 0 2.951l6.188 6.188-6.188 6.188c-.815.815-.815 2.137 0 2.952s2.137.815 2.951 0l6.188-6.188 6.189 6.188c.814.815 2.136.815 2.95 0 .816-.815.816-2.137 0-2.952z"
                transform="translate(-1194 -711) translate(186 638) translate(1008 73)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

CloseIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default CloseIcon;
