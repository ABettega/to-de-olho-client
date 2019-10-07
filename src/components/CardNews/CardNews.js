import React from "react";
import styled from "styled-components"

const CardNews = props => {
  return (
    <div className="card card-slider">
      <p>{props.children}</p>
    </div>
  );
};

export default CardNews;
