import React from "react";

const Tag = ({ sideTitle }) => {
  return <span className="tag">{`${sideTitle} |`}</span>;
};

export default Tag;
