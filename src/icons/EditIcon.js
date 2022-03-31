import React from "react";
import PropTypes from "prop-types";

function EditIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "13"}
      height={props?.size || "13"}
      viewBox="0 0 13 13"
      style={{ width: "auto", height: "auto" }}
    >
      <g fill="none" fillRule="evenodd">
        <g fill="#84B6F0" fillRule="nonzero">
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      d="M.103 11.897c.101.101.255.131.387.074l3.217-1.379-2.3-2.3L.029 11.51c-.056.132-.027.285.075.387zM1.812 7.703L7.671 1.843 10.157 4.329 4.297 10.188zM9.908.103c-.137-.137-.36-.137-.497 0L8.168 1.346l2.486 2.486 1.243-1.243c.137-.138.137-.36 0-.497L9.908.103z"
                      transform="translate(-500 -1046) translate(59 503) translate(246 359) translate(16 178) translate(0 .718) translate(179.5 6)"
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

EditIcon.propTypes = {
  size: PropTypes.number,
};

export default EditIcon;
