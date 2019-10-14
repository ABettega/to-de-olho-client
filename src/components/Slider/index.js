import React from "react";
import styled from "styled-components";

const SSlider = styled.div`
  height: 100%;
  display: flex;
  overflow-x: scroll;
  padding: 25px 7px;
  margin-bottom: 50px;
  @media (min-width: 912px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Slider = props => {
  return <SSlider className="slider">{props.children}</SSlider>;
};

export default Slider;
