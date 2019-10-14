import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Btn = styled(Link)`
  background-color: ${props =>
    props === "light-green" ? "#89ce64" : "#89ce64"};
  border: none;
  border-radius: 30px;
  box-sizing: border-box;
  padding: 15px;
  color: white;
  outline: none;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  margin: 20px 0 5px 0;

  :hover {
    background-color: #4bbf5b;
  }
  :active {
    background-color: #4bbf5b;
  }
`;

const Button = props => {
  return (
    <Btn className={"button-a " + props.class} to={props.to}>
      {props.children}
    </Btn>
  );
};

export default Button;
