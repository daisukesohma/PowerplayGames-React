import React from "react";

const CardHeading = ({ title, subtitle }) => {
  return (
    <div className="CardHeading">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default CardHeading;
