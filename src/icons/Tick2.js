import React from "react";
import PropTypes from "prop-types";

function Tick2(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "17"}
      height={props?.size || "17"}
      viewBox="0 0 17 17"
      style={{ height: "auto" }}
    >
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <g>
            <g>
              <g>
                <path
                  fill="#FB6E00"
                  d="M13.985 2.4C12.437.851 10.38 0 8.192 0S3.947.852 2.399 2.4C.852 3.946 0 6.003 0 8.191c0 2.188.852 4.245 2.4 5.793 1.547 1.547 3.604 2.399 5.792 2.399 2.188 0 4.245-.852 5.793-2.4 1.547-1.547 2.399-3.604 2.399-5.792 0-2.188-.852-4.245-2.4-5.793z"
                  transform="translate(-65 -814) translate(50 735) translate(0 40) translate(15 39)"
                />
                <path
                  fill="#000"
                  d="M12.106 6.242L7.528 10.82c-.094.094-.217.141-.34.141-.123 0-.245-.047-.34-.14L4.279 8.25c-.187-.188-.187-.492 0-.679.188-.187.492-.187.679 0l2.231 2.231 4.239-4.238c.187-.188.491-.188.679 0 .187.187.187.49 0 .678z"
                  transform="translate(-65 -814) translate(50 735) translate(0 40) translate(15 39)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

Tick2.propTypes = {
  size: PropTypes.number,
};

export default Tick2;
