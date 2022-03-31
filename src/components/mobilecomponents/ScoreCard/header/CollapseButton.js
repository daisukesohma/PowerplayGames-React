import React from "react";

const CollapseButton = ({ show, toggle, id }) => {
  const icon = show === false ? "/images/downarrow.svg" : "/images/uparrow.svg";
  const changeCollapse = show === false ? true : false;

  return (
    <div
      className="collapseButton"
      style={{ cursor: "pointer" }}
      onClick={() => toggle(changeCollapse, id)}
    >
      <span>See less </span>
      <span style={{ position: "relative", top: "3px" }}>
        <img src={icon} alt="" />
      </span>
    </div>
  );
};

export default CollapseButton;
