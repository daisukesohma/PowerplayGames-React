import React from "react";
import "./Select.scss";

const Select = (props) => {
  const id = props.id || props.name;

  return (
    <div className={`__select_container ${props.className}`}>
      <label htmlFor={id}>{props.title}</label>
      <select name={props.name} id={props.id} {...props}>
        {props.children}
      </select>
    </div>
  );
};

export default Select;
