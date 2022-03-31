import React from "react";
import CardHeading from "./CardHeading";

import CollapseButton from "./CollapseButton";
import Tag from "./Tag";
const header = ({
  show,
  toggle,
  sideTitle,
  title,
  subtitle,
  id,
  background,
}) => {
  return (
    <div
      className="scoreCard__wrapper__cardHead"
      style={
        background
          ? { backgroundColor: "rgba(251, 110, 0, 0.06)" }
          : { backgroundColor: "#202124" }
      }
    >
      <Tag sideTitle={sideTitle} />
      <CardHeading title={title} subtitle={subtitle} />
      <CollapseButton show={show} toggle={toggle} id={id} />
    </div>
  );
};

export default header;
