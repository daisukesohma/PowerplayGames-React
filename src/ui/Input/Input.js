import React, { useState } from "react";
import Eye from "../../icons/Eye";
import "./Input.scss";

const Input = (props) => {
  const id = props.id || props.name;
  const propsType = props.type || "text";
  const [type, setType] = useState(propsType);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (props.onChange) props.onChange(e);
  };
  const showPasswordHandler = () => {
    setType(type === "password" ? "text" : "password");
  };
  return (
    <div className={`__text-field-style-2 ${props.className}`}>
      <div className={props.extraclass}>
        <label htmlFor={id}>
          {props.title}{" "}
          {propsType === "password" && (
            <Eye
              className={`__eye-icon ${type === "text" ? "" : "active"}`}
              onClick={showPasswordHandler}
            />
          )}
        </label>
        {props?.extra}
      </div>
      <input type={type} id={id} {...props} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;

export const VerificationInput = (props) => {
  const id = props.id || props.name;
  const propsType = props.type || "text";
  const [type, setType] = useState(propsType);
  const showPasswordHandler = () =>
    setType(type === "password" ? "text" : "password");
  return (
    <div className={`__text-field-style-2 ${props.className}`}>
      <div className={props.extraclass}>
        <label htmlFor={id}>
          {props.title}{" "}
          {propsType === "password" && (
            <Eye
              className={`__eye-icon ${type === "text" ? "active" : ""}`}
              onClick={showPasswordHandler}
            />
          )}
        </label>
        {props?.extra}
      </div>
      <input
        type={type}
        id={id}
        {...props}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export const PasswordInput = (props) => {
  const id = props.id || props.name;
  const [type, setType] = useState(false);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (props.onChange) props.onChange(e);
  };
  const showPasswordHandler = () => {
    setType(type ? false : true);
  };
  return (
    <div className={`__text-field-style-2 ${props.className}`}>
      <div className={props.extraclass}>
        <label htmlFor={id}>
          {props.title}{" "}
          <Eye
            className={`__eye-icon ${type ? "active" : ""}`}
            onClick={showPasswordHandler}
          />
        </label>
        {props?.extra}
      </div>
      <input
        type={type ? "text" : "password"}
        id={id}
        {...props}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
