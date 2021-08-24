import React from "react";
const Input = (props) => {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.inputChange}
          onBlur={props.inputBlur}
          name={props.name}
          value={props.value}
        />
        {props.hasErrors && <p style={{color:'red'}}>Please Enter a Valid Input</p>}
      </div>
    </div>
  );
};

export default Input;