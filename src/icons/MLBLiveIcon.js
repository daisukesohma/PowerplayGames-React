import React from "react";
import PropTypes from "prop-types";

function MLBLiveIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "60"}
      height={props?.size || "60"}
      viewBox="0 0 60 60"
      style={{ height: "auto" }}
      {...props}
    >
      <defs>
        <linearGradient id="relgw93ofa" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#7B7873" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
        <linearGradient id="d9voa5ij6b" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset=".055%" stopColor="#7B7873" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <path
                fill="url(#relgw93ofa)"
                fillRule="nonzero"
                d="M30.227.733C.454.733-1.026 31.779 1.086 33.796l25.863 24.696c.097.092.2.18.306.264 1.81 1.421 4.609 1.303 6.25-.264l25.863-24.696C60.984 32.254 60 .733 30.227.733zm26.534 31.78c-1.473 1.381-9.954 9.46-25.44 24.237-.548.523-1.481.562-2.085.088-.036-.028-.07-.057-.102-.088L3.819 32.578C1.579 30.44 5.36 3.71 30.227 3.71s28.745 26.73 26.534 28.803z"
                transform="translate(-219 -723) translate(59 503) translate(160 220)"
              />
              <path
                fill="url(#d9voa5ij6b)"
                fillRule="nonzero"
                d="M32.054 13.272c-1.113-.874-2.833-.8-3.842.163l-15.9 15.182c-.94.898-.94 2.266 0 3.163l15.9 15.183c.06.057.122.111.188.163 1.113.873 2.833.8 3.842-.163l15.9-15.183c.94-.897.94-2.265 0-3.163l-15.9-15.182c-.06-.057-.122-.112-.188-.163zm-1.202 2.314l14.79 14.122c.292.279.292.703 0 .981l-14.79 14.123c-.313.298-.846.32-1.191.05l-.059-.05-14.79-14.123c-.291-.278-.291-.702 0-.98l14.79-14.123c.313-.299.846-.321 1.192-.05.02.016.04.032.058.05z"
                transform="translate(-219 -723) translate(59 503) translate(160 220)"
              />
              <path
                fill="#8C8C8C"
                d="M26.532 9.934h7.39c.552 0 1 .447 1 1v7.39c0 .552-.448 1-1 1h-7.39c-.552 0-1-.448-1-1v-7.39c0-.553.448-1 1-1z"
                transform="translate(-219 -723) translate(59 503) translate(160 220) rotate(45 30.227 14.629)"
              />
              <path
                fill="#8C8C8C"
                d="M26.532 41.074h7.39c.552 0 1 .447 1 1v7.39c0 .552-.448 1-1 1h-7.39c-.552 0-1-.448-1-1v-7.39c0-.553.448-1 1-1z"
                transform="translate(-219 -723) translate(59 503) translate(160 220) rotate(45 30.227 45.769)"
              />
              <path
                fill="#FB6E00"
                d="M43.185 25.504h7.39c.553 0 1 .447 1 1v7.39c0 .552-.447 1-1 1h-7.39c-.552 0-1-.448-1-1v-7.39c0-.553.448-1 1-1z"
                transform="translate(-219 -723) translate(59 503) translate(160 220) rotate(45 46.88 30.199)"
              />
              <path
                fill="#8C8C8C"
                d="M9.879 25.504h7.39c.552 0 1 .447 1 1v7.39c0 .552-.448 1-1 1h-7.39c-.553 0-1-.448-1-1v-7.39c0-.553.447-1 1-1z"
                transform="translate(-219 -723) translate(59 503) translate(160 220) rotate(45 13.574 30.199)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

MLBLiveIcon.propTypes = {
  size: PropTypes.number,
};

export default MLBLiveIcon;
