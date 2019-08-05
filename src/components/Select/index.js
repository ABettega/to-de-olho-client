import React from "react";
import "./select.css";

const Select = props => {
  return (
    <select name={props.name} onChange={e => props.change(e)}>
      <option key={props.placeholder} value="">
        {props.placeholder}
      </option>
      {props.options.map(option => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
