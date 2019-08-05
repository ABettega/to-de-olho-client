import React from "react";
import "./Button.css";
import {Link} from "react-router-dom"

const Button = (props) => {
  return (
   <Link className={"button-a " + props.class} to={props.to}>{props.children}</Link>
  );
};

export default Button;